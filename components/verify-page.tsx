'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { AppButton } from './app-button'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'

export const VerifyPage = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isResendActive, setIsResendActive] = useState(false);
    const { setUser } = useAuth()
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];
    const router = useRouter();
    const searchParams = useSearchParams();
    const vt = searchParams.get('vt');
    const is2FA = vt === '2fa';

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setIsResendActive(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        if (otpValue.length < 4) {
            toast.error('অনুগ্রহ করে ৪ সংখ্যার OTP কোডটি লিখুন');
            return;
        }

        try {
            // Get email from storage (expected to be set during registration)
            const email = localStorage.getItem('verify_email');
            if (!email) {
                toast.error('ইমেল পাওয়া যায়নি। অনুগ্রহ করে আবার রেজিস্টার করুন।');
                return;
            }




            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`, {
                email,
                otp: Number(otpValue),
            }, { withCredentials: true })

            console.log(res.data)
            if (true) {
                toast.success('ভেরিফিকেশন সফল হয়েছে!');
                localStorage.removeItem('verify_email');
                setUser(res.data.user);
                router.push('/');
            } else {
                toast.error(res.data.message || 'ভেরিফিকেশন ব্যর্থ হয়েছে');
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast.error('সার্ভারের সাথে যোগাযোগ করতে সমস্যা হয়েছে');
        }
    };

    const handleResend = async () => {
        if (!isResendActive) return;

        try {
            const email = localStorage.getItem('verify_email');
            if (!email) {
                toast.error('ইমেল পাওয়া যায়নি');
                return;
            }

            // Mock resend endpoint or the verification endpoint might handle it
            // For now, reset timer and focus

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend-otp`, { email });
            console.log(data)
            if (data.statusCode === 200) {
                setTimer(60);
                setIsResendActive(false);
                setOtp(['', '', '', '']);
                inputRefs[0].current?.focus();
                toast.success('পিন কোডটি পুনরায় পাঠানো হয়েছে');
            }
        } catch (error) {
            console.log(error)
            toast.error('পুনরায় পাঠাতে ব্যর্থ হয়েছে');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold font-heading text-primary mb-2">
                        {is2FA ? 'টু-স্টেপ ভেরিফিকেশন' : 'একাউন্ট ভেরিফিকেশন'}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {is2FA
                            ? 'আপনার একাউন্টের নিরাপত্তা নিশ্চিত করতে পিন কোডটি লিখুন'
                            : 'আপনার ইমেলে পাঠানো ৪ ডিজিটের পিন কোডটি এখানে লিখুন'}
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-16 text-center text-2xl font-bold bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    ))}
                </div>

                <AppButton
                    onClick={handleVerify}
                    className="w-full h-14 text-base font-semibold mb-6"
                >
                    ভেরিফাই করুন
                </AppButton>

                <div className="text-center">
                    {timer > 0 ? (
                        <p className="text-sm text-zinc-500">
                            কোড পাননি? <span className="text-primary font-medium">{timer}</span> সেকেন্ড অপেক্ষা করুন
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className={`text-sm font-medium ${isResendActive ? 'text-primary hover:underline cursor-pointer' : 'text-zinc-400 cursor-not-allowed'}`}
                        >
                            কোড পুনরায় পাঠান
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
