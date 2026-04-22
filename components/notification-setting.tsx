'use client'
import { Bell, Check } from 'lucide-react';
import React, { useState } from 'react';
import { Switch } from './ui/switch';

export const NotificationSetting = () => {
    const [selectedNotification, setSelectedNotification] = useState<{ email: boolean, updates: boolean, safety: boolean }>({ email: false, updates: false, safety: false });
    return (
        <div>
            <div className='mt-3'>
                <h2 className='flex items-center gap-2'>
                    <Bell className='text-primary' />
                    <h2 className='text-xl font-semibold'>নোটিফিকেশন পছন্দসমূহ    </h2>
                </h2>
                <p className='text-sm text-neutral-500'>আপনি কোন ধরনের নোটিফিকেশন পেতে চান তা নির্বাচন করুন।</p>
            </div>

            <div>
                <div className='flex items-center justify-between mt-10'>
                    <div className='flex items-center gap-2'>
                        {selectedNotification.email ?
                            <Check size={19} className='bg-green-500 rounded-full p-1 text-white' /> :
                            <Check size={19} className='border rounded-full p-1 text-black' />
                        }
                        <div>
                            <h2 className='text-lg font-semibold'>ইমেইল নোটিফিকেশন</h2>
                            <p className='text-sm text-neutral-500'>আপনি ইমেল নোটিফিকেশন পেতে চান কিনা তা নির্বাচন করুন।</p>
                        </div>
                    </div>

                    <div>
                        <Switch checked={selectedNotification.email} onCheckedChange={(checked) => setSelectedNotification({ ...selectedNotification, email: checked })} id="airplane-mode" />
                    </div>
                </div>

                <div className='flex items-center justify-between mt-10'>
                    <div className='flex items-center gap-2'>
                        {selectedNotification.updates ?
                            <Check size={19} className='bg-green-500 rounded-full p-1 text-white' /> :
                            <Check size={19} className='border rounded-full p-1 text-black' />
                        }
                        <div>
                            <h2 className='text-lg font-semibold'>আপডেট নোটিফিকেশন</h2>
                            <p className='text-sm text-neutral-500'>নতুন বৈশিষ্ট্য এবং উন্নতি।</p>
                        </div>
                    </div>

                    <div>
                        <Switch checked={selectedNotification.updates} onCheckedChange={(checked) => setSelectedNotification({ ...selectedNotification, updates: checked })} id="airplane-mode" />
                    </div>
                </div>
                <div className='flex items-center justify-between mt-10'>
                    <div className='flex items-center gap-2'>
                        {selectedNotification.safety ?
                            <Check size={19} className='bg-green-500 rounded-full p-1 text-white' /> :
                            <Check size={19} className='border rounded-full p-1 text-black' />
                        }
                        <div>
                            <h2 className='text-lg font-semibold'>নিরাপত্তা সতর্কতা</h2>
                            <p className='text-sm text-neutral-500'>নতুন ডিভাইস থেকে সাইন-ইন এবং নিরাপত্তা ইভেন্ট।।</p>
                        </div>
                    </div>

                    <div>
                        <Switch checked={selectedNotification.safety} onCheckedChange={(checked) => setSelectedNotification({ ...selectedNotification, safety: checked })} id="airplane-mode" />
                    </div>
                </div>

            </div>
        </div>
    )
}