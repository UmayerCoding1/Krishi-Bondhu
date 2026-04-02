'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

export const Logo = ({ className }: { className?: string }) => {
    const { theme } = useTheme();


    return (
        <div>
            {theme === 'dark' ? <Image src="/assets/dark-logo.png" className={cn(' object-cover', className)} alt="Logo" width={100} height={100} /> : <Image src="/assets/light-logo.png" className={cn('object-cover', className)} alt="Logo" width={100} height={100} />}
        </div>
    )
}
