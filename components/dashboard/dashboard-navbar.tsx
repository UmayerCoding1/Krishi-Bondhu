'use client'

import { Logo } from '../logo'
import { Bell, ChevronDown, Menu, LogOut, Settings, User as UserIcon } from 'lucide-react'
import { User } from '@/provider/auth-provider'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import ModeToggle from '../theme-toggle'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import RefrashBtn from './refrash-btn'
import { DashboardSearch } from './dashboard-search'

export const DashboardNavbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
    const { user, logout } = useAuth()

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full h-16 border-b flex items-center sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-neutral-900/90 border-neutral-200/80 dark:border-neutral-800"
        >
            {/* Left: Logo Section (Desktop only) */}
            <div className="hidden md:flex w-64 border-r border-neutral-200/80 dark:border-neutral-800 h-full items-center justify-center">
                <Logo />
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden px-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onMenuClick}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                >
                    <Menu size={20} />
                </motion.button>
            </div>

            {/* Right: Search & Actions */}
            <div className="flex-1 flex items-center justify-between px-4 py-2 gap-4">
                {/* ── Separate Autocomplete Command Search Component ── */}
                <DashboardSearch />

                {/* Navbar Action Icons */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <RefrashBtn />
                    <ModeToggle />

                    {/* Notifications */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs cursor-pointer relative"
                    >
                        <Bell size={18} className="text-neutral-600 dark:text-neutral-300" />
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-800" />
                    </motion.div>

                    <div className="hidden md:block border-l border-neutral-200 dark:border-neutral-800 h-7" />

                    {user && <Profile user={user} logout={logout} />}
                </div>
            </div>
        </motion.div>
    )
}

export const Profile = ({ user, logout }: { user: User; logout: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const profileMenuRef = useRef<HTMLDivElement>(null)
    const { theme } = useTheme()
    const router = useRouter()

    const hoverBg =
        theme === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(245, 245, 245, 1)'

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={profileMenuRef} className="relative">
            <motion.div
                whileHover={{ backgroundColor: hoverBg }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl cursor-pointer transition-colors duration-200"
            >
                <div className="relative">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={36}
                            height={36}
                            className="rounded-xl w-9 h-9 object-cover border border-neutral-200 dark:border-neutral-700 shadow-xs"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                            <UserIcon size={18} />
                        </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-900 rounded-full" />
                </div>

                <div className="hidden sm:block text-left">
                    <h3 className="text-xs font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                        {user.name}
                    </h3>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate max-w-[110px]">
                        {user.email}
                    </p>
                </div>

                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} className="text-neutral-400" />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-2.5 w-56 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800 rounded-2xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-2">
                            <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                                    কৃষি বন্ধু অ্যাকাউন্ট
                                </p>
                                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">
                                    {user.name}
                                </p>
                            </div>

                            <DropdownItem
                                icon={<UserIcon size={15} />}
                                label="প্রোফাইল (Profile)"
                                onClick={() => {
                                    router.push('/profile')
                                    setIsOpen(false)
                                }}
                            />
                            <DropdownItem
                                icon={<Settings size={15} />}
                                label="সেটিংস (Settings)"
                                onClick={() => {
                                    router.push('/settings')
                                    setIsOpen(false)
                                }}
                            />

                            <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />

                            <DropdownItem
                                icon={<LogOut size={15} />}
                                label="লগআউট (Logout)"
                                className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                                onClick={() => {
                                    logout()
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const DropdownItem = ({
    icon,
    label,
    className,
    onClick,
}: {
    icon: React.ReactNode
    label: string
    className?: string
    onClick?: () => void
}) => (
    <motion.div
        whileHover={{ x: 3 }}
        onClick={onClick}
        className={cn(
            'flex items-center gap-3 px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/70 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors',
            className
        )}
    >
        <span className="text-neutral-400">{icon}</span>
        <span>{label}</span>
    </motion.div>
)
