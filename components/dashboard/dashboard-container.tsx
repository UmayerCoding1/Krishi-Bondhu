import { cn } from '@/lib/utils'
import React from 'react'

export const DashboardContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn('px-3 py-2', className)}>
            {children}
        </div>
    )
}