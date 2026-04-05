'use client'
import React from 'react';
import { SummaryCard } from './summary-card';
import { ChartNoAxesColumn, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            <div className="space-y-4">
                {prices.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                        <div>
                            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">{item.name}</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.unit} প্রতি</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-lg font-bold text-primary">৳ {item.price}</p>
                            {item.status === 'up' && <TrendingUp size={16} className="text-red-500" />}
                            {item.status === 'down' && <TrendingDown size={16} className="text-green-500" />}
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 text-xs font-bold rounded-xl transition-colors">
                সবগুলো দেখুন
            </button>
        </SummaryCard>
    );
};
