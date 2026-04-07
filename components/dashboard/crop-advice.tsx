'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '../container';
import { DashboardContainer } from './dashboard-container';
import { Banknote, CalendarDays, LoaderPinwheel, MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { AppButton } from '../app-button';
import { AiSvg } from '../button/ai-svg';
import { toast } from 'sonner';
import axios from 'axios';
import { translateTextBanglaToEnglish } from '@/lib/convertTextInBangla';
import { CropAdviceSkletone } from './crop-advice-skletone';
import { cn } from '@/lib/utils';
import { SkeletonCard } from '../skeleton-card';
import { div } from 'motion/react-client';
import Image from 'next/image';

export const CropAdvicePage = () => {
    const soilTypesBangladesh = [
        "পলিমাটি (Alluvial Soil)",
        "লাল মাটি (Red Soil)",
        "কালো মাটি (Black Soil)",
        "দোঁআশ মাটি (Loamy Soil)",
        "বেলে মাটি (Sandy Soil)",
        "কাঁদামাটি (Clay Soil)",
        "লবণাক্ত মাটি (Saline Soil)"
    ];


    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [soilType, setSoilType] = useState('');
    const [cropAdvice, setCropAdvice] = useState<any>(null);
    const [bestCrop, setBestCrop] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCropAdviceFrom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log('crop advice form submitted', { location, season, soilType });

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/crop`, { location, season, soil: soilType }, { withCredentials: true });
            console.log(response.data);
            if (response.data.success) {
                const cleanString = response.data.data
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .trim()

                const dataArray = JSON.parse(cleanString);

                console.log(dataArray)
                const cropsWithImages = await Promise.all(
                    dataArray.map(async (crop: any) => {
                        try {
                            const cropNameInEnglish = await translateTextBanglaToEnglish(crop['Crop name English']);
                            console.log(cropNameInEnglish)
                            const unsplashRes = await axios.get(
                                `https://api.unsplash.com/search/photos?query=${cropNameInEnglish}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
                                {
                                    params: {
                                        query: cropNameInEnglish,
                                        orientation: 'landscape',
                                    },
                                    headers: {
                                        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
                                    }
                                }
                            )
                            const imageUrl = unsplashRes.data.results[2].urls?.full || ''
                            return { ...crop, image: imageUrl }
                        } catch (error) {
                            console.error('Error fetching image for', crop['Crop name'], error)
                            return { ...crop, image: '' } // fallback empty string
                        }
                    })
                )
                setCropAdvice(cropsWithImages)
                const maxRating = Math.max(...cropsWithImages.map((c: any) => c.Rating))
                const bestCrop = cropsWithImages.find((c: any) => c.Rating === maxRating)
                setBestCrop(bestCrop)
                setLoading(false);
                toast.success('Crop advice form submitted successfully', { position: 'top-right' });
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong');
        }
    }


    console.log(bestCrop);
    console.log(cropAdvice);
    return (

        <DashboardContainer className='bg-secondary/3 min-h-(--dashboard-height) overflow-x-visible font-display'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-8 gap-4'>
                    <div className='col-span-4 flex-1 flex flex-col gap-6 bg-[#F1F4EF] px-5 py-5 rounded-lg dark:bg-neutral-800 shadow-md'>
                        <div className='flex items-center gap-2 '>
                            <div className='bg-[#CAD5C7] w-12 h-14 p-2 rounded-md flex items-center justify-center'>
                                <LoaderPinwheel strokeWidth={1.2} size={20} />
                            </div>
                            <div> <h1 className='text-xl font-semibold tracking-tight'>আপনার জমি নির্বাচন করুন</h1>
                                <p className='text-sm text-muted-foreground tracking-tight'>সঠিক তথ্যের জন্য নিচের ফর্মটি পূরণ করুন</p></div>
                        </div>
                        <div>
                            <form onSubmit={handleCropAdviceFrom} className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='flex items-center gap-2 '><MapPin size={12} /><span className='mt-1 font-semibold'>অবস্থান</span></Label>
                                    <Input value={location} onChange={(e) => setLocation(e.target.value)} required type='text' placeholder='আপনার এলাকার নাম লিখুন' className='bg-white border-none shadow-md h-13 placeholder:text-[12px]' />
                                </div>
                                <div className='flex gap-4 w-full'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <Label className='flex items-center gap-2'><CalendarDays size={12} />ঋতু</Label>
                                        <Select value={season} onValueChange={(value) => setSeason(value)} required>
                                            <SelectTrigger className="w-full bg-white border-none shadow-md py-6">
                                                <SelectValue placeholder="ঋতু নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>ঋতু</SelectLabel>
                                                    <SelectItem value="summer">গ্রীষ্মকালীন ফসল</SelectItem>
                                                    <SelectItem value="winter">শীতকালীন ফসল</SelectItem>
                                                    <SelectItem value="rainy">বর্ষাকালীন ফসল</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <Label className='flex items-center gap-2'><CalendarDays size={12} />মাটির ধরন</Label>
                                        <Select value={soilType} onValueChange={(value) => setSoilType(value)} required>
                                            <SelectTrigger className="w-full bg-white border-none shadow-md py-6">
                                                <SelectValue placeholder="মাটির ধরন নির্বাচন করুন" />
                                            </SelectTrigger>
                                            <SelectContent className='max-h-40'>
                                                <SelectGroup>
                                                    <SelectLabel>মাটির ধরন</SelectLabel>
                                                    {soilTypesBangladesh.map((soilType) => (
                                                        <SelectItem key={soilType} value={soilType} className='py-3'>
                                                            {soilType}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <AppButton className='h-14' type='submit'>
                                    <AiSvg className='w-10 h-10' />
                                    এআই পরামর্শ দেখুন
                                </AppButton>
                            </form>
                        </div>
                    </div>

                    <div className='flex-1 col-span-4 relative'>
                        {loading ? <div className='flex items-center justify-center h-full'>
                            <div className='w-full h-full flex flex-col gap-4 '>
                                <SkeletonCard className='w-full h-60' />
                                <div className='flex items-center gap-10'>
                                    <SkeletonCard className='h-14 w-full' />
                                    <SkeletonCard className='h-14 w-full' />
                                </div>
                                <SkeletonCard className='h-3 mt-1' />
                                <SkeletonCard className='h-2 mt-2' />
                                <SkeletonCard className='h-2' />
                                <SkeletonCard className='h-2' />
                                <SkeletonCard className='h-2' />
                            </div>
                        </div> : <CropDetails bestCrop={bestCrop} cropAdvice={cropAdvice} loading={loading} />}
                    </div>

                    <div className=' w-full col-span-8 lg:mt-10'>
                        {loading ? <>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className=' flex flex-col gap-4'>
                                    <SkeletonCard className='h-10 w-full my-2' />

                                </div>
                            ))}
                        </> : <>
                            {cropAdvice && <div className='flex flex-col  gap-2'>
                                <h1 className='text-xl font-semibold tracking-tight'>অন্যান্য সুপারিশ</h1>
                                <p className='text-sm text-muted-foreground tracking-tight'>আপনার এলাকার জন্য অন্যান্য ফসলের সুপারিশ</p>
                            </div>}

                            <div className='flex flex-col gap-4 mt-5'>
                                {cropAdvice?.map((crop: any, index: number) => (
                                    <div key={index} className='group transition-all duration-300 cursor-pointer hover:scale-105 flex items-center gap-4'>
                                        <p className='text-lg font-medium tracking-tight'>{index + 1}</p>
                                        <div className='flex  gap-2 border border-neutral-200 rounded-lg p-2 w-full group-hover:border-primary transition-all duration-300 group-hover:shadow-md'>
                                            <img
                                                src={crop?.image}
                                                alt={crop?.['Crop name Bangla']}
                                                width={100}
                                                height={100}
                                                className='w-28 h-28 object-cover rounded-lg'
                                            />
                                            <div>
                                                <h1 className='text-2xl font-semibold tracking-tight'>{crop['Crop name Bangla']}</h1>
                                                <p className='text-[12px] text-neutral-600 tracking-tight'>{crop['Expected profit']}</p>
                                                <p className='text-[12px] text-neutral-600 tracking-tight'>{crop['Explanation']}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>}
                    </div>
                </div>
            </Container>
        </DashboardContainer >
    )
}


const CropDetails = ({ bestCrop, cropAdvice, loading }: { bestCrop: any, cropAdvice: any, loading: boolean }) => {
    if (!bestCrop) {
        return null
    }
    console.log('bestCrop', bestCrop)
    return (
        <div className='w-full  h-full'>
            <div className='flex items-center gap-2 relative'>
                {bestCrop?.image ? <img src={bestCrop?.image} alt={bestCrop?.['Crop name Bangla']} width={1000} height={1000} className='w-full h-60 object-cover rounded-lg' /> : <SkeletonCard className='w-full h-60' />}
                <div className='absolute inset-0 bg-black/50 flex items-start justify-end flex-col p-5 rounded-lg'>
                    <p className='text-sm bg-primary/50 text-white px-2 py-1 rounded-full font-medium tracking-tight'>সেরা সুপারিশ</p>
                    <h1 className='text-3xl font-semibold text-white'>{bestCrop?.['Crop name Bangla']}</h1>
                </div>
            </div>
            <div className='w-full bg-neutral-100 p-5 rounded-lg mt-5'>
                <div className='flex items-center gap-2'>
                    <Banknote size={13} className='mb-0.5' />
                    <p className='text-sm text-neutral-600 font-medium tracking-tight'>{bestCrop?.['Expected profit']}</p>
                </div>

                <div>
                    <p className='text-sm text-neutral-600 font-medium tracking-tight'>{bestCrop?.['Explanation']}</p>

                </div>
            </div>
        </div>
    )
}

