'use client'

import { Logo } from '../logo'
import { Bell, ChevronDown, Command, Search, Menu, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { User } from '@/provider/auth-provider';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import ModeToggle from '../theme-toggle';
import { useTheme } from 'next-themes';

export const DashboardNavbar = () => {
    const { user } = useAuth();
    const [isFocused, setIsFocused] = useState(false);

    if (!user) return null;

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='w-full h-16 border-b flex items-center sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-neutral-800'
        >
            {/* Left: Logo Section (Desktop only) */}
            <div className='hidden md:flex w-64 border-r h-full items-center justify-center'>
                <Logo />
            </div>

            {/* Mobile Menu Trigger */}
            <div className='md:hidden px-4'>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className='p-2 hover:bg-neutral-100 rounded-lg transition-colors'
                >
                    <Menu size={20} />
                </motion.button>
            </div>

            {/* Right: Search & Actions */}
            <div className='flex-1 flex items-center justify-between px-4 py-2 gap-4'>
                {/* Search Bar */}
                <motion.div
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
                </motion.div>

                {/* Mobile Search Icon (only visible on smallest screens) */}
                <button className='sm:hidden p-2 hover:bg-neutral-100 rounded-full'>
                    <Search size={20} />
                </button>

                <div className='flex items-center gap-3 md:gap-5'>
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

                    <Profile user={user} />
                </div>
            </div>
        </motion.div>
    )
};

const Profile = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme()

    const hoverBg =
        theme === 'dark'
            ? 'rgba(0, 0, 0, 0.5)'   // dark hover
            : 'rgba(245, 245, 245, 1)' // light hover

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={profileMenuRef} className='relative'>
            <motion.div
                whileHover={{ backgroundColor: hoverBg }}
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-3 p-1.5 pr-3 rounded-xl cursor-pointer transition-colors duration-200'
            >
                <div className='relative'>
                    <Image
                        src={user.avatar}
                        alt={user.name}
                        width={36}
                        height={36}
                        className='rounded-lg w-9 h-9 object-cover border border-neutral-100 shadow-sm'
                    />
                    <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
                </div>

                <div className='hidden sm:block text-left'>
                    <h3 className='text-sm font-semibold leading-tight'>{user.name}</h3>
                    <p className='text-[10px] text-neutral-500 truncate max-w-[120px]'>{user.email}</p>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} className='text-neutral-400' />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className='absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg border border-neutral-200 rounded-2xl shadow-xl z-50 overflow-hidden'
                    >
                        <div className='p-2'>
                            <div className='px-3 py-2.5 mb-1'>
                                <p className='text-xs font-medium text-neutral-400 uppercase tracking-wider'>Account</p>
                            </div>

                            <DropdownItem icon={<UserIcon size={16} />} label="Profile" />
                            <DropdownItem icon={<Settings size={16} />} label="Settings" />

                            <div className='h-px bg-neutral-100 my-1' />

                            <DropdownItem
                                icon={<LogOut size={16} />}
                                label="Logout"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const DropdownItem = ({ icon, label, className }: { icon: React.ReactNode, label: string, className?: string }) => (
    <motion.div
        whileHover={{ x: 4 }}
        className={cn(
            'flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 rounded-xl cursor-pointer transition-colors',
            className
        )}
    >
        <span className='text-neutral-400'>{icon}</span>
        <span className='font-medium'>{label}</span>
    </motion.div>
);
