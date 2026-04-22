'use client'
import React from 'react';
import { SummaryCard } from './summary-card';
import { Sprout, Landmark, CalendarCheck2, Droplets, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export const FarmStatsWidget = () => {
    const stats = [
        { label: 'মোট জমির পরিমাণ', value: '৪৫ বিঘা', icon: Landmark, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'নিবন্ধিত ফসল', value: '৪টি', icon: Sprout, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'পরবর্তী ফসল সংগ্রহ', value: '১২ দিন পর', icon: CalendarCheck2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'মাটির আর্দ্রতা', value: '৬৫%', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    ];

    return (
        <SummaryCard
            title="খামার পরিসংখ্যান"
            icon={TrendingUp}
            iconColor="text-indigo-500"
            bgColor="bg-indigo-500/10"
        >
            <div className="grid grid-cols-2 gap-4 relative z-10">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="group/stat p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                        <div className="flex flex-col gap-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover/stat:scale-110 transition-transform`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-extrabold">{stat.label}</p>
                                <p className="text-lg font-black text-neutral-800 dark:text-neutral-100">{stat.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-indigo-600/5 border border-indigo-600/10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-neutral-500">সামগ্রিক লক্ষ্যমাত্রা</p>
                    <p className="text-xs font-black text-indigo-600">৮৫%</p>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full bg-indigo-600 rounded-full"
                    />
                </div>
            </div>
        </SummaryCard>
    );
};
