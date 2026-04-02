'use client'
import React from 'react'
import { Container } from './container'
import { cn } from '@/lib/utils'

export const Header = ({ children, className, textPosition = 'left' }: { children: React.ReactNode, className?: string, textPosition?: 'center' | 'left' | 'right' }) => {
    return (

        <div className={cn(className, 'w-full flex flex-col items-center justify-center h-16 my-10', textPosition === 'left' ? 'items-start' : textPosition === 'right' ? 'items-end' : 'items-center')}>
            {children}
        </div>

    )
};



export const HeaderTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h2 className={cn('text-4xl font-bold', className)}>
            {children}
        </h2>
    )
}

export const HeaderDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <p className={cn(className, 'text-sm text-neutral-500 dark:text-neutral-400')}>
            {children}
        </p>
    )
}

export const HeaderHilight = ({ children, type = 'default' }: { children: React.ReactNode, type?: 'danger' | 'warning' | 'success' | 'default' }) => {
    return (

        <span className={cn(type === 'danger' ? 'text-red-500' : type === 'warning' ? 'text-yellow-500' : type === 'success' ? 'text-green-500' : type === 'default' ? 'text-black dark:text-white' : 'text-primary',)}>
            {children}
        </span>

    )
};