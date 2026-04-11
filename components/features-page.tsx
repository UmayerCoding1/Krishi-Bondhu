
'use client'
import React from 'react'
import { HeroBanner } from './hero-banner'
import { Servies } from './servies'
import { CheckCircle2 } from 'lucide-react'
import { AppButton } from './app-button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

export const FeaturesPage = () => {
    const route = useRouter();
    return (
        <div>


            <HeroBanner
                imageUrl="/assets/features.hero-banner.jpg"
                title="কৃষিতে আনুন"
                titleHilight="ডিজিটাল বিপ্লব"
                badge="এআই চালিত কৃষিবন্ধু প্ল্যাটফর্ম"
                description="কৃষিবন্ধু হলো একটি আধুনিক কৃষি প্ল্যাটফর্ম যা কৃষকদের আধুনিক প্রযুক্তি ব্যবহার করে তাদের ফসলের মান উন্নত করতে এবং উৎপাদন বাড়াতে সাহায্য করে।"
                buttonText="শুরু করুন এখনই"
            />


            <Servies />

            <section className="py-24 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                <div className="container max-w-7xl mx-auto px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl"></div>
                            <img className="rounded-xl shadow-2xl relative z-10 w-full object-cover aspect-4/3" data-alt="South Asian farmer smiling while looking at a smartphone screen in a lush rice field during golden hour" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2BE4ONmXNygQBfjOvQcFqyNYCDX1iMExncczfL6IiupxPr95LID03Sy5f81AO6A3HQNsgyTZFisklHzcK74-ZFlTTc8CC8mxm-psKSLdkvhRXyRClrVdXILeB23f0PdIN_62DK1X0s7qbv9wVEMgD7ss4EDsEGGFXEOiIOMmdAz7p6joeCa-qMxGzpoyrKv2cNLjyt6E_6SnbUrko4jtOcJNjlm4ZSljBYp_OkZWjHOZoyjZrXa0n3pUNBwVINJYt8zhSPf6Rv8" />
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-xl shadow-xl z-20 max-w-[200px] "
                            >
                                <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">Success Rate</p>
                                <p className="text-3xl font-black text-on-surface">98%</p>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-4xl md:text-5xl font-black font-headline leading-tight mb-8">কেন আমরাই সেরা?</h2>
                            <ul className="space-y-8">
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-lg" data-icon="check" data-weight="fill">
                                            <CheckCircle2 />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">২০% ফলন বৃদ্ধি</h4>
                                        <p className="text-on-surface-variant">সঠিক ডেটা এবং আধুনিক এআই প্রযুক্তি ব্যবহারের মাধ্যমে কৃষকদের ফলন বৃদ্ধিতে সহায়তা করি।</p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-lg" data-icon="check" data-weight="fill">
                                            <CheckCircle2 />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">নির্ভুল সার ব্যবহার</h4>
                                        <p className="text-on-surface-variant">মাটির পুষ্টিগুণ বিশ্লেষণ করে সারের পরিমিত ব্যবহার নিশ্চিত করে খরচ কমায়।</p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-lg" data-icon="check" data-weight="fill">
                                            <CheckCircle2 />
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">সরাসরি বাজার সংযোগ</h4>
                                        <p className="text-on-surface-variant">মধ্যস্বত্বভোগী ছাড়াই সরাসরি বড় বাজারের সাথে যোগাযোগ এবং ন্যায্য মূল্যের নিশ্চয়তা।</p>
                                    </div>
                                </motion.li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary-container/5 opacity-40" style={{ backgroundImage: 'radial-gradient(#006e2a 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="container max-w-4xl mx-auto px-8 relative z-10 text-center"
                >
                    <h2 className="text-5xl md:text-6xl font-black font-headline text-on-surface mb-8">Join the New Age of Agriculture</h2>
                    <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
                        আজই আপনার স্মার্ট কৃষি যাত্রা শুরু করুন এবং দেশের কৃষি বিপ্লবে শামিল হন। আপনার হাতের মুঠোয় থাকবে আগামীর কৃষি।
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <AppButton onClick={() => route.push('/auth')} buttonType='primary' className='text-md px-10 py-5'>
                            ফ্রি অ্যাকাউন্ট খুলুন
                        </AppButton>
                        <AppButton onClick={() => toast.info('soon available on play store and app store')} buttonType='outline' className='text-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 px-10 py-5'>
                            অ্যাপ ডাউনলোড করুন
                        </AppButton>
                    </div>
                </motion.div>
            </section>

        </div>
    )
}

