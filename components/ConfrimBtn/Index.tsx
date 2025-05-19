import Image from 'next/image';

// بخش اضافه کردن تایپ ها
interface ConfirmBtnProps {
  onClickFunc: () => void;
  text: string;
  isShowIcon?: boolean;
}

// کامپوننت دکمه بعدی  برای استفاده های مجدد
function ConfirmBtn({ onClickFunc, text, isShowIcon }: ConfirmBtnProps) {
  return (
    <div className="w-full bg-MainBgTwo px-[25px]">
      {/* responsive */}
      <button
        onClick={onClickFunc}
        className="my-3 flex h-[5.5dvh] md:h-[6.5dvh]  w-[30dvw] md:w-[12dvh] items-center justify-evenly rounded-[10px] bg-MainBgThree p-2 text-MainBgOne"
      >
        <Image
          style={{ display: `${isShowIcon ? 'block' : 'none'}` }}
          width={40}
          height={40}
          className="translate-y-[4px] lg:translate-y-[5px] xl:w-[2rem]"
          src="/images/homePage/right-arrow.svg"
          alt=""
        />
        {text}
      </button>
    </div>
  );
}

export default ConfirmBtn;
