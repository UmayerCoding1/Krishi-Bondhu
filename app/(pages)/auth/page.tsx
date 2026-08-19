'use client'

import { Container } from '@/components/container'
import { LoginForm } from '@/components/login-form'
import { Logo } from '@/components/logo'
import { RegisterForm } from '@/components/register-form'
import { useAuth } from '@/hooks/useAuth'
import axiosInstance from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Check, KeyRound, ShieldCheck, User } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner'

export default function page() {
    const [authType, setAuthType] = React.useState<'login' | 'register'>('login');
    const { loginUser } = useAuth();
    const route = useRouter()
    const handleAdminClick = () => {
        toast.info('Coming soon', { duration: 1500 })
    }

    const handleFillUserDemo = async () => {
        try {
            const response = await axiosInstance.post(
                '/auth/login',
                { email: 'vidik25175@neplis.com', password: 'usb174' }
            )

            if (response.data.data) {
                loginUser(response.data.data)
                localStorage.setItem('page_reload', JSON.stringify(true))
                route.push('/')
                toast.success(response.data.message || 'লগইন সফল হয়েছে', { duration: 1500 })
            }
        } catch (error: any) {
            console.log(error)
            const errorMsg = error?.response?.data?.message || 'লগইন ব্যর্থ হয়েছে'
            toast.error(errorMsg, { duration: 1500 })
        }
    }
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

                <div className='flex-2 bg-accent px-10 '>
                    <div className={cn(' px-10', authType === 'login' ? 'py-20' : 'py-10')}>
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

                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            <KeyRound className="w-3.5 h-3.5 text-emerald-500" />
                            <span>ডেমো লগইন এক্সেস (Quick Demo Access)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {/* 1. User Credential Button */}
                            <button
                                type="button"
                                onClick={handleFillUserDemo}
                                className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex flex-col items-center gap-1 transition-all group shadow-xs"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                    <User className="w-4 h-4" />
                                </div>
                                <span>১. ব্যবহারকারী (User)</span>
                            </button>

                            {/* 2. Admin Credential Button */}
                            <button
                                type="button"
                                onClick={handleAdminClick}
                                className="p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold flex flex-col items-center gap-1 transition-all group shadow-xs"
                            >
                                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <span>২. এডমিন (Admin)</span>
                            </button>
                        </div>
                    </div>
                </div>




            </div>


        </div>

    )
}
