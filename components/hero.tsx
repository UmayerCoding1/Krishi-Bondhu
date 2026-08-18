'use client'
import Image from 'next/image'
import React from 'react'
import { AppButton } from './app-button'
import { ArrowRight, Play, Sun, Leaf, CannabisOff, ChartNoAxesColumn, ChevronDown, Sparkles } from 'lucide-react'
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

/* ── Floating stat badge ─────────────────────────────────────────── */
const StatBadge = ({
    value,
    label,
    delay,
    className,
}: {
    value: string;
    label: string;
    delay: number;
    className?: string;
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className={`absolute hidden md:flex flex-col items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white/60 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl shadow-black/10 ${className ?? ''}`}
    >
        <span className="text-xl font-black text-primary leading-none">{value}</span>
        <span className="text-[10px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap">{label}</span>
    </motion.div>
);

/* ── Inline feature pill ─────────────────────────────────────────── */
const FeaturePill = ({
    icon,
    label,
    delay,
}: {
    icon: React.ReactNode;
    label: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-black/8 dark:border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-foreground/80 shadow-sm"
    >
        {icon}
        {label}
    </motion.div>
);

export const Hero = () => {
    const { user } = useAuth();
    const route = useRouter();

    return (
        <section className="relative h-[88vh] md:h-[calc(100vh-4px)] overflow-hidden">

            {/* ── Background image ── */}
            <Image
                src="/assets/hero-banner.png"
                alt="একজন কৃষক মাঠে দাঁড়িয়ে স্মার্টফোন ব্যবহার করছেন"
                fill
                priority
                className="object-cover object-center"
            />

            {/* ── Layered gradient overlays ── */}
            <div className="absolute inset-0 bg-linear-to-r from-white/97 via-white/78 to-white/5 dark:from-slate-950/98 dark:via-slate-950/78 dark:to-transparent" />
            {/* bottom page-transition fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />

            {/* ── Decorative green radial glow behind content ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute -left-20 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/12 blur-3xl dark:bg-primary/8"
            />

            {/* ── Floating stat badges (desktop only) ── */}
            <StatBadge
                value="১০,০০০+"
                label="নিবন্ধিত কৃষক"
                delay={1.0}
                className="right-[44%] top-24"
            />
            <StatBadge
                value="৯৮%"
                label="রোগ শনাক্তের নির্ভুলতা"
                delay={1.2}
                className="right-[34%] bottom-36"
            />

            {/* ── Main content column ── */}
            <div className="relative h-full flex flex-col justify-center px-6 md:px-14 lg:px-20 max-w-3xl">

                {/* Tag pill */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/8 text-primary text-[11px] font-semibold px-3.5 py-1.5 rounded-full tracking-wide">
                        <Sparkles className="w-3 h-3" />
                        AI প্রযুক্তিতে আধুনিক কৃষি সেবা
                    </span>
                </motion.div>

                {/* Desktop heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden md:block text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight leading-[1.08]"
                >
                    স্মার্ট কৃষি হোক
                    <br />
                    <span className="relative inline-block">
                        <span className="text-gradient">সহজ ও লাভজনক</span>
                        {/* animated underline */}
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.9, duration: 0.55, ease: 'easeOut' }}
                            style={{ originX: 0 }}
                            className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-linear-to-r from-primary to-secondary"
                        />
                    </span>
                </motion.h1>

                {/* Mobile heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="md:hidden text-4xl font-black tracking-tight leading-[1.15] pt-10"
                >
                    কৃষকের <span className="text-gradient">সঠিক সিদ্ধান্ত</span>
                    <br />
                    এখন আরও সহজ
                </motion.h1>

                {/* Sub-copy */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                    className="mt-5 text-[13.5px] md:text-sm lg:text-[15px] font-medium max-w-md leading-relaxed text-foreground/65"
                >
                    আবহাওয়া, ফসল পরামর্শ, রোগ নির্ণয়, বাজার দর এবং AI চ্যাটবট —
                    সবই এক প্ল্যাটফর্মে। আপনার কৃষি জীবনের বিশ্বস্ত সহযোগী।
                </motion.p>

                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                    className="mt-8 flex flex-wrap items-center gap-3"
                >
                    <AppButton
                        onClick={() => route.push('/auth')}
                        className="h-14 px-8 text-base rounded-full shadow-xl shadow-green-500/30 hover:scale-[1.03] transition-transform"
                    >
                        এখনই শুরু করুন <ArrowRight className="ml-2 w-5 h-5" />
                    </AppButton>

                    <button className="group flex items-center gap-3 px-5 h-14 rounded-full border border-zinc-300/80 dark:border-zinc-700 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                            <Play className="w-4 h-4 fill-primary text-primary ml-0.5" />
                        </div>
                        <span className="font-semibold text-sm">ভিডিও দেখুন</span>
                    </button>
                </motion.div>

                {/* Feature pills */}
                <div className="mt-7 flex flex-wrap gap-2">
                    <FeaturePill icon={<Sun className="w-3.5 h-3.5 text-yellow-500" />} label="আবহাওয়া তথ্য" delay={0.65} />
                    <FeaturePill icon={<Leaf className="w-3.5 h-3.5 text-primary" />} label="ফসলের পরামর্শ" delay={0.75} />
                    <FeaturePill icon={<CannabisOff className="w-3.5 h-3.5 text-orange-500" />} label="রোগ শনাক্ত" delay={0.85} />
                    <FeaturePill icon={<ChartNoAxesColumn className="w-3.5 h-3.5 text-blue-500" />} label="বাজার দর" delay={0.95} />
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
            >
                <span className="text-[9px] font-medium tracking-[0.2em] uppercase">স্ক্রোল</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.div>

        </section>
    );
};
