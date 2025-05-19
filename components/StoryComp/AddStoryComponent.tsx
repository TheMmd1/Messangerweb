'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { setAddStoryDialog } from '@/store/slices/AddStorySlice';
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

// بخش اضافه کردن تایپ ها
interface props {
  open: boolean;
}

interface TextData {
  x: number;
  y: number;
  value: string;
}

// رنگ های پسزمینه استوری
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700', '#7B68EE', '#48D1CC', '#FF4500', '#8A2BE2', '#32CD32'];

export default function AddStoryComponent({ open }: props) {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [texts, setTexts] = useState<TextData[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isType, setIsType] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const storyBoxRef = useRef<HTMLDivElement | null>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [inputPosition, setInputPosition] = useState<{ x: number; y: number } | null>(null);

  // اضافه کردن بخش استوری
  const handleDocumentClick = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      handleTextSubmit();
      setIsType(false);
    } else {
      setIsType(true);
    }
  };

  //   تابع بستن استوری
  const handleCloseDialog = () => {
    setTexts([]);
    setInputValue('');
    setInputPosition(null);
    setTimeout(() => {
      dispatch(setAddStoryDialog(false));
    }, 300);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   اضافه کردن تکست برای داخل استوری
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      const rect = storyBoxRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setInputPosition({ x, y });
        setInputValue('');
      }
    }
  };

  //   تابع اضافه کردن بخش تکست
  const handleTextSubmit = () => {
    if (inputValue.trim() && inputPosition) {
      setTexts((prevTexts) => [...prevTexts, { x: inputPosition.x, y: inputPosition.y, value: inputValue }]);
      setInputPosition(null);
    }
  };
  useEffect(() => {
    handleTextSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isType]);

  //   تابع حذف تکست
  const deleteHandler = (value: string) => {
    const updatedTexts = texts.filter((item) => item.value !== value);
    setTexts(updatedTexts);
  };

  //   تابع تغییر پسزمینه
  const handleColorChange = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <Dialog onPointerEnterCapture="" onPointerLeaveCapture="" placeholder="" handler={handleCloseDialog} size="sm" open={open}>
      <div
        className="relative flex h-[90dvh] w-full flex-col items-start transition-all duration-200"
        style={{ backgroundColor: colors[currentColorIndex] }}
      >
        <div ref={storyBoxRef} onClick={handlePageClick} className="relative w-full flex-1">
          {texts.map((text, index) => (
            <Draggable
              key={index}
              bounds="parent"
              defaultClassName="!w-fit text-start"
              position={{ x: -text.x, y: text.y }}
              onDrag={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onStart={(e) => {
                setIsDragging(true);
                e.stopPropagation();
              }}
              onStop={(e, data) => {
                const updatedTexts = texts.map((t, idx) => (idx === index ? { ...t, x: -data.x, y: data.y } : t));
                e.stopPropagation();
                setTexts(updatedTexts);
                setTimeout(() => {
                  setIsDragging(false);
                }, 1000);
              }}
            >
              <div style={{ color: 'white' }} className="relative cursor-move rounded bg-black bg-opacity-70 p-1">
                {text.value}
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHandler(text.value);
                  }}
                  width={25}
                  height={25}
                  src="svg/Story/close-circle.svg"
                  alt=""
                  className="absolute -right-[11px] -top-[0.9rem] cursor-pointer"
                />
              </div>
            </Draggable>
          ))}

          {inputPosition && isType && (
            <input
              onClick={(e) => e.stopPropagation()}
              ref={inputRef}
              type="text"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleTextSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              className={`absolute rounded-lg border border-white bg-transparent p-1 text-center text-white outline-none`}
              style={{
                left: inputPosition.x,
                top: inputPosition.y,
              }}
            />
          )}
        </div>
        <div className="flex w-full items-center justify-between p-5">
          <div onClick={handleCloseDialog} className="flex h-[3vw] w-[3vw] cursor-pointer items-center justify-center rounded-full bg-MainBgThree">
            <Image className="w-[20px]" width={30} height={30} src="svg/homePage/Story/Path 53337.svg" alt="" />
          </div>
          <div className="flex items-center gap-3">
            <span onClick={handleColorChange} className="flex h-[3vw] w-[3vw] cursor-pointer items-center justify-center rounded-full bg-[#0000001a]">
              <Image className="h-[20px] w-[30px]" width={30} height={30} src="svg/homePage/Story/Path 54140.svg" alt="" />
            </span>
            <span className="flex h-[3vw] w-[3vw] cursor-pointer items-center justify-center rounded-full bg-[#0000001a]">
              <Image className="h-[20px] w-[30px]" width={30} height={30} src="svg/homePage/Story/Path 54139.svg" alt="" />
            </span>
            <span className="flex h-[3vw] w-[3vw] cursor-pointer items-center justify-center rounded-full bg-[#0000001a]">
              <Image className="h-[20px] w-[30px]" width={30} height={30} src="svg/homePage/Story/Path 53339.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
