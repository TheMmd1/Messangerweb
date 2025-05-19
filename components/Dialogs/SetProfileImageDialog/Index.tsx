'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Cropper from 'react-easy-crop';
import html2canvas from 'html2canvas';
import { Dialog } from '@material-tailwind/react';
import { handleSubmitUpload } from '@/Services/grpcApi';
import { DetailType } from '@/components/ChatSection/Index';
import { saveImageToCache } from '@/utils/useCreateCacheStorage';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

// بخش اضافه کردن تایپ ها
interface DeleteDialogProp {
  image: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setImageUrl: Dispatch<SetStateAction<string | undefined>>;
  setUploadDetail: Dispatch<SetStateAction<DetailType | undefined>>;
}

export default function Index({ setImageUrl, open, setOpen, image, setUploadDetail }: DeleteDialogProp) {
  // اضافه کردن state ها و سایر tools ها
  const [zoom, setZoom] = useState(1);
  const cropperRef = useRef<HTMLDivElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const handleSubmit = async () => {
    const cropAreaElement = document.querySelector('.reactEasyCrop_Container') as HTMLElement;
    const cropAreaEl = cropperRef.current?.querySelector('.reactEasyCrop_CropArea') as HTMLElement;
    cropAreaEl.style.opacity = '0';
    try {
      const canvas = await html2canvas(cropAreaElement, {
        backgroundColor: null,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const formData = new FormData();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      formData.append('image', file);
      const newBlob = URL.createObjectURL(file);
      if (newBlob) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const buffer = Buffer.from(arrayBuffer);
          setImageUrl(newBlob);
          handleSubmitUpload(file).then((uploadRes) => {
            setUploadDetail(uploadRes);
            saveImageToCache(uploadRes.fileId, buffer, file.type, 'assets');
          });
        };
      }
      cropAreaEl.style.opacity = '1';
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error('An unknown error occurred');
    }
  };

  return (
    <Dialog
      placeholder=""
      onPointerEnterCapture={[]}
      size={'xs'}
      open={open}
      handler={setOpen}
      className="p-2 sm:p-6"
      onPointerLeaveCapture={undefined}
    >
      <>
        <div ref={cropperRef} className="relative aspect-square w-full">
          <Cropper image={image} crop={crop} zoom={zoom} onCropChange={setCrop} onZoomChange={setZoom} showGrid={false} />
        </div>

        <input
          type="range"
          className="mx-auto my-3 block w-[60%] cursor-pointer"
          value={zoom}
          step={0.1}
          min={1}
          max={3}
          onChange={({ target: { value } }) => setZoom(Number(value))}
        />

        <div className="[&>*]:!text-2xs flex gap-4 [&>*]:h-[40px] [&>*]:flex-1 [&>*]:!p-0">
          <button className="rounded bg-gradient-to-r from-[#71cfa4] to-[#38a271] font-YekanBakhFaNum text-white" onClick={handleSubmit}>
            ثبت و تایید
          </button>
          <button className="rounded border border-[#38a271] font-YekanBakhFaNum text-[#38a271]" onClick={() => setOpen(false)}>
            لغو
          </button>
        </div>
      </>
    </Dialog>
  );
}
