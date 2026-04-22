'use client'
import { Eye, EyeClosed, KeyRound, ShieldAlert } from "lucide-react";
import { Switch } from "./ui/switch"
import { useState } from "react"

export const AccountSetting = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('change password');
    }
    return (
        <>
            <div className='bg-neutral-100 dark:bg-neutral-800 px-4 py-2 mt-2 rounded-2xl'>
                <div className='mt-3'>
                    <h2 className='flex items-center gap-2'>
                        <KeyRound className='text-primary' />
                        <h2 className='text-xl font-semibold'>পাসওয়ার্ড পরিবর্তন</h2>
                    </h2>
                    <p className='text-sm text-neutral-500'>একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন যা অন্য কোথাও পুনরায় ব্যবহার করেন না।</p>
                </div>

                <form onSubmit={handleChangePassword} className='mt-5 flex flex-col gap-4'>
                    <div>
                        <label htmlFor="" className='text-sm text-neutral-500'>বর্তমান পাসওয়ার্ড</label>
                        <input type="password" className='w-full py-2 px-3 outline-none border border-neutral-200 dark:border-neutral-500 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:border-primary' />
                    </div>

                    <div className='flex items-center gap-2 w-full'>
                        <div className='w-full relative'>
                            <label htmlFor="" className='text-sm text-neutral-500'>নতুন পাসওয়ার্ড</label>
                            <input type={showPassword ? "text" : "password"} className='w-full py-2 px-3 outline-none border border-neutral-200 dark:border-neutral-500 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:border-primary' />
                            {showPassword ? (
                                <EyeClosed onClick={() => setShowPassword(false)} className='w-5 h-5 absolute right-2 top-[65%] cursor-pointer -translate-y-1/2' />
                            ) : (
                                <Eye onClick={() => setShowPassword(true)} className='w-5 h-5 absolute right-2 top-[65%] cursor-pointer -translate-y-1/2' />
                            )}
                        </div>

                        <div className='w-full relative'>
                            <label htmlFor="" className='text-sm text-neutral-500'>নিশ্চিত পাসওয়ার্ড</label>
                            <input type="password" className='w-full py-2 px-3 outline-none border border-neutral-200 dark:border-neutral-500 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:border-primary' />

                        </div>
                    </div>

                    <div className='flex items-center justify-end'> <button type='submit' className='bg-primary text-white px-4 py-2 rounded-lg mt-5'>পাসওয়ার্ড পরিবর্তন করুন</button></div>
                </form>
            </div>

            <div className='bg-neutral-100 dark:bg-neutral-800 px-4 py-2 mt-5 rounded-2xl'>
                <div className='mt-3'>
                    <h2 className='flex items-center gap-2'>
                        <ShieldAlert className='text-primary' />
                        <h2 className='text-xl font-semibold'>দ্বি-স্তর প্রমাণীকরণ</h2>
                    </h2>
                    <p className='text-sm text-neutral-500'>আপনার অ্যাকাউন্টের নিরাপত্তা বাড়াতে দ্বি-স্তর প্রমাণীকরণ সক্ষম করুন।</p>
                </div>

                <div className='flex items-center justify-between mt-10'>
                    <div>
                        <h2 className='text-lg font-semibold'>অথেনটিকেটর অ্যাপ</h2>
                        <p className='text-sm text-neutral-500'>সাইন ইন করার সময় একটি ওয়ান-টাইম কোড পান।</p>
                    </div>

                    <div>
                        <Switch id="airplane-mode" />
                    </div>
                </div>
            </div>
        </>
    )
}