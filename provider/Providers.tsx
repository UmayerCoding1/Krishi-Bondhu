'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from './auth-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useAuth } from '@/hooks/useAuth'

export function Providers({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >

            {user ? null : <Navbar />}
            {children}
            {user ? null : <Footer />}

        </ThemeProvider>
    )
}