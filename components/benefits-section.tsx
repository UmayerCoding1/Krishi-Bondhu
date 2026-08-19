'use client'
import { Container } from './container'
import { HeaderHilight } from './header'
import Image from 'next/image'
import {
    Check,
    Smartphone,
    Target,
    Clock,
    TrendingUp,
    ShieldCheck,
    Star,
    Award,
    Trophy,
} from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const stats = [
    { value: '৫০,০০০+', label: 'সক্রিয় কৃষক', Icon: Trophy },
    { value: '৯২%', label: 'সন্তুষ্টির হার', Icon: Star },
    { value: '৪০%', label: 'বেশি আয়', Icon: TrendingUp },
    { value: '২৪/৭', label: 'সাপোর্ট', Icon: ShieldCheck },
]

const benefit1 = [
    {
        Icon: Smartphone,
        title: 'সহজ ইন্টারফেস',
        description: 'অ্যাপটির ইন্টারফেস খুবই সহজ, যা যেকোনো কৃষক সহজেই ব্যবহার করতে পারবেন।',
        color: 'text-sky-500',
        bg: 'bg-sky-500/10',
        border: 'border-sky-500/20',
        num: '০১',
    },
    {
        Icon: Target,
        title: 'সঠিক তথ্য',
        description: 'সঠিক আবহাওয়া ও মাটির তথ্য নিশ্চিত করে আপনার চাষাবাদকে আরও নির্ভুল করে তোলে।',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        num: '০২',
    },
]

const benefit2 = [
    {
        Icon: Clock,
        title: 'সময় সাশ্রয়ী',
        description: 'মাঠে না গিয়েও ঘরে বসেই ফসলের অবস্থা ও বাজারের খোঁজখবর নিন।',
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
        num: '০৩',
    },
    {
        Icon: TrendingUp,
        title: 'মুনাফা বৃদ্ধি',
        description: 'সঠিক সময়ে সঠিক সিদ্ধান্ত নেওয়ার মাধ্যমে ফসলের উৎপাদন ও আয় বৃদ্ধি করুন।',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        num: '০৪',
    },
]

const BenefitCard = ({
    item,
    index,
}: {
    item: (typeof benefit1)[number]
    index: number
}) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
            'group relative flex items-start gap-4 p-5 rounded-2xl border overflow-hidden',
            'transition-shadow duration-300 hover:shadow-lg',
            item.bg,
            item.border
        )}
    >
        <div className={cn('absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500', item.bg)} />

        <div className={cn(
            'shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            'bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm',
            'group-hover:scale-110 transition-transform duration-300'
        )}>
            <item.Icon className={cn('w-6 h-6', item.color)} />
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <span className={cn('text-[10px] font-black tracking-widest', item.color)}>{item.num}</span>
                <h3 className="text-base font-black text-foreground leading-snug">{item.title}</h3>
            </div>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        <div className={cn('shrink-0 w-5 h-5 rounded-full flex items-center justify-center border', item.bg, item.border)}>
            <Check className={cn('w-3 h-3', item.color)} />
        </div>
    </motion.div>
)

export const BenefitsSection = () => {
    return (
        <section className="relative overflow-hidden py-6">
            {/* Ambient blobs */}
            <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-208 h-56 rounded-full bg-emerald-500/4 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-violet-500/5 blur-3xl" />

            <Container>
                {/* Section header */}
                <div className="flex flex-col items-center text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-5"
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                            <Award className="w-3 h-3" />
                            কেন কৃষি বন্ধু
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.15] mb-4"
                    >
                        কেন{' '}
                        <HeaderHilight type="success">কৃষি বন্ধু</HeaderHilight>{' '}
                        ব্যবহার করবেন
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg"
                    >
                        আমাদের AI-চালিত প্ল্যাটফর্ম বাংলাদেশের কৃষকদের জন্য বিশেষভাবে তৈরি — সহজ, নির্ভরযোগ্য এবং লাভজনক।
                    </motion.p>
                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                >
                    {stats.map(({ value, label, Icon }, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 hover:bg-emerald-500/10 transition-colors duration-300"
                        >
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-1">
                                <Icon className="w-5 h-5 text-emerald-500" />
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-foreground leading-none">{value}</p>
                            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">{label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Benefit rows */}
                <div className="flex flex-col gap-20 md:gap-28">

                    {/* Row 1: image left, benefits right */}
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="flex-1 w-full relative"
                        >
                            <div className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-emerald-200 dark:border-emerald-900/40 pointer-events-none" />
                            <Image
                                src="/assets/farmar-propit.png"
                                alt="লাভজনক কৃষি"
                                width={560}
                                height={500}
                                className="rounded-[2rem] w-full h-auto object-cover shadow-2xl shadow-emerald-900/10"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute -bottom-4 -right-4 bg-white dark:bg-neutral-900 border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-xl bg-sky-500/15 flex items-center justify-center">
                                    <Smartphone className="w-4 h-4 text-sky-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">ইন্টারফেস</p>
                                    <p className="text-base font-black text-foreground leading-none">অতি সহজ</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <div className="flex-1 w-full flex flex-col gap-4">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2">
                                    আপনার কৃষিকাজকে করুন আরও{' '}
                                    <span className="text-emerald-500">সহজ ও নির্ভুল</span>
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
                                    সঠিক তথ্য ও AI পরামর্শ দিয়ে আপনার প্রতিটি সিদ্ধান্তকে আরও স্মার্ট করে তুলুন।
                                </p>
                            </motion.div>
                            {benefit1.map((item, i) => (
                                <BenefitCard key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2: benefits left, image right */}
                    <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
                        <div className="flex-1 w-full flex flex-col gap-4">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2">
                                    সময় বাঁচান, উৎপাদন{' '}
                                    <span className="text-violet-500">কয়েকগুণ বৃদ্ধি</span> করুন
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
                                    প্রতিটি মৌসুমে বেশি ফলন পেতে এবং সর্বোচ্চ মুনাফা অর্জন করতে কৃষি বন্ধু ব্যবহার করুন।
                                </p>
                            </motion.div>
                            {benefit2.map((item, i) => (
                                <BenefitCard key={i} item={item} index={i} />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="flex-1 w-full relative"
                        >
                            <div className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-violet-200 dark:border-violet-900/40 pointer-events-none" />
                            <Image
                                src="/assets/farmar-hold-phone.png"
                                alt="ফোনে কৃষি বন্ধু"
                                width={560}
                                height={500}
                                className="rounded-[2rem] w-full h-auto object-cover shadow-2xl shadow-violet-900/10"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                                className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-900 border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">গড় আয় বৃদ্ধি</p>
                                    <p className="text-base font-black text-foreground leading-none">৪০% বেশি</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Trust testimonial strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10"
                >
                    <div className="flex -space-x-3 shrink-0">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-emerald-600 font-black text-xs shadow"
                            >
                                {['র', 'ক', 'আ', 'ম'][i - 1]}
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-sm md:text-base font-semibold text-foreground leading-relaxed">
                            "কৃষি বন্ধু আমার জীবন পরিবর্তন করে দিয়েছে। এখন আমি সঠিক ফসল বেছে নিতে পারি এবং আগের চেয়ে অনেক বেশি লাভ করছি।"
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">— রহিম উদ্দিন, কৃষক, রাজশাহী</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}