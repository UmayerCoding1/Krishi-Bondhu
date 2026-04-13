'use client'
import { useAuth } from '@/hooks/useAuth';
import React from 'react'
import { BenefitsSection } from './benefits-section';
import { Hero } from './hero';
import PricingSection from './pricing-section';
import { ProblemSection } from './problem-section';
import { Servies } from './servies';
import { SolutionSection } from './solution-section';
import { WorksSection } from './works-section';
import { Overview } from './dashboard/overview';

export const HomePage = () => {
    const { user } = useAuth();
    return (
        <div className=''>
            {user ? (
                <Overview />
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
