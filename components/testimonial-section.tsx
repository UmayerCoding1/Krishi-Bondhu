'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'
import { Container } from './container'
import { HeaderHilight } from './header'
import { motion } from 'motion/react'
import { Star, MapPin, CheckCircle2, MessageSquareQuote, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonialsRow1 = [
    {
        name: 'মোঃ আব্দুল কুদ্দুস',
        location: 'দিনাজপুর',
        crop: 'ধান ও শস্য চাষী',
        avatarBg: 'from-emerald-500 to-teal-700',
        initials: 'আ',
        rating: 5,
        badge: '৩০% ফলন বৃদ্ধি',
        comment: 'কৃষি বন্ধুর আবহাওয়ার সঠিক তথ্য পেয়ে এবার বৃষ্টির আগেই ধান কাটতে পেরেছি। অন্তত ৫০ হাজার টাকার ফসল বেঁচে গেছে!',
    },
    {
        name: 'রেজওয়ান আহমেদ',
        location: 'বগুড়া',
        crop: 'সবজি চাষী',
        avatarBg: 'from-blue-500 to-indigo-700',
        initials: 'রে',
        rating: 5,
        badge: 'রোগ মুক্ত ফসল',
        comment: 'টমেটো গাছের পাতার দাগের ছবি তুলে দেওয়ার ৩ সেকেন্ডের মধ্যে রোগ আর সঠিক ওষুধের নাম পেয়ে যাই। অসাধারন AI!',
    },
    {
        name: 'হাজী মোহাম্মদ সেলিম',
        location: 'রাজশাহী',
        crop: 'আম ও ফল চাষী',
        avatarBg: 'from-amber-500 to-orange-700',
        initials: 'সে',
        rating: 5,
        badge: 'দ্বিগুণ মুনাফা',
        comment: 'সরাসরি পাইকারি বাজারদর জানতে পারায় ব্যাপারীদের কাছে কম দামে আম বিক্রি করতে হয়নি। সঠিক দামে বিক্রি করে লাভ দ্বিগুণ হয়েছে।',
    },
    {
        name: 'বুলবুল চৌধুরী',
        location: 'যশোর',
        crop: 'ফুল ও শস্য চাষী',
        avatarBg: 'from-violet-500 to-purple-700',
        initials: 'বু',
        rating: 5,
        badge: 'সময় সাশ্রয়ী',
        comment: 'মাটির ধরন আর মৌসুম অনুযায়ী কোন সার কতটুকু দিতে হবে, তা খুব সহজে এই অ্যাপ থেকে জেনে নিতে পারি।',
    },
    {
        name: 'আশরাফুল ইসলাম',
        location: 'রংপুর',
        crop: 'আলু ও ভুট্টা চাষী',
        avatarBg: 'from-cyan-500 to-blue-700',
        initials: 'আ',
        rating: 5,
        badge: 'সেরা পরামর্শ',
        comment: 'কৃষি কর্মকর্তা না পেয়েও ঘরে বসেই অভিজ্ঞ পরামর্শ পেয়ে যাচ্ছি। অ্যাপটির বাংলা ভাষা বোঝার সুবিধা চমৎকার।',
    },
]

const testimonialsRow2 = [
    {
        name: 'মোসাম্মাৎ সুফিয়া বেগম',
        location: 'পাবনা',
        crop: 'সবজি ও খামার চাষী',
        avatarBg: 'from-rose-500 to-pink-700',
        initials: 'সু',
        rating: 5,
        badge: 'সঠিক আবহাওয়া',
        comment: 'ঝড়ের পূর্বাভাস আগে থেকেই নোটিফিকেশনে পেয়ে সবজি ক্ষেতের মাচা শক্ত করেছিলাম। ফসলের কোনো ক্ষতি হয়নি।',
    },
    {
        name: 'তারিকুল ইসলাম',
        location: 'ময়মনসিংহ',
        crop: 'মৎস্য ও ধান চাষী',
        avatarBg: 'from-emerald-600 to-green-800',
        initials: 'তা',
        rating: 5,
        badge: 'দ্রুত সমাধান',
        comment: 'ধান ক্ষেতে পোকার উপদ্রব দেখা দিলে সাথে সাথে অ্যাপে ছবি দেই। পরামর্শ মেনে ওষুধ দিয়ে ১ দিনের মধ্যে সমাধান পেয়েছি।',
    },
    {
        name: 'নাসির উদ্দিন',
        location: 'সাতক্ষীরা',
        crop: 'কৃষি উদ্যোক্তা',
        avatarBg: 'from-sky-500 to-cyan-700',
        initials: 'না',
        rating: 5,
        badge: 'স্মার্ট প্রযুক্তি',
        comment: 'নতুন কী ফসল রোপণ করলে বেশি লাভ হবে তা AI হিসাব করে বলে দেয়। আমাদের কৃষি জীবন এখন অনেক সহজ!',
    },
    {
        name: 'মোঃ খোরশেদ আলম',
        location: 'কুমিল্লা',
        crop: 'সবজি চাষী',
        avatarBg: 'from-purple-500 to-indigo-700',
        initials: 'খো',
        rating: 5,
        badge: '১০/১০ অভিজ্ঞতা',
        comment: 'আমাদের গ্রামের সব কৃষক ভাই এখন কৃষি বন্ধু ব্যবহার করে। যেকোনো সমস্যার তাৎক্ষণিক সমাধান পাওয়া যায়।',
    },
    {
        name: 'মাহবুবুর রহমান',
        location: 'নাটোর',
        crop: 'রসুন ও পেঁয়াজ চাষী',
        avatarBg: 'from-teal-500 to-emerald-700',
        initials: 'মা',
        rating: 5,
        badge: 'ন্যায্য মূল্য',
        comment: 'বাজার দরের রিয়েল-টাইম তথ্যের কারণে এবার সঠিক হাটে গিয়ে রসুন বিক্রি করেছি। প্রত্যাশার চেয়ে বেশি লাভ হয়েছে।',
    },
]

const TestimonialCard = ({ item }: { item: (typeof testimonialsRow1)[number] }) => {
    return (
        <div className="w-[310px] sm:w-[370px] shrink-0 mx-3 p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
                {/* Header: Avatar, Info & Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                'w-11 h-11 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-emerald-500/20 group-hover:scale-105 transition-transform duration-300',
                                item.avatarBg
                            )}
                        >
                            {item.initials}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                                {item.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                                <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>{item.location}</span>
                                <span>•</span>
                                <span className="truncate max-w-[110px]">{item.crop}</span>
                            </div>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 shrink-0 bg-amber-500/10 dark:bg-amber-500/15 px-2 py-1 rounded-full border border-amber-500/20">
                        {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal line-clamp-3 my-2">
                    "{item.comment}"
                </p>
            </div>

            {/* Bottom Row: Badge & Verified Tag */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                    {item.badge}
                </span>

                <span className="flex items-center gap-1 text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    যাচাইকৃত কৃষক
                </span>
            </div>
        </div>
    )
}

export const TestimonialSection = () => {
    return (
        <section className="relative overflow-hidden py-10">
            {/* Background Blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 rounded-full bg-emerald-500/5 blur-3xl"
            />

            <Container className="mb-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                            <MessageSquareQuote className="w-3.5 h-3.5" />
                            কৃষকদের অভিজ্ঞতা
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-4 text-neutral-900 dark:text-neutral-100"
                    >
                        আমাদের ওপর কৃষকদের <HeaderHilight type="success">আস্থা ও ভালোবাসা</HeaderHilight>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl"
                    >
                        কৃষি বন্ধু ব্যবহার করে দেশের বিভিন্ন প্রান্তের কৃষকরা কীভাবে তাদের জীবন পরিবর্তন করছেন, জানুন তাদের নিজেদের মুখে।
                    </motion.p>
                </div>
            </Container>

            {/* Marquee Wrapper with Left & Right Gradient Overlays */}
            <div className="relative w-full overflow-hidden flex flex-col gap-5 py-2">
                {/* Left Side Overlay */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 md:w-64 bg-gradient-to-r from-white dark:from-neutral-950 via-white/80 dark:via-neutral-950/80 to-transparent z-20" />

                {/* Right Side Overlay */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 md:w-64 bg-gradient-to-l from-white dark:from-neutral-950 via-white/80 dark:via-neutral-950/80 to-transparent z-20" />

                {/* Marquee Row 1: Goes to RIGHT */}
                <Marquee direction="right" speed={30} pauseOnHover={true} className="py-1">
                    {testimonialsRow1.map((item, index) => (
                        <TestimonialCard key={`r1-${index}`} item={item} />
                    ))}
                </Marquee>

                {/* Marquee Row 2: Goes to LEFT */}
                <Marquee direction="left" speed={30} pauseOnHover={true} className="py-1">
                    {testimonialsRow2.map((item, index) => (
                        <TestimonialCard key={`r2-${index}`} item={item} />
                    ))}
                </Marquee>
            </div>
        </section>
    )
}