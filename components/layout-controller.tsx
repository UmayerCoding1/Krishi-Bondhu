'use client'
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Navbar } from './navbar';
import { AdminNavbar } from './admin-dashboard/admin-navbar';
import { DashboardNavbar } from './dashboard/dashboard-navbar';
import { AdminSidebar } from './admin-dashboard/admin-sidebar';
import { DashboardSidebar } from './dashboard/dashboard-sidbar';
import { Footer } from './footer';
import { Toaster } from 'sonner';
import { User } from '@/provider/auth-provider';
import { Loader2 } from 'lucide-react';

export const LayoutController = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isVerifyPage = pathname === '/verify';
    const showHeaderFooter = !user && !isVerifyPage;


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={20} className="animate-spin" />
            </div>
        );
    }

    return (
        <>
            {showHeaderFooter && <Navbar />}
            {user ? <main>
                <div>
                    {user && user?.role === 'admin' && <AdminNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
                    {user && user?.role === 'user' && <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
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
        </>
    )
}
