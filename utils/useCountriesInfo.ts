import { useState } from 'react';
import { SingleValue } from 'react-select';

interface CountryOption {
  value: string;
  label: string;
  code?: string;
}

interface CountryCodeOption {
  value: string;
  label: string;
  name: string;
}
export interface FormData {
  email: string;
  phoneNumber: string;
}
export interface SignInResponse {
  success?: boolean;
  data: string;
}

function useCountriesInfo() {
  const [selectedLang, setSelectedLang] = useState<string>('ایران');
  const [countryCode, setCountryCode] = useState<string | null>('+98');

  // Country and country code options for the select fields
  const CountryName = [
    { value: 'ایران', label: 'ایران(98+)', code: '+98' },
    { value: 'چین', label: 'چین(86+)', code: '+86' },
    { value: 'آلمان', label: 'آلمان(49+)', code: '+49' },
    { value: 'فرانسه', label: 'فرانسه(33+)', code: '+33' },
    { value: 'ژاپن', label: 'ژاپن(81+)', code: '+81' },
    { value: 'هند', label: 'هند(91+)', code: '+91' },
    { value: 'استرالیا', label: 'استرالیا(61+)', code: '+61' },
    { value: 'بریتانیا', label: 'بریتانیا(44+)', code: '+44' },
    { value: 'روسیه', label: 'روسیه(7+)', code: '+7' },
    { value: 'کانادا', label: 'کانادا(1+)', code: '+1' },
    { value: 'مکزیک', label: 'مکزیک(52+)', code: '+52' },
  ];

  const CountryCode = [
    { value: '+98', label: '+98', name: 'ایران' },
    { value: '+86', label: '+86', name: 'چین' },
    { value: '+49', label: '+49', name: 'آلمان' },
    { value: '+33', label: '+33', name: 'فرانسه' },
    { value: '+81', label: '+81', name: 'ژاپن' },
    { value: '+91', label: '+91', name: 'هند' },
    { value: '+61', label: '+61', name: 'استرالیا' },
    { value: '+44', label: '+44', name: 'بریتانیا' },
    { value: '+7', label: '+7', name: 'روسیه' },
    { value: '+1', label: '+1', name: 'کانادا' },
    { value: '+52', label: '+52', name: 'مکزیک' },
  ];

  // Function to handle country and code selection changes
  function handleCountryChange(selected: SingleValue<CountryOption | CountryCodeOption>, type: 'country' | 'code') {
    if (type === 'country') {
      const selectedCountry = CountryName.find((option) => option.value === selected?.value);
      setSelectedLang(selectedCountry?.value || '');
      setCountryCode(selectedCountry?.code || '');
    } else if (type === 'code') {
      const selectedCode = CountryCode.find((option) => option.value === selected?.value);
      setCountryCode(selectedCode?.value || '');
      setSelectedLang(selectedCode?.name || '');
    }
  }

  return {
    countryCode,
    selectedLang,
    handleCountryChange,
    CountryName,
    CountryCode,
  };
}

export default useCountriesInfo;
