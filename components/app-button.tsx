'use client'

import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export const AppButton = ({ children, className, buttonType = 'primary' }: { children: React.ReactNode, className?: string, buttonType?: "primary" | "secondary" | "outline" }) => {
    return (
        <Button className={cn(
            buttonType === 'primary' && 'bg-linear-to-r from-primary to-secondary text-white hover:bg-secondary/50 dark:hover:bg-secondary/80 flex items-center justify-center',
            buttonType === 'secondary' && 'bg-secondary  hover:bg-secondary/50 dark:hover:bg-secondary/80 flex items-center justify-center font-semibold',
            className, "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0  gap-1 px-2.5 text-[12px] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5 h-[31px] rounded-lg cursor-pointer"
        )} size={'lg'}>{children}</Button>
    )
}