// نوشتن groc api برای دانلود فایل ها

import { FileStorageServiceClient } from '@/generated/file_grpc_pb';
import { ChannelCredentials } from '@grpc/grpc-js';
import * as file_pb from '@/generated/file_pb';
import { NextRequest, NextResponse } from 'next/server';

// ذخیره درصد پیشرفت و فرستادن برای client
const downloadProgressStore: Record<string, number> = {};

export async function POST(request: Request): Promise<Response> {
  try {
    // گرفتن fileId از client
    const formData = await request.formData();
    const fileId = formData.get('fileId') as string;

    // گرفتن ticket قبل از دانلود
    const client = new FileStorageServiceClient('45.156.187.251:9095', ChannelCredentials.createInsecure());
    const downloadStream = client.download();
    const createTicketRequest = new file_pb.CreateTicketRequest();
    createTicketRequest.setDirection(file_pb.StreamDirection.DOWNLOAD);
    createTicketRequest.setFileId(fileId);

    const ticketResponse: file_pb.CreateTicketResponse = await new Promise((resolve, reject) => {
      client.create_ticket(createTicketRequest, (err, response) => {
        if (err) return reject(err);
        resolve(response);
      });
    });

    // شروع گرفتن instance ها برای دانلود با grpc
    const startRequest = new file_pb.DownloadStartRequest();
    const resInfo = new file_pb.AuthInfo();
    resInfo.setTicket(ticketResponse.getTicketId());
    startRequest.setAuthInfo(resInfo);
    startRequest.setOffset(0);
    startRequest.setChunkSize(1024 * 512);
    startRequest.setChunkLimit(0);

    // گرفتن یک instance برای دریافت سگنال از download
    const downloadControlSignal = new file_pb.DownloadControlSignal();
    downloadControlSignal.setStartRequest(startRequest);
    downloadStream.write(downloadControlSignal);

    // تعریف متغیر های اولیه برای شروع دانلود
    let totalReceived = 0;
    let fileSize = 0;
    let lastChunkRequestTime = 0;
    downloadProgressStore[ticketResponse.getFileId()] = 0;
    const chunks: Uint8Array[] = [];
    let timeout: NodeJS.Timeout | null = null;

    // نوشتن یه تابع برای اینکه به صورت async یه stream داشته باشیم
    return new Promise((resolve, reject) => {
      // شروع stream برای گرفتن data ,پردازش روی اون
      downloadStream.on('data', (res) => {
        console.log('Raw Response:', res.toObject());

        if (res.hasDownloadInfo()) {
          const downloadInfo = res.getDownloadInfo();
          fileSize = downloadInfo.getFileSize();
          console.log('File Size:', fileSize);

          // بررسی شرط برای دادن اولین درخواست chunk برای دانلود
          if (totalReceived === 0 && Date.now() - lastChunkRequestTime > 100) {
            const chunkRequest = new file_pb.DownloadControlSignal();
            const chunkRequestContent = new file_pb.DownloadChunkRequest();
            chunkRequestContent.setLastChunkId(0);
            chunkRequestContent.setLastChunkSize(0);
            chunkRequestContent.setTotalReceived(totalReceived);
            chunkRequest.setChunkRequest(chunkRequestContent);
            downloadStream.write(chunkRequest);
            lastChunkRequestTime = Date.now();
          }
        }

        // بررسی چانک های دریافتی
        if (res.hasChunk()) {
          const fileChunk = res.getChunk();
          const chunkContent = fileChunk.getContent_asU8();

          // بررسی اینکه ما با دادن اولین درخواست آیا chunk ما محتوایی دارد یا نه؟
          if (chunkContent) {
            totalReceived += chunkContent.length;
            chunks.push(chunkContent);
            const progress = Math.min(Math.floor((totalReceived / fileSize) * 100), 100);
            downloadProgressStore[ticketResponse.getFileId()] = progress;
            console.log('Total received:', `${totalReceived}/${fileSize} (${progress}%)`);

            // بررسی اینکه آیا مقدار size دریافتی از حجم فایل کمتر است یا نه. اگه کمتر بود درخواست chunk های بعدی رو میده تا محتوای جدیدی هم دریافت کنه.
            if (totalReceived < fileSize) {
              const chunkRequest = new file_pb.DownloadControlSignal();
              const chunkRequestContent = new file_pb.DownloadChunkRequest();
              chunkRequestContent.setLastChunkId(fileChunk.getChunkId());
              chunkRequestContent.setLastChunkSize(chunkContent.length);
              chunkRequestContent.setTotalReceived(totalReceived);
              chunkRequest.setChunkRequest(chunkRequestContent);
              downloadStream.write(chunkRequest);
              lastChunkRequestTime = Date.now();

              // در اینجا بررسی میکنه که اگه مقدار فایل دریافتی بزرگتر یا مساوی حجم فایل شد این قسمت اجرا میشه و stream بسته میشه.
            } else {
              console.log('File download complete.');
              downloadStream.end();
              clearTimeout(timeout!);
              const blob = new Blob(chunks);
              blob.arrayBuffer().then((arrayBuffer) => {
                resolve(
                  new Response(arrayBuffer, {
                    status: 200,
                    headers: {
                      'Content-Type': 'application/octet-stream',
                      'Content-Disposition': `attachment; filename="${fileId}"`,
                    },
                  })
                );
              });
            }
          }
        }

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log('Download timed out');
          downloadStream.destroy();
          reject(new Response('Download timeout', { status: 500 }));
        }, 5000);
      });

      // انداختن یه لاگ برای نشان دادن اینکه stream تمام شده
      downloadStream.on('end', () => {
        console.log('Download completed successfully.');
      });

      // هندل کردن ارور های دریافتی از شروع دانلود
      downloadStream.on('error', (err: Error) => {
        console.error('Download stream error:', err);
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      });
    });
  } catch (err) {
    // بخشی که نشون میده دانلود از همون اول دچار میشکل شده
    console.error('Error in POST handler:', err);
    return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { status: 500 });
  }
}

// تابع دریافت درصد پیشرفت download با درخواست به url که شامل fileId همون فایل درحال دانلود هستش.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('fileId');

  if (!ticketId || !(ticketId in downloadProgressStore)) {
    return NextResponse.json({ error: 'Invalid ticketId or progress not found.' }, { status: 400 });
  }

  const progress = downloadProgressStore[ticketId];
  return NextResponse.json({ progress });
}
