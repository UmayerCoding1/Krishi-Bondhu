'use client'
import React from 'react'
import { Container } from './container'
import { HeaderHilight } from './header'
import { BotMessageSquare, MapPin, CheckCircle2, ArrowRight, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

const steps = [
    {
        index: 1,
        label: 'ধাপ ০১',
        title: 'তথ্য দিন',
        description: 'আপনার বর্তমান অবস্থান, মৌসুম এবং মাটির ধরন নির্বাচন করুন। মাত্র কয়েক সেকেন্ড লাগবে।',
        Icon: MapPin,
        stat: '৩০ সেকেন্ড',
        statLabel: 'সময় লাগে',
        color: 'text-sky-500',
        bg: 'bg-sky-500/10 dark:bg-sky-500/10',
        border: 'border-sky-500/25',
        glow: 'bg-sky-400/20',
        iconRing: 'ring-sky-500/20',
        indexColor: 'text-sky-500',
        accentFrom: 'from-sky-400',
        accentTo: 'to-blue-500',
    },
    {
        index: 2,
        label: 'ধাপ ০২',
        title: 'AI বিশ্লেষণ',
        description: 'আমাদের উন্নত AI আপনার তথ্য বিশ্লেষণ করে সবচেয়ে স্মার্ট পরামর্শ তৈরি করবে।',
        Icon: BotMessageSquare,
        stat: '৯৮%',
        statLabel: 'নির্ভুলতা',
        color: 'text-violet-500',
        bg: 'bg-violet-500/10 dark:bg-violet-500/10',
        border: 'border-violet-500/25',
        glow: 'bg-violet-400/20',
        iconRing: 'ring-violet-500/20',
        indexColor: 'text-violet-500',
        accentFrom: 'from-violet-400',
        accentTo: 'to-purple-500',
    },
    {
        index: 3,
        label: 'ধাপ ০৩',
        title: 'সিদ্ধান্ত নিন',
        description: 'সবচেয়ে লাভজনক ফসলের পরামর্শ গ্রহণ করুন এবং নিশ্চিন্তে চাষ শুরু করুন।',
        Icon: CheckCircle2,
        stat: '৪০%',
        statLabel: 'বেশি লাভ',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
        border: 'border-emerald-500/25',
        glow: 'bg-emerald-400/20',
        iconRing: 'ring-emerald-500/20',
        indexColor: 'text-emerald-500',
        accentFrom: 'from-emerald-400',
        accentTo: 'to-teal-500',
    },
]

export const WorksSection = () => {
    return (
        <section className="relative overflow-hidden py-6">
            {/* Ambient blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-48 rounded-full bg-violet-500/5 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -right-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl"
            />

            <Container>
                {/* ── Section header ── */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-5"
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-violet-600 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                            <Rocket className="w-3 h-3" />
                            কীভাবে কাজ করে
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-4"
                    >
                        মাত্র ৩টি সহজ ধাপে{' '}
                        <HeaderHilight type="success">শুরু করুন</HeaderHilight>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg"
                    >
                        আপনার জমির জন্য সেরা সিদ্ধান্ত নিতে মাত্র কয়েক সেকেন্ড সময় লাগে।
                    </motion.p>
                </div>

                {/* ── Steps ── */}
                <div className="relative flex flex-col md:flex-row items-stretch gap-6 md:gap-4">

                    {/* Dashed connector line (desktop) */}
                    <div className="hidden md:block absolute top-[4.5rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px border-t-2 border-dashed border-border z-0" />

                    {/* Animated travelling dot */}
                    <motion.div
                        className="hidden md:block absolute top-[calc(4.5rem-3px)] w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50 z-10"
                        animate={{ left: ['16.66%', '83.33%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.index}
                            initial={{ opacity: 0, y: 32, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ y: -6 }}
                            className={cn(
                                'group relative flex-1 rounded-2xl p-6 border overflow-hidden',
                                'transition-shadow duration-300 hover:shadow-xl',
                                step.bg,
                                step.border
                            )}
                        >
                            {/* Glow blob */}
                            <div
                                className={cn(
                                    'absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500',
                                    step.glow
                                )}
                            />

                            {/* Step label */}
                            <p className={cn('text-[10px] font-black uppercase tracking-[0.15em] mb-4', step.color)}>
                                {step.label}
                            </p>

                            {/* Icon circle */}
                            <div
                                className={cn(
                                    'relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 z-10',
                                    'bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm ring-4',
                                    step.iconRing,
                                    'group-hover:scale-110 transition-transform duration-300'
                                )}
                            >
                                {/* Gradient backdrop */}
                                <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20', step.accentFrom, step.accentTo)} />
                                <step.Icon className={cn('w-7 h-7 relative z-10', step.color)} />

                                {/* Step index badge */}
                                <div className={cn(
                                    'absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 border-2 flex items-center justify-center text-[10px] font-black shadow-md',
                                    step.border,
                                    step.indexColor
                                )}>
                                    {step.index}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-black text-foreground mb-2 leading-snug">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[12.5px] text-muted-foreground leading-relaxed mb-5">
                                {step.description}
                            </p>

                            {/* Stat pill */}
                            <div className={cn(
                                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border',
                                step.bg,
                                step.border,
                                step.color
                            )}>
                                {step.stat}
                                <span className="font-normal text-muted-foreground">{step.statLabel}</span>
                            </div>

                            {/* Arrow on non-last steps (desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex absolute -right-2 top-[4rem] z-20 items-center justify-center w-4 h-4">
                                    <ArrowRight className={cn('w-4 h-4', step.color)} />
                                </div>
                            )}

                            {/* Bottom gradient accent line */}
                            <div className={cn(
                                'absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl bg-gradient-to-r',
                                step.accentFrom,
                                step.accentTo
                            )} />
                        </motion.div>
                    ))}
                </div>

                {/* ── CTA strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 flex justify-center"
                >
                    <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-sm font-semibold text-foreground">
                            এখনই শুরু করুন —{' '}
                            <span className="text-emerald-600 font-black">বিনামূল্যে</span>
                        </p>
                        <ArrowRight className="w-4 h-4 text-emerald-500" />
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}
