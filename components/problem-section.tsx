'use client'
import React from 'react';
import { Container } from './container';
import { HeaderHilight } from './header';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CloudOff, Leaf, Bug, TrendingDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const problems = [
    {
        icon: Leaf,
        title: 'সঠিক ফসল নির্বাচন কঠিন',
        description: 'মাটির ধরন, মৌসুম এবং বাজার চাহিদা না বুঝে সঠিক ফসল বেছে নেওয়া অনেক কৃষকের কাছে বড় চ্যালেঞ্জ।',
        stat: '৬৭%',
        statLabel: 'কৃষক সমস্যায় পড়েন',
        color: 'text-rose-500',
        bg: 'bg-rose-500/8 dark:bg-rose-500/10',
        border: 'border-rose-500/20',
        glow: 'bg-rose-500/10',
    },
    {
        icon: CloudOff,
        title: 'আবহাওয়ার তথ্য অপ্রাপ্য',
        description: 'সঠিক সময়ে বৃষ্টি, খরা বা ঝড়ের পূর্বাভাস না পেয়ে ফসল নষ্ট এবং বিনিয়োগ হারানো হয়।',
        stat: '৪৮ ঘণ্টা',
        statLabel: 'দেরিতে তথ্য পান',
        color: 'text-orange-500',
        bg: 'bg-orange-500/8 dark:bg-orange-500/10',
        border: 'border-orange-500/20',
        glow: 'bg-orange-500/10',
    },
    {
        icon: Bug,
        title: 'রোগ শনাক্তে বিলম্ব',
        description: 'ফসলে রোগের প্রথম লক্ষণ চেনা না যাওয়ায় দ্রুত ছড়িয়ে পড়ে এবং বড় ক্ষতির কারণ হয়।',
        stat: '৩০%',
        statLabel: 'ফসল নষ্ট হয় রোগে',
        color: 'text-amber-500',
        bg: 'bg-amber-500/8 dark:bg-amber-500/10',
        border: 'border-amber-500/20',
        glow: 'bg-amber-500/10',
    },
    {
        icon: TrendingDown,
        title: 'বাজার দর না জানা',
        description: 'সঠিক বাজার দর না জেনে ফসল বিক্রি করায় ন্যায্য মূল্য থেকে বঞ্চিত হন লক্ষ লক্ষ কৃষক।',
        stat: '৪০%',
        statLabel: 'লাভ কম পান',
        color: 'text-red-500',
        bg: 'bg-red-500/8 dark:bg-red-500/10',
        border: 'border-red-500/20',
        glow: 'bg-red-500/10',
    },
];

export const ProblemSection = () => {
    return (
        <section className="relative overflow-hidden py-4">
            {/* Subtle red-toned background blob */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/4 -right-32 w-md h-112 rounded-full bg-rose-500/5 blur-3xl dark:bg-rose-500/8"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl"
            />

            <Container>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* ── LEFT: Text + Problem Cards ── */}
                    <div className="flex-1 w-full">

                        {/* Eyebrow label */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-5"
                        >
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                                <AlertCircle className="w-3 h-3" />
                                বর্তমান চ্যালেঞ্জ
                            </span>
                        </motion.div>

                        {/* Section heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-4"
                        >
                            কৃষকরা প্রতিদিন যেসব{' '}
                            <br className="hidden md:block" />
                            <HeaderHilight type="danger">সমস্যার মুখে পড়েন</HeaderHilight>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mb-10"
                        >
                            সঠিক তথ্য ও প্রযুক্তির অভাবে বাংলাদেশের কৃষকরা প্রতি বছর কোটি কোটি টাকার ক্ষতির মুখে পড়েন।
                        </motion.p>

                        {/* Problem cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {problems.map((problem, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{
                                        duration: 0.55,
                                        delay: index * 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{ y: -4 }}
                                    className={cn(
                                        'group relative rounded-2xl p-5 border overflow-hidden transition-shadow duration-300 hover:shadow-lg',
                                        problem.bg,
                                        problem.border
                                    )}
                                >
                                    {/* Glow blob */}
                                    <div className={cn(
                                        'absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500',
                                        problem.glow
                                    )} />

                                    {/* Icon + stat row */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={cn(
                                            'w-10 h-10 rounded-xl flex items-center justify-center bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300',
                                        )}>
                                            <problem.icon className={cn('w-5 h-5', problem.color)} />
                                        </div>
                                        <div className="text-right">
                                            <p className={cn('text-xl font-black leading-none', problem.color)}>{problem.stat}</p>
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">{problem.statLabel}</p>
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-black text-foreground mb-1.5 leading-snug">
                                        {problem.title}
                                    </h3>
                                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                                        {problem.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div className={cn(
                                        'absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl',
                                        problem.color.replace('text-', 'bg-')
                                    )} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Image with floating badge ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full flex justify-center lg:justify-end relative"
                    >
                        {/* Decorative ring */}
                        <div className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-rose-200 dark:border-rose-900/40 pointer-events-none" />

                        <div className="relative w-full max-w-110">
                            <Image
                                src="/assets/confused-farmer.avif"
                                alt="একজন চিন্তিত কৃষক"
                                width={440}
                                height={520}
                                className="rounded-[2rem] w-full h-auto object-cover shadow-2xl shadow-rose-900/10"
                            />

                            {/* Floating "problem count" badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute -top-4 -left-4 bg-white dark:bg-neutral-900 border border-border rounded-2xl px-4 py-3 shadow-xl shadow-black/10 flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-rose-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">চ্যালেঞ্জ</p>
                                    <p className="text-lg font-black text-foreground leading-none">৪টি প্রধান</p>
                                </div>
                            </motion.div>

                            {/* Floating "affected farmers" badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: -10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute -bottom-4 -right-4 bg-white dark:bg-neutral-900 border border-border rounded-2xl px-4 py-3 shadow-xl shadow-black/10 flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center">
                                    <TrendingDown className="w-4 h-4 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">ক্ষতিগ্রস্ত</p>
                                    <p className="text-lg font-black text-foreground leading-none">১.৫ কোটি+</p>
                                </div>
                            </motion.div>

                            {/* Animated dots decoration */}
                            <div className="absolute top-1/2 -right-8 -translate-y-1/2 flex flex-col gap-2  lg:flex">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                        className="w-1.5 h-1.5 rounded-full bg-rose-400"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </Container>
        </section>
    );
};