'use client';

import { cn } from "@/lib/utils";


const GlassCard = ({ className, children, textColor = 'primary', gradient = true }: {
    className?: string,
    children: React.ReactNode,
    textColor?: 'primary' | 'secondary',
    gradient?: boolean
}) => {
    return (
        <div className={cn(
            'relative overflow-hidden transition-all duration-300',
            'backdrop-blur-xl bg-white/10 dark:bg-black/20',
            'border border-white/20 dark:border-white/10',
            'rounded-2xl shadow-premium dark:shadow-premium-dark',
            textColor === 'primary' ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-white/70',
            className
        )}>
            {gradient && (
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

export default GlassCard;