'use client'
import { useCropStore } from '@/store/useCropStore';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const RefrashBtn = () => {
    const route = useRouter();
    const { clearStoreCropData } = useCropStore();
    return (
        <RefreshCcw size={18} onClick={() => { route.refresh(); clearStoreCropData(); }} className='cursor-pointer hover:text-primary transition-colors' />
    )
}

export default RefrashBtn;