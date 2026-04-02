'use client'
import Image from 'next/image'
import React from 'react'
import { AppButton } from './app-button'
import { ArrowRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react';

export const Hero = () => {
    return (
        <motion.div initial={{
            opacity: 0,
            y: -20
        }} animate={{
            opacity: 1,
            y: 0
        }} transition={{
            duration: 0.5,
            ease: "easeOut"
        }} className="h-[calc(100vh-8px)] relative">
            <Image
                src="/assets/hero-banner.png"
                alt="hero banner"
                width={1920}
                height={900}
                className="w-full h-[calc(100%-49px)] object-cover"
            />
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/55 w-full h-[calc(100%-49px)]'>
                <div className={cn(
                    'flex flex-col gap-4 items-start justify-center h-full text-white mx-auto px-4 md:px-6',
                )}>
                    <h1 className='text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]'>
                        কৃষকের <span className='text-primary inline'>সঠিক সিদ্ধান্ত</span><br />
                        এখন আরও সহজ
                    </h1>
                    <p className='text-base md:text-lg font-medium max-w-2xl tracking-tight leading-relaxed'>
                        ফসল বাছাই, আবহাওয়া আর বাজার দর—সব গুরুত্বপূর্ণ তথ্য এখন এক জায়গায়,
                        যাতে আপনি সহজেই সঠিক সিদ্ধান্ত নিতে পারেন, ঠিক আপনার হাতের মুঠোয়
                    </p>
                    <div className='flex flex-wrap items-center gap-3 mt-4'>
                        <AppButton className='text-lg flex items-center gap-2'>
                            শুরু করুন <ArrowRight size={18} />
                        </AppButton>
                        <AppButton
                            buttonType="secondary"
                            className='flex items-center gap-2 bg-linear-to-r from-neutral-500 to-neutral-900 pt-1 text-sm md:text-base'
                        >
                            <Play size={16} className='mb-0.5' />
                            ভিডিও দেখুন
                        </AppButton>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}