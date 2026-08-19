'use client'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { HeaderHilight } from './header'
import { motion } from 'motion/react'
import { Leaf, CloudSun, Bug, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const solutions = [
    {
        icon: Leaf,
        title: 'স্মার্ট ফসল পরামর্শ',
        description: 'মাটি, মৌসুম ও বাজার বিশ্লেষণ করে AI সবচেয়ে লাভজনক ফসলের পরামর্শ দেয়।',
        stat: '৯২%',
        statLabel: 'সঠিক পরামর্শ',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/8 dark:bg-emerald-500/10',
        border: 'border-emerald-500/20',
        glow: 'bg-emerald-500/10',
    },
    {
        icon: CloudSun,
        title: 'রিয়েল-টাইম আবহাওয়া',
        description: 'আপনার এলাকার সঠিক আবহাওয়ার পূর্বাভাস সরাসরি ফোনে পান।',
        stat: '২৪/৭',
        statLabel: 'আপডেট',
        color: 'text-sky-500',
        bg: 'bg-sky-500/8 dark:bg-sky-500/10',
        border: 'border-sky-500/20',
        glow: 'bg-sky-500/10',
    },
    {
        icon: Bug,
        title: 'দ্রুত রোগ শনাক্ত',
        description: 'ছবি তুললেই AI তাৎক্ষণিকভাবে ফসলের রোগ শনাক্ত করে সমাধান দেয়।',
        stat: '৩ সেকেন্ড',
        statLabel: 'শনাক্ত সময়',
        color: 'text-violet-500',
        bg: 'bg-violet-500/8 dark:bg-violet-500/10',
        border: 'border-violet-500/20',
        glow: 'bg-violet-500/10',
    },
    {
        icon: TrendingUp,
        title: 'লাইভ বাজারদর',
        description: 'সারা দেশের বাজারের সর্বশেষ দর তুলনা করে সেরা দামে বিক্রি করুন।',
        stat: '৪০%',
        statLabel: 'বেশি লাভ',
        color: 'text-amber-500',
        bg: 'bg-amber-500/8 dark:bg-amber-500/10',
        border: 'border-amber-500/20',
        glow: 'bg-amber-500/10',
    },
]

export const SolutionSection = () => {
    return (
        <section className="relative overflow-hidden py-4">
            {/* Subtle green-toned background blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/8"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -right-24 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl"
            />

            <Container>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* ── LEFT: Image with floating badges ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full flex justify-center lg:justify-start relative order-2 lg:order-1"
                    >
                        {/* Decorative ring */}
                        <div className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-emerald-200 dark:border-emerald-900/40 pointer-events-none" />

                        <div className="relative w-full max-w-[440px]">
                            <Image
                                src="/assets/happy-farmar.avif"
                                alt="একজন সুখী কৃষক"
                                width={440}
                                height={520}
                                className="rounded-[2rem] w-full h-auto object-cover shadow-2xl shadow-emerald-900/10"
                            />

                            {/* Floating "solution count" badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute -top-4 -right-4 bg-white dark:bg-neutral-900 border border-border rounded-2xl px-4 py-3 shadow-xl shadow-black/10 flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">সমাধান</p>
                                    <p className="text-lg font-black text-foreground leading-none">৪টি স্মার্ট</p>
                                </div>
                            </motion.div>

                            {/* Floating "farmers helped" badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: -10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-900 border border-border rounded-2xl px-4 py-3 shadow-xl shadow-black/10 flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-xl bg-sky-500/15 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-sky-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">উপকৃত</p>
                                    <p className="text-lg font-black text-foreground leading-none">৫০,০০০+</p>
                                </div>
                            </motion.div>

                            {/* Animated dots decoration */}
                            <div className="absolute top-1/2 -left-8 -translate-y-1/2 flex-col gap-2 hidden lg:flex">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Text + Solution Cards ── */}
                    <div className="flex-1 w-full order-1 lg:order-2">

                        {/* Eyebrow label */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-5"
                        >
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                                <Sparkles className="w-3 h-3" />
                                আমাদের সমাধান
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
                            কৃষি বন্ধু কীভাবে{' '}
                            <br className="hidden md:block" />
                            <HeaderHilight type="success">সাহায্য করে</HeaderHilight>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mb-10"
                        >
                            আমাদের AI প্রযুক্তি আপনার মাটি, মৌসুম ও ফসল অনুযায়ী সঠিক পরামর্শ দেয় — সহজে, বাংলায়, আপনার হাতের মুঠোয়।
                        </motion.p>

                        {/* Solution cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {solutions.map((solution, index) => (
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
                                        solution.bg,
                                        solution.border
                                    )}
                                >
                                    {/* Glow blob */}
                                    <div className={cn(
                                        'absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500',
                                        solution.glow
                                    )} />

                                    {/* Icon + stat row */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={cn(
                                            'w-10 h-10 rounded-xl flex items-center justify-center bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300',
                                        )}>
                                            <solution.icon className={cn('w-5 h-5', solution.color)} />
                                        </div>
                                        <div className="text-right">
                                            <p className={cn('text-xl font-black leading-none', solution.color)}>{solution.stat}</p>
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">{solution.statLabel}</p>
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-black text-foreground mb-1.5 leading-snug">
                                        {solution.title}
                                    </h3>
                                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                                        {solution.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div className={cn(
                                        'absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl',
                                        solution.color.replace('text-', 'bg-')
                                    )} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
