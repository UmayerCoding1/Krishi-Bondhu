
'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { AppButton } from './app-button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';
export const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [checked, setChecked] = useState(false);
    const route = useRouter();

    const onCheckedChange = (checked: boolean) => {
        setChecked(checked);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('api call..........')
            const { data } = await axios.post(`/api/v1/auth/register`, registerData);

            if (data.success) {
                toast.success(data.message);
                localStorage.setItem('verify_email', registerData.email);
                route.push('/verify');
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong");
            } else {
                toast.error("Something went wrong");
            }
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
                    <Label className='block text-sm font-bold text-gray-700 mb-2'>আপনার নাম</Label>
                    <Input value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} type="text" placeholder="আপনার নাম" />
                </div>
                <div>
                    <Label className='block text-sm font-bold text-gray-700 mb-2'>আপনার ইমেল</Label>
                    <Input value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} type="email" placeholder="[EMAIL_ADDRESS]" />
                </div>
                <div>
                    <Label className='block text-sm font-bold text-gray-700 mb-2'>পাসওয়ার্ড</Label>
                    <Input value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} type="password" placeholder="পাসওয়ার্ড" />
                </div>
                <div className='flex items-center gap-1.5'>
                    <Checkbox checked={checked} onCheckedChange={onCheckedChange} className='border-neutral-400' />
                    <Label className='text-sm text-gray-600'>আমি কৃষি বন্ধুর <Link href="/terms-and-conditions" className='text-primary hover:underline'>শর্তাবলী</Link> ও <Link href="/privacy-policy" className='text-primary hover:underline'>গোপনীয়তা নীতি</Link> মেনে নিচ্ছি।</Label>
                </div>
                <AppButton className='w-full h-14'>রেজিস্টার করুন</AppButton>
            </form>
        </motion.div>
    )
}
