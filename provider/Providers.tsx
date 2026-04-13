'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from './auth-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useAuth } from '@/hooks/useAuth'
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidbar'
import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-dashboard/admin-sidebar'

export function Providers({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isVerifyPage = pathname === '/verify';
    const showHeaderFooter = !user && !isVerifyPage;

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >

            {showHeaderFooter && <Navbar />}
            {user ? <main>
                <div>
                    <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <div className='flex'>
                        {user?.role === 'admin' && <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
                        {user?.role === 'user' && <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
                        <div className='flex-1 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide'>
                            {children}
                        </div>
                    </div>
                </div>
            </main> : children}
            {showHeaderFooter && <Footer />}
            <Toaster />
        </ThemeProvider>
    )
}