'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { motion } from 'motion/react'

export const DashboardContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn('relative min-h-screen overflow-hidden px-3 py-2', className)}>
            {/* Background Animations */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    )
}