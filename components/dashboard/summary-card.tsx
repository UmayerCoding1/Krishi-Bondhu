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
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                'glass p-6 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden group transition-all duration-500',
                className
            )}
        >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={cn(
                    'w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3',
                    bgColor || 'bg-primary/20'
                )}>
                    <Icon className={cn('w-6 h-6', iconColor || 'text-primary')} />
                </div>
                <div>
                    <h3 className='font-black text-lg text-neutral-900 dark:text-neutral-100 leading-tight'>{title}</h3>
                    <div className="w-8 h-1 bg-primary/30 rounded-full mt-1 group-hover:w-12 transition-all duration-500" />
                </div>
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

