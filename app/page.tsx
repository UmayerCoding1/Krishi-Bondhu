import { BenefitsSection } from '@/components/benefits-section'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import PricingSection from '@/components/pricing-section'
import { ProblemSection } from '@/components/problem-section'
import { Servies } from '@/components/servies'
import { SolutionSection } from '@/components/solution-section'
import { WorksSection } from '@/components/works-section'

export default function page() {
  return (
    <div className=''>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <Servies />
      <WorksSection />
      <BenefitsSection />
      <PricingSection />
      <Footer />


    </div>
  )
}
