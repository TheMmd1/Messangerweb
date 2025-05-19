'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, Input } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { EventIDs } from '@/Services/EventIDs';
import useCountriesInfo from '@/utils/useCountriesInfo';
import Select from 'react-select';
import useValidationRules from '@/utils/UserFormValidation';

// بخش اضافه کردن تایپ ها
interface CreateContactModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  socket: WebSocket;
}
interface FormData {
  first_name: string;
  last_name: string;
  phoneNumber: string;
}

export function CreateContactModal({ open, setOpen, socket }: CreateContactModal) {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const { getValidationRules } = useValidationRules();
  const { handleCountryChange, CountryCode, countryCode } = useCountriesInfo();
  const [userInformation, setUserInformation] = useState<FormData>({
    first_name: '',
    last_name: '',
    phoneNumber: '',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
    },
  });

  // ignore-prettier
  const inputs = [
    { name: 'first_name', title: t('first_name') },
    { name: 'last_name', title: t('last_name') },
  ] as const;

  // تابع ذخیره چیزی که تایپ میشه
  const handleInputChange = (name: keyof FormData, value: string) => {
    setUserInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // تابع ایجاد کاربر جدید
  const CreateContact = ({ first_name, phoneNumber }: FormData) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: EventIDs.CREATE_CONTACT,
          data: [
            {
              contact_name: first_name,
              contact_value: countryCode?.slice(1) + phoneNumber,
            },
          ],
        })
      );
    }
  };

  // تابع اضافه کردن کاربر جدید
  const addContact = ({ phoneNumber, first_name }: FormData) => {
    if (socket)
      socket.send(
        JSON.stringify({
          event: EventIDs.ADD_CONTACT,
          data: {
            contact_name: first_name,
            contact_value: countryCode?.slice(1) + phoneNumber,
          },
        })
      );
  };

  // تابع گرفتن کاربر های اضافه شده
  const GetContacts = () => {
    if (socket) socket.send(JSON.stringify({ event: EventIDs.GET_CONTACT }));
  };

  // تابع هندل کردن برای ایجاد کاربر
  const handleSubmitForm = (data: FormData) => {
    CreateContact(data);
    addContact(userInformation);
    GetContacts();
    reset();
    setOpen(false);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={() => {
          setOpen(false);
          reset();
        }}
        className="bg-white p-4 shadow-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className={`w-full font-YekanBakhFaNum ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}>
          <p className="mx-auto mb-4 w-[80%] font-YekanBakhFaNum text-[17px] font-[600]">{t('create_contact')}</p>
          <div className="mx-auto flex w-full flex-1 flex-col items-start justify-center gap-3 font-YekanBakhFaNum sm:w-[80%]">
            {inputs.map((item, index) => (
              <div className="w-full" key={index}>
                <div className="flex w-full flex-col items-center lg:flex-row">
                  <Controller
                    name={item.name as keyof FormData}
                    control={control}
                    rules={getValidationRules(item.name)}
                    render={({ field }) => (
                      <Input
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                        variant="standard"
                        color="green"
                        autoComplete="off"
                        {...field}
                        label={item.title}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(item.name as keyof FormData, e.target.value);
                        }}
                        className="w-full flex-1 bg-MainBgOne px-3 py-2 pr-[20px] !text-black"
                        type="text"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
            <div className="flex w-full items-center justify-between gap-5 text-[20px]">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={getValidationRules('phoneNumber')}
                render={({ field }) => (
                  <div className="flex w-full items-center gap-2 !font-YekanBakhFaNum">
                    <Input
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      variant="standard"
                      autoComplete="off"
                      style={{ direction: 'ltr' }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange('phoneNumber', e.target.value);
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                      className="min-h-[38px] w-full border-b border-b-[#38A271] bg-transparent text-center !font-YekanBakhFaNum text-[16px] outline-none xl:text-[1.15rem] xl:placeholder:text-[1.1rem]"
                      autoFocus
                      color="green"
                      label={t('Phone Number')}
                      type="tel"
                    />

                    <span className="w-[35%] border-b border-b-[#38A271]">
                      <Select
                        defaultValue={CountryCode[0]}
                        className="basic-single"
                        classNamePrefix="select"
                        name="Countries"
                        options={CountryCode}
                        onChange={(select) => handleCountryChange(select, 'code')}
                      />
                    </span>
                  </div>
                )}
              />
            </div>
            {errors.phoneNumber && <p className="font-YekanBakhFaNum text-[2dvh] text-red-500 lg:text-[1.5dvh]">{errors.phoneNumber.message}</p>}
            <button
              onClick={handleSubmit(handleSubmitForm)}
              className={`rounded bg-MainBgThree px-[10px] ${t('system_lang') === 'fa' ? 'self-start' : 'self-end'} py-[5px] font-YekanBakhFaNum text-base font-[600] text-white outline-none ${userInformation.first_name === '' || userInformation.phoneNumber === '' ? 'pointer-events-none opacity-55' : ''}`}
            >
              {t('add')}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
