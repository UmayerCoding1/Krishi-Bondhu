
'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { AppButton } from './app-button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const route = useRouter();
    const { loginUser } = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                loginData,
                { withCredentials: true }
            );
            console.log(response.data);
            if (response.data.data) {
                loginUser(response.data.data);
                await new Promise(resolve => setTimeout(resolve, 1000))
                route.push('/');
                // route.refresh();
                toast.success(response.data.message, { duration: 1500 })
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message, { duration: 1500 })
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <form onSubmit={handleSubmit} className='px-10 py-3 flex flex-col gap-5'>
                <div>
                    <Label className='block text-sm font-bold text-gray-700 mb-2'>মোবাইল ইমেল</Label>
                    <Input value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" placeholder="[EMAIL_ADDRESS]" />
                </div>
                <div>
                    <Label className='block text-sm font-bold text-gray-700 mb-2'>পাসওয়ার্ড</Label>
                    <Input value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} type="password" placeholder="পাসওয়ার্ড" />
                </div>

                <AppButton className='w-full h-14'>লগইন করুন</AppButton>
            </form>
        </motion.div>
    )
}
