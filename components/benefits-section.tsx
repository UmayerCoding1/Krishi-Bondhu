'use client'
import { Container } from './container'
import { Header, HeaderHilight, HeaderTitle } from './header'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion } from 'motion/react';
export const BenefitsSection = () => {
    const benefits = [
        {

        }
    ]
    return (

        <Container>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='my-20'>
                <Header textPosition='center'>
                    <HeaderTitle>কেন <HeaderHilight type='success'>কৃষি বন্ধু</HeaderHilight> ব্যবহার করবেন</HeaderTitle>
                </Header>


                <div className='w-full flex flex-col gap-12 md:gap-20'>
                    {/* Benefit 1 */}
                    <div className='w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16'>
                        <div className='w-full md:flex-1'>
                            <Image src={'/assets/farmar-propit.png'} alt='farmar-propit' width={500} height={500} className='rounded-3xl w-full h-auto shadow-2xl' />
                        </div>

                        <div className='w-full md:flex-1'>
                            <HeaderTitle className='text-3xl md:text-4xl leading-tight text-center md:text-left'>আপনার কৃষিকাজকে করুন আরও সহজ ও নির্ভুল</HeaderTitle>
                            <div className='mt-8 flex flex-col gap-6'>
                                <div className='bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm'>
                                    <div className='flex items-start gap-4'>
                                        <div className='rounded-xl bg-primary/10 p-2 shrink-0'>
                                            <Check className='w-6 h-6 md:w-8 md:h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl md:text-2xl font-bold mb-1'>সহজ ইন্টারফেস</h3>
                                            <p className='text-sm md:text-base text-neutral-600 dark:text-neutral-400'>অ্যাপটির ইন্টারফেস খুবই সহজ, যা যেকোনো কৃষক সহজেই ব্যবহার করতে পারবেন।</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm'>
                                    <div className='flex items-start gap-4'>
                                        <div className='rounded-xl bg-primary/10 p-2 shrink-0'>
                                            <Check className='w-6 h-6 md:w-8 md:h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl md:text-2xl font-bold mb-1'>সঠিক তথ্য</h3>
                                            <p className='text-sm md:text-base text-neutral-600 dark:text-neutral-400'>সঠিক আবহাওয়া এবং মাটির তথ্য নিশ্চিত করে আপনার চাষাবাদকে আরও নির্ভুল করে তোলে।</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefit 2 */}
                    <div className='w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16'>
                        <div className='w-full md:flex-1'>
                            <HeaderTitle className='text-2xl md:text-4xl leading-tight text-center md:text-left'>সময় বাঁচান এবং উৎপাদন কয়েকগুণ বৃদ্ধি করুন</HeaderTitle>
                            <div className='mt-8 flex flex-col gap-6'>
                                <div className='bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm'>
                                    <div className='flex items-start gap-4'>
                                        <div className='rounded-xl bg-primary/10 p-2 shrink-0'>
                                            <Check className='w-6 h-6 md:w-8 md:h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl md:text-2xl font-bold mb-1'>সময় সাশ্রয়ী</h3>
                                            <p className='text-sm md:text-base text-neutral-600 dark:text-neutral-400'>মাঠে না গিয়েও ঘরে বসেই ফসলের অবস্থা ও বাজারের খোঁজখবর নিন।</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm'>
                                    <div className='flex items-start gap-4'>
                                        <div className='rounded-xl bg-primary/10 p-2 shrink-0'>
                                            <Check className='w-6 h-6 md:w-8 md:h-8 text-primary' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl md:text-2xl font-bold mb-1'>মুনাফা বৃদ্ধি</h3>
                                            <p className='text-sm md:text-base text-neutral-600 dark:text-neutral-400'>সঠিক সময়ে সঠিক সিদ্ধান্ত নেওয়ার মাধ্যমে ফসলের উৎপাদন ও আপনার আয় বৃদ্ধি করুন।</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:flex-1'>
                            <Image src={'/assets/farmar-hold-phone.png'} alt='farmar-propit' width={500} height={500} className='rounded-3xl w-full h-auto shadow-2xl' />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Container>
    )
}
