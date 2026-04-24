'use client'
import { Bell, Check } from 'lucide-react';
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const NotificationSetting = () => {
    const { user } = useAuth();
    const [selectedNotification, setSelectedNotification] = useState<{ email: boolean, system_notification: boolean, safety_alert: boolean }>({ email: user?.system_config.notification.email ?? false, system_notification: user?.system_config.notification.system_notification ?? false, safety_alert: user?.system_config.notification.safety_alert ?? false });
    const [loading, setLoading] = useState(false);
    const handleNotificationChange = async (type: string, value: boolean) => {
        try {
            setLoading(true);
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/notification`, { type, value }, { withCredentials: true });
            console.log(response.data, 'response data')
            if (response.status === 200) {
                setSelectedNotification({ ...selectedNotification, [type]: value });
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    console.log(user)
    console.log(selectedNotification)
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
                        <Switch checked={selectedNotification.email} onCheckedChange={(checked) => handleNotificationChange("email", checked)} id="airplane-mode" />
                    </div>
                </div>

                <div className='flex items-center justify-between mt-10'>
                    <div className='flex items-center gap-2'>
                        {selectedNotification.system_notification ?
                            <Check size={19} className='bg-green-500 rounded-full p-1 text-white' /> :
                            <Check size={19} className='border rounded-full p-1 text-black' />
                        }
                        <div>
                            <h2 className='text-lg font-semibold'>আপডেট নোটিফিকেশন</h2>
                            <p className='text-sm text-neutral-500'>নতুন বৈশিষ্ট্য এবং উন্নতি।</p>
                        </div>
                    </div>

                    <div>
                        <Switch checked={selectedNotification.system_notification} onCheckedChange={(checked) => handleNotificationChange("system_notification", checked)} id="airplane-mode" />
                    </div>
                </div>
                <div className='flex items-center justify-between mt-10'>
                    <div className='flex items-center gap-2'>
                        {selectedNotification.safety_alert ?
                            <Check size={19} className='bg-green-500 rounded-full p-1 text-white' /> :
                            <Check size={19} className='border rounded-full p-1 text-black' />
                        }
                        <div>
                            <h2 className='text-lg font-semibold'>নিরাপত্তা সতর্কতা</h2>
                            <p className='text-sm text-neutral-500'>নতুন ডিভাইস থেকে সাইন-ইন এবং নিরাপত্তা ইভেন্ট।।</p>
                        </div>
                    </div>

                    <div>
                        <Switch checked={selectedNotification.safety_alert} onCheckedChange={(checked) => handleNotificationChange("safety_alert", checked)} id="airplane-mode" />
                    </div>
                </div>

            </div>
        </div>
    )
}