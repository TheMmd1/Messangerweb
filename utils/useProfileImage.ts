'use client';

import { ChangeEvent, useState } from 'react';

const useProfileImage = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setSelectedImage(base64data);
        // Store image with account type key
      };
      reader.readAsDataURL(file);
    }
  };

  return { selectedImage, handleImageChange };
};

export default useProfileImage;
