'use client'

import { Container } from '@/components/container'
import { LoginForm } from '@/components/login-form'
import { Logo } from '@/components/logo'
import { RegisterForm } from '@/components/register-form'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import React from 'react'

export default function page() {
    const [authType, setAuthType] = React.useState<'login' | 'register'>('login')
    return (

        <div className='max-w-6xl mx-auto h-screen p-10 '>
            <div className='w-full flex h-full overflow-hidden rounded-2xl'>
                <div className='flex-1 hidden md:flex w-full md:w-5/12 bg-linear-to-br from-primary via-secondary to-secondary p-12 text-white flex-col  gap-4 relative overflow-hidden'>
                    <Logo />
                    <h2 className='text-4xl font-bold mb-4 leading-tight'>কৃষি বন্ধুতে <br /> স্বাগতম!</h2>
                    <p className='text-brand-100 mb-8 text-lg'>আমাদের স্মার্ট কমিউনিটিতে যুক্ত হয়ে আপনার কৃষিকাজকে আরও সহজ ও উন্নত করুন।</p>

                    <div className='space-y-4'>
                        <div className='flex items-center gap-3'>
                            <div className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                                <Check className='w-4 h-4' />
                            </div>
                            <span className='text-white font-medium'>দ্রুত তথ্য ও স্মার্ট বিশ্লেষণ</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                                <Check className='w-4 h-4' />
                            </div>
                            <span className='text-white font-medium'>কৃষি বিশেষজ্ঞদের সরাসরি পরামর্শ</span>
                        </div>
                    </div>
                </div>
                <div className='flex-2 bg-accent px-10 py-20'>
                    <div className='flex border-b border-gray-200 mb-8'>
                        <button className={cn(
                            authType === 'login' ? 'border-primary text-primary' : 'border-transparent text-gray-500',
                            'flex-1 pb-4 text-center text-lg font-bold border-b-2 transition-colors tab-active'
                        )} onClick={() => setAuthType('login')}>লগইন করুন</button>
                        <button className={cn(
                            authType === 'register' ? 'border-primary text-primary' : 'border-transparent text-gray-500',
                            'flex-1 pb-4 text-center text-lg font-bold border-b-2 transition-colors tab-active'
                        )} onClick={() => setAuthType('register')}>রেজিস্টার করুন</button>
                    </div>
                    {authType === 'login' && <LoginForm />}
                    {authType === 'register' && <RegisterForm />}
                </div>
            </div>
        </div>

    )
}
