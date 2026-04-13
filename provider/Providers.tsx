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
import { AdminNavbar } from '@/components/admin-dashboard/admin-navbar'
import { Loader2 } from 'lucide-react'

export function Providers({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isVerifyPage = pathname === '/verify';
    const showHeaderFooter = !user && !isVerifyPage;
    if (loading) {
        return <div className='flex items-center justify-center h-screen'>
            <Loader2 className='animate-spin' />
        </div>
    }

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
                    {user?.role === 'admin' && <AdminNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
                    {user?.role === 'user' && <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
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