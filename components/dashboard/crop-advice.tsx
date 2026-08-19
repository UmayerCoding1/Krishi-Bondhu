'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from '../container'
import { DashboardContainer } from './dashboard-container'
import {
    Banknote,
    CalendarDays,
    Frown,
    Loader2,
    MapPin,
    Sparkles,
    TrendingUp,
    Sprout,
    Share2,
    Bookmark,
    Search,
    Layers,
    RotateCcw,
    CheckCircle2,
    Info,
    Droplets,
    Sun,
    Award,
    Printer,
} from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { AppButton } from '../app-button'
import { AiSvg } from '../icons/ai-svg'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { SkeletonCard } from '../skeleton-card'
import { useCropStore } from '@/store/useCropStore'
import { AiAlert } from './ai-alert'
import axiosInstance from '@/lib/axios'

const soilTypesBangladesh = [
    'পলিমাটি (Alluvial Soil)',
    'লাল মাটি (Red Soil)',
    'কালো মাটি (Black Soil)',
    'দোঁআশ মাটি (Loamy Soil)',
    'বেলে মাটি (Sandy Soil)',
    'কাঁদামাটি (Clay Soil)',
    'লবণাক্ত মাটি (Saline Soil)',
]

const popularLocations = ['বগুড়া', 'দিনাজপুর', 'যশোর', 'রাজশাহী', 'রংপুর', 'পাবনা']

export const CropAdvicePage = () => {
    const { storeBestCrop, storeCropAdvice, storeLoading } = useCropStore()
    const [location, setLocation] = useState('')
    const [season, setSeason] = useState('')
    const [soilType, setSoilType] = useState('')
    const [cropAdvice, setCropAdvice] = useState<any>(storeCropAdvice)
    const [bestCrop, setBestCrop] = useState<any>(storeBestCrop)
    const [loading, setLoading] = useState(storeLoading)
    const [sendRequest, setSendRequest] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [savedCrops, setSavedCrops] = useState<string[]>([])

    const isShowAiAlert = typeof window !== 'undefined' ? sessionStorage.getItem('isShowCropAdviceAlert') : null
    const [isShowSiteInfo, setIsShowSiteInfo] = useState(isShowAiAlert ? false : true)

    const handleCropAdviceForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { setStoreCropData, setStoreLoading } = useCropStore.getState()
        setStoreLoading(true)
        setLoading(true)
        setSendRequest(true)

        try {
            const response = await axiosInstance.post(
                `/crop`,
                { location, season, soil: soilType },
                { withCredentials: true }
            )

            if (response.data.success) {
                setStoreCropData(response.data.data)
                setBestCrop(response.data.data.bestCrop ? response.data.data.bestCrop : response.data.data.cropsWithImages[0])
                setCropAdvice(response.data.data.cropsWithImages)
                setStoreLoading(false)
                setLoading(false)
                setSendRequest(false)
                toast.success('এআই ফসল পরামর্শ সফলভাবে তৈরি করা হয়েছে!', { position: 'top-right' })
            }
        } catch (error: any) {
            console.error(error)
            if (error?.response?.status === 400) {
                toast.error(error.response.data.message || 'সঠিক তথ্য প্রদান করুন', { position: 'top-right' })
                setStoreCropData({ bestCrop: null, cropsWithImages: [] })
                setBestCrop(null)
                setCropAdvice(null)
            } else {
                toast.error('কোথাও কোনো সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন')
            }
            setStoreLoading(false)
            setLoading(false)
            setSendRequest(false)
        }
    }

    const toggleSaveCrop = (cropName: string) => {
        if (savedCrops.includes(cropName)) {
            setSavedCrops(savedCrops.filter((c) => c !== cropName))
            toast.info(`${cropName} বুকমার্ক থেকে সরানো হয়েছে`)
        } else {
            setSavedCrops([...savedCrops, cropName])
            toast.success(`${cropName} বুকমার্কে সংরক্ষণ করা হয়েছে`)
        }
    }

    const handleShare = (cropName: string) => {
        if (navigator.share) {
            navigator.share({
                title: `কৃষি বন্ধু পরামর্শ - ${cropName}`,
                text: `আমি কৃষি বন্ধু এআই থেকে ${cropName} চাষের পরামর্শ পেয়েছি!`,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('পরামর্শের লিংক কপি করা হয়েছে!')
        }
    }

    const handlePrint = () => {
        window.print()
    }

    const filteredCrops = cropAdvice?.filter((crop: any) =>
        crop['Crop name Bangla']?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    console.log(filteredCrops[0])

    return (
        <DashboardContainer className="bg-neutral-50/50 dark:bg-neutral-950 min-h-(--dashboard-height) font-display pb-16">
            {/* Ambient Glows */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-10 left-1/4 w-[36rem] h-64 rounded-full bg-emerald-500/5 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-10 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl"
            />

            <Container className="relative z-10">
                {/* ── Top Header Banner ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" />
                                এআই ফসল উপদেষ্টা
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                            আপনার জমির জন্য <span className="text-emerald-500">সেরা ফসল</span> নির্বাচন করুন
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl leading-relaxed">
                            অবস্থান, মৌসুম ও মাটির ধরন প্রদান করুন — আমাদের কৃত্রিম বুদ্ধিমত্তা আপনাকে সবচেয়ে লাভজনক ফসলের পরামর্শ দেবে।
                        </p>
                    </div>

                    {/* Header Quick Stats */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <Award className="w-4 h-4 text-emerald-500" />
                            <div className="text-left">
                                <p className="text-[10px] text-neutral-400 font-bold uppercase">নির্ভুলতা</p>
                                <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">৯৮% সঠিক</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            <Sprout className="w-4 h-4 text-teal-500" />
                            <div className="text-left">
                                <p className="text-[10px] text-neutral-400 font-bold uppercase">মাটির ডাটা</p>
                                <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">৭ প্রকার</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Main 2-Column Section ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── LEFT COLUMN: Input Form Card (5 Cols) ── */}
                    <div className="lg:col-span-5 bg-white dark:bg-neutral-900/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xl relative overflow-hidden">
                        {/* Form Header */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                <Sprout className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                                    জমির তথ্য প্রদান করুন
                                </h2>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    নির্ভুল ফলাফলের জন্য সব ঘর পূরণ করুন
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleCropAdviceForm} className="flex flex-col gap-5">
                            {/* Location Input */}
                            <div className="flex flex-col gap-2">
                                <Label className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>অবস্থান (Location)</span>
                                </Label>
                                <Input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    type="text"
                                    placeholder="উদাহরণ: বগুড়া, কাহালু, দিনাজপুর..."
                                    className="bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm h-12 rounded-xl text-sm placeholder:text-neutral-400"
                                />

                                {/* Location Quick Presets */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                    <span className="text-[11px] text-neutral-400 font-medium">দ্রুত নির্বাচন:</span>
                                    {popularLocations.map((loc) => (
                                        <button
                                            type="button"
                                            key={loc}
                                            onClick={() => setLocation(loc)}
                                            className={cn(
                                                'text-[11px] px-2 py-0.5 rounded-md border transition-all',
                                                location === loc
                                                    ? 'bg-emerald-500 text-white border-emerald-500 font-bold'
                                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-emerald-500/50'
                                            )}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Season & Soil Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Season Select */}
                                <div className="flex flex-col gap-2">
                                    <Label className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                        <CalendarDays className="w-3.5 h-3.5 text-sky-500" />
                                        <span>ঋতু (Season)</span>
                                    </Label>
                                    <Select value={season} onValueChange={(val) => setSeason(val)} required>
                                        <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 shadow-sm h-12 rounded-xl text-xs sm:text-sm">
                                            <SelectValue placeholder="ঋতু নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>ঋতু</SelectLabel>
                                                <SelectItem value="summer">গ্রীষ্মকালীন ফসল (Summer)</SelectItem>
                                                <SelectItem value="winter">শীতকালীন ফসল (Winter)</SelectItem>
                                                <SelectItem value="rainy">বর্ষাকালীন ফসল (Rainy/Monsoon)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Soil Type Select */}
                                <div className="flex flex-col gap-2">
                                    <Label className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                        <Layers className="w-3.5 h-3.5 text-amber-500" />
                                        <span>মাটির ধরন (Soil Type)</span>
                                    </Label>
                                    <Select value={soilType} onValueChange={(val) => setSoilType(val)} required>
                                        <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 shadow-sm h-12 rounded-xl text-xs sm:text-sm">
                                            <SelectValue placeholder="মাটির ধরন নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-48">
                                            <SelectGroup>
                                                <SelectLabel>মাটির ধরন</SelectLabel>
                                                {soilTypesBangladesh.map((soil) => (
                                                    <SelectItem key={soil} value={soil} className="py-2.5 text-xs sm:text-sm">
                                                        {soil}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <AppButton
                                className="h-13 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                type="submit"

                            >
                                {sendRequest ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>এআই বিশ্লেষণ করছে...</span>
                                    </>
                                ) : (
                                    <>
                                        <AiSvg className="w-5 h-5 fill-white" />
                                        <span>এআই পরামর্শ দেখুন</span>
                                    </>
                                )}
                            </AppButton>
                        </form>
                    </div>

                    {/* ── RIGHT COLUMN: Best Crop Result Display (7 Cols) ── */}
                    <div className="lg:col-span-7">
                        {loading ? (
                            <div className="w-full flex flex-col gap-4">
                                <SkeletonCard className="w-full h-64 rounded-3xl" />
                                <div className="grid grid-cols-2 gap-4">
                                    <SkeletonCard className="h-16 rounded-2xl" />
                                    <SkeletonCard className="h-16 rounded-2xl" />
                                </div>
                                <SkeletonCard className="h-24 rounded-2xl" />
                            </div>
                        ) : bestCrop ? (
                            <CropDetailsCard
                                bestCrop={bestCrop}
                                isSaved={savedCrops.includes(bestCrop['Crop name Bangla'])}
                                onToggleSave={() => toggleSaveCrop(bestCrop['Crop name Bangla'])}
                                onShare={() => handleShare(bestCrop['Crop name Bangla'])}
                                onPrint={handlePrint}
                            />
                        ) : (
                            <div className="w-full h-[400px] bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 shadow-sm">
                                <div className="w-16 h-16 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 text-neutral-400">
                                    <Sprout className="w-8 h-8 text-emerald-500/60 animate-pulse" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                                    কোনো ফসল নির্বাচিত হয়নি
                                </h3>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xs leading-relaxed">
                                    বাম পাশের ফর্মে আপনার জমির তথ্য পূরণ করে "এআই পরামর্শ দেখুন" বোতামে ক্লিক করুন।
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── OTHER RECOMMENDATIONS SECTION ── */}
                {cropAdvice && cropAdvice.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-neutral-200/80 dark:border-neutral-800">
                        {/* Section Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-2">
                                    <span>অন্যান্য বিকল্প সুপারিশসমূহ</span>
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        {cropAdvice.length} টি বিকল্প
                                    </span>
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                    আপনার এলাকার মাটি ও ঋতুর জন্য অন্যান্য লাভজনক ফসলের তালিকা
                                </p>
                            </div>

                            {/* Search Filter Box */}
                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="ফসল দিয়ে খুঁজুন..."
                                    className="pl-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl text-xs h-10 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Recommendation Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredCrops?.map((crop: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="group relative rounded-2xl p-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex items-stretch gap-4"
                                >
                                    {/* Number Rank Pill */}
                                    <div className="shrink-0 w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-xs font-black text-neutral-700 dark:text-neutral-300">
                                        0{index + 1}
                                    </div>

                                    {/* Image */}
                                    <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                        <img
                                            src={crop?.image}
                                            alt={crop?.['Crop name Bangla']}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
                                                    {crop['Crop name Bangla']}
                                                </h3>
                                                <button
                                                    onClick={() => toggleSaveCrop(crop['Crop name Bangla'])}
                                                    className="text-neutral-400 hover:text-emerald-500 transition-colors p-1"
                                                >
                                                    <Bookmark
                                                        className={cn(
                                                            'w-4 h-4',
                                                            savedCrops.includes(crop['Crop name Bangla']) &&
                                                            'fill-emerald-500 text-emerald-500'
                                                        )}
                                                    />
                                                </button>
                                            </div>

                                            {/* Expected Profit */}
                                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md mb-2">
                                                <Banknote className="w-3.5 h-3.5" />
                                                <span>{crop['Expected profit']}</span>
                                            </div>

                                            {/* Explanation */}
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                                                {crop['Explanation']}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Alert Modal */}
                <AnimatePresence>
                    {isShowSiteInfo && (
                        <AiAlert setIsShowSiteInfo={setIsShowSiteInfo} sessionName="isShowCropAdviceAlert" />
                    )}
                </AnimatePresence>
            </Container>
        </DashboardContainer>
    )
}

/* ── Best Crop Recommendation Card Component ── */
const CropDetailsCard = ({
    bestCrop,
    isSaved,
    onToggleSave,
    onShare,
    onPrint,
}: {
    bestCrop: any
    isSaved: boolean
    onToggleSave: () => void
    onShare: () => void
    onPrint: () => void
}) => {
    if (!bestCrop) return null
    console.log('first', bestCrop)
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden"
        >
            {/* Top Banner Image with Gradient Overlay */}
            <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-neutral-950">
                {bestCrop?.image ? (
                    <img
                        src={bestCrop?.image}
                        alt={bestCrop?.['Crop name Bangla']}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <SkeletonCard className="w-full h-full" />
                )}

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                {/* Top Actions Row */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black bg-emerald-500 text-white px-3.5 py-1.5 rounded-full shadow-lg">
                        <Award className="w-3.5 h-3.5" />
                        সেরা সুপারিশ (Top Pick)
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onToggleSave}
                            className="w-9 h-9 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-neutral-800 transition-all shadow-md"
                            title="সংরক্ষণ করুন"
                        >
                            <Bookmark className={cn('w-4 h-4', isSaved && 'fill-emerald-400 text-emerald-400')} />
                        </button>
                        <button
                            onClick={onShare}
                            className="w-9 h-9 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-neutral-800 transition-all shadow-md"
                            title="শেয়ার করুন"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Bottom Crop Title */}
                <div className="absolute bottom-4 left-5 right-5 z-10">
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
                        {bestCrop?.['Crop name Bangla']}
                    </h2>
                </div>
            </div>

            {/* Details Content Box */}
            <div className="p-6 sm:p-7 flex flex-col gap-5">
                {/* Profit Metric Pill */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                        <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            প্রত্যাশিত আনুমানিক লাভ (Expected Profit)
                        </p>
                        <p className="text-base sm:text-lg font-black text-neutral-900 dark:text-neutral-100 leading-tight">
                            {bestCrop?.['Expected profit']}
                        </p>
                    </div>
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                        <Info className="w-4 h-4 text-emerald-500" />
                        <span>এআই বিশ্লেষণ ও পরামর্শ:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {bestCrop?.['Explanation']}
                    </p>
                </div>

                {/* Print Button */}
                <div className="flex items-center justify-end pt-2">
                    <button
                        onClick={onPrint}
                        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        <span>রিপোর্ট প্রিন্ট করুন</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}