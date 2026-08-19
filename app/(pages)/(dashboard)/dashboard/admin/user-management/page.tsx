'use client'

import React, { useState } from 'react'
import {
    Users,
    UserCheck,
    ShieldCheck,
    UserPlus,
    Search,
    CheckCircle2,
    XCircle,
    UserX,
    Edit3,
    Trash2,
    ChevronLeft,
    ChevronRight,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Plus,
    Shield,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export interface UserItem {
    id: string
    name: string
    email: string
    phone: string
    role: 'farmer' | 'admin' | 'agronomist'
    status: 'active' | 'blocked' | 'pending'
    location: string
    joinedDate: string
}

const initialUsers: UserItem[] = [
    {
        id: 'USR-101',
        name: 'আব্দুল করিম',
        email: 'karim@gmail.com',
        phone: '01712-345678',
        role: 'farmer',
        status: 'active',
        location: 'বগুড়া, রাজশাহী',
        joinedDate: '১২ জানুয়ারি, ২০২৬',
    },
    {
        id: 'USR-102',
        name: 'ড. রফিকুল ইসলাম',
        email: 'rafiq.agri@krisi.gov.bd',
        phone: '01819-876543',
        role: 'agronomist',
        status: 'active',
        location: 'ঢাকা',
        joinedDate: '০৫ নভেম্বর, ২০২৫',
    },
    {
        id: 'USR-103',
        name: 'তানভীর আহমেদ',
        email: 'admin.tanvir@krisibondhu.com',
        phone: '01911-223344',
        role: 'admin',
        status: 'active',
        location: 'ঢাকা',
        joinedDate: '০১ আগস্ট, ২০২৫',
    },
    {
        id: 'USR-104',
        name: 'মো: জহিরুল ইসলাম',
        email: 'zahir.farmer@gmail.com',
        phone: '01678-998877',
        role: 'farmer',
        status: 'blocked',
        location: 'দিনাজপুর',
        joinedDate: '২০ ডিসেম্বর, ২০২৫',
    },
    {
        id: 'USR-105',
        name: 'সালমা বেগম',
        email: 'salma.farm@gmail.com',
        phone: '01555-443322',
        role: 'farmer',
        status: 'pending',
        location: 'যশোর',
        joinedDate: '১৮ ফেব্রুয়ারি, ২০২৬',
    },
    {
        id: 'USR-106',
        name: 'কাজী আশরাফ হোসেন',
        email: 'ashraf.agro@gmail.com',
        phone: '01300-112233',
        role: 'agronomist',
        status: 'active',
        location: 'ময়মনসিংহ',
        joinedDate: '১০ ফেব্রুয়ারি, ২০২৬',
    },
]

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserItem[]>(initialUsers)
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState<'all' | 'farmer' | 'admin' | 'agronomist'>('all')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked' | 'pending'>('all')
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

    // Form state for adding user
    const [newUserName, setNewUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPhone, setNewUserPhone] = useState('')
    const [newUserRole, setNewUserRole] = useState<'farmer' | 'admin' | 'agronomist'>('farmer')
    const [newUserLocation, setNewUserLocation] = useState('')

    // Stats
    const totalUsers = users.length
    const activeFarmers = users.filter((u) => u.role === 'farmer' && u.status === 'active').length
    const totalAdmins = users.filter((u) => u.role === 'admin').length
    const pendingApproval = users.filter((u) => u.status === 'pending').length

    // Filter Logic
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery) ||
            user.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesRole = roleFilter === 'all' || user.role === roleFilter
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter

        return matchesSearch && matchesRole && matchesStatus
    })

    // Action Handlers
    const toggleBlockUser = (userId: string) => {
        setUsers(
            users.map((u) => {
                if (u.id === userId) {
                    const nextStatus = u.status === 'blocked' ? 'active' : 'blocked'
                    return { ...u, status: nextStatus }
                }
                return u
            })
        )
    }

    const deleteUser = (userId: string) => {
        if (confirm('আপনি কি নিশ্চিত যে এই ব্যবহারকারীকে মুছে ফেলতে চান?')) {
            setUsers(users.filter((u) => u.id !== userId))
        }
    }

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newUserName || !newUserEmail) return

        const newUser: UserItem = {
            id: 'USR-' + Math.floor(100 + Math.random() * 900),
            name: newUserName,
            email: newUserEmail,
            phone: newUserPhone || '০১৭০০-০০০০০',
            role: newUserRole,
            status: 'active',
            location: newUserLocation || 'বাংলাদেশ',
            joinedDate: 'আজ',
        }

        setUsers([newUser, ...users])
        setIsAddModalOpen(false)
        setNewUserName('')
        setNewUserEmail('')
        setNewUserPhone('')
        setNewUserLocation('')
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 flex flex-col gap-6 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-display select-none">
            
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            এডমিন প্যানেল
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                        ব্যবহারকারী ব্যবস্থাপনা (User Management)
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        কৃষি বন্ধু প্ল্যাটফর্মের সকল নিবন্ধিত কৃষক, এডমিন ও এগ্রোনোমিস্ট পরিচালনা করুন।
                    </p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span>নতুন ব্যবহারকারী যোগ করুন</span>
                </button>
            </div>

            {/* ── Stats Summary Grid (Monochrome + Primary Accent) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Users */}
                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 shrink-0">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            মোট ব্যবহারকারী
                        </p>
                        <p className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                            {totalUsers} জন
                        </p>
                    </div>
                </div>

                {/* Active Farmers */}
                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            সক্রিয় কৃষক
                        </p>
                        <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                            {activeFarmers} জন
                        </p>
                    </div>
                </div>

                {/* Admins */}
                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            এডমিন টিম
                        </p>
                        <p className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                            {totalAdmins} জন
                        </p>
                    </div>
                </div>

                {/* Pending Approval */}
                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 shrink-0">
                        <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            অপেক্ষমাণ অনুমোদন
                        </p>
                        <p className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                            {pendingApproval} জন
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Search & Filter Controls Bar ── */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search Field */}
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="নাম, ইমেইল বা অবস্থান দিয়ে খুঁজুন..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                {/* Filter Buttons & Selectors */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    {/* Role Filter Chips */}
                    <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                        {(['all', 'farmer', 'agronomist', 'admin'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRoleFilter(r)}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                                    roleFilter === r
                                        ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                                )}
                            >
                                {r === 'all' && 'সব রোল'}
                                {r === 'farmer' && 'কৃষক'}
                                {r === 'agronomist' && 'এগ্রোনোমিস্ট'}
                                {r === 'admin' && 'এডমিন'}
                            </button>
                        ))}
                    </div>

                    {/* Status Selector */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                        <option value="all">সব স্ট্যাটাস</option>
                        <option value="active">সক্রিয়</option>
                        <option value="pending">অপেক্ষমাণ</option>
                        <option value="blocked">ব্লকড</option>
                    </select>
                </div>
            </div>

            {/* ── Users Data Table ── */}
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="py-3.5 px-4">ব্যবহারকারী ID & নাম</th>
                                <th className="py-3.5 px-4">রোল (Role)</th>
                                <th className="py-3.5 px-4">যোগাযোগ & অবস্থান</th>
                                <th className="py-3.5 px-4">স্ট্যাটাস</th>
                                <th className="py-3.5 px-4">যোগদানের তারিখ</th>
                                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/30 transition-colors"
                                    >
                                        {/* Avatar & Name */}
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-[10px] text-neutral-400 font-mono">
                                                        {user.id} • {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role Badge */}
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={cn(
                                                    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border',
                                                    user.role === 'admin'
                                                        ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900'
                                                        : user.role === 'agronomist'
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                                                )}
                                            >
                                                {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                                {user.role === 'agronomist' && <ShieldCheck className="w-3 h-3" />}
                                                <span>
                                                    {user.role === 'farmer' && 'কৃষক'}
                                                    {user.role === 'agronomist' && 'এগ্রোনোমিস্ট'}
                                                    {user.role === 'admin' && 'এডমিন'}
                                                </span>
                                            </span>
                                        </td>

                                        {/* Phone & Location */}
                                        <td className="py-3.5 px-4">
                                            <p className="text-xs text-neutral-800 dark:text-neutral-200">
                                                {user.phone}
                                            </p>
                                            <p className="text-[10px] text-neutral-400">{user.location}</p>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={cn(
                                                    'inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border',
                                                    user.status === 'active'
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                                        : user.status === 'blocked'
                                                        ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 border-neutral-300 dark:border-neutral-700'
                                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
                                                )}
                                            >
                                                {user.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                                                {user.status === 'blocked' && <XCircle className="w-3 h-3" />}
                                                <span>
                                                    {user.status === 'active' && 'সক্রিয়'}
                                                    {user.status === 'blocked' && 'ব্লকড'}
                                                    {user.status === 'pending' && 'পেন্ডিং'}
                                                </span>
                                            </span>
                                        </td>

                                        {/* Joined Date */}
                                        <td className="py-3.5 px-4 text-neutral-500 text-[11px]">
                                            {user.joinedDate}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setIsDetailModalOpen(true)
                                                    }}
                                                    className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                                    title="বিস্তারিত দেখুন"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => toggleBlockUser(user.id)}
                                                    className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-emerald-500 transition-colors"
                                                    title={user.status === 'blocked' ? 'আনব্লক করুন' : 'ব্লক করুন'}
                                                >
                                                    <UserX className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-red-500 transition-colors"
                                                    title="ডিলিট করুন"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-neutral-400">
                                        কোনো ব্যবহারকারী পাওয়া যায়নি।
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Pagination Bar */}
                <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                    <span>
                        প্রদর্শিত হচ্ছে <b>{filteredUsers.length}</b> জনের মধ্যে <b>১-{filteredUsers.length}</b> জন
                    </span>
                    <div className="flex items-center gap-1">
                        <button disabled className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 opacity-50 cursor-not-allowed">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-bold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            ১
                        </span>
                        <button disabled className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 opacity-50 cursor-not-allowed">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── ADD USER MODAL ── */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl z-10"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-4">
                                <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100">
                                    নতুন ব্যবহারকারী যোগ করুন
                                </h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddUser} className="space-y-4 text-xs">
                                <div>
                                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                                        পূর্ণ নাম *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        placeholder="উদাহরণ: আব্দুল করিম"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-emerald-500 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                                        ইমেইল ঠিকানা *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={newUserEmail}
                                        onChange={(e) => setNewUserEmail(e.target.value)}
                                        placeholder="উদাহরণ: user@gmail.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-emerald-500 font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                                            ফোন নম্বর
                                        </label>
                                        <input
                                            type="text"
                                            value={newUserPhone}
                                            onChange={(e) => setNewUserPhone(e.target.value)}
                                            placeholder="01700-000000"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-emerald-500 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                                            রোল (Role)
                                        </label>
                                        <select
                                            value={newUserRole}
                                            onChange={(e) => setNewUserRole(e.target.value as any)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-emerald-500 font-bold cursor-pointer"
                                        >
                                            <option value="farmer">কৃষক</option>
                                            <option value="agronomist">এগ্রোনোমিস্ট</option>
                                            <option value="admin">এডমিন</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                                        অবস্থান/জেলা
                                    </label>
                                    <input
                                        type="text"
                                        value={newUserLocation}
                                        onChange={(e) => setNewUserLocation(e.target.value)}
                                        placeholder="উদাহরণ: বগুড়া, রাজশাহী"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-emerald-500 font-medium"
                                    />
                                </div>

                                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold"
                                    >
                                        বাতিল
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20"
                                    >
                                        সংরক্ষণ করুন
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── USER DETAILS MODAL ── */}
            <AnimatePresence>
                {isDetailModalOpen && selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDetailModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl z-10"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-4">
                                <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100">
                                    ব্যবহারকারীর প্রোফাইল তথ্য
                                </h3>
                                <button
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-2xl flex items-center justify-center">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-neutral-900 dark:text-neutral-100">
                                        {selectedUser.name}
                                    </h4>
                                    <span className="text-xs text-neutral-400 font-mono">
                                        {selectedUser.id}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-emerald-500" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 font-bold">ইমেইল</p>
                                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                                            {selectedUser.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-emerald-500" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 font-bold">ফোন নম্বর</p>
                                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                                            {selectedUser.phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-emerald-500" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 font-bold">অবস্থান</p>
                                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                                            {selectedUser.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    <div>
                                        <p className="text-[10px] text-neutral-400 font-bold">যোগদানের তারিখ</p>
                                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                                            {selectedUser.joinedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                                <button
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs"
                                >
                                    বন্ধ করুন
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
