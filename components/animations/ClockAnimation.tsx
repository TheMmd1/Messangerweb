// کانپوننت نمایش یه انیمیشن ساعت برای نشون دادن فایل درحال آپلود

import React from 'react';
import Lottie from 'lottie-react'; // استفاده از پکیج lottie برای نمایش انیمیشن
import animationData from '@/public/animation/clockLoading.json';

const LottieAnimation = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} style={{ width: 20, height: 20 }} />
    </div>
  );
};

export default LottieAnimation;
