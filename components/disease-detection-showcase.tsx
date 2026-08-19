'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Container } from './container'
import { HeaderHilight } from './header'
import { motion, AnimatePresence } from 'motion/react'
import {
    Scan,
    Sparkles,
    AlertTriangle,
    ShieldCheck,
    CheckCircle2,
    Activity,
    Info,
    ArrowRight,
    Search,
    Stethoscope,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DiseaseData {
    id: string
    nameBn: string
    nameEn: string
    cropBn: string
    confidence: number
    severity: string
    severityColor: string
    symptoms: string[]
    treatments: string[]
    prevention: string[]
    hotspot: { top: string; left: string }
}

const diseases: DiseaseData[] = [
    {
        id: 'rice-blast',
        nameBn: 'ধানের ব্লাস্ট রোগ',
        nameEn: 'Rice Blast Disease',
        cropBn: 'ধান (Rice)',
        confidence: 98.4,
        severity: 'উচ্চ ঝুঁকিপূর্ণ',
        severityColor: 'text-red-500 bg-red-500/10 border-red-500/20',
        symptoms: [
            'পাতায় চোখের মতো উভয় প্রান্ত সরু বাদামী বা ধুসর রঙের দাগ।',
            'দাগগুলোর মাঝখানের অংশ সাদাটে বা ছাই রঙের হয়ে থাকে।',
            'তীব্র আক্রমণে কান্ড ও শীষ শুকিয়ে মরে যায় এবং ফলন ব্যাপক হ্রাস পায়।',
        ],
        treatments: [
            'ট্রাইসাইক্লাজল ৭৫% (Tricyclazole) প্রজাতি ছত্রাকনাশক প্রতি লিটার পানিতে ০.৭৫ গ্রাম মিশিয়ে স্প্রে করুন।',
            'জমির পানি শুকিয়ে ২-৩ দিন পর আবার সেচ দিন এবং নাইট্রোজেন সার প্রয়োগ সাময়িক বন্ধ রাখুন।',
            'সকালে শিশির ভেজা অবস্থায় গাছে হাত দেবেন না যাতে ছত্রাক না ছড়ায়।',
        ],
        prevention: [
            'রোগমুক্ত ও শোধিত মানসম্পন্ন বীজ ব্যবহার করুন।',
            'সুষম মাত্রায় পটাশ (MOP) সার ব্যবহার নিশ্চিত করুন।',
            'ব্লাস্ট প্রতিরোধী উন্নত জাত (যেমন- বিআরআরআই ধান২৮/২৯) সঠিক মৌসুমে চাষ করুন।',
        ],
        hotspot: { top: '38%', left: '42%' },
    },
    {
        id: 'tomato-late-blight',
        nameBn: 'টমেটোর লেট ব্লাইট',
        nameEn: 'Tomato Late Blight',
        cropBn: 'টমেটো (Tomato)',
        confidence: 96.8,
        severity: 'মাঝারি ঝুঁকিপূর্ণ',
        severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        symptoms: [
            'পাতার কিনারায় ও ডগায় পানিসেঁচা বাদামী রঙের দ্রুত প্রসারমাণ দাগ।',
            'আর্দ্র আবহাওয়ায় পাতার নিচের পিঠে সাদা তুলোর মতো ছত্রাকের আস্তরণ।',
            'কান্ড ও ফলে দ্রুত পচন ধরে কাঁচা ফল কালো হয়ে যায়।',
        ],
        treatments: [
            'ম্যানকোজেব (Mancozeb 80% WP) প্রতি লিটার পানিতে ২ গ্রাম হারে ৫-৭ দিন পর পর ভালো করে স্প্রে করুন।',
            'আক্রান্ত গাছের পাতা ও ডালপালা তুলে দূরে মাটিতে পুঁতে ফেলুন।',
        ],
        prevention: [
            'গাছের গোড়ায় পানি জমতে দেবেন না এবং ভালো আলো-বাতাস চলাচলের ব্যবস্থা রাখুন।',
            'লতা জাতীয় টমেটো গাছে বাঁশের খুঁটি ও মাচা সঠিকভাবে ব্যবহার করুন।',
        ],
        hotspot: { top: '55%', left: '60%' },
    },
    {
        id: 'corn-leaf-spot',
        nameBn: 'ভুট্টার লিফ ব্লাইট',
        nameEn: 'Corn Northern Leaf Blight',
        cropBn: 'ভুট্টা (Maize/Corn)',
        confidence: 97.2,
        severity: 'নিয়ন্ত্রণযোগ্য',
        severityColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        symptoms: [
            'পাতায় লম্বাটে ডিঙি নৌকার মতো আকারে জলছাপের মতো লম্বা দাগ।',
            'দাগগুলো ধীরে ধীরে ধূসর বাদামী বর্ণ ধারণ করে পুরো পাতা শুকিয়ে ফেলে।',
        ],
        treatments: [
            'প্রপিকোনাজল (Propiconazole 25% EC) ১ মিলি প্রতি লিটার পানিতে মিশিয়ে রোগ দেখার সাথে সাথে স্প্রে করুন।',
            'সুষম সার প্রয়োগ ও নাইট্রোজেনের সাথে অতিরিক্ত পটাশ সার মিশ্রিত করুন।',
        ],
        prevention: [
            'ফসল কাটার পর জমির অবশিষ্টাংশ পুড়িয়ে বা গভীর চাষ দিয়ে ধ্বংস করুন।',
            'অনুকূল আবহাওয়া হলে ৭ দিন পর পর নিয়মিত পরিদর্শন করুন।',
        ],
        hotspot: { top: '25%', left: '30%' },
    },
]

export const DiseaseDetectionShowcase = () => {
    const [selectedId, setSelectedId] = useState<string>('rice-blast')
    const activeDisease = diseases.find((d) => d.id === selectedId) || diseases[0]

    return (
        <section className="relative overflow-hidden py-12 md:py-16">
            {/* Ambient Background Blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/10"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-teal-500/8 blur-3xl dark:bg-teal-500/10"
            />

            <Container>
                {/* ── Section Header ── */}
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                            <Sparkles className="w-3.5 h-3.5" />
                            AI প্রযুক্তি মোড
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-4 text-neutral-900 dark:text-neutral-100 max-w-2xl"
                    >
                        ফসলের রোগ চিনুন,{' '}
                        <HeaderHilight type="success">সমাধান জানুন</HeaderHilight> AI-এর মাধ্যমে
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl"
                    >
                        আপনার ফসলের মাত্র একটি ছবি তুলে আমাদের AI মডেল মাত্র ৩ সেকেন্ডে নির্ভুল রোগ শনাক্ত করে কার্যকর ওষুধ ও প্রতিকার বলে দেবে।
                    </motion.p>

                    {/* Disease Selector Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                    >
                        {diseases.map((d) => {
                            const isSelected = d.id === selectedId
                            return (
                                <button
                                    key={d.id}
                                    onClick={() => setSelectedId(d.id)}
                                    className={cn(
                                        'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2',
                                        isSelected
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-[1.02]'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                                    )}
                                >
                                    <Stethoscope className="w-3.5 h-3.5" />
                                    {d.nameBn}
                                </button>
                            )
                        })}
                    </motion.div>
                </div>

                {/* ── Main Showcase Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* ── LEFT COLUMN: Interactive Animated Scanner Image Card (5 Cols) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-neutral-950 shadow-2xl p-2 group">
                            
                            {/* Leaf Photo Frame */}
                            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                                <Image
                                    src="/assets/crop-leaf-disease.png"
                                    alt="আক্রান্ত পাতার ছবি"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Matrix Grid Scanner Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

                                {/* Animated Scanning Laser Line */}
                                <motion.div
                                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981,0_0_8px_#34d399] z-20"
                                    animate={{ top: ['5%', '92%', '5%'] }}
                                    transition={{
                                        duration: 3.2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Animated Laser Glow Backdrop */}
                                <motion.div
                                    className="absolute left-0 right-0 h-16 bg-gradient-to-b from-emerald-500/25 to-transparent pointer-events-none z-10"
                                    animate={{ top: ['0%', '85%', '0%'] }}
                                    transition={{
                                        duration: 3.2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Hotspot Bounding Box */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDisease.id}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            top: activeDisease.hotspot.top,
                                            left: activeDisease.hotspot.left,
                                        }}
                                        className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                                    >
                                        {/* Bounding box corners */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                                        
                                        {/* Target Center Dot & Pulsing Ring */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="relative flex h-4 w-4">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white shadow-md"></span>
                                            </span>
                                        </div>

                                        {/* Mini Tooltip Badge */}
                                        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900/90 text-white border border-red-500/40 text-[9px] font-mono px-2 py-0.5 rounded shadow-lg backdrop-blur-md">
                                            রোগ শনাক্ত এলাকা
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Top Floating Badge: AI Scanning status */}
                                <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md border border-emerald-500/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl">
                                    <Scan className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                    <span>AI লাইভ স্ক্যানার</span>
                                </div>

                                {/* Bottom Floating Badge: Accuracy Speed */}
                                <div className="absolute bottom-4 right-4 z-30 bg-neutral-950/80 backdrop-blur-md border border-white/10 text-emerald-400 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold shadow-xl flex items-center gap-1.5">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>সময়: 0.8s</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT COLUMN: AI Analysis & Diagnosis UI Card (7 Cols) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDisease.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35 }}
                                className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl relative overflow-hidden"
                            >
                                {/* Background Accent Glow */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                                {/* 1. Disease Header Row */}
                                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                                                {activeDisease.cropBn}
                                            </span>
                                            <span className={cn('text-[11px] font-bold px-2.5 py-0.5 rounded-md border', activeDisease.severityColor)}>
                                                {activeDisease.severity}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 leading-tight">
                                            {activeDisease.nameBn}
                                        </h3>
                                        <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">
                                            {activeDisease.nameEn}
                                        </p>
                                    </div>

                                    {/* Confidence Score Gauge */}
                                    <div className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 p-3.5 rounded-2xl flex flex-col items-end min-w-[130px]">
                                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                                            AI নির্ভুলতা
                                        </span>
                                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none my-1">
                                            {activeDisease.confidence}%
                                        </span>
                                        {/* Progress Bar */}
                                        <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mt-1">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${activeDisease.confidence}%` }}
                                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Symptoms Section */}
                                <div className="py-5 border-b border-neutral-100 dark:border-neutral-800">
                                    <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                        লক্ষণসমূহ (Symptoms)
                                    </h4>
                                    <ul className="space-y-2">
                                        {activeDisease.symptoms.map((symptom, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                                                <span>{symptom}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 3. Recommended Treatment */}
                                <div className="py-5 border-b border-neutral-100 dark:border-neutral-800">
                                    <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        প্রস্তাবিত চিকিৎসা (Recommended Treatment)
                                    </h4>
                                    <div className="space-y-2">
                                        {activeDisease.treatments.map((treatment, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-500/15 flex items-start gap-3"
                                            >
                                                <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                                    {treatment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Prevention Tips */}
                                <div className="pt-5">
                                    <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                                        প্রতিরোধমূলক পরামর্শ (Prevention Tips)
                                    </h4>
                                    <ul className="space-y-2">
                                        {activeDisease.prevention.map((tip, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}