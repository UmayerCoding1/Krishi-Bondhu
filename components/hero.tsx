'use client'
import Image from 'next/image'
import React from 'react'
import { AppButton } from './app-button'
import { ArrowRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react';

export const Hero = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[80vh] md:h-[calc(100vh-8px)] relative overflow-hidden"
        >
            <Image
                src="/assets/hero-banner.png"
                alt="hero banner"
                fill // Using fill for better responsive handling in Next.js
                priority
                className="object-cover object-[75%_center] md:object-center"
            // object-[75%_center] keeps the farmer visible on small screens
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-black/55 p-2 flex items-center'>
                <div className={cn(
                    'flex flex-col gap-4 items-start justify-center h-full text-white mx-auto px-4 md:px-6 w-full',
                )}>
                    {/* Desktop Heading */}
                    <h1 className='hidden md:block text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]'>
                        কৃষকের <span className='text-primary inline'>সঠিক সিদ্ধান্ত</span><br />
                        এখন আরও সহজ
                    </h1>

                    {/* Mobile Heading - Adjusted for better fit */}
                    <h1 className='md:hidden text-4xl font-bold tracking-tight leading-[1.2] pt-10'>
                        কৃষকের <span className='text-primary'>সঠিক সিদ্ধান্ত</span><br />
                        এখন আরও সহজ
                    </h1>

                    <p className='text-base md:text-lg font-medium max-w-2xl tracking-tight leading-relaxed opacity-90'>
                        ফসল বাছাই, আবহাওয়া আর বাজার দর—সব গুরুত্বপূর্ণ তথ্য এখন এক জায়গায়,
                        যাতে আপনি সহজেই সঠিক সিদ্ধান্ত নিতে পারেন, ঠিক আপনার হাতের মুঠোয়
                    </p>

                    <div className='flex flex-wrap items-center gap-3 mt-4'>
                        <AppButton className='text-lg flex items-center gap-2'>
                            শুরু করুন <ArrowRight size={18} />
                        </AppButton>
                        <AppButton
                            buttonType="secondary"
                            className='flex items-center gap-2 bg-linear-to-r from-neutral-500 to-neutral-900 pt-1 text-sm md:text-base text-white'
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