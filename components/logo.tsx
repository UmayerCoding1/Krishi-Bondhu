'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

export const Logo = ({ className }: { className?: string }) => {
    const { theme } = useTheme();


    return (
        <div className="relative w-32 h-10">
            <Image
                src={theme === 'dark' ? "/assets/dark-logo.png" : "/assets/light-logo.png"}
                alt="Logo"
                fill
                priority
                className="object-contain"
            />
        </div>
    )
}
