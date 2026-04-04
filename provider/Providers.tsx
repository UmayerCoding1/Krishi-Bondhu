'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from './auth-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useAuth } from '@/hooks/useAuth'
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidbar'

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
            {user ? <main>
                <div>
                    <DashboardNavbar />
                    <div className='flex'>
                        <DashboardSidebar />
                        <div className='flex-1'>
                            {children}
                        </div>
                    </div>
                </div>
            </main> : children}
            {user ? null : <Footer />}

        </ThemeProvider>
    )
}