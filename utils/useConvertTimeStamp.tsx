export default function UseConvertTimeStamp({ timestamp }: { timestamp?: number }) {
  const date = new Date(timestamp! * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return <p className="text-[11px] text-[#ACACAC]">{formattedTime}</p>;
}
