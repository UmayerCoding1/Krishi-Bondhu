import { DashboardContainer } from '@/components/dashboard/dashboard-container'
import { DiseaseDetectionPage } from '@/components/dashboard/disease-detection'
export default function page() {
    return (
        <DashboardContainer className='w-full h-full'>
            <DiseaseDetectionPage />
        </DashboardContainer>
    )
}
// রোগ শনাক্তকরণ