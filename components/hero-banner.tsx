'use client'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { HeaderHilight } from './header'
import { AppButton } from './app-button'
import { motion } from 'motion/react'

export const HeroBanner = ({ imageUrl, title, titleHilight, badge, description, buttonText }: {
    imageUrl: string;
    title: string;
    titleHilight: string;
    badge?: string;
    description: string;
    buttonText?: string;
}) => {
    return (
        <div className='relative overflow-hidden'>
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            >
                <Image
                    src={imageUrl}
                    alt='hero-banner'
                    width={1920}
                    height={1080}
                    className='w-full h-[500px] object-cover'
                />
            </motion.div>
            <div className='absolute inset-0 bg-linear-to-r from-white via-white/50 to-white/0 dark:from-black/70 dark:via-black/30 dark:to-black/10 flex items-center justify-center'>
                <div className='container mx-auto flex flex-col gap-4'>
                    {badge && (
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className='text-xs dark:text-black bg-[#def3e4] text-[#2e7d32] px-3 py-1.5 rounded-full w-fit flex items-center justify-center gap-2'
                        >
                            <Sparkles size={13} strokeWidth={3} /> {badge}
                        </motion.p>
                    )}
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className='text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight'
                    >
                        {title} <br /> <HeaderHilight type='success'>{titleHilight}</HeaderHilight>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className='text-md md:text-lg text-black dark:text-white max-w-2xl font-medium leading-relaxed'
                    >
                        {description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className='flex items-center gap-4 mt-2'
                    >
                        {buttonText && <AppButton className="px-8 py-4 text-md">{buttonText}</AppButton>}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
