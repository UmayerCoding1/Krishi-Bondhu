'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    iconColor?: string;
    bgColor?: string;
}

export const SummaryCard = ({ title, icon: Icon, children, className, iconColor, bgColor }: SummaryCardProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
            }}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
                'glass p-7 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all duration-500 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl',
                className
            )}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Glowing Corner */}
            <div className={cn(
                "absolute -top-10 -right-10 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700",
                bgColor || 'bg-primary/40'
            )} />

            <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6',
                    bgColor || 'bg-primary/20 backdrop-blur-md'
                )}>
                    <Icon className={cn('w-7 h-7', iconColor || 'text-primary')} />
                </div>
                <div className="space-y-1">
                    <h3 className='font-black text-xl text-neutral-900 dark:text-neutral-100 tracking-tight leading-none'>{title}</h3>
                    <div className="w-6 h-1 bg-primary/40 rounded-full transition-all duration-500 group-hover:w-16" />
                </div>
            </div>

            <div className="relative z-10 text-neutral-700 dark:text-neutral-300">
                {children}
            </div>
        </motion.div>
    );
};

