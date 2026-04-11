import { FeaturesPage } from '@/components/features-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'সুবিধাসমূহ | কৃষি বন্ধু',
    description: 'কৃষিবন্ধু প্ল্যাটফর্মের আধুনিক সব ফিচার এবং সুবিধা নিয়ে বিস্তারিত জানুন যা আপনার কৃষিকাজকে আরও সহজ ও লাভজনক করবে।',
}

export default function page() {
    return (
        <div>
            <FeaturesPage />
        </div>
    )
}
