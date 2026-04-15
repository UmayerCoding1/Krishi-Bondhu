'use client'
import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react'
import { BenefitsSection } from './benefits-section';
import { Hero } from './hero';
import PricingSection from './pricing-section';
import { ProblemSection } from './problem-section';
import { Servies } from './servies';
import { SolutionSection } from './solution-section';
import { WorksSection } from './works-section';
import { Overview } from './dashboard/overview';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { AdminOverview } from './admin-dashboard/admin-overview';

export const HomePage = () => {
    const { user, loading } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const page_reload_s = localStorage.getItem('page_reload');
        if (!page_reload_s) {
            localStorage.setItem('page_reload', JSON.stringify(true));
        }
    }, []);


    useEffect(() => {
        const page_reload_s = localStorage.getItem('page_reload');
        if (user && page_reload_s === 'true') {
            setRefresh(true);
        }
    }, []);

    const handleReload = () => {
        window.location.reload();
        setRefresh(false);
        localStorage.setItem('page_reload', JSON.stringify(false));
    }
    if (loading) return <div className='flex items-center justify-center h-screen'><Loader2 className='animate-spin' /></div>;
    localStorage
    return (
        <div className=''>
            {refresh && (
                <AlertModal handleReload={handleReload} />
            )}
            {user ? (
                <>
                    {user?.role === 'admin' ? <AdminOverview /> : <Overview />}
                </>
            ) : (
                <>
                    <Hero />
                    <ProblemSection />
                    <SolutionSection />
                    <Servies />
                    <WorksSection />
                    <BenefitsSection />
                    <PricingSection />
                </>
            )}
        </div>
    )
}


const AlertModal = ({ handleReload }: { handleReload: () => void }) => {
    return <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-hidden'>
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden'
        >
            {/* Decorative background element */}
            <div className='absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl' />
            <div className='absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl' />

            <div className='flex flex-col items-center text-center gap-6 relative z-10'>
                <div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center rotate-3'>
                    <Loader2 className='w-8 h-8 text-green-600 dark:text-green-400 animate-spin -rotate-3' />
                </div>

                <div className='space-y-3'>
                    <h1 className='text-2xl font-bold text-zinc-900 dark:text-zinc-100'>
                        তথ্য প্রয়োজন
                    </h1>
                    <p className='text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed'>
                        অনুগ্রহ করে এই ব্যবহারকারীর জন্য পূর্ণ ফিচার বা তথ্য প্রদান করুন।
                    </p>
                </div>

                <button
                    className='w-full bg-green-600 hover:bg-green-700 text-white py-3.5 px-6 rounded-xl font-bold tracking-wide shadow-lg shadow-green-500/20 transition-all active:scale-95'
                    onClick={handleReload}
                >
                    রিফ্রেশ করুন
                </button>
            </div>
        </motion.div>
    </div>
}