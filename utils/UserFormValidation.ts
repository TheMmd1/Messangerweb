'use client';
import { useTranslation } from 'react-i18next';

const useValidationRules = () => {
  const { t } = useTranslation();

  const getValidationRules = (name: string) => {
    switch (name) {
      case 'phoneNumber':
        return {
          required: t('phoneNumberValidationText.required'),
          pattern: {
            value: /^9[0-9]{9}$/,
            message: t('phoneNumberValidationText.pattern'),
          },
        };
      case 'password':
        return {
          required: t('passwordValidationText.required'),
          minLength: {
            value: 8,
            message: t('passwordValidationText.minLength'),
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            message: t('passwordValidationText.pattern'),
          },
        };
      case 'email':
        return {
          required: t('emailValidationText.required'),
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: t('emailValidationText.pattern'),
          },
        };
      case 'first_name':
        return {
          required: t('first_nameValidationText.required'),
          minLength: {
            value: 1,
            message: t('first_nameValidationText.minLength'),
          },
        };
      default:
        return {};
    }
  };

  return { getValidationRules };
};

export default useValidationRules;
