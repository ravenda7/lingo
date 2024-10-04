"use client"
import dynamic from 'next/dynamic';
import footer from '@/public/footer1.json';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const Footer = () => {
    const [isPlaying, setIsPlaying] = useState(true);

  const onAnimationComplete = () => {
    setIsPlaying(false); 
  };

  const t = useTranslations("HomePage");
    return (
      <>
        <footer className="w-full h-16 flex flex-col gap-y-[-10px]">
            <Lottie
            autoPlay={isPlaying}
            loop={!isPlaying}
            animationData={footer}
            onComplete={onAnimationComplete} 
            className='border-hero border-b-4'
            />
            <div className='bg-hero border-hero border-t-2 pt-10 pb-5'>
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Image src="icon.svg" alt='logo' width={50} height={50} />
                    <span className="ml-3 text-xl font-pacifico font-footer">Lingo</span>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-sm text-lcolor">{t("footer0")}</p>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-fcolor font-extrabold hover:text-white">{t("footer1")}</a>
                    <a href="#" className="text-fcolor font-extrabold hover:text-white">{t("footer2")}</a>
                    <a href="#" className="text-fcolor font-extrabold hover:text-white">{t("footer3")}</a>
                  </div>
                </div>
            </div>
        </footer>
        </>
    );
}

