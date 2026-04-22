import React from 'react'
import { motion } from 'motion/react';
import { FlaskConical, X, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
export const AiAlert = ({ setIsShowSiteInfo, sessionName }: { setIsShowSiteInfo: (value: boolean) => void, sessionName: string }) => {
    const handleClose = () => {
        setIsShowSiteInfo(false);
        sessionStorage.setItem(sessionName, 'false');
    }
    return (
        <motion.div
            key="dev-notice-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='fixed top-0 left-0 backdrop-blur-sm w-full h-full flex items-center justify-center z-50 bg-black/30'
        >
            <motion.div
                key="dev-notice-modal"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                className='w-[90%] max-w-[480px] rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden'
            >
                {/* Header stripe */}
                <Card className='py-0'>
                    <div className='bg-linear-to-r from-red-900 via-red-800  to-transparent dark:from-red-900 dark:via-red-800  dark:to-transparent text-black px-6 py-3 flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <FlaskConical size={16} className='text-neutral-300' />
                            <span className='text-neutral-300 text-sm font-semibold tracking-wide'>ডেভেলপমেন্ট মোড · Development Mode</span>
                        </div>
                        <button
                            onClick={handleClose}
                            className='text-black/80 hover:text-neutral-900 transition-colors rounded-full p-0.5 hover:bg-neutral-/20 cursor-pointer'
                            aria-label='Close notice'
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className='px-7 py-6 flex flex-col gap-5'>
                        {/* Icon + Title */}
                        <div className='flex items-start gap-4'>
                            <div className='bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-xl p-3 shrink-0'>
                                <Zap size={24} />
                            </div>
                            <div>
                                <h2 className='text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100'>
                                    বিনামূল্যে AI ব্যবহার করা হচ্ছে
                                </h2>
                                <p className='text-[13px] text-amber-600 dark:text-amber-400 font-medium mt-0.5'>
                                    Free AI — For Development Only
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                            এই ফিচারটি বর্তমানে একটি <span className='font-semibold text-neutral-800 dark:text-neutral-200'>বিনামূল্যে AI সার্ভিস</span> ব্যবহার করছে,
                            যা শুধুমাত্র ডেভেলপমেন্টের উদ্দেশ্যে ব্যবহার করা হচ্ছে।
                            ডেভেলপমেন্ট সম্পন্ন হলে একটি <span className='font-semibold text-neutral-800 dark:text-neutral-200'>পেইড ও শক্তিশালী AI</span> দিয়ে
                            প্রতিস্থাপন করা হবে।
                        </p>
                        <p className='text-[12px] text-neutral-400 dark:text-neutral-500 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4'>
                            This service currently runs on a <strong>free AI</strong> for development purposes only.
                            After development is complete, it will be replaced with a <strong>paid and more powerful AI</strong>.
                        </p>

                        {/* CTA */}
                        <Button
                            onClick={handleClose}
                            className='w-full mt-1 dark:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-sm shadow-md h-12'
                        >
                            বুঝেছি, চালিয়ে যান →
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    )
}