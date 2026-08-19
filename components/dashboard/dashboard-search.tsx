'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    Search,
    Command,
    Sprout,
    ScanSearch,
    ChartNoAxesColumn,
    Bot,
    User,
    Settings,
    LayoutDashboard,
    Users,
    FolderCog,
    ArrowRight,
    X,
    Clock,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSearchStore } from '@/store/useSearchStore'

export interface SearchRouteItem {
    title: string
    subtitle: string
    href: string
    category: 'মূল সেবা' | 'অ্যাকাউন্ট' | 'এডমিন প্যানেল'
    icon: React.ReactNode
    keywords: string[]
}

const defaultRoutes: SearchRouteItem[] = [
    {
        title: 'ফসল পরামর্শ (Crop Advice)',
        subtitle: 'মাটি ও ঋতু অনুযায়ী উপযুক্ত ফসল চাষের নির্দেশিকা',
        href: '/crop-advice',
        category: 'মূল সেবা',
        icon: <Sprout className="w-4 h-4 text-emerald-500" />,
        keywords: ['crop', 'advice', 'ফসল', 'পরামর্শ', 'চাষ', 'মাটি'],
    },
    {
        title: 'রোগ শনাক্তকরণ (Disease Detection)',
        subtitle: 'এআই ভিশন প্রযুক্তি দিয়ে ৩ সেকেন্ডে গাছের রোগ নির্ণয়',
        href: '/disease-detection',
        category: 'মূল সেবা',
        icon: <ScanSearch className="w-4 h-4 text-amber-500" />,
        keywords: ['disease', 'detection', 'রোগ', 'শনাক্তকরণ', 'পাতা', 'পোকা'],
    },
    {
        title: 'বাজার দর (Market Price)',
        subtitle: 'দেশজুড়ে বিভিন্ন ফসলের রিয়েলটাইম পাইকারি দাম',
        href: '/market-price',
        category: 'মূল সেবা',
        icon: <ChartNoAxesColumn className="w-4 h-4 text-sky-500" />,
        keywords: ['market', 'price', 'বাজার', 'দর', 'দাম', 'চাল', 'আলু'],
    },
    {
        title: 'এআই চ্যাটবট (AI Assistant)',
        subtitle: '২৪/৭ যেকোনো কৃষি বিষয়ক প্রশ্ন করুন ও তাৎক্ষণিক সমাধান পান',
        href: '/ai-chatbot',
        category: 'মূল সেবা',
        icon: <Bot className="w-4 h-4 text-purple-500" />,
        keywords: ['bot', 'ai', 'chat', 'চ্যাটবট', 'সাহায্য', 'উত্তর'],
    },
    {
        title: 'ওভারভিউ ড্যাশবোর্ড (Overview)',
        subtitle: 'লাইভ আবহাওয়া, কৃষকের দৈনিক কাজ ও সর্বশেষ তথ্য',
        href: '/',
        category: 'মূল সেবা',
        icon: <LayoutDashboard className="w-4 h-4 text-indigo-500" />,
        keywords: ['overview', 'dashboard', 'ড্যাশবোর্ড', 'ওভারভিউ', 'হোম'],
    },
    {
        title: 'প্রোফাইল (Profile)',
        subtitle: 'আপনার ব্যক্তিগত ও খামারের তথ্য হালনাগাদ করুন',
        href: '/profile',
        category: 'অ্যাকাউন্ট',
        icon: <User className="w-4 h-4 text-emerald-600" />,
        keywords: ['profile', 'user', 'প্রোফাইল', 'অ্যাকাউন্ট'],
    },
    {
        title: 'সেটিংস (Settings)',
        subtitle: 'নোটিফিকেশন, ভাষা ও থিম সেটিংস পরিবর্তন করুন',
        href: '/settings',
        category: 'অ্যাকাউন্ট',
        icon: <Settings className="w-4 h-4 text-neutral-500" />,
        keywords: ['settings', 'config', 'সেটিংস', 'থিম'],
    },
    {
        title: 'ব্যবহারকারী ব্যবস্থাপনা (User Management)',
        subtitle: 'সকল ইউজার, কৃষক ও এডমিন তালিকা পরিচালনা',
        href: '/dashboard/admin/user-management',
        category: 'এডমিন প্যানেল',
        icon: <Users className="w-4 h-4 text-emerald-500" />,
        keywords: ['admin', 'users', 'management', 'ব্যবহারকারী', 'এডমিন'],
    },
    {
        title: 'সিস্টেম রিপোর্ট (System Report)',
        subtitle: 'সার্ভার ও এআই রোগ শনাক্তকরণ রিপোর্ট',
        href: '/dashboard/admin/system-report',
        category: 'এডমিন প্যানেল',
        icon: <FolderCog className="w-4 h-4 text-rose-500" />,
        keywords: ['admin', 'report', 'system', 'রিপোর্ট'],
    },
]

export const DashboardSearch = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const searchRef = useRef<HTMLDivElement>(null)

    const {
        query,
        setQuery,
        selectedTitle,
        setSelectedOption,
        addRecentSearch,
        recentSearches,
        clearQuery,
    } = useSearchStore()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const filteredResults = defaultRoutes.filter((item) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return (
            item.title.toLowerCase().includes(q) ||
            item.subtitle.toLowerCase().includes(q) ||
            item.keywords.some((k) => k.toLowerCase().includes(q))
        )
    })

    const handleSelectRoute = (item: SearchRouteItem) => {
        setSelectedOption(item.title, item.href)
        addRecentSearch(item.title, item.href, item.category)
        setIsOpen(false)
        router.push(item.href)
    }

    return (
        <>
            <div className="relative flex items-center gap-2 border border-neutral-200 dark:border-neutral-700/80 rounded-xl h-10 px-3 bg-neutral-50/80 dark:bg-neutral-800/80 hover:border-emerald-500/50 transition-all w-full sm:w-64 md:w-80 group shadow-xs">
                <Search
                    onClick={() => setIsOpen(true)}
                    size={14}
                    className="text-neutral-400 group-hover:text-emerald-500 transition-colors cursor-pointer shrink-0"
                />

                <div
                    onClick={() => setIsOpen(true)}
                    className="flex-1 text-xs text-neutral-400 truncate cursor-pointer"
                >
                    {selectedTitle ? (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {selectedTitle}
                        </span>
                    ) : query ? (
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                            {query}
                        </span>
                    ) : (
                        <span>পছন্দের সেবা বা পেজ খুঁজুন...</span>
                    )}
                </div>

                {query || selectedTitle ? (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            clearQuery()
                        }}
                        className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-red-500 transition-colors"
                        title="সার্চ রিসেট করুন"
                    >
                        <X size={13} />
                    </button>
                ) : (
                    <div
                        onClick={() => setIsOpen(true)}
                        className="hidden sm:flex items-center gap-0.5 bg-neutral-200/60 dark:bg-neutral-700 px-1.5 py-0.5 rounded-md text-[10px] font-mono text-neutral-500 dark:text-neutral-400 font-bold border border-neutral-300/40 dark:border-neutral-600 cursor-pointer"
                    >
                        <Command size={10} /> <span>K</span>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 font-display">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            ref={searchRef}
                            className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
                        >
                            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-100 dark:border-neutral-800">
                                <Search className="w-5 h-5 text-emerald-500 shrink-0" />
                                <input
                                    type="text"
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="কী খুঁজতে চান টাইপ করুন (যেমন: ফসল, রোগ, দাম)..."
                                    className="w-full bg-transparent text-sm font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none placeholder:text-neutral-400"
                                />
                                {query && (
                                    <button
                                        onClick={clearQuery}
                                        className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {recentSearches.length > 0 && !query && (
                                <div className="px-4 py-2 bg-neutral-50/70 dark:bg-neutral-800/40 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 shrink-0">
                                        <Clock className="w-3 h-3 text-emerald-500" />
                                        <span>সাম্প্রতিক:</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {recentSearches.map((rec) => (
                                            <button
                                                key={rec.href}
                                                onClick={() => {
                                                    setSelectedOption(rec.title, rec.href)
                                                    setIsOpen(false)
                                                    router.push(rec.href)
                                                }}
                                                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 transition-all truncate max-w-[140px]"
                                            >
                                                {rec.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="overflow-y-auto p-2 space-y-1 divide-y divide-neutral-100 dark:divide-neutral-800/40">
                                {filteredResults.length > 0 ? (
                                    filteredResults.map((item) => (
                                        <div
                                            key={item.href}
                                            onClick={() => handleSelectRoute(item)}
                                            className="p-3 rounded-2xl cursor-pointer flex items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 border border-transparent transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-3.5 min-w-0">
                                                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                    {item.icon}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-[11px] text-neutral-400 truncate">
                                                        {item.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                                                    {item.category}
                                                </span>
                                                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center text-xs text-neutral-400">
                                        অনুরোধের সম্পর্কিত কোনো পেজ পাওয়া যায়নি।
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                                <span>নেভিগেশন হিস্ট্রি এবং সার্চ স্টেট স্থায়ীভাবে সংরক্ষিত</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    কৃষি বন্ধু অনুসন্ধান
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
