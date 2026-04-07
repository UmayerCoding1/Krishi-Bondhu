'use client'
import React from 'react'
import { Header, HeaderDescription, HeaderTitle } from '../header'
import { Camera, FileUp, X } from 'lucide-react'
import { AppButton } from '../app-button'
import { Button } from '../ui/button'

export const DiseaseDetectionPage = () => {
    const [image, setImage] = React.useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
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

            <div className=' w-full flex-1  flex items-center justify-center  rounded-xl border border-neutral-300 dark:border-neutral-600'>
                <div className='border  border-neutral-300 dark:border-neutral-600 p-3 bg-white dark:bg-neutral-800 shadow-md rounded-lg w-[400px] relative h-[400px] flex flex-col group'>
                    <div className='flex items-center gap-2 my-2'>
                        <FileUp size={13} />
                        <p className='text-xl font-medium mt-0.5'>ছবি আপলোড করুন</p>
                    </div>
                    <Camera size={40} className='absolute right-3 top-8 text-neutral-500 dark:text-neutral-400 z-10  ' />
                    <label htmlFor='crop-image' className='bg-[#F7FAF5] dark:bg-neutral-700 w-full h-full flex-1  flex flex-col gap-3 items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl z-20 hover:z-0'>
                        {image ? <div className='w-full h-[70%] '>
                            <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover rounded-2xl"
                            />
                            <Button variant={'destructive'} className='absolute right-3 top-3' onClick={() => setImage(null)}><X /></Button>
                        </div> : <div className='w-full h-full flex items-center justify-center flex-col gap-3'>
                            <div className='w-16 h-16 p-3 rounded-full bg-[#3d7c12a7] flex items-center justify-center'>
                                <Camera className='text-[#224a07] dark:text-white group-hover:scale-105 transition-all duration-200' />

                            </div>
                            <p className='text-sm text-neutral-500 dark:text-neutral-300'>অথবা আপনার ফাইল থেকে নির্বাচন করুন</p>
                            <AppButton>
                                ফাইল নির্বাচন করুন
                            </AppButton>
                        </div>}
                        <input type="file" onChange={handleImageUpload} accept="image/*" name="" id="crop-image" className='hidden' />
                    </label>
                </div>
            </div>
        </div>
    )
}
// ছবি আপলোড করুন