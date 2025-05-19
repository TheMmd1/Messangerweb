'use client';

// کامپوننت loading برای صفحه اصلی
export default function Index({ color }: { color?: string }) {
  return (
    <div className="custom_spinner">
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
      <div style={{ backgroundColor: `${color}` }}></div>
    </div>
  );
}
