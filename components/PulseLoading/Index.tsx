'use client';

// بخش اضافه کردن تایپ ها
interface PulseLoadingProps {
  width: string;
  height: string;
}

// برای بخش loading
function PulseLoading({ width, height }: PulseLoadingProps) {
  return <div style={{ width: width, height: height }} className="animate-pulse rounded bg-gray-200" />;
}

export default PulseLoading;
