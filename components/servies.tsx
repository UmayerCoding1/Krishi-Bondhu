'use client'
import {
    CannabisOff,
    ChartNoAxesColumn,
    Leaf,
    Sun,
    Zap,
    ShieldCheck,
    Users,
    ArrowRight,
} from 'lucide-react'
import { Container } from './container'
import { HeaderHilight } from './header'
import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const services = [
    {
        title: 'আবহাওয়া তথ্য',
        description: 'বৃষ্টি, তাপমাত্রা ও বাতাসের রিয়েল-টাইম তথ্য জানুন সরাসরি আপনার স্মার্টফোনে।',
        Icon: Sun,
        stat: '২৪/৭',
        statLabel: 'আপডেট',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/8 dark:bg-yellow-500/10',
        border: 'border-yellow-500/20',
        glow: 'bg-yellow-400/15',
        accentFrom: 'from-yellow-400',
        accentTo: 'to-orange-400',
    },
    {
        title: 'ফসলের পরামর্শ',
        description: 'মাটি ও মৌসুম অনুযায়ী কোন ফসল করবেন এবং সম্ভাব্য লাভ কত হতে পারে তার সঠিক গাইডলাইন।',
        Icon: Leaf,
        stat: '৯২%',
        statLabel: 'সঠিকতা',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/8 dark:bg-emerald-500/10',
        border: 'border-emerald-500/20',
        glow: 'bg-emerald-400/15',
        accentFrom: 'from-emerald-400',
        accentTo: 'to-teal-400',
    },
    {
        title: 'রোগ শনাক্ত',
        description: 'AI প্রযুক্তির মাধ্যমে ছবির সাহায্যে দ্রুত এবং নির্ভুলভাবে ফসলের রোগ শনাক্ত করুন।',
        Icon: CannabisOff,
        stat: '৩ সেকেন্ড',
        statLabel: 'সনাক্ত সময়',
        color: 'text-orange-500',
        bg: 'bg-orange-500/8 dark:bg-orange-500/10',
        border: 'border-orange-500/20',
        glow: 'bg-orange-400/15',
        accentFrom: 'from-orange-400',
        accentTo: 'to-red-400',
    },
    {
        title: 'বাজার দর',
        description: 'আপনার নিকটস্থ বাজারের শস্যের বর্তমান সঠিক বাজার দর জানুন আগে থেকেই।',
        Icon: ChartNoAxesColumn,
        stat: '৪০%',
        statLabel: 'বেশি লাভ',
        color: 'text-sky-500',
        bg: 'bg-sky-500/8 dark:bg-sky-500/10',
        border: 'border-sky-500/20',
        glow: 'bg-sky-400/15',
        accentFrom: 'from-sky-400',
        accentTo: 'to-blue-400',
    },
]

const trust = [
    { Icon: Zap, label: 'তাৎক্ষণিক ফলাফল' },
    { Icon: ShieldCheck, label: 'নিরাপদ ও নির্ভরযোগ্য' },
    { Icon: Users, label: '৫০,০০০+ সক্রিয় কৃষক' },
]

export const Servies = () => {
    return (
        <section className="relative overflow-hidden py-6">
            {/* Ambient background blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-emerald-500/5 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -right-32 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-yellow-500/5 blur-3xl"
            />

            <Container>
                {/* ── Section header ── */}
                <div className="flex flex-col items-center text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-5"
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                            <Zap className="w-3 h-3" />
                            আমাদের সেবাসমূহ
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-4"
                    >
                        আমাদের প্রধান{' '}
                        <HeaderHilight type="success">সুবিধাসমূহ</HeaderHilight>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg"
                    >
                        কৃষি বন্ধুর মাধ্যমে আপনি সহজেই প্রয়োজনীয় সব তথ্য এক জায়গায় পেতে পারেন
                    </motion.p>
                </div>

                {/* ── Service cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service, index) => (
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
                            whileHover={{ y: -6 }}
                            className={cn(
                                'group relative rounded-2xl p-6 border overflow-hidden',
                                'transition-shadow duration-300 hover:shadow-xl',
                                service.bg,
                                service.border
                            )}
                        >
                            {/* Corner glow blob */}
                            <div
                                className={cn(
                                    'absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500',
                                    service.glow
                                )}
                            />

                            {/* Icon + stat row */}
                            <div className="flex items-start justify-between mb-5">
                                <div
                                    className={cn(
                                        'w-12 h-12 rounded-xl flex items-center justify-center',
                                        'bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm',
                                        'group-hover:scale-110 transition-transform duration-300'
                                    )}
                                >
                                    <service.Icon className={cn('w-6 h-6', service.color)} />
                                </div>
                                <div className="text-right">
                                    <p className={cn('text-2xl font-black leading-none', service.color)}>
                                        {service.stat}
                                    </p>
                                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">
                                        {service.statLabel}
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-black text-foreground mb-2 leading-snug">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 rounded-b-3xl" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
