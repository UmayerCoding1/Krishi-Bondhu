'use client'

import React, { useState, useEffect } from 'react'
import { motion, Variants } from 'motion/react'
import {
    Users,
    FileText,
    Activity,
    Database,
    Calendar,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Bell,
    Settings,
    Shield,
    TrendingUp,
    Zap,
    Clock
} from 'lucide-react'
import { DashboardContainer } from '../dashboard/dashboard-container'
import { cn } from '@/lib/utils'
import { SummaryCard } from '../dashboard/summary-card'
import { useRouter } from 'next/navigation'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
}

export const AdminOverview = () => {
    const router = useRouter()
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    const stats = [
        {
            title: 'Total Users',
            value: '1,284',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'AI Reports',
            value: '452',
            change: '+5%',
            trend: 'up',
            icon: FileText,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            title: 'Market Data Sync',
            value: '99.9%',
            change: 'Active',
            trend: 'up',
            icon: Activity,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
        },
        {
            title: 'Storage Used',
            value: '2.4 GB',
            change: 'Normal',
            trend: 'down',
            icon: Database,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        }
    ]

    const activities = [
        { id: 1, user: 'Karim Ullah', action: 'registered as a farmer', time: '2 mins ago', icon: Users, color: 'bg-blue-500' },
        { id: 2, user: 'AI System', action: 'completed crop analysis #842', time: '15 mins ago', icon: Zap, color: 'bg-purple-500' },
        { id: 3, user: 'System', action: 'Market price updated (Rice)', time: '1 hour ago', icon: TrendingUp, color: 'bg-emerald-500' },
        { id: 4, user: 'Aminul Islam', action: 'updated system settings', time: '3 hours ago', icon: Shield, color: 'bg-orange-500' },
    ]

    return (
        <DashboardContainer>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-8 p-1 pb-10"
            >
                {/* Header / Hero Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                            Dashboard <span className="text-primary italic">Overview</span>
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Welcome back, Admin. System is running smoothly.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm">
                                {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <button className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 dark:border-white/5 shadow-xl group transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn("p-3 rounded-2xl", stat.bgColor)}>
                                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full",
                                    stat.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                                )}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">{stat.title}</p>
                                <p className="text-3xl font-black text-neutral-900 dark:text-white">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 dark:border-white/5 shadow-2xl h-full font-sans">
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Recent Activity</h2>
                                    <p className="text-sm text-neutral-500 font-medium">Live system events and logs</p>
                                </div>
                                <button className="text-sm font-bold text-primary hover:underline">View All</button>
                            </div>

                            <div className="space-y-6">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-5 group">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform", activity.color)}>
                                            <activity.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 space-y-0.5 border-b border-neutral-100 dark:border-neutral-800 pb-4 group-last:border-0">
                                            <div className="flex justify-between items-center">
                                                <p className="font-bold text-neutral-900 dark:text-neutral-100">
                                                    {activity.user}
                                                </p>
                                                <span className="text-[10px] uppercase tracking-wider font-black text-neutral-400">{activity.time}</span>
                                            </div>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">{activity.action}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-6">
                        <SummaryCard
                            title="Quick Controls"
                            icon={Settings}
                            iconColor="text-primary"
                            bgColor="bg-primary/10"
                            className="bg-primary/5 border-primary/20"
                        >
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { label: 'User Management', path: '/dashboard/admin/user-management', icon: Users },
                                    { label: 'System Logs', path: '/dashboard/admin/system-report', icon: FileText },
                                    { label: 'Market Control', path: '/dashboard/admin/market-data', icon: TrendingUp },
                                ].map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => router.push(action.path)}
                                        className="w-full p-4 rounded-2xl bg-white/50 dark:bg-neutral-800/50 hover:bg-primary hover:text-white dark:hover:bg-primary border border-white/40 dark:border-neutral-700/50 transition-all flex items-center justify-between group/btn shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <action.icon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                            <span className="font-bold text-sm tracking-tight">{action.label}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </SummaryCard>

                        <div className="bg-linear-to-br from-neutral-900 to-black p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Shield className="w-32 h-32" />
                            </div>
                            <h3 className="text-xl font-black mb-2 relative z-10">System Status</h3>
                            <p className="text-neutral-400 text-sm mb-6 relative z-10 font-medium">Security and health analysis metrics.</p>

                            <div className="space-y-4 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                        <span>Server Load</span>
                                        <span>24%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[24%] bg-primary rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                        <span>API Latency</span>
                                        <span>12ms</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[15%] bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </DashboardContainer>
    )
}
