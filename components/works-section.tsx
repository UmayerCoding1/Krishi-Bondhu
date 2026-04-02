import React from 'react'
import { Container } from './container'
import { Header, HeaderDescription, HeaderTitle } from './header'
import { BotMessageSquare, Check, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export const WorksSection = () => {
    const workStep: { index: number; title: string; description: string; icon: React.ReactNode }[] = [
        {
            index: 1,
            title: 'তথ্য দিন',
            description: 'আপনার বর্তমান অবস্থান, মৌসুম এবং মাটির ধরন নির্বাচন করুন।',
            icon: <MapPin className='text-blue-500 absolute right-0 bottom-0 bg-blue-200 rounded-full p-1.5' />,
        },
        {
            index: 2,
            title: 'AI বিশ্লেষণ করবে',
            description: 'আমাদের উন্নত AI আপনার তথ্য বিশ্লেষণ করে স্মার্ট পরামর্শ তৈরি করবে।',
            icon: <BotMessageSquare className='text-yellow-600 absolute right-0 bottom-0 bg-yellow-200 rounded-full p-1.5' />
        },
        {
            index: 3,
            title: 'সিদ্ধান্ত নিন',
            description: 'সবচেয়ে লাভজনক ফসলের পরামর্শ গ্রহণ করুন এবং নিশ্চিন্তে চাষ শুরু করুন।',
            icon: <Check className='text-green-500 absolute right-0 bottom-0 bg-green-200 rounded-full p-1.5' />
        }
    ]
    return (
        <Container>
            <div>
                <Header textPosition='center'>
                    <HeaderTitle>
                        কীভাবে ব্যবহার করবেন
                    </HeaderTitle>
                    <HeaderDescription>মাত্র ৩টি সহজ ধাপে আপনার জমির জন্য সেরা সিদ্ধান্ত নিন।</HeaderDescription>
                </Header>



                <div className='flex items-center justify-evenly relative'>
                    {workStep.map((step) => (
                        <div key={step.index} className='z-10'>
                            <div className='flex flex-col items-center gap-2 '>
                                <div className={cn('w-20 h-20 rounded-full border-2 border-green-200 dark:border-green-800 dark:text-green-400 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:scale-105 flex items-center justify-center text-green-800 shadow-md relative', step.index === 2 && 'bg-green-500 text-white dark:text-white border-white hover:border-white')}>
                                    <p className={cn('text-2xl  font-bold')}> {step.index}</p>


                                    {step.icon}



                                </div>
                                <div className='flex flex-col items-center gap-2 mt-3 '>
                                    <h2 className='text-2xl font-bold'>{step.title}</h2>
                                    <p className='w-72 text-center text-[12px] text-neutral-500 dark:text-neutral-400'>{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='hidden md:block absolute top-12 left-[22.5%] right-[22.5%] h-1 border-t-2 border-dashed border-gray-300 z-0 ' />
                </div>
            </div>
        </Container>
    )
}
