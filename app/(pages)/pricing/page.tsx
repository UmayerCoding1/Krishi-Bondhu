import { PricingContent } from '@/components/pricing-content';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'মূল্য তালিকা | কৃষি বন্ধু',
    description:
        'কৃষি বন্ধুর বেসিক, প্রো এবং এন্টারপ্রাইজ প্ল্যান থেকে আপনার খামারের জন্য সঠিক সাবস্ক্রিপশন বেছে নিন।',
    keywords: ['কৃষি বন্ধু প্রাইসিং', 'কৃষি সাবস্ক্রিপশন', 'কৃষি অ্যাপ দাম', 'bangladesh agri app pricing'],
    openGraph: {
        title: 'মূল্য তালিকা | কৃষি বন্ধু',
        description: 'বেসিক থেকে এন্টারপ্রাইজ—আপনার খামারের প্রয়োজন অনুযায়ী পরিকল্পনা বেছে নিন।',
        url: 'https://krishi-bondhu-bd.vercel.app/pricing',
    },
};

export default function page() {
    return (
        <>
            <PricingContent />
        </>
    )
}
