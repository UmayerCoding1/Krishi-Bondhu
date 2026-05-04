'use client'
import Image from 'next/image'
import React from 'react'
import { AppButton } from './app-button'
import { ArrowRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export const Hero = () => {
    const { user } = useAuth();
    const route = useRouter();
    console.log('user', user)
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
                        <AppButton
                            onClick={() => route.push('/auth')}
                            className="h-14 px-8 text-lg rounded-full shadow-xl shadow-green-500/25"
                        >
                            শুরু করুন <ArrowRight className="ml-2 w-5 h-5" />
                        </AppButton>
                        <button className="flex items-center gap-3 px-6 h-14 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-zinc-900 dark:fill-white" />
                            </div>
                            <span className="font-semibold">ভিডিও দেখুন</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}