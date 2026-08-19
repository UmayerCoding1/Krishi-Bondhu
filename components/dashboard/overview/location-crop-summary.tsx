'use client'

import React from 'react'
import { MapPin, Droplets, Eye, Leaf, ArrowRight, Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LocationCropSummaryProps {
    locationName: { area: string; city: string } | null
    cropAdvice: { name: string; task: string; status: string; urgent: boolean }[]
    onNavigate: (href: string) => void
}

export const LocationCropSummary = ({
    locationName,
    cropAdvice,
    onNavigate,
}: LocationCropSummaryProps) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Location Detail Card */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-md flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-emerald-500" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                            আপনার অবস্থান
                        </p>
                        <p className="text-base font-black text-neutral-900 dark:text-neutral-100 truncate">
                            {locationName?.area ?? 'অবস্থান খোঁজা হচ্ছে...'}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {locationName?.city ?? ''}
                        </p>
                    </div>
                </div>

                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl p-3.5 bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-sky-700 dark:text-sky-400 font-bold uppercase">
                                আর্দ্রতা
                            </p>
                            <Droplets size={12} className="text-sky-500" />
                        </div>
                        <p className="text-lg font-black text-sky-600 dark:text-sky-400">৬৫%</p>
                    </div>
                    <div className="rounded-2xl p-3.5 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-indigo-700 dark:text-indigo-400 font-bold uppercase">
                                দৃশ্যমানতা
                            </p>
                            <Eye size={12} className="text-indigo-500" />
                        </div>
                        <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">১০ কিমি</p>
                    </div>
                </div>
            </div>

            {/* Crop Advice Summary List */}
            <div className="relative rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-md flex-1 flex flex-col justify-between overflow-hidden">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <Leaf size={16} className="text-emerald-500" />
                            </div>
                            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                                ফসলের পরামর্শ
                            </h3>
                        </div>
                        <button
                            onClick={() => onNavigate('/crop-advice')}
                            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            <span>সব দেখুন</span>
                            <ArrowRight size={12} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        {cropAdvice.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 hover:border-emerald-500/40 transition-all"
                            >
                                <div
                                    className={cn(
                                        'w-8 h-8 rounded-xl flex items-center justify-center shrink-0',
                                        item.urgent
                                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                    )}
                                >
                                    <Sprout size={15} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                        {item.task}
                                    </p>
                                </div>
                                <span
                                    className={cn(
                                        'text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0',
                                        item.urgent
                                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                    )}
                                >
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
