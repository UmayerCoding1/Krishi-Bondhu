'use client'
import React from 'react';
import { Container } from './container'
import { Header, HeaderTitle } from './header'
import Image from 'next/image'
import { motion } from 'motion/react';
export const ProblemSection = () => {
    const problemList = [
        ' সঠিক ফসল নির্বাচন করা কঠিন',
        'আবহাওয়ার তথ্য পাওয়া যায় না',
        ' রোগ শনাক্ত করতে সমস্যা',
        ' বাজার দর জানা যায় না'
    ]
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='flex flex-col md:flex-row my-10 md:my-20 w-full items-center gap-10 md:gap-0'>

                <div className='flex-1 w-full'>
                    <Header className="h-auto my-6 md:my-10">
                        <HeaderTitle className="text-3xl md:text-4xl text-center md:text-left w-full">
                            কৃষকদের সাধারণ সমস্যা
                        </HeaderTitle>
                    </Header>
                    <div className='flex flex-col gap-4 px-2 md:px-0'>
                        {problemList.map((problem, index) => (
                            <div key={index} className='flex items-center gap-3'>
                                <div className='w-3 h-3 bg-red-500 rounded-full shrink-0'></div>
                                <p className='text-base md:text-lg font-medium'>{problem}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex-1 w-full flex justify-center md:justify-end'>
                    <Image
                        src={'/assets/confused-farmer.avif'}
                        alt='confused-farmer'
                        width={400}
                        height={400}
                        className='rounded-2xl w-full max-w-[400px] object-cover'
                    />
                </div>
            </motion.div>
        </Container>
    )
}