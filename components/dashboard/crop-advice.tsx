'use client';

import React, { useState } from 'react';
import { Container } from '../container';
import { DashboardContainer } from './dashboard-container';
import { CalendarDays, LoaderPinwheel, MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { AppButton } from '../app-button';
import { AiSvg } from '../button/ai-svg';

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

    const handleCropAdviceFrom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('crop advice form submitted', { location, season, soilType });
    }
    return (

        <DashboardContainer className='bg-secondary/3 min-h-(--dashboard-height) overflow-x-visible font-display'>
            <Container>
                <div className='flex gap-2 justify-between'>
                    <div className='flex-1 flex flex-col gap-6 bg-[#F1F4EF] px-5 py-5 rounded-lg dark:bg-neutral-800 shadow-md'>
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

                    <div className='flex-1'>details</div>
                </div>
            </Container>
        </DashboardContainer >
    )
}