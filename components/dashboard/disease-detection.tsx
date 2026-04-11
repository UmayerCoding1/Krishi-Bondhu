'use client'
import React, { useState, useEffect } from 'react'
import { Header, HeaderDescription, HeaderTitle } from '../header'
import { Camera, CircleCheck, FileUp, Funnel, X } from 'lucide-react'
import { AppButton } from '../app-button'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDiseaseStore } from '@/store/useDiseaseStore'
import { AnimatePresence } from 'motion/react'
import { AiAlert } from './ai-alert'

export const DiseaseDetectionPage = () => {
    const { diseaseResult, imagePreview, showDiseaseResult, setDiseaseData, clearDiseaseData, lastUpdated } = useDiseaseStore();
    const [image, setImage] = useState<File | null>(null);


    const isShowAiAlert = sessionStorage.getItem('isShowDiseaseDetectionAlert');
    const [isShowSiteInfo, setIsShowSiteInfo] = useState(isShowAiAlert ? false : true);
    // Initial check for expiration and image preview sync
    useEffect(() => {
        if (lastUpdated) {
            const now = Date.now();
            const expirationTime = 30 * 60 * 1000; // 30 minutes in ms
            if (now - lastUpdated > expirationTime) {
                clearDiseaseData();
                toast.info("ফলাফলের সময় শেষ হয়ে গেছে। আবার চেষ্টা করুন।");
            }
        }
    }, [lastUpdated, clearDiseaseData]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                // We set the preview locally first, but it will be persisted once detected
                // However, the user might expect the preview to persist even before detection?
                // The request says "data don't remove", usually referring to the result.
                // If I want to persist preview before detection, I'd need another action.
                // For now, let's keep it simple: persistent once detected.
                // But wait, the preview is used in the UI.
                // Let's use a local state for the preview of the NEWLY uploaded image
                // and fall back to the store's preview if no new image is selected.
                setLocalPreview(previewUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const displayPreview = localPreview || imagePreview;

    const handleDiseaseResult = async () => {
        try {
            if (!image) return;

            const formData = new FormData();
            formData.append('disease_crop', image);

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/disease/detect`,
                formData
            );

            if (result.data.success) {
                let rawData = result.data.data;

                let parsedData;

                try {

                    if (typeof rawData === "string") {
                        const cleanString = rawData
                            .replace(/```json/g, '')
                            .replace(/```/g, '')
                            .trim();

                        parsedData = JSON.parse(cleanString);
                    } else {

                        parsedData = rawData;
                    }

                    setDiseaseData(parsedData, localPreview || "");
                    toast.success(result.data.message || "রোগ শনাক্ত করা হয়েছে");
                } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                    toast.error("ডাটা parse করতে সমস্যা হয়েছে");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("রোগ শনাক্ত করা যায়নি");
        }
    };

    console.log(diseaseResult)
    return (
        <div className='w-full h-full flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <Header className='my-0'>
                    <HeaderTitle>রোগ শনাক্তকরণ</HeaderTitle>
                    <HeaderDescription>
                        আপনার ফসলের আক্রান্ত অংশের ছবি তুলুন। আমাদের এআই নিমিষেই রোগ শনাক্ত করে সমাধানের পথ দেখাবে।
                    </HeaderDescription>
                </Header>

                <div className='flex items-center gap-2 w-32 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full'>
                    <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                    <p className='text-sm text-neutral-800 dark:text-neutral-300 font-medium mt-0.5'>সিস্টেম সক্রিয়</p>
                </div>
            </div>

            <div className=' w-full min-h-screen  flex gap-5 items-center justify-center  rounded-xl border border-neutral-300 dark:border-neutral-600'>
                <div className='border  border-neutral-300 dark:border-neutral-600 p-3 bg-white dark:bg-neutral-800 shadow-md rounded-lg w-[400px] relative min-h-[400px] flex flex-col group'>
                    <div className='flex items-center gap-2 my-2'>
                        <FileUp size={13} />
                        <p className='text-xl font-medium mt-0.5'>ছবি আপলোড করুন</p>
                    </div>
                    <Camera size={40} strokeWidth={1.5} className='absolute right-3 top-8 text-neutral-500 dark:text-neutral-400 z-10  ' />
                    <label htmlFor='crop-image' className='bg-[#F7FAF5] dark:bg-neutral-700 w-full h-full flex-1  flex flex-col gap-3 items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl z-20 hover:z-0 relative'>
                        {displayPreview ? <div className='w-full h-[70%] p-10 '>
                            <img
                                src={displayPreview}
                                alt=""
                                className="w-full h-full object-cover rounded-2xl"
                            />
                            <Button variant={'destructive'} className='absolute right-3 top-3' onClick={() => { setImage(null); setLocalPreview(null); clearDiseaseData() }}><X /></Button>
                            <AppButton onClick={() => handleDiseaseResult()} className='w-full mt-5'>শনাক্ত করুন</AppButton>
                        </div> : <div className='w-full h-full flex items-center justify-center flex-col gap-3'>
                            <div className='w-16 h-16 p-3 rounded-full bg-[#3d7c12a7] flex items-center justify-center'>
                                <Camera className='text-[#224a07] dark:text-white group-hover:scale-105 transition-all duration-200' />

                            </div>
                            <p className='text-sm text-neutral-500 dark:text-neutral-300'>অথবা আপনার ফাইল থেকে নির্বাচন করুন</p>
                            <AppButton onClick={() => document.getElementById('crop-image')?.click()}>
                                ফাইল নির্বাচন করুন
                            </AppButton>
                        </div>}
                        <input type="file" onChange={handleImageUpload} accept="image/*" name="" id="crop-image" className='hidden' />
                    </label>
                </div>

                {showDiseaseResult && <div className='border  border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-md rounded-lg w-[400px] relative min-h-[400px] h-[400px] flex flex-col group overflow-hidden'>
                    <DiseaseResult diseaseResult={diseaseResult} />
                </div>}
            </div>
            <AnimatePresence>
                {isShowSiteInfo && (
                    <AiAlert setIsShowSiteInfo={setIsShowSiteInfo} sessionName='isShowDiseaseDetectionAlert' />
                )}
            </AnimatePresence>
        </div>
    )
}


const DiseaseResult = ({ diseaseResult }: { diseaseResult: any }) => {
    return (
        <div className='bg-[#2D5A27] w-full h-full p-4 text-[#9DD090] flex flex-col gap-10'>

            <div className='flex items-center justify-between w-full'>
                <div>

                    <h2 className='text-lg text-[#9DD090] font-medium tracking-tight'>শনাক্তকৃত ফলাফল</h2>
                    <h1 className='text-4xl font-semibold text-[#9DD090]'>{diseaseResult?.disease}</h1>
                </div>
                <div className='bg-[#5A7D55] p-3 rounded-lg flex flex-col items-center'>
                    <p className='text-4xl font-semibold text-[#9DD090]'>{diseaseResult?.Accuracy}%</p>
                    <p className='text-lg text-[#9DD090] font-medium tracking-tight'>নির্ভুলতা</p>
                </div>
            </div>

            <div className=' mt-5 bg-[#5A7D55] p-3 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <div className='bg-[#a1ef8d6c] p-3 rounded-lg text-[#9DD090] '>
                        <div><Funnel className='fill-[#96f080] border-none text-[#96f080] rotate-180' /></div>
                    </div>
                    <div>
                        <p className='text-xl font-semibold'>প্রস্তাবিত সমাধান</p>
                        {/* <h2 className='text-2xl font-semibold'> ছত্রাকনাশক প্রয়োগ</h2> */}
                    </div>
                </div>

                <div className='mt-5'>
                    <div className='my-3 flex items-start gap-2'>
                        <CircleCheck />
                        <div>
                            <p className='text-lg font-medium'>রাসায়নিক সমাধান</p>
                            <p className='text-sm text-white'>{diseaseResult?.solution?.chemical}</p>
                        </div>
                    </div>
                    <div className='my-3 flex items-start gap-2'>
                        <CircleCheck />
                        <div>
                            <p className='text-lg font-medium'>জৈব সমাধান</p>
                            <p className='text-sm text-white'>{diseaseResult?.solution?.organic}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}