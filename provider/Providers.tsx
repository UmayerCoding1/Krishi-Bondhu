'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
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
import { LayoutController } from '@/components/layout-controller'

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >

            <LayoutController>
                {children}
            </LayoutController>
        </ThemeProvider>
    )
}