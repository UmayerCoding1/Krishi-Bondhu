'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Header, HeaderDescription, HeaderTitle } from '../header'
import {
    Camera,
    CircleCheck,
    FileUp,
    Loader2,
    X,
    Sparkles,
    ShieldCheck,
    FlaskConical,
    Leaf,
    Scan,
    Share2,
    Printer,
    RefreshCw,
    AlertCircle,
    Info,
    CheckCircle2,
    Activity,
    Upload,
    ImageIcon,
} from 'lucide-react'
import { AppButton } from '../app-button'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDiseaseStore } from '@/store/useDiseaseStore'
import { motion, AnimatePresence } from 'motion/react'
import { AiAlert } from './ai-alert'
import { cn } from '@/lib/utils'

const sampleImages = [
    { name: 'ধানের পাতা', url: '/assets/crop-leaf-disease.png' },
    { name: 'টমেটো পাতা', url: '/assets/a2.jpg' },
]

export const DiseaseDetectionPage = () => {
    const {
        diseaseResult,
        imagePreview,
        showDiseaseResult,
        setDiseaseData,
        clearDiseaseData,
        lastUpdated,
    } = useDiseaseStore()

    const [image, setImage] = useState<File | null>(null)
    const [localPreview, setLocalPreview] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isShowAiAlert = typeof window !== 'undefined' ? sessionStorage.getItem('isShowDiseaseDetectionAlert') : null
    const [isShowSiteInfo, setIsShowSiteInfo] = useState(isShowAiAlert ? false : true)

    useEffect(() => {
        if (lastUpdated) {
            const now = Date.now()
            const expirationTime = 30 * 60 * 1000
            if (now - lastUpdated > expirationTime) {
                clearDiseaseData()
                toast.info('ফলাফলের সময় শেষ হয়ে গেছে। আবার চেষ্টা করুন।')
            }
        }
    }, [lastUpdated, clearDiseaseData])

    const displayPreview = localPreview || imagePreview

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল আপলোড করুন')
            return
        }
        setImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setLocalPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            processFile(file)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            processFile(file)
        }
    }

    const loadSampleImage = async (url: string, name: string) => {
        try {
            setLocalPreview(url)
            const response = await fetch(url)
            const blob = await response.blob()
            const file = new File([blob], `${name}.png`, { type: blob.type || 'image/png' })
            setImage(file)
            toast.success(`নমুনা ছবি (${name}) নির্বাচন করা হয়েছে`)
        } catch (err) {
            setLocalPreview(url)
            toast.info(`নমুনা ছবি (${name}) প্রদর্শিত হচ্ছে`)
        }
    }

    const handleDiseaseResult = async () => {
        try {
            if (!image && !localPreview) {
                toast.error('রোগ শনাক্ত করতে একটি ছবি সিলেক্ট করুন')
                return
            }

            setLoading(true)

            let formData = new FormData()
            if (image) {
                formData.append('disease_crop', image)
            } else if (localPreview) {
                const response = await fetch(localPreview)
                const blob = await response.blob()
                const file = new File([blob], 'sample-crop.png', { type: blob.type || 'image/png' })
                formData.append('disease_crop', file)
            }

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/disease/detect`,
                formData
            )

            if (result.data.success) {
                let rawData = result.data.data
                let parsedData: any

                try {
                    if (typeof rawData === 'string') {
                        const cleanString = rawData
                            .replace(/```json/g, '')
                            .replace(/```/g, '')
                            .trim()
                        parsedData = JSON.parse(cleanString)
                    } else {
                        parsedData = rawData
                    }

                    setDiseaseData(parsedData, localPreview || imagePreview || '')
                    setLoading(false)
                    toast.success(result.data.message || 'রোগ সফলতা সহ শনাক্ত করা হয়েছে')
                } catch (parseError) {
                    console.error('JSON parse error:', parseError)
                    setLoading(false)
                    toast.error('ডাটা প্রক্রিয়াকরণে সমস্যা হয়েছে')
                }
            }
        } catch (error) {
            console.error(error)
            setLoading(false)
            toast.error('রোগ শনাক্ত করা যায়নি। আবার চেষ্টা করুন।')
        }
    }

    const handleReset = () => {
        setImage(null)
        setLocalPreview(null)
        clearDiseaseData()
        toast.info('নতুন পরীক্ষার জন্য প্রস্তুত')
    }

    const handleShare = () => {
        if (navigator.share && diseaseResult) {
            navigator.share({
                title: `কৃষি বন্ধু রোগ সমাধান - ${diseaseResult.disease}`,
                text: `আমার ফসলে ${diseaseResult.disease} রোগ শনাক্ত হয়েছে। সঠিক সমাধান পেয়েছি কৃষি বন্ধু এআই থেকে!`,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('ফলাফলের লিংক কপি করা হয়েছে!')
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 pb-12 font-display">
            {/* ── Top Header Bar ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Header className="my-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5" />
                            এআই ভিশন প্রযুক্তি
                        </span>
                    </div>
                    <HeaderTitle className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
                        ফসলের রোগ শনাক্তকরণ
                    </HeaderTitle>
                    <HeaderDescription className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                        আপনার ফসলের আক্রান্ত পাতার ছবি আপলোড করুন — এআই ৩ সেকেন্ডে রোগ শনাক্ত করে ওষুধ জানিয়ে দেবে।
                    </HeaderDescription>
                </Header>

                {/* System Active Badge */}
                <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 rounded-full shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        এআই স্ক্যানার সক্রিয়
                    </p>
                </div>
            </div>

            {/* ── Main Showcase Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* ── LEFT PANEL: Image Upload Card (6 Cols) ── */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl rounded-3xl p-6 relative overflow-hidden flex flex-col">

                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <FileUp className="w-4 h-4 text-emerald-500" />
                                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                                    ছবি আপলোড করুন
                                </h3>
                            </div>

                            {displayPreview && (
                                <button
                                    onClick={handleReset}
                                    className="text-xs text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1 font-medium"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    <span>রিসেট</span>
                                </button>
                            )}
                        </div>

                        {/* Drop Zone Box */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={cn(
                                'relative w-full min-h-[320px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 overflow-hidden',
                                isDragging
                                    ? 'border-emerald-500 bg-emerald-500/10 scale-[0.99]'
                                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 hover:border-emerald-500/50'
                            )}
                        >
                            {displayPreview ? (
                                <div className="relative w-full h-full min-h-[320px] flex flex-col items-center justify-center p-3">
                                    <img
                                        src={displayPreview}
                                        alt="Uploaded Crop Preview"
                                        className="w-full h-64 object-cover rounded-xl shadow-md"
                                    />

                                    {/* Scanning Laser Line when Loading */}
                                    {isLoading && (
                                        <>
                                            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center z-20">
                                                <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-2" />
                                                <span className="text-xs font-bold text-white tracking-wider">
                                                    রোগ বিশ্লেষণ করা হচ্ছে...
                                                </span>
                                            </div>
                                            <motion.div
                                                className="absolute left-3 right-3 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] z-30 pointer-events-none"
                                                animate={{ top: ['10%', '85%', '10%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                            />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-1">
                                        <Camera className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                                            ছবি ড্র্যাগ করে আনুন অথবা ডিভাইস থেকে সিলেক্ট করুন
                                        </p>
                                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                            স্পষ্ট, পরিষ্কার আলোর ছবি তুললে সঠিক ফলাফল পাওয়া যায়
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs px-5 py-2.5 shadow-md shadow-emerald-600/20"
                                    >
                                        <Upload className="w-3.5 h-3.5 mr-2" />
                                        ফাইল নির্বাচন করুন
                                    </Button>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* Submit Action Button */}
                        {displayPreview && (
                            <div className="mt-4">
                                <AppButton
                                    onClick={handleDiseaseResult}
                                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-sm flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>বিশ্লেষণ চলছে...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Scan className="w-5 h-5" />
                                            <span>রোগ শনাক্ত করুন</span>
                                        </>
                                    )}
                                </AppButton>
                            </div>
                        )}
                    </div>

                    {/* Quick Test Sample Images */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                দ্রুত পরীক্ষার জন্য নমুনা ছবি:
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {sampleImages.map((sample, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => loadSampleImage(sample.url, sample.name)}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-emerald-500 hover:text-white transition-all border border-neutral-200 dark:border-neutral-700"
                                >
                                    {sample.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT PANEL: Disease Diagnosis Result Card (6 Cols) ── */}
                <div className="lg:col-span-6">
                    {showDiseaseResult && diseaseResult ? (
                        <DiseaseResultCard
                            diseaseResult={diseaseResult}
                            onShare={handleShare}
                            onPrint={handlePrint}
                            onReset={handleReset}
                        />
                    ) : (
                        <div className="w-full min-h-[380px] bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 shadow-sm">
                            <div className="w-16 h-16 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 text-neutral-400">
                                <Scan className="w-8 h-8 text-emerald-500/60 animate-pulse" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                                কোনো রোগ এখনও শনাক্ত করা হয়নি
                            </h3>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xs leading-relaxed">
                                বাম পাশের বাক্সে আপনার আক্রান্ত ফসলের পাতার ছবি আপলোড করুন অথবা নমুনা ছবিতে ক্লিক করে এআই টেস্ট করুন।
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isShowSiteInfo && (
                    <AiAlert setIsShowSiteInfo={setIsShowSiteInfo} sessionName="isShowDiseaseDetectionAlert" />
                )}
            </AnimatePresence>
        </div>
    )
}

/* ── Disease Result Card Component ── */
const DiseaseResultCard = ({
    diseaseResult,
    onShare,
    onPrint,
    onReset,
}: {
    diseaseResult: any
    onShare: () => void
    onPrint: () => void
    onReset: () => void
}) => {
    const accuracy = diseaseResult?.Accuracy || 95

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden p-6 sm:p-7 flex flex-col gap-6 relative"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Result Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider mb-1.5">
                        <AlertCircle className="w-3 h-3" />
                        শনাক্তকৃত রোগ
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 leading-tight">
                        {diseaseResult?.disease}
                    </h2>
                </div>

                {/* Accuracy Gauge */}
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 p-3 rounded-2xl flex flex-col items-center shrink-0 min-w-[100px]">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                        {accuracy}%
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mt-1">
                        নির্ভুলতা
                    </span>
                </div>
            </div>

            {/* Chemical Solution Box */}
            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <FlaskConical className="w-4 h-4 text-amber-500" />
                    <span>রাসায়নিক সমাধান (Chemical Remedy)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    {diseaseResult?.solution?.chemical || 'সঠিক ওষুধ প্র প্রয়োগ করুন।'}
                </p>
            </div>

            {/* Organic Solution Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <span>জৈব সমাধান (Organic Remedy)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    {diseaseResult?.solution?.organic || 'জৈব প্র পন্থায় বালাই দমন করুন।'}
                </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>নতুন পরীক্ষা</span>
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onPrint}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
                    >
                        <Printer className="w-3.5 h-3.5" />
                        <span>প্রিন্ট</span>
                    </button>
                    <button
                        onClick={onShare}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                    >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>শেয়ার করুন</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}