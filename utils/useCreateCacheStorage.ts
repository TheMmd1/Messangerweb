import { mimeTypeToReadable } from './publicFunctions';

const urlCache = new Map<string, string>();

// --------------------------------------------برای ذخیره مدیا از کش--------------------------------------------
export async function saveImageToCache(fileId?: string, fileBuffer?: Buffer, fileType?: string, cacheStorageName?: string) {
  const cacheName = `${cacheStorageName}-cache`;
  const cache = await caches.open(cacheName);

  if (!fileId || !fileBuffer) return;

  // محاسبه سایز فایل
  const fileSize = fileBuffer.byteLength;

  // ساخت Blob از buffer
  const blob = new Blob([fileBuffer], { type: fileType! });

  // ساخت URL کامل
  const requestUrl = `/${cacheStorageName}/${fileId}`;

  console.log(mimeTypeToReadable(fileType!));
  // ایجاد هدرها و تنظیم Content-Length
  const headers = new Headers({
    'Content-Type': fileType!,
    'Content-Length': fileSize?.toString(),
  });

  // ذخیره در Cache Storage
  const request = new Request(requestUrl);
  const response = new Response(blob, { headers });
  await cache.put(request, response);
  console.log('Media saved to cache with Content-Length:', fileSize);

  // مدیریت URL ایجادشده
  if (urlCache.has(fileId)) {
    URL.revokeObjectURL(urlCache.get(fileId)!);
  }
  const newUrl = URL.createObjectURL(blob);
  urlCache.set(fileId, newUrl);

  return { url: newUrl, size: fileSize };
}

// --------------------------------------------برای دریافت مدیا از کش--------------------------------------------
export async function getImageFromCache(fileId?: string, cacheStorageName?: string): Promise<string | null> {
  const cacheName = `${cacheStorageName}-cache`;
  const cache = await caches.open(cacheName);

  if (!fileId) return null;

  // چک کردن اگر تصویر در Cache Storage موجود باشد
  const requestUrl = `/${cacheStorageName}/${fileId}`;
  const cachedResponse = await cache.match(requestUrl);

  if (cachedResponse) {
    // ایجاد URL برای نمایش تصویر
    // if (!urlCache.has(fileId)) {
    const blob = await cachedResponse.blob();
    const newUrl = URL.createObjectURL(blob);
    urlCache.set(fileId, newUrl);
    // }
    return urlCache.get(fileId)!;
  } else {
    console.log('media not found in cache:', fileId);
    return null;
  }
}

// // تابع پاکسازی URLهای ذخیره‌شده (اختیاری)
// export function clearCachedUrls() {
//   for (const [fileId, objectUrl] of urlCache.entries()) {
//     URL.revokeObjectURL(objectUrl);
//     urlCache.delete(fileId);
//   }
//   console.log('All cached URLs cleared.');
// }
// --------------------------------------------برای حذف مدیا از کش--------------------------------------------
export async function removeImageFromCache(fileId: string): Promise<boolean> {
  const cacheName = 'medias-cache';
  const cache = await caches.open(cacheName);

  // ساخت URL کامل
  const requestUrl = `/medias/${fileId}`;

  // حذف فایل از Cache Storage
  const isDeleted = await cache.delete(requestUrl);
  if (isDeleted) {
    console.log('media removed from cache:', requestUrl);
    // حذف URL از urlCache
    if (urlCache.has(fileId)) {
      URL.revokeObjectURL(urlCache.get(fileId)!);
      urlCache.delete(fileId);
    }
  } else {
    console.log('media not found in cache to remove:', requestUrl);
  }
  return isDeleted;
}
