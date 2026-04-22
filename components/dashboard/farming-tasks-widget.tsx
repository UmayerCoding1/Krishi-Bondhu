'use client'
import React from 'react';
import { SummaryCard } from './summary-card';
import { CalendarDays, CheckCircle2, Clock, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export const FarmingTasksWidget = () => {
    const tasks = [
        { id: 1, title: 'ধানের জমিতে নিড়ানি দেওয়া', time: 'আজকাল', status: 'pending', icon: Clock },
        { id: 2, title: 'সবজিতে জৈব সার প্রয়োগ', time: 'আগামীকাল', status: 'upcoming', icon: CalendarDays },
        { id: 3, title: 'পোকামাকড় দমনে ব্যবস্থা নেওয়া', time: '২ দিন পর', status: 'upcoming', icon: CalendarDays },
        { id: 4, title: 'ফসল কাটার প্রস্তুতি', time: 'সফল', status: 'completed', icon: CheckCircle2 },
    ];

    return (
        <SummaryCard
            title="কৃষি ক্যালেন্ডার"
            icon={CalendarDays}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
        >
            <div className="space-y-3 relative z-10">
                {tasks.map((task, index) => (
                    <motion.div
                        key={task.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="group/item flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-1.5 h-8 rounded-full transition-colors",
                                task.status === 'completed' ? "bg-emerald-500" : 
                                task.status === 'pending' ? "bg-orange-500 group-hover/item:bg-orange-400" :
                                "bg-emerald-500/20 group-hover/item:bg-emerald-500"
                            )} />
                            <div>
                                <p className={cn(
                                    "text-sm font-black transition-colors",
                                    task.status === 'completed' ? "text-neutral-500 line-through" : "text-neutral-800 dark:text-neutral-100"
                                )}>
                                    {task.title}
                                </p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{task.time}</p>
                            </div>
                        </div>
                        <div className={cn(
                            "p-2 rounded-xl transition-all duration-500 group-hover/item:scale-110",
                            task.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" :
                            task.status === 'pending' ? "bg-orange-500/10 text-orange-500" :
                            "bg-neutral-500/10 text-neutral-500"
                        )}>
                            <task.icon size={18} />
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="w-full mt-6 py-4 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-600 hover:text-white text-sm font-black rounded-[1.5rem] transition-all duration-500 shadow-lg shadow-emerald-600/5 active:scale-95">
                পুরো ক্যালেন্ডার দেখুন
            </button>
        </SummaryCard>
    );
};
