'use client'

import React from 'react'
import { CheckCircle2, Lightbulb, ShieldCheck, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DailyTask {
    title: string
    category: string
}

interface DailyTasksAdvisoryProps {
    dailyTasks: DailyTask[]
    completedTasks: number[]
    toggleTask: (index: number) => void
    onNavigate: (href: string) => void
}

export const DailyTasksAdvisory = ({
    dailyTasks,
    completedTasks,
    toggleTask,
    onNavigate,
}: DailyTasksAdvisoryProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Daily Checklist Card (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-md flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 size={20} className="text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                                    আজকের মাঠপর্যায়ের কাজসমূহ
                                </h3>
                                <p className="text-xs text-neutral-400">
                                    ফসল সুরক্ষায় দৈনন্দিন গুরুত্বপূর্ণ করণীয়
                                </p>
                            </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {completedTasks.length} / {dailyTasks.length} সম্পন্ন
                        </span>
                    </div>

                    <div className="space-y-2.5">
                        {dailyTasks.map((task, idx) => {
                            const isDone = completedTasks.includes(idx)
                            return (
                                <div
                                    key={idx}
                                    onClick={() => toggleTask(idx)}
                                    className={cn(
                                        'p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3',
                                        isDone
                                            ? 'bg-emerald-500/5 border-emerald-500/30 line-through opacity-75'
                                            : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200/70 dark:border-neutral-800 hover:border-emerald-500/40'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                                            isDone
                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                : 'border-neutral-300 dark:border-neutral-600'
                                        )}
                                    >
                                        {isDone && <CheckCircle2 size={13} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                            {task.title}
                                        </p>
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                                            {task.category}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Smart AI Advisory Callout Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 blur-3xl pointer-events-none" />

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-neutral-900 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            <Lightbulb size={13} className="text-amber-500" />
                            আজকের স্মার্ট টিপস
                        </span>
                    </div>

                    <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100 mb-2">
                        সুষম পটাশ সারের গুরুত্ব
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                        ধান ও সবজি গাছে রোগের প্রাদুর্ভাব কমাতে নাইট্রোজেনের সাথে সুষম মাত্রায় MOP (পটাশ) সার প্রয়োগ করুন। এতে গাছের কান্ড শক্ত হয় এবং রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি পায়।
                    </p>
                </div>

                <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck size={14} />
                        কৃষি বিজ্ঞানী অনুমোদিত
                    </span>
                    <button
                        onClick={() => onNavigate('/ai-chatbot')}
                        className="font-bold text-neutral-900 dark:text-neutral-100 hover:text-emerald-600 transition-colors flex items-center gap-1"
                    >
                        <span>আরও জানুন</span>
                        <ArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}
