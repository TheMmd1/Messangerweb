import { MessageFormatTypes } from '@/store/slices/AccountInformationSlice';

const AudioType = ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma'];
const VideoType = ['mp4', 'mpeg', 'mkv', 'avi', 'mov', 'flv', 'webm', 'wmv', 'm4v', 'mpeg', 'quicktime', 'x-msvideo', 'x-matroska', 'webm'];
const ImagesType = ['jpeg', 'svg+xml', 'png', 'svg', 'webp', 'jpg', 'gif', 'bmp', 'tiff'];
const FilesType = [
  'aaa',
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'txt',
  'zip',
  'rar',
  '7z',
  'csv',
  'msword',
  'vnd.openxmlformats-officedocument.wordprocessingml.document',
  'vnd.ms-excel',
  'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'vnd.ms-powerpoint',
  'vnd.openxmlformats-officedocument.presentationml.presentation',
  'rtf',
  'plain',
  'vnd.oasis.opendocument.text',
  'vnd.oasis.opendocument.spreadsheet',
  'zip',
  'gzip',
  'x-rar-compressed',
  'x-7z-compressed',
  'x-tar',
  'json',
  'xml',
  'javascript',
  'html',
  'x-msdownload',
  'octet-stream',
  'vnd.android.package-archive',
  'css',
  'x-python',
  'x-httpd-php',
  'x-sh',
];

export const isImage = (type: string) => ImagesType.some((item) => item === type);
export const isVideo = (type: string) => VideoType.some((item) => item === type);
export const isFile = (type: string) => FilesType.some((item) => item === type);
export const isAudio = (type: string) => AudioType.some((item) => item === type);

export function MessagesType(type: string, format: MessageFormatTypes) {
  switch (type) {
    case 'image':
      return ImagesType.some((item) => item === format?.medias?.format);
    case 'video':
      return VideoType.some((item) => item === format?.medias?.format);
    case 'files':
      return FilesType.some((item) => item === format?.files?.format);
    case 'audio':
      return AudioType.some((item) => item === format?.audios?.format);
    case 'text':
      return format?.message;
    default:
      break;
  }
}

export const getMessageTypeText = (message: MessageFormatTypes): string => {
  switch (true) {
    case MessagesType('image', message):
      return 'عکس';
    case MessagesType('video', message):
      return 'ویدیو';
    case MessagesType('file', message):
      return 'فایل';
    case MessagesType('audio', message):
      return 'موزیک';
    default:
      return message?.message || 'فایل';
  }
};

// دریافت زمان فعلی
export const currentTime = Math.floor(Date.now() / 1000);

export const mimeTypeToReadable = (mimeType: string): string => {
  const mimeMapping: { [key: string]: string } = {
    // اسناد
    'application/pdf': 'PDF Document',
    'application/msword': 'Microsoft Word Document (Legacy)',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Microsoft Word Document',
    'application/vnd.ms-excel': 'Microsoft Excel Spreadsheet (Legacy)',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Microsoft Excel Spreadsheet',
    'application/vnd.ms-powerpoint': 'Microsoft PowerPoint Presentation (Legacy)',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'Microsoft PowerPoint Presentation',
    'application/rtf': 'Rich Text Format Document',
    'text/plain': 'Plain Text File',
    'application/vnd.oasis.opendocument.text': 'OpenDocument Text Document',
    'application/vnd.oasis.opendocument.spreadsheet': 'OpenDocument Spreadsheet',

    // تصاویر
    'image/jpeg': 'JPEG Image',
    'image/png': 'PNG Image',
    'image/gif': 'GIF Image',
    'image/bmp': 'BMP Image',
    'image/webp': 'WebP Image',
    'image/svg+xml': 'SVG Vector Image',
    'image/tiff': 'TIFF Image',

    // ویدیوها
    'video/mp4': 'MP4 Video',
    'video/mpeg': 'MPEG Video',
    'video/quicktime': 'QuickTime Video',
    'video/x-msvideo': 'AVI Video',
    'video/x-matroska': 'MKV Video',
    'video/webm': 'WebM Video',

    // صوت‌ها
    'audio/mpeg': 'MP3 Audio',
    'audio/ogg': 'OGG Audio',
    'audio/wav': 'WAV Audio',
    'audio/x-aac': 'AAC Audio',
    'audio/webm': 'WebM Audio',

    // آرشیو و فشرده‌سازی
    'application/zip': 'ZIP Archive',
    'application/x-tar': 'TAR Archive',
    'application/x-7z-compressed': '7-Zip Archive',
    'application/x-rar-compressed': 'RAR Archive',
    'application/gzip': 'GZIP Archive',

    // JSON و XML
    'application/json': 'JSON File',
    'application/xml': 'XML File',
    'text/xml': 'XML File',

    // کد و اسکریپت‌ها
    'text/javascript': 'JavaScript File',
    'application/javascript': 'JavaScript File',
    'text/html': 'HTML File',
    'text/css': 'CSS File',
    'application/x-sh': 'Shell Script',
    'application/x-python': 'Python Script',
    'application/x-httpd-php': 'PHP Script',

    // فایل‌های خاص
    'application/x-msdownload': 'Windows Executable File',
    'application/octet-stream': 'Binary File',
    'application/vnd.android.package-archive': 'Android APK File',
  };

  return mimeMapping[mimeType] || 'Unknown File Type';
};

export function processMessageType(mimeType?: string, fileId?: string, fileName?: string, text?: string) {
  const messageStructure = {
    message: '',
    files: { format: '', file_id: '', file_name: '' },
    medias: { format: '', file_id: '', file_name: '' },
    audios: { format: '', file_id: '', file_name: '' },
  };

  switch (true) {
    case ImagesType.includes(mimeType!):
      messageStructure.medias = { format: mimeType!, file_id: fileId!, file_name: fileName! };
      break;
    case VideoType.includes(mimeType!):
      messageStructure.medias = { format: mimeType!, file_id: fileId!, file_name: fileName! };
      break;
    case FilesType.includes(mimeType!):
      messageStructure.files = { format: mimeType! || '', file_id: fileId!, file_name: fileName! };
      break;
    case AudioType.includes(mimeType!):
      messageStructure.audios = { format: mimeType!, file_id: fileId!, file_name: fileName! };
      break;
    default:
      messageStructure.message = text!;
      break;
  }
  return messageStructure;
}
// تابع جامع برای تبدیل انواع فایل‌ها به MIME type
export function getMimeType(fileExtension: string): string {
  const mimeTypes: Record<string, string> = {
    // تصاویر
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    tiff: 'image/tiff',
    ico: 'image/vnd.microsoft.icon',

    // ویدیوها
    mp4: 'video/mp4',
    webm: 'video/webm',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
    flv: 'video/x-flv',
    mpeg: 'video/mpeg',

    // موسیقی و صدا
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    flac: 'audio/flac',
    aac: 'audio/aac',

    // اسناد
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    csv: 'text/csv',
    json: 'application/json',
    xml: 'application/xml',

    // آرشیوها
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    tar: 'application/x-tar',
    gz: 'application/gzip',

    // دیگر موارد
    exe: 'application/x-msdownload',
    dmg: 'application/x-apple-diskimage',
    iso: 'application/x-iso9660-image',
    swf: 'application/x-shockwave-flash',
    eot: 'application/vnd.ms-fontobject',
    otf: 'font/otf',
    ttf: 'font/ttf',
    woff: 'font/woff',
    woff2: 'font/woff2',
  };

  // مقدار پیش‌فرض برای فایل‌های ناشناخته
  return mimeTypes[fileExtension?.toLowerCase()] || 'application/octet-stream';
}

export function getBlobSize(blob: Blob, unit: 'B' | 'KB' | 'MB' = 'KB'): number {
  const sizeInBytes = blob.size; // سایز Blob به بایت
  switch (unit) {
    case 'KB':
      return parseFloat((sizeInBytes / 1024).toFixed(2)); // تبدیل به کیلوبایت
    case 'MB':
      return parseFloat((sizeInBytes / (1024 * 1024)).toFixed(2)); // تبدیل به مگابایت
    default:
      return sizeInBytes; // به بایت
  }
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const isDarkColor = (hex: string) => {
  if (!hex) return false;

  // حذف # از ابتدای رنگ در صورت وجود
  hex = hex.replace(/^#/, '');

  // تبدیل به مقادیر R, G, B
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // محاسبه روشنایی رنگ (Luminance)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // اگر مقدار کمتر از 0.5 باشد، یعنی رنگ تیره است
  return luminance < 0.5;
};

// تایع بررسی ارتفاع برای input چت
export const autoResize = () => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.target.style.height = 'auto';
  e.target.style.height = `${e.target.scrollHeight}px`;
};
