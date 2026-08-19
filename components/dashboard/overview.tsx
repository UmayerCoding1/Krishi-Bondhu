'use client'

import { getCityName, getFullWeekWeather, getLocation, getWeatherData, weatherAlert } from '@/lib/location'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { cn } from '@/lib/utils'
import { DashboardContainer } from '@/components/dashboard/dashboard-container'
import RainCloudIcon from '../icons/RainCloudIcon'
import SunnyCloudIcon from '../icons/SunnyCloudIcon'
import SunIcon from '../icons/SunIcon'

import { WeatherHeroCard } from './overview/weather-hero'
import { LocationCropSummary } from './overview/location-crop-summary'
import { QuickActionCards } from './overview/quick-action-cards'
import { DailyTasksAdvisory } from './overview/daily-tasks-advisory'

const CACHE_KEY_PREFIX = 'kb_weather_'
const CACHE_TTL = 10 * 60 * 1000

export default function Overview() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
    const [weatherData, setWeatherData] = useState<{
        temp: number
        rain: string
        wind: number
        sunrise: number
        sunset: number
    } | null>(null)
    const [fullWeekWeatherData, setFullWeekWeatherData] = useState<
        { day: string; temp: number; weather: string }[] | null
    >(null)
    const [locationName, setLocationName] = useState<{ area: string; city: string } | null>(null)
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null)
    const [isAlertDismissed, setIsAlertDismissed] = useState(false)
    const [weatherStatus, setWeatherStatus] = useState('')
    const [completedTasks, setCompletedTasks] = useState<number[]>([])
    const route = useRouter()

    const getCache = (key: string) => {
        if (typeof window === 'undefined') return null
        const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${key}`)
        if (!cached) return null
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp > CACHE_TTL) {
            localStorage.removeItem(`${CACHE_KEY_PREFIX}${key}`)
            return null
        }
        return data
    }

    const setCache = (key: string, data: any) => {
        if (typeof window === 'undefined') return
        localStorage.setItem(
            `${CACHE_KEY_PREFIX}${key}`,
            JSON.stringify({
                data,
                timestamp: Date.now(),
            })
        )
    }

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const cachedLocation = getCache('location')
                const cachedCityInfo = getCache('city_info')
                const cachedAlert = getCache('alert')

                if (cachedLocation && cachedCityInfo) {
                    setLocation(cachedLocation)
                    setLocationName(cachedCityInfo)
                    if (cachedAlert) setAlert(cachedAlert)
                    return
                }

                const loc = await getLocation()
                setLocation(loc)
                setCache('location', loc)

                const cityInfo = await getCityName(loc.latitude, loc.longitude)
                if (typeof cityInfo !== 'string') {
                    const info = { area: cityInfo.area, city: cityInfo.city }
                    setLocationName(info)
                    setCache('city_info', info)
                }

                const activeAlert = await weatherAlert(loc.latitude, loc.longitude)
                if (activeAlert) {
                    setAlert(activeAlert)
                    setCache('alert', activeAlert)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchLocation()
    }, [])

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!location) return
            try {
                const cached = getCache('current_weather')
                if (cached) {
                    setWeatherData(cached)
                    setWeatherStatus(cached.rain || '')
                    return
                }

                const wData = await getWeatherData(location.latitude, location.longitude)
                const data = {
                    temp: wData.main.temp - 273.15,
                    rain: wData.weather[0].description || wData.weather[0].main,
                    wind: wData.wind.speed,
                    sunrise: wData.sys.sunrise,
                    sunset: wData.sys.sunset,
                }
                setWeatherData(data)
                setWeatherStatus(data.rain || '')
                setCache('current_weather', data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchWeatherData()
    }, [location])

    useEffect(() => {
        const fetchFullWeekWeatherData = async () => {
            if (!location) return
            try {
                const cached = getCache('forecast')
                if (cached) {
                    setFullWeekWeatherData(cached)
                    return
                }

                const data = await getFullWeekWeather(location.latitude, location.longitude)
                setFullWeekWeatherData(data)
                setCache('forecast', data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchFullWeekWeatherData()
    }, [location])

    const handleWeatherStatusMatchImage = (status: string) => {
        if (status.includes('বৃষ্টি') || status.includes('rain')) return '/assets/rain-bg.png'
        if (status.includes('পরিষ্কার') || status.includes('clear')) return '/assets/Clear-bg.png'
        if (status.includes('মেঘ') || status.includes('cloud')) return '/assets/card-bg.png'
        if (status.includes('কুয়াশা') || status.includes('haze')) return '/assets/haze-bg.png'
        return '/assets/card-bg.png'
    }

    const getWeatherIcon = (description: string) => {
        const desc = description.toLowerCase()
        if (desc.includes('rain')) return <SunnyCloudIcon />
        if (desc.includes('cloud')) return <RainCloudIcon />
        return <SunIcon />
    }

    const formatTimeBn = (unixTimestamp: number | undefined) => {
        if (!unixTimestamp) return '--:--'
        const date = new Date(unixTimestamp * 1000)
        return date.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: '2-digit', hour12: true })
    }

    const toggleTask = (index: number) => {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter((i) => i !== index))
        } else {
            setCompletedTasks([...completedTasks, index])
        }
    }

    if (!location) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500"
                />
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-bold animate-pulse">
                    আপনার অবস্থান ও আবহাওয়ার ডাটা লোড করা হচ্ছে...
                </p>
            </div>
        )
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    }

    const now = new Date()
    const day = now.toLocaleDateString('bn-BD', { weekday: 'long' })
    const date = now.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })
    const hour = now.getHours()
    const greeting =
        hour >= 5 && hour < 12
            ? 'শুভ সকাল'
            : hour >= 12 && hour < 15
            ? 'শুভ দুপুর'
            : hour >= 15 && hour < 18
            ? 'শুভ বিকাল'
            : hour >= 18 && hour < 20
            ? 'শুভ সন্ধ্যা'
            : 'শুভ রাত'

    const marketPrices = [
        { name: 'সরু চাল', price: '৭৫', unit: 'কেজি', status: 'up' as const, change: '+২%' },
        { name: 'আলু', price: '৪০', unit: 'কেজি', status: 'down' as const, change: '-৫%' },
        { name: 'পিঁয়াজ', price: '১১০', unit: 'কেজি', status: 'up' as const, change: '+৪%' },
        { name: 'রসুন', price: '১৮০', unit: 'কেজি', status: 'stable' as const, change: '০%' },
    ]

    const cropAdvice = [
        { name: 'বোরো ধান', task: 'সুষম সার প্রয়োগ', status: 'সময় উপযোগী', urgent: false },
        { name: 'ভুট্টা', task: 'বিকেলে সেচ প্রদান', status: 'জরুরি', urgent: true },
        { name: 'আলু', task: 'ফসল সংগ্রহ শুরু করুন', status: 'উপযুক্ত সময়', urgent: false },
    ]

    const dailyTasks = [
        { title: 'ধান ক্ষেতে নাইট্রোজেন সারের মাত্রা পরীক্ষা করুন', category: 'সার ব্যবস্থাপনা' },
        { title: 'সকালে পাতার নিচের পিঠ ছত্রাক মুক্ত আছে কি না দেখুন', category: 'রোগ বালাই' },
        { title: 'আগামীকালের বৃষ্টির আগে নিচু জমিতে পানি নিস্কাশন নালা তৈরি করুন', category: 'সেচ ব্যবস্থাপনা' },
    ]

    return (
        <DashboardContainer>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6 p-3 md:p-5 font-display"
            >
                {/* ── Weather Alert Banner ── */}
                <AnimatePresence>
                    {alert && !isAlertDismissed && (
                        <motion.div
                            variants={itemVariants}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            className={cn(
                                'relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 border shadow-md',
                                alert.type === 'danger'
                                    ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:bg-red-500/15 dark:text-red-400'
                                    : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
                            )}
                        >
                            <div
                                className={cn(
                                    'p-2.5 rounded-xl shrink-0',
                                    alert.type === 'danger' ? 'bg-red-500/20' : 'bg-amber-500/20'
                                )}
                            >
                                <AlertTriangle size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                                    আবহাওয়া সতর্কতা
                                </p>
                                <p className="text-sm font-bold truncate">{alert.message}</p>
                            </div>
                            <button
                                onClick={() => setIsAlertDismissed(true)}
                                className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* â”€â”€ SECTION 1: Weather Hero Card & Location Crop Summary â”€â”€ */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <WeatherHeroCard
                            greeting={greeting}
                            day={day}
                            date={date}
                            weatherData={weatherData}
                            weatherStatus={weatherStatus}
                            fullWeekWeatherData={fullWeekWeatherData}
                            formatTimeBn={formatTimeBn}
                            getWeatherIcon={getWeatherIcon}
                            handleWeatherStatusMatchImage={handleWeatherStatusMatchImage}
                        />
                    </div>
                    <LocationCropSummary
                        locationName={locationName}
                        cropAdvice={cropAdvice}
                        onNavigate={(href) => route.push(href)}
                    />
                </motion.div>

                {/* â”€â”€ SECTION 2: Quick Action Cards â”€â”€ */}
                <motion.div variants={itemVariants}>
                    <QuickActionCards marketPrices={marketPrices} onNavigate={(href) => route.push(href)} />
                </motion.div>

                {/* â”€â”€ SECTION 3: Daily Tasks & Smart Advisory â”€â”€ */}
                <motion.div variants={itemVariants}>
                    <DailyTasksAdvisory
                        dailyTasks={dailyTasks}
                        completedTasks={completedTasks}
                        toggleTask={toggleTask}
                        onNavigate={(href) => route.push(href)}
                    />
                </motion.div>
            </motion.div>
        </DashboardContainer>
    )
}