'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { EventIDs } from '@/Services/EventIDs';
import { Input } from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useValidationRules from '@/utils/UserFormValidation';
import { useWebSocketContext } from '@/Services/MainWebsocket';
import { Profile, setProfileData } from '@/store/slices/AccountInformationSlice';
import SetProfileImageDialog from '@/components/Dialogs/SetProfileImageDialog/Index';
import { DetailType } from '../ChatSection/Index';
import { getImageFromCache } from '@/utils/useCreateCacheStorage';
import { getRandomColor, isDarkColor } from '@/utils/publicFunctions';

// بخش اضافه کردن تایپ ها
interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
}
interface HandleImageFunctionProps {
  (event: ChangeEvent<HTMLInputElement>): void;
}

export default function Index() {
  // اضافه کردن state ها و سایر tools ها
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { socket } = useWebSocketContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [randomBg, setRandomBg] = useState<{ color: string; bg: string }>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFromCache, setImageFromCache] = useState<string>();
  const { getValidationRules } = useValidationRules();
  const [uploadDetail, setUploadDetail] = useState<DetailType>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { self_profile } = useSelector((state: { accountInfo: { self_profile: Profile } }) => state.accountInfo);

  const handleImageFunction: HandleImageFunctionProps = ({ target: { files } }) => {
    const file = files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setOpen(true);
    };
    reader.readAsDataURL(file);
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  const { handleSubmit, control, getValues } = useForm<FormData>({
    mode: 'onChange',
  });

  // آرایه برای loop زدن و نمایش آن در ui
  const inputs = [
    {
      name: 'first_name',
      title: t('first_name'),
      default: self_profile.first_name || '',
    },
    {
      name: 'last_name',
      title: t('last_name'),
      default: self_profile.last_name || '',
    },
    {
      name: 'username',
      title: t('username'),
      default: self_profile.username || '',
    },
    { name: 'bio', title: t('bio'), default: self_profile.bio || '' },
  ] as const;

  // تابع آپدیت پروفایل
  function UpdateProfile(data: FormData) {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: EventIDs.UPDATE_PROFILE,
          data: data,
        })
      );
    }
  }

  // تابع ارسال و بررسی پروفایل کاربر
  const handleSendUserInformation = (data: FormData) => {
    const updateData = { ...data, avatar: uploadDetail?.fileId };
    UpdateProfile(updateData);
    dispatch(
      setProfileData({
        avatar: uploadDetail?.fileId,
        first_name: data.first_name || self_profile.first_name,
        last_name: data.last_name || self_profile.last_name,
        bio: data.bio || self_profile.bio,
        username: data.username || self_profile.username,
      })
    );
    router.push('/home');
  };

  useEffect(() => {
    (async () => {
      const getImageProfile = await getImageFromCache(self_profile.avatar!, 'assets');
      setImageFromCache(getImageProfile!);
    })();
  }, [self_profile]);

  useEffect(() => {
    const randColor = getRandomColor();
    const textColor = isDarkColor(randColor) ? 'text-white' : 'text-black';
    setRandomBg({ bg: randColor, color: textColor });
  }, []);

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-MainBgTwo font-YekanBakhFaNum">
      <div className="relative flex w-[90%] flex-col items-center rounded-[10px] bg-gradient-to-r from-[#71cfa4] to-[#38a271] p-5 shadow-xl sm:w-[35%] sm:max-w-[50%]">
        <div className="font-IranYekanBold relative mb-6 flex h-[10dvw] w-[10dvw] items-center justify-center rounded-full bg-MainBgOne">
          {imageFromCache || imageUrl! ? (
            <Image
              width={80}
              height={80}
              className="h-full w-full cursor-pointer rounded-full object-cover object-top"
              src={imageUrl! || imageFromCache! || ''}
              priority={false}
              alt="icon image"
            />
          ) : (
            <div
              style={{ backgroundColor: `${randomBg?.bg}` }}
              className={`flex h-full w-full items-center justify-center rounded-full text-[40px] ${randomBg?.color}`}
            >
              {getValues('first_name')?.charAt(0) || self_profile.first_name?.charAt(0)}
            </div>
          )}
          <label
            // onClick={() => setOpen(true)}
            className="absolute bottom-0 right-0 flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-[3px] border-MainBgTwo bg-MainBgThree"
          >
            <input ref={inputRef} className="h-full w-full" hidden type="file" accept="image/*" onChange={handleImageFunction} />
            <Image width={20} height={20} alt="" src="/svg/homePage/NewAccount/Path 54014.svg" />
          </label>
        </div>
        <div className="w-full flex-1 sm:w-[80%]">
          {inputs.map((item, index) => (
            <div key={index} id="profile_form" className="mb-7 flex w-full flex-col items-center lg:flex-row">
              <Controller
                name={item.name as keyof FormData}
                control={control}
                rules={getValidationRules(item.title)}
                render={({ field }) => (
                  <Input
                    variant="standard"
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    defaultValue={item.default}
                    autoComplete="off"
                    {...field}
                    label={item.title}
                    className={`w-full flex-1 border-white bg-MainBgOne px-3 py-2 pr-[20px] !text-black placeholder:text-white sm:text-[1.1rem] [&>*]:!text-white ${item.name === 'username' && 'lowercase'}`}
                    type="text"
                  />
                )}
              />
            </div>
          ))}
          <button onClick={handleSubmit(handleSendUserInformation)} className="w-[100px] self-start rounded-full bg-MainBgOne p-3 text-MainBgThree">
            {t('confirm')}
          </button>
        </div>
      </div>
      <SetProfileImageDialog setUploadDetail={setUploadDetail} setImageUrl={setImageUrl} open={open} setOpen={setOpen} image={selectedImage} />
    </div>
  );
}
