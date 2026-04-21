'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Logo } from '../logo'
import { Bell, Search } from 'lucide-react'
import RefrashBtn from '../dashboard/refrash-btn'
import ModeToggle from '../theme-toggle'
import { Profile } from '../dashboard/dashboard-navbar'
import { useAuth } from '@/hooks/useAuth'
import { AiSvg } from '../icons/ai-svg'
import { CustomBreadcrumb } from '../custom-breadcrumb'
export const AdminNavbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const { user, logout } = useAuth();
    if (!user) return null;
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='w-full h-16 border-b flex items-center sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-neutral-800'
        >
            <div className='hidden md:flex w-64 border-r h-full items-center justify-center'>
                <Logo />
            </div>

            {/* weather details */}
            <div>

            </div>

            <div className='flex-1 flex items-center justify-between px-4 py-2 gap-4'>
                {/* Search Bar */}
                {/* <motion.div
                    animate={{
                        width: isFocused ? '40%' : '33%',
                        borderColor: isFocused ? 'var(--primary)' : '#e5e7eb'
                    }}
                    className='hidden sm:flex items-center gap-2 border focus-within:border-[1.5px] rounded-xl h-10 px-3 transition-shadow duration-300 bg-white/50 dark:bg-neutral-800'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <Search size={14} className='text-neutral-400' />
                    <input
                        className='flex-1 h-full bg-transparent border-none outline-none text-sm placeholder:text-neutral-400'
                        type="text"
                        placeholder="Search dashboard..."
                    />
                    <div className='hidden lg:flex items-center gap-1 bg-neutral-100 px-1.5 rounded-md py-0.5 border border-neutral-200 text-[10px] text-neutral-500 font-mono'>
                        <Command size={10} /> <span>K</span>
                    </div>
                </motion.div> */}

                <CustomBreadcrumb path={['User Management']} />




                {/* Mobile Search Icon (only visible on smallest screens) */}
                <button className='sm:hidden p-2 hover:bg-neutral-100 rounded-full'>
                    <Search size={20} />
                </button>

                <div className='flex items-center gap-3 md:gap-5'>
                    <AiSvg className='cursor-pointer text-primary' />
                    <ModeToggle />
                    {/* Notifications */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='p-2.5 rounded-xl bg-white border border-neutral-200 shadow-sm cursor-pointer relative'
                    >
                        <Bell size={18} className='text-neutral-600' />
                        <span className='absolute top-2 right-2 w-2 h-2 rounded-full bg-linear-to-tr from-emerald-500 to-green-600 border-2 border-white'></span>
                    </motion.div>

                    <div className='hidden md:block border-l border-neutral-200 h-8' />

                    <Profile user={user} logout={logout} />
                </div>
            </div>
        </motion.div>
    )
}