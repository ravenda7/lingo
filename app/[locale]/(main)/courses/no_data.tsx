"use client"
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import halt from '@/public/notFoundAnimation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const NoData = () => {

    const [isPlaying, setIsPlaying] = useState(true);

  const onAnimationComplete = () => {
    setIsPlaying(false); 
  };

  const t = useTranslations("errorPage");
    return(
        <div className="h-full max-w-[912px] px-3 mx-auto flex flex-col items-center justify-center">
            <Lottie
                autoPlay={isPlaying}
                loop={!isPlaying}
                animationData={halt}
                onComplete={onAnimationComplete} 
                />
                <h1 className="text-2xl font-bold text-neutral-700 ml-6">
                {t("errorMessage")}
            </h1>
        </div>
    )
}