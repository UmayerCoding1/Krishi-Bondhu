import { Hero } from '@/components/hero'
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
    </div>
  )
}
