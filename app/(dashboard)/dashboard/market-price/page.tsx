'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Bell, Zap, RefreshCw, BarChart3, TrendingUp, Sparkles, Store, LineChart, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const PulseSystemIcon = () => (
    <div className="relative">
        {/* Outer Glow */}
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute inset-0 bg-primary/30 blur-3xl rounded-full"
        />

        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="relative z-10 bg-white dark:bg-neutral-800 p-6 rounded-3xl shadow-2xl border border-primary/20"
        >
            <Store className="w-16 h-16 text-primary" />

            {/* Thinking Dots */}
            <div className="absolute -top-1 -right-1 flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        className="w-2 h-2 bg-primary rounded-full"
                    />
                ))}
            </div>
        </motion.div>
    </div>
)

const ShimmerProgress = () => (
    <div className="w-full max-w-md space-y-3">
        <div className="flex justify-between items-end">
            <div className="flex items-center gap-2 text-primary font-medium">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span className="text-sm">অবস্থা: তথ্য সজ্জা চলছে...</span>
            </div>
            <span className="text-xs text-neutral-500 font-mono">৪৮.২% সম্পন্ন</span>
        </div>

        <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 relative">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "48%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-primary relative"
            >
                {/* Shimmer Effect */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
            </motion.div>
        </div>

        <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest">
            ডেটা সংগ্রহ করা হচ্ছে: বাজার_দর_২০২৫
        </p>
    </div>
)

export default function MarketPricePage() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 group">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/4 -right-20 w-80 h-80 bg-green-500/5 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-2xl text-center space-y-12"
            >
                {/* Hero Section */}
                <div className="flex flex-col items-center space-y-8">
                    <PulseSystemIcon />

                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>আপনার ড্যাশবোর্ডে শীঘ্রই আসছে</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 transition-colors">
                            ⚡ বাজার দর বিশ্লেষণ ও পূর্বাভাস
                        </h1>

                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
                            আমরা একটি আধুনিক সিস্টেম তৈরি করছি যা বাজার প্রবণতা, চাহিদা এবং ঋতুভিত্তিক তথ্য বিশ্লেষণ করে আপনাকে ফসলের সঠিক দামের পূর্বাভাস দেবে।
                        </p>
                    </div>
                </div>

                {/* Progress Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass p-8 rounded-[2rem] space-y-8 relative overflow-hidden"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-white/20">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-neutral-500">ট্রেন্ড বিশ্লেষণ</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-white/20">
                                <PieChart className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-neutral-500">চাহিদার পূর্বাভাস</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-2xl bg-white/50 dark:bg-neutral-800/50 border border-white/20">
                                <LineChart className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-neutral-500">রিয়েল-টাইম তথ্য</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-700/50">
                        <ShimmerProgress />

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                onClick={() => {
                                    toast.success('বাজার দর বিশ্লেষণ ও পূর্বাভাস সুবিধা আসলে আপনাকে জানানো হবে', { duration: 1500 })
                                }}
                            >
                                <Bell className="w-4 h-4" />
                                আমাকে জানান
                            </Button>

                            <div className="px-6 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium flex items-center gap-2">
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 bg-orange-500 rounded-full"
                                />
                                প্রত্যাশিত মুক্তি: শীঘ্রই
                            </div>
                        </div>
                    </div>

                    {/* Interior Glow Overlay */}
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary/10 blur-[80px] -z-10" />
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-primary/10 blur-[80px] -z-10" />
                </motion.div>

                <p className="text-xs text-neutral-400 dark:text-neutral-500 italic">
                    সর্বোচ্চ নির্ভুলতার জন্য স্থানীয় বাজার ও নিয়মিত তথ্য আপডেট ব্যবস্থা ব্যবহার করা হচ্ছে।
                </p>
            </motion.div>
        </div>
    )
}
