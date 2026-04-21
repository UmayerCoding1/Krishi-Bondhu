'use client'
import React from 'react';
import { SummaryCard } from './summary-card';
import { Leaf, Sprout, Droplets } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';


export const CropAdviceWidget = () => {
    const recommendations = [
        { name: 'বোরো ধান', task: 'সার প্রয়োগ', icon: <Sprout size={16} />, status: 'সময় উপযোগী' },
        { name: 'ভুট্টা', task: 'সেচ প্রদান', icon: <Droplets size={16} />, status: 'অতি জরুরি' },
        { name: 'আলু', task: 'সংগ্রহ করুন', icon: <Leaf size={16} />, status: 'সংগ্রহের সময়' },
    ];

    return (
        <SummaryCard
            title="ফসলের পরামর্শ"
            icon={Leaf}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
        >
            <div className="space-y-3 relative z-10">
                {recommendations.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="group/item flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 transition-transform duration-500 group-hover/item:scale-110 group-hover/item:rotate-6",
                            item.status === 'অতি জরুরি' ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                        )}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-black text-neutral-800 dark:text-neutral-100">{item.name}</p>
                                <span className={cn(
                                    "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter",
                                    item.status === 'অতি জরুরি' ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                                )}>
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{item.task}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="w-full mt-6 py-4 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-600 hover:text-white text-sm font-black rounded-[1.5rem] transition-all duration-500 shadow-lg shadow-emerald-600/5 active:scale-95">
                আরো পরামর্শ দেখুন
            </button>
        </SummaryCard>

    );
};
