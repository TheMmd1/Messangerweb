// نوشتن groc api برای آپلود فایل ها

import { FileStorageServiceClient } from '@/generated/file_grpc_pb';
import { ChannelCredentials } from '@grpc/grpc-js';
import * as file_pb from '@/generated/file_pb';
import { NextRequest, NextResponse } from 'next/server';

// ذخیره درصد پیشرفت و فرستادن برای client
const progressStore: Record<string, number> = {};

export async function POST(request: Request): Promise<Response> {
  // دریافت و پردازش فایل ارسال شده از client برای آپلود
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
  const fileSize: number = arrayBuffer.byteLength;

  // گرفتن ticket قبل از دانلود
  const client = new FileStorageServiceClient('45.156.187.251:9095', ChannelCredentials.createInsecure());
  const uploadStream = client.upload();

  const createTicketRequest = new file_pb.CreateTicketRequest();
  createTicketRequest.setDirection(file_pb.StreamDirection.UPLOAD);
  createTicketRequest.setSize(fileSize);

  const ticketResponse: file_pb.CreateTicketResponse = await new Promise((resolve, reject) => {
    client.create_ticket(createTicketRequest, (err, response) => {
      if (err) return reject(err);
      resolve(response);
    });
  });

  // شروع گرفتن instance ها برای آپلود با grpc
  const authInfo = new file_pb.UploadChunk();
  const authUser = new file_pb.AuthInfo();
  authUser.setTicket(ticketResponse.getTicketId());
  authInfo.setAuthInfo(authUser);
  uploadStream.write(authInfo);

  // تعریف متغیر های اولیه برای شروع آپلود
  const chunkSize: number = 1024 * 1024;
  let offset = 0;
  let chunkId = 0;

  // بررسی اینکه آیا باید آپلود ادامه دار باشد یا خیر
  while (offset < fileSize) {
    const chunk: Uint8Array = new Uint8Array(arrayBuffer.slice(offset, offset + chunkSize));
    const uploadChunk = new file_pb.UploadChunk();
    const fileChunk = new file_pb.Chunk();
    fileChunk.setChunkId(chunkId++);
    fileChunk.setContent(chunk);

    uploadChunk.setChunk(fileChunk);
    uploadStream.write(uploadChunk);

    offset += chunkSize;
  }

  // اگر شرط بالا تمام شود stream بسته میشود
  uploadStream.end();

  // دریافت اطلاعات آپلود برای بررسی درصد پیشرفت
  uploadStream.on('data', (res) => {
    const uploadInfo = res.getUploadInfo();
    if (uploadInfo) {
      const totalReceived: number = uploadInfo.getTotalReceived();
      const progress: number = Math.floor((totalReceived / fileSize) * 100);
      const ticketId = ticketResponse.getTicketId();
      console.log('Progress:', progress);
      progressStore[ticketId] = progress;
    }
  });

  // نوشتن لاگ برای بررسی ارور دریافت شده
  uploadStream.on('error', (err: Error) => {
    console.error('Upload error:', err.message);
  });

  // نوشتن لاگ برای اینکه نشون بدیم آپلود تمام شده
  uploadStream.on('end', () => {
    console.log('Upload Completed.');
  });

  // در آخر اطلاعاتی مثل ticketId , fileId , progress مربوط به آپلود رو به عنوان response به client میدیم
  return new Response(
    JSON.stringify({
      message: 'Upload started.',
      ticketId: ticketResponse.getTicketId(),
      fileId: ticketResponse.getFileId(),
    }),
    { status: 200 }
  );
}

// تابع دریافت درصد پیشرفت upload با درخواست به url که شامل ticketId همون فایل درحال آپلود هستش هستش.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticketId');

  if (!ticketId || !(ticketId in progressStore)) {
    return NextResponse.json({ error: 'Invalid ticketId or progress not found.' }, { status: 400 });
  }

  const progress = progressStore[ticketId];
  return NextResponse.json({ progress });
}
