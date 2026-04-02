'use client'
import { CannabisOff, ChartNoAxesColumn, Leaf, Sun } from 'lucide-react'
import { Container } from './container'
import { Header, HeaderDescription, HeaderHilight, HeaderTitle } from './header'
import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const Servies = () => {
    const services = [
        {
            title: "আবহাওয়া তথ্য",
            description: "বৃষ্টি, তাপমাত্রা ও বাতাসের রিয়েল-টাইম তথ্য জানুন সরাসরি আপনার স্মার্টফোনে।",
            icon: <Sun className='w-8 h-8 text-yellow-500' />,
            color: "bg-yellow-50 dark:bg-yellow-500/10",
            iconColor: "text-yellow-500"
        },
        {
            title: 'ফসলের পরামর্শ',
            description: 'মাটি ও মৌসুম অনুযায়ী কোন ফসল করবেন এবং সম্ভাব্য লাভ কত হতে পারে তার সঠিক গাইডলাইন।',
            icon: <Leaf className='w-8 h-8 text-primary' />,
            color: "bg-green-50 dark:bg-primary/10",
            iconColor: "text-primary"
        },
        {
            title: 'রোগ শনাক্ত',
            description: 'AI প্রযুক্তির মাধ্যমে ছবির সাহায্যে দ্রুত এবং নির্ভুলভাবে ফসলের রোগ শনাক্ত করুন।',
            icon: <CannabisOff className='w-8 h-8 text-orange-600' />,
            color: "bg-orange-50 dark:bg-orange-600/10",
            iconColor: "text-orange-600"
        },
        {
            title: 'বাজার দর',
            description: "আপনার নিকটস্থ বাজারের শস্যের বর্তমান সঠিক বাজার দর জানুন আগে থেকেই।",
            icon: <ChartNoAxesColumn className='w-8 h-8 text-blue-500' />,
            color: "bg-blue-50 dark:bg-blue-500/10",
            iconColor: "text-blue-500"
        }
    ]

    return (
        <section className='py-24 relative overflow-hidden'>
            <Container>
                <Header textPosition='center'>
                    <HeaderTitle>
                        আমাদের প্রধান <HeaderHilight type='success'>সুবিধাসমূহ</HeaderHilight>
                    </HeaderTitle>
                    <HeaderDescription>কৃষি বন্ধুর মাধ্যমে আপনি সহজেই প্রয়োজনীয় সব তথ্য এক জায়গায় পেতে পারেন</HeaderDescription>
                </Header>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={cn(
                                "group relative p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800",
                                "bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300"
                            )}
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300",
                                service.color
                            )}>
                                {service.icon}
                            </div>
                            <h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors text-neutral-900 dark:text-neutral-100'>
                                {service.title}
                            </h3>
                            <p className='text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>
                                {service.description}
                            </p>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-b-3xl" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
