'use client'
import { cn } from '@/lib/utils';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { CropSvg } from '../button/crop-svg';
import { DiseaseSvg } from '../button/disease-svg';
import { DashboardSvg } from '../button/dashboard-svg';
import { ChartSvg } from '../button/chart-svg';
import { BootSvg } from '../button/boot-svg';
import { motion, AnimatePresence } from 'motion/react';

export const DashboardSidebar = () => {
    const [activeLink, setActiveLink] = useState('/');
    const navLinks = [
        {
            title: 'ওভারভিউ',
            href: '/',
            icon: (
                <DashboardSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'ফসল পরামর্শ',
            href: '/dashboard/crop-advice',
            icon: (
                <CropSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/crop-advice' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'রোগ সনাক্তকরণ',
            href: '/dashboard/disease-detection',
            icon: (
                <DiseaseSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/disease-detection' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },

        {
            title: 'বাজার দর',
            href: '/dashboard/market-price',
            icon: (
                <ChartSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/market-price' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'এআই চ্যাটবট',
            href: '/dashboard/ai-chatbot',
            icon: (
                <BootSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/ai-chatbot' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        }
    ];
    const pathName = usePathname();


    useEffect(() => {
        setActiveLink(pathName);
    }, [pathName]);
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className='w-64 h-[calc(100vh-4rem)] border-r shadow-md dark:bg-neutral-800 border-neutral-200 dark:border-neutral-600 overflow-y-auto'
        >
            <div className="py-4">
                {
                    navLinks.map((link, index) => {
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
                                    className={cn(
                                        'flex items-center gap-3 py-2.5 px-4 rounded-xl transition-colors duration-200 group relative',
                                        isActive ? 'text-primary' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                                    )}
                                >
                                    {/* Active background indicator */}
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

                                    {/* Active side indicator */}
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

                                    {/* Hover effect for non-active items */}
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
    )
}