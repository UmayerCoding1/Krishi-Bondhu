'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

export const Logo = () => {
    const { theme } = useTheme();

    return (
        <div>
            {theme === 'dark' ? <Image src="/assets/dark-logo.png" className=' object-cover' alt="Logo" width={100} height={100} /> : <Image src="/assets/light-logo.png" className='object-cover' alt="Logo" width={100} height={100} />}
        </div>
    )
}
