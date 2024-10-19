"use client";

import dynamic from 'next/dynamic';
import Dog from "@/public/exitModal.json";
import { useRouter } from "@/navigation";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";
import { useTranslations } from 'next-intl';


const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
export const ExitModal = () => {
    const t = useTranslations("exitModal");
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

    if(!isClient) {
        return null;
    };
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <div className='w-[150px] h-[120px]'>
                        <Lottie
                            autoPlay={true}
                            loop={true}
                            animationData={Dog}
                            onComplete={null} 
                        />
                        </div>
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        {t("phase1")}
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        {t("phase2")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full"
                            size="lg"
                            onClick={close}
                        >
                            {t("continueButton")}
                        </Button>
                        <Button
                            variant="dangerOutline"
                            className="w-full"
                            size="lg"
                            onClick={() => {
                                close();
                                router.push("/learn");
                            }}
                        >
                            {t("exitButton")}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};