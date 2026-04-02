
'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { AppButton } from './app-button';
export const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        phone: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginData);
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
                    <Label className='block text-sm font-bold text-gray-700 mb-2'>মোবাইল নম্বর</Label>
                    <Input value={loginData.phone} onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })} type="text" placeholder="01XXXXXXXXX" />
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
