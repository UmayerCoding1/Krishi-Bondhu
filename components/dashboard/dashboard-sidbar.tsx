'use client'
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../sidebar';
import { DashboardSvg } from '../icons/dashboard-svg';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CropSvg } from '../icons/crop-svg';
import { DiseaseSvg } from '../icons/disease-svg';
import { ChartSvg } from '../icons/chart-svg';
import { BootSvg } from '../icons/boot-svg';
import { Settings, User } from 'lucide-react';

export const DashboardSidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
    const [activeLink, setActiveLink] = useState('/');
    const pathName = usePathname();
    const TopNavLinks = [
        {
            title: 'ওভারভিউ',
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
            title: 'ফসল পরামর্শ',
            href: '/crop-advice',
            icon: (
                <CropSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/crop-advice' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'রোগ শনাক্তকরণ',
            href: '/disease-detection',
            icon: (
                <DiseaseSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/disease-detection' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },

        {
            title: 'বাজার দর',
            href: '/market-price',
            icon: (
                <ChartSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/market-price' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'এআই চ্যাটবট',
            href: '/ai-chatbot',
            icon: (
                <BootSvg
                    className={cn(
                        'w-5 h-5',
                        activeLink === '/ai-chatbot' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        }
    ];

    const BottomNavLinks = [
        {
            title: 'প্রোফাইল',
            href: '/profile',
            icon: (
                <User
                    className={cn(
                        'w-5 h-5 mb-1',
                        activeLink === '/profile' ? 'fill-primary' : 'text-gray-500'
                    )}
                />
            )
        },
        {
            title: 'সেটিংস',
            href: '/settings',
            icon: (
                <>
                    <Settings
                        className={cn(
                            'w-5 h-5 mb-1',
                            activeLink === '/settings' ? 'fill-primary' : 'text-gray-500'
                        )}
                    />
                </>
            )
        }
    ];

    useEffect(() => {
        setActiveLink(pathName);
    }, [pathName]);
    return (
        <div>
            <Sidebar activeLink={activeLink} TopNavLinks={TopNavLinks} BottomNavLinks={BottomNavLinks} isOpen={isOpen} onClose={onClose} />
        </div>
    )
}