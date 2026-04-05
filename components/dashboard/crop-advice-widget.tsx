'use client'
import React from 'react';
import { SummaryCard } from './summary-card';
import { Leaf, Sprout, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

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
            iconColor="text-green-500"
            bgColor="bg-green-500/10"
        >
            <div className="space-y-4">
                {recommendations.map((item, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{item.name}</p>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-bold uppercase">{item.status}</span>
                            </div>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{item.task}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 text-xs font-bold rounded-xl transition-colors">
                আরো পরামর্শ দেখুন
            </button>
        </SummaryCard>
    );
};
