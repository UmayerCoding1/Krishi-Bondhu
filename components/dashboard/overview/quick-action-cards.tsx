'use client'

import React from 'react'
import { ScanSearch, Zap, Bot, Star, ChartNoAxesColumn, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface MarketPriceItem {
    name: string
    price: string
    unit: string
    status: 'up' | 'down' | 'stable'
    change: string
}

interface QuickActionCardsProps {
    marketPrices: MarketPriceItem[]
    onNavigate: (href: string) => void
}

export const QuickActionCards = ({ marketPrices, onNavigate }: QuickActionCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Disease Detection Action Card */}
            <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-md group cursor-pointer"
                onClick={() => onNavigate('/disease-detection')}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ScanSearch size={22} className="text-amber-500" />
                            </div>
                            <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                                <Zap size={10} /> AI ভিশন
                            </span>
                        </div>
                        <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 mb-1.5">
                            রোগ শনাক্তকরণ
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                            আক্রান্ত পাতার ছবি দিয়ে ৩ সেকেন্ডে রোগ চিনুন এবং সঠিক বালাইনাশকের পরামর্শ নিন।
                        </p>
                    </div>
                    <button className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
                        <span>ছবি আপলোড করুন</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </motion.div>

            {/* AI Chatbot Action Card */}
            <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-md group cursor-pointer"
                onClick={() => onNavigate('/ai-chatbot')}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Bot size={22} className="text-purple-500" />
                            </div>
                            <span className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                                <Star size={10} /> ২৪/৭ হেল্প
                            </span>
                        </div>
                        <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 mb-1.5">
                            এআই চ্যাটবট
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                            যেকোনো কৃষি বিষয়ক সমস্যার প্রশ্ন করুন — আমাদের বিশেষজ্ঞ AI সার্বক্ষণিক উত্তর দেবে।
                        </p>
                    </div>
                    <button className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2">
                        <span>কথা বলুন AI-এর সাথে</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </motion.div>

            {/* Market Prices Action Card */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-md md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
                            <ChartNoAxesColumn size={18} className="text-sky-500" />
                        </div>
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                            বর্তমান বাজার দর
                        </h3>
                    </div>
                    <button
                        onClick={() => onNavigate('/market-price')}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        <span>সব দেখুন</span>
                        <ArrowRight size={12} />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {marketPrices.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 hover:border-sky-500/30 transition-all"
                        >
                            <div>
                                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                    {item.name}
                                </p>
                                <p className="text-[10px] text-neutral-400">প্রতি {item.unit}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-sm font-black text-neutral-900 dark:text-neutral-100">
                                    ৳ {item.price}
                                </p>
                                <span
                                    className={cn(
                                        'text-[10px] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5',
                                        item.status === 'up'
                                            ? 'bg-red-500/10 text-red-500'
                                            : item.status === 'down'
                                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'bg-neutral-500/10 text-neutral-500'
                                    )}
                                >
                                    {item.status === 'up' && <TrendingUp size={11} />}
                                    {item.status === 'down' && <TrendingDown size={11} />}
                                    {item.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
