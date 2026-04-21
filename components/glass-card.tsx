'use client';

import { cn } from "@/lib/utils";


const GlassCard = ({ className, children, textColor = 'primary' }: { className?: string, children: React.ReactNode, textColor?: 'primary' | 'secondary' }) => {
    return (
        <div className={cn('backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg px-5  py-0.5 inline-block  ', textColor === 'primary' ? 'text-white' : 'text-white/70', className)}>
            {children}
        </div>
    )
}

export default GlassCard;