
'use client'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { Header, HeaderTitle } from './header'

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
            <div className='w-full h-[350px] mb-10 rounded-2xl relative'>
                <Image
                    src={'/assets/happy-farmar.avif'}
                    alt='happy-farmer'
                    width={400}
                    height={400}
                    className='rounded-2xl w-full h-full object-cover '
                />
                <div className='absolute inset-0 w-full h-full bg-linear-to-r from-black/60 via-black/30 to-transparent rounded-2xl text-white px-10 py-20'>
                    <div className='flex flex-col gap-4'>
                        <Header>
                            <HeaderTitle className='text-5xl'>
                                কৃষি বন্ধু কীভাবে সাহায্য করে
                            </HeaderTitle>
                        </Header>
                        <p className='text-[11px] max-w-md font-medium text-neutral-100'>আমাদের AI প্রযুক্তি  আপনার মাটি, মৌসুম এবং ফসল অনুযায়ী সঠিক পরামর্শ দেয়। আপনি জানতে পারবেন কোন ফসল করবেন, কখন বপন করবেন এবং সম্ভাব্য লাভ কত হবে। সব তথ্য এক জায়গায়, সহজে বুঝতে পারবেন, এবং আপনার কৃষিকাজ হবে আরও ফলপ্রসূ, সময়ও বাঁচবে এবং ঝামেলা কমবে।</p>

                        <div className='grid grid-cols-2 max-w-md gap-4 mt-5'>
                            {sokutions.map((sokution, index) => (
                                <div key={index} className='bg-white text-black p-2 inline-block rounded-lg text-center '>
                                    <p className='text-sm font-medium'>{sokution}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </Container>
    )
}
