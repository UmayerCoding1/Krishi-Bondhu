'use client'
import React from 'react';
import { SummaryCard } from './summary-card';
import { ChartNoAxesColumn, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';


export const MarketPriceWidget = () => {
    const prices = [
        { name: 'সরু চাল', price: '৭৫', unit: 'কেজি', status: 'up' },
        { name: 'আলু', price: '৪০', unit: 'কেজি', status: 'down' },
        { name: 'পিঁয়াজ', price: '১১০', unit: 'কেজি', status: 'up' },
        { name: 'রসুন', price: '১৮০', unit: 'কেজি', status: 'stable' },
    ];

    return (
        <SummaryCard 
            title="বর্তমান বাজার দর" 
            icon={ChartNoAxesColumn}
            iconColor="text-blue-500"
            bgColor="bg-blue-500/10"
        >
            <div className="space-y-3 relative z-10">
                {prices.map((item, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="group/item flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-blue-500/20 rounded-full group-hover/item:bg-blue-500 transition-colors" />
                            <div>
                                <p className="text-sm font-black text-neutral-800 dark:text-neutral-100">{item.name}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">প্রতি {item.unit}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-xl font-black text-blue-600 dark:text-blue-400">৳ {item.price}</p>
                            </div>
                            <div className={cn(
                                "p-2 rounded-xl transition-transform duration-500 group-hover/item:scale-110",
                                item.status === 'up' ? "bg-red-500/10 text-red-500" : 
                                item.status === 'down' ? "bg-green-500/10 text-green-500" : 
                                "bg-neutral-500/10 text-neutral-500"
                            )}>
                                {item.status === 'up' && <TrendingUp size={18} />}
                                {item.status === 'down' && <TrendingDown size={18} />}
                                {item.status === 'stable' && <ChartNoAxesColumn size={18} className="opacity-50" />}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="w-full mt-6 py-4 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white text-sm font-black rounded-[1.5rem] transition-all duration-500 shadow-lg shadow-blue-600/5 active:scale-95">
                সবগুলো দেখুন
            </button>
        </SummaryCard>

    );
};
