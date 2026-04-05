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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className={cn(
                'glass p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300',
                className
            )}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                    'p-2 rounded-xl flex items-center justify-center',
                    bgColor || 'bg-primary/10'
                )}>
                    <Icon className={cn('w-5 h-5', iconColor || 'text-primary')} />
                </div>
                <h3 className='font-bold text-neutral-900 dark:text-neutral-100'>{title}</h3>
            </div>
            <div>
                {children}
            </div>
        </motion.div>
    );
};
