import React from 'react'
import { Container } from './container'
import { Header, HeaderHilight, HeaderTitle } from './header'
import Image from 'next/image'
import { Check } from 'lucide-react'

export const BenefitsSection = () => {
    const benefits = [
        {

        }
    ]
    return (

        <Container>
            <div className='my-20'>
                <Header textPosition='center'>
                    <HeaderTitle>কেন <HeaderHilight type='success'>কৃষি বন্ধু</HeaderHilight> ব্যবহার করবেন</HeaderTitle>
                </Header>


                <div className='w-full flex flex-col gap-16'>
                    <div className='w-full flex items-center justify-between gap-10'>
                        <div className='flex-1'>
                            <Image src={'/assets/farmar-propit.png'} alt='farmar-propit' width={400} height={400} className='rounded-2xl' />
                        </div>

                        <div className='flex-1'>
                            <HeaderTitle className='text-3xl'>আপনার কৃষিকাজকে করুন আরও সহজ ও নির্ভুল</HeaderTitle>
                            <div className='mt-5 flex flex-col gap-5'>
                                <div className='bg-neutral-100 dark:bg-neutral-800 px-3 py-5 rounded-md shadow'>
                                    <div className='flex items-start gap-2'>
                                        <div className='rounded-full bg-primary/10 p-1'>
                                            <Check className='w-8 h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>সহজ ব্যবহার</h3>
                                            <p className='text-neutral-500 dark:text-neutral-400'>অ্যাপটির ইন্টারফেস খুবই সহজ, যা যেকোনো কৃষক সহজেই ব্যবহার করতে পারবেন।</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-neutral-100 dark:bg-neutral-800 px-3 py-5 rounded-md shadow'>
                                    <div className='flex items-start gap-2'>
                                        <div className='rounded-full bg-primary/10 p-1'>
                                            <Check className='w-8 h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>সহজ ব্যবহার</h3>
                                            <p className='text-neutral-500 dark:text-neutral-400'>অ্যাপটির ইন্টারফেস খুবই সহজ, যা যেকোনো কৃষক সহজেই ব্যবহার করতে পারবেন।</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-between gap-10'>


                        <div className='flex-1'>
                            <HeaderTitle className='text-3xl'>সময় বাঁচান এবং উৎপাদন কয়েকগুণ বৃদ্ধি করুন</HeaderTitle>
                            <div className='mt-5 flex flex-col gap-5'>
                                <div className='bg-neutral-100 dark:bg-neutral-800 px-3 py-5 rounded-md shadow'>
                                    <div className='flex items-start gap-2'>
                                        <div className='rounded-full bg-primary/10 p-1'>
                                            <Check className='w-8 h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>সময় বাঁচায়</h3>
                                            <p className='text-neutral-500 dark:text-neutral-400'>মাঠে না গিয়েও ঘরে বসেই ফসলের অবস্থা ও বাজারের খোঁজখবর নিন।</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-neutral-100 dark:bg-neutral-800 px-3 py-5 rounded-md shadow'>
                                    <div className='flex items-start gap-2'>
                                        <div className='rounded-full bg-primary/10 p-1'>
                                            <Check className='w-8 h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>লাভ বাড়ায়</h3>
                                            <p className='text-neutral-500 dark:text-neutral-400'>সঠিক সময়ে সঠিক সিদ্ধান্ত নেওয়ার মাধ্যমে ফসলের উৎপাদন ও আপনার আয় বৃদ্ধি করুন।</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex-1'>
                            <Image src={'/assets/farmar-hold-phone.png'} alt='farmar-propit' width={400} height={400} className='rounded-2xl' />
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    )
}
