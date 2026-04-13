import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { DashboardSvg } from '../button/dashboard-svg';
import { CropSvg } from '../button/crop-svg';
import { DiseaseSvg } from '../button/disease-svg';
import { ChartSvg } from '../button/chart-svg';
import { BootSvg } from '../button/boot-svg';
import { cn } from '@/lib/utils';
import { Sidebar } from '../sidebar';
import { FolderCog, Users } from 'lucide-react';

export const AdminSidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
    const [activeLink, setActiveLink] = useState('/');
    const pathName = usePathname();
    const TopNavLinks = [
        {
            title: 'Overview',
            href: '/',
            icon: (
                <DashboardSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'User Management',
            href: '/dashboard/admin/user-management',
            icon: (
                <Users
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/admin/user-management' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'AI Analysis',
            href: '/dashboard/admin/ai-analysis',
            icon: (
                <CropSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/admin/ai-analysis' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },

        {
            title: 'Market Data',
            href: '/dashboard/admin/market-data',
            icon: (
                <ChartSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/admin/market-data' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'System Report',
            href: '/dashboard/admin/system-report',
            icon: (
                <FolderCog
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/dashboard/admin/system-report' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        }
    ];

    useEffect(() => {
        setActiveLink(pathName);
    }, [pathName]);
    return (
        <div>
            <Sidebar activeLink={activeLink} TopNavLinks={TopNavLinks} isOpen={isOpen} onClose={onClose} />
        </div>
    )
}