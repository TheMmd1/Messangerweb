import { Dialog } from '@material-tailwind/react';
import { Dispatch, SetStateAction } from 'react';

interface ImageDialogProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  imageUrl: string;
}

export default function Index({ open, setOpen, imageUrl }: ImageDialogProp) {
  return (
    <div>
      <Dialog      
        size="md"
        open={open}
        handler={setOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="h-[50%] md:w-[70%] w-[80%] bg-transparent shadow-none" 
      >
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          className="h-full w-full bg-contain bg-center bg-no-repeat"
        ></div>
      </Dialog>
    </div>
  );
}
