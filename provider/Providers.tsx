'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from './auth-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useAuth } from '@/hooks/useAuth'
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidbar'

export function Providers({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                    <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <div className='flex'>
                        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                        <div className='flex-1 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide'>
                            {children}
                        </div>
                    </div>
                </div>
            </main> : children}
            {user ? null : <Footer />}

        </ThemeProvider>
    )
}