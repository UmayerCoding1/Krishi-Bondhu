'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Sparkles,
    HelpCircle,
    ArrowRight,
    Headphones,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react'

export interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
    badge?: string
}

export interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
    activeLink: string
    TopNavLinks: NavItem[]
    BottomNavLinks?: NavItem[]
}

export const Sidebar = ({
    isOpen,
    onClose,
    activeLink,
    TopNavLinks,
    BottomNavLinks = [],
}: SidebarProps) => {

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
                        staggerChildren: 0.08,
                        type: 'spring',
                        damping: 25,
                        stiffness: 200,
                    },
                },
            }}
            className="w-64 h-[calc(100vh-4rem)] border-r shadow-lg bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-neutral-200/80 dark:border-neutral-800 overflow-y-auto flex flex-col justify-between select-none"
        >
            {/* ── Top Navigation Group ── */}
            <div className="py-5 px-2">
                {/* Section Header */}
                <div className="px-4 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                        প্রধান মেনু
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="space-y-1">
                    {TopNavLinks.map((link, index) => {
                        const isActive = activeLink === link.href
                        return (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, x: -16 },
                                    show: { opacity: 1, x: 0 },
                                }}
                                className="relative px-1"
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => {
                                        if (typeof window !== 'undefined' && window.innerWidth < 768 && onClose) {
                                            onClose()
                                        }
                                    }}
                                    className={cn(
                                        'flex items-center justify-between py-2.5 px-3.5 rounded-xl transition-all duration-300 group relative text-xs sm:text-sm font-semibold',
                                        isActive
                                            ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                                    )}
                                >
                                    {/* Active Background Pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-xl"
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    {/* Active Left Indicator Bar */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-bar"
                                            className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-500 rounded-full"
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <div className="flex items-center gap-3 relative z-10">
                                        <motion.div
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={cn(
                                                'relative z-10 transition-colors',
                                                isActive ? 'text-emerald-500' : 'text-neutral-400 dark:text-neutral-500 group-hover:text-emerald-500'
                                            )}
                                        >
                                            {link.icon}
                                        </motion.div>

                                        <span className="relative z-10 truncate">{link.title}</span>
                                    </div>

                                    {/* Optional Badge or Arrow */}
                                    {link.badge ? (
                                        <span className="relative z-10 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                            {link.badge}
                                        </span>
                                    ) : (
                                        isActive && (
                                            <ChevronRight className="w-3.5 h-3.5 text-emerald-500 relative z-10 opacity-70" />
                                        )
                                    )}

                                    {/* Hover Backdrop */}
                                    {!isActive && (
                                        <div className="absolute inset-0 bg-neutral-100/70 dark:bg-neutral-800/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    )}
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* ── Bottom Section: Support Card & Bottom Nav ── */}
            <div className="py-4 px-2 space-y-4">
                {/* Support Callout Banner */}
                <div className="mx-2 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 relative overflow-hidden group">
                    <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                            এআই সাহায্য প্রয়োজন?
                        </p>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2.5">
                        যেকোনো প্রশ্ন বা তথ্যের জন্য আমাদের এআই অ্যাসিস্ট্যান্ট প্রস্তুত।
                    </p>
                    <Link
                        href="/ai-chatbot"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                        <span>চ্যাট শুরু করুন</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Bottom Nav Links */}
                {BottomNavLinks.length > 0 && (
                    <div>
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                                অ্যাকাউন্ট ও সহায়তা
                            </span>
                        </div>
                        <div className="space-y-1">
                            {BottomNavLinks.map((link, index) => {
                                const isActive = activeLink === link.href
                                return (
                                    <motion.div
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, x: -16 },
                                            show: { opacity: 1, x: 0 },
                                        }}
                                        className="relative px-1"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => {
                                                if (typeof window !== 'undefined' && window.innerWidth < 768 && onClose) {
                                                    onClose()
                                                }
                                            }}
                                            className={cn(
                                                'flex items-center justify-between py-2.5 px-3.5 rounded-xl transition-all duration-300 group relative text-xs sm:text-sm font-semibold',
                                                isActive
                                                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-pill-bottom"
                                                    className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-xl"
                                                    initial={false}
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 350,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}

                                            <div className="flex items-center gap-3 relative z-10">
                                                <motion.div
                                                    whileHover={{ scale: 1.15 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={cn(
                                                        'relative z-10 transition-colors',
                                                        isActive ? 'text-emerald-500' : 'text-neutral-400 dark:text-neutral-500 group-hover:text-emerald-500'
                                                    )}
                                                >
                                                    {link.icon}
                                                </motion.div>

                                                <span className="relative z-10 truncate">{link.title}</span>
                                            </div>

                                            {!isActive && (
                                                <div className="absolute inset-0 bg-neutral-100/70 dark:bg-neutral-800/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                            )}
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* System Active Footer Indicator */}
                <div className="mx-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>কৃষি বন্ধু v2.0</span>
                    </div>
                    <span className="text-emerald-500 font-bold">• অনলাইন</span>
                </div>
            </div>
        </motion.div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block sticky top-16">
                {SidebarContent}
            </div>

            {/* Mobile Sidebar Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
                        />
                        {/* Drawer Container */}
                        <div className="fixed inset-y-0 left-0 z-50 md:hidden pt-16">
                            {SidebarContent}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}