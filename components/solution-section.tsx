
'use client'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { Header, HeaderTitle } from './header'
import { motion } from 'motion/react';
export const SolutionSection = () => {
    const sokutions = [
        '🌱 ফসল পরামর্শ',
        "🌦️ আবহাওয়ার তথ্য",
        "🐛 রোগ শনাক্ত",
        "💰 বাজারদর",
        // "🤝 কৃষক নেটওয়ার্ক",
        // "🎓 কৃষি শিক্ষা"
    ]
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='w-full min-h-[450px] md:h-[400px] mb-10 rounded-3xl relative overflow-hidden'>
                <Image
                    src={'/assets/happy-farmar.avif'}
                    alt='happy-farmer'
                    width={800}
                    height={600}
                    className='rounded-3xl w-full h-full object-cover'
                />
                <div className='absolute inset-0 w-full h-full bg-linear-to-r from-black/80 via-black/40 to-transparent rounded-3xl text-white px-6 py-10 md:px-12 md:py-20 flex flex-col justify-center'>
                    <div className='flex flex-col gap-4 max-w-2xl'>
                        <Header className="h-auto my-0 items-start">
                            <HeaderTitle className='text-3xl sm:text-4xl md:text-5xl leading-tight'>
                                কৃষি বন্ধু কীভাবে সাহায্য করে
                            </HeaderTitle>
                        </Header>
                        <p className='text-sm md:text-base max-w-md font-medium text-neutral-200 leading-relaxed'>আমাদের AI প্রযুক্তি আপনার মাটি, মৌসুম এবং ফসল অনুযায়ী সঠিক পরামর্শ দেয়। আপনি জানতে পারবেন কোন ফসল করবেন, কখন বপন করবেন এবং সম্ভাব্য লাভ কত হবে।</p>

                        <div className='grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-4 mt-6 w-full max-w-md'>
                            {sokutions.map((sokution, index) => (
                                <div key={index} className='bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-xl text-center hover:bg-white/20 transition-all'>
                                    <p className='text-xs md:text-sm font-semibold'>{sokution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Container>
    )
}
