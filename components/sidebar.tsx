'use client'
import { cn } from '@/lib/utils';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import { DashboardSvg } from './button/dashboard-svg';
import { CropSvg } from './button/crop-svg';
import { DiseaseSvg } from './button/disease-svg';
import { ChartSvg } from './button/chart-svg';
import { BootSvg } from './button/boot-svg';

export const Sidebar = ({ isOpen, onClose, activeLink, TopNavLinks }: { isOpen?: boolean, onClose?: () => void, activeLink: string, TopNavLinks: { title: string, href: string, icon: React.ReactNode }[] }) => {






    const SidebarContent = (
        <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
                hidden: { x: -264, opacity: 0 },
                show: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                    }
                }
            }}
            className='w-64 h-[calc(100vh-4rem)] border-r shadow-md dark:bg-neutral-800 border-neutral-200 dark:border-neutral-600 overflow-y-auto bg-white '
        >
            <div className="py-4">
                {
                    TopNavLinks.map((link, index) => {
                        const isActive = activeLink === link.href;
                        return (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    show: { opacity: 1, x: 0 }
                                }}
                                className="relative px-3 mb-1"
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => {
                                        if (window.innerWidth < 768 && onClose) {
                                            onClose();
                                        }
                                    }}
                                    className={cn(
                                        'flex items-center gap-3 py-2.5 px-4 rounded-xl transition-colors duration-200 group relative',
                                        isActive ? 'text-primary' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-xl"
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 350,
                                                damping: 30
                                            }}
                                        />
                                    )}

                                    {isActive && (
                                        <motion.div
                                            layoutId="active-bar"
                                            className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full"
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 350,
                                                damping: 30
                                            }}
                                        />
                                    )}

                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative z-10"
                                    >
                                        {link.icon}
                                    </motion.div>

                                    <span className="text-sm font-medium relative z-10">
                                        {link.title}
                                    </span>

                                    {!isActive && (
                                        <motion.div
                                            className="absolute inset-0 bg-neutral-100 dark:bg-neutral-700/50 rounded-xl opacity-0 group-hover:opacity-100 -z-10"
                                            initial={false}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })
                }
            </div>
        </motion.div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden md:block sticky top-16'>
                {SidebarContent}
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden'
                        />
                        {/* Drawer */}
                        <div className='fixed inset-y-0 left-0 z-50 md:hidden pt-16'>
                            {SidebarContent}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
