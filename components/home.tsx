'use client'
import { useAuth } from '@/hooks/useAuth';
import React, { useEffect } from 'react'
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

export const HomePage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    // useEffect(() => {
    //     if (user) {
    //         router.refresh();
    //         // router.prefetch()
    //     }
    // }, []);

    if (loading) return <div className='flex items-center justify-center h-screen'><Loader2 className='animate-spin' /></div>;

    return (
        <div className=''>
            {user ? (
                <>
                    {user?.role === 'admin' ? <>admin</> : <Overview />}
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
