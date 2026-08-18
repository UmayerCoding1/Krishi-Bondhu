'use client'

import { getCityName, getFullWeekWeather, getLocation, getWeatherData, weatherAlert } from '@/lib/location';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    ScanSearch, AlertTriangle, X,
    Leaf, ChartNoAxesColumn, TrendingUp, TrendingDown,
    Sprout, Wind, MapPin, CloudRain, Sunrise, Sunset,
    Thermometer, Calendar, Bot, ArrowRight, Zap, Star
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { DashboardContainer } from '@/components/dashboard/dashboard-container';
import RainCloudIcon from '../icons/RainCloudIcon';
import SunnyCloudIcon from '../icons/SunnyCloudIcon';
import SunIcon from '../icons/SunIcon';

const CACHE_KEY_PREFIX = 'kb_weather_';
const CACHE_TTL = 10 * 60 * 1000;

export default function Overview() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [weatherData, setWeatherData] = useState<{ temp: number; rain: string; wind: number; sunrise: number; sunset: number } | null>(null);
    const [fullWeekWeatherData, setFullWeekWeatherData] = useState<{ day: string; temp: number; weather: string }[] | null>(null);
    const [locationName, setLocationName] = useState<{ area: string; city: string } | null>(null);
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
    const [isAlertDismissed, setIsAlertDismissed] = useState(false);
    const [weatherStatus, setWeatherStatus] = useState('');
    const route = useRouter();

    const getCache = (key: string) => {
        const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${key}`);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_TTL) {
            localStorage.removeItem(`${CACHE_KEY_PREFIX}${key}`);
            return null;
        }
        return data;
    };

    const setCache = (key: string, data: any) => {
        localStorage.setItem(`${CACHE_KEY_PREFIX}${key}`, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // Check cache for location and city info
                const cachedLocation = getCache('location');
                const cachedCityInfo = getCache('city_info');
                const cachedAlert = getCache('alert');

                if (cachedLocation && cachedCityInfo) {
                    setLocation(cachedLocation);
                    setLocationName(cachedCityInfo);
                    if (cachedAlert) setAlert(cachedAlert);
                    return;
                }

                const loc = await getLocation();
                setLocation(loc);
                setCache('location', loc);

                const cityInfo = await getCityName(loc.latitude, loc.longitude);
                if (typeof cityInfo !== 'string') {
                    const info = { area: cityInfo.area, city: cityInfo.city };
                    setLocationName(info);
                    setCache('city_info', info);
                }

                const activeAlert = await weatherAlert(loc.latitude, loc.longitude);
                if (activeAlert) {
                    setAlert(activeAlert);
                    setCache('alert', activeAlert);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!location) return;
            try {
                const cached = getCache('current_weather');
                if (cached) {
                    setWeatherData(cached);
                    return;
                }

                const wData = await getWeatherData(location.latitude, location.longitude);
                const data = {
                    temp: wData.main.temp - 273.15,
                    rain: wData.weather[0].main,
                    wind: wData.wind.speed,
                    sunrise: wData.sys.sunrise,
                    sunset: wData.sys.sunset
                };
                setWeatherData(data);
                setCache('current_weather', data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWeatherData();
    }, [location]);

    useEffect(() => {
        const fetchFullWeekWeatherData = async () => {
            if (!location) return;
            try {
                const cached = getCache('forecast');
                if (cached) {
                    setFullWeekWeatherData(cached);
                    return;
                }

                const data = await getFullWeekWeather(location.latitude, location.longitude);
                setFullWeekWeatherData(data);
                setCache('forecast', data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchFullWeekWeatherData();
    }, [location]);

    const handleWeatherStatusMatchImage = (status: string) => {
        if (status === 'বৃষ্টি') return '/assets/rain-bg.png';
        if (status === 'পরিষ্কার') return '/assets/Clear-bg.png';
        if (status === 'মেঘলা' || status === 'মেঘ') return '/assets/card-bg.png';
        if (status === 'হালকা কুয়াশা') return '/assets/haze-bg.png';
        if (status === 'কুয়াশা') return '/assets/mist.bg.png';
        return '/assets/card-bg.png';
    };

    const getWeatherIcon = (description: string) => {
        const desc = description.toLowerCase();
        if (desc.includes('rain')) return <SunnyCloudIcon />;
        if (desc.includes('cloud')) return <RainCloudIcon />;
        return <SunIcon />;
    };

    const formatTimeBn = (unixTimestamp: number | undefined) => {
        if (!unixTimestamp) return '--:--';
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    /* ── Loading ── */
    if (!location) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary"
                />
                <p className="text-sm text-muted-foreground font-medium animate-pulse">লোকেশন খোঁজা হচ্ছে...</p>
            </div>
        );
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
    };

    const now = new Date();
    const day = now.toLocaleDateString('bn-BD', { weekday: 'long' });
    const date = now.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    const hour = now.getHours();
    const greeting =
        hour >= 5 && hour < 12 ? 'শুভ সকাল' :
        hour >= 12 && hour < 15 ? 'শুভ দুপুর' :
        hour >= 15 && hour < 18 ? 'শুভ বিকাল' :
        hour >= 18 && hour < 20 ? 'শুভ সন্ধ্যা' : 'শুভ রাত';

    const marketPrices = [
        { name: 'সরু চাল', price: '৭৫', unit: 'কেজি', status: 'up' as const },
        { name: 'আলু', price: '৪০', unit: 'কেজি', status: 'down' as const },
        { name: 'পিঁয়াজ', price: '১১০', unit: 'কেজি', status: 'up' as const },
        { name: 'রসুন', price: '১৮০', unit: 'কেজি', status: 'stable' as const },
    ];

    const cropAdvice = [
        { name: 'বোরো ধান', task: 'সার প্রয়োগ', status: 'সময় উপযোগী', urgent: false },
        { name: 'ভুট্টা', task: 'সেচ প্রদান', status: 'অতি জরুরি', urgent: true },
        { name: 'আলু', task: 'সংগ্রহ করুন', status: 'সংগ্রহের সময়', urgent: false },
    ];

    return (
        <DashboardContainer>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-5 p-3 md:p-4"
            >
                {/* ── Alert Banner ── */}
                <AnimatePresence>
                    {alert && !isAlertDismissed && (
                        <motion.div
                            variants={itemVariants}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            className={cn(
                                "relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 border shadow-lg",
                                alert.type === 'danger'
                                    ? "bg-red-500/10 border-red-500/30 text-red-600 dark:bg-red-500/15"
                                    : "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:bg-orange-500/15"
                            )}
                        >
                            <div className={cn("p-2.5 rounded-xl", alert.type === 'danger' ? "bg-red-500/20" : "bg-orange-500/20")}>
                                <AlertTriangle size={18} />
                            </div>
                            <p className="flex-1 text-sm font-bold">{alert.message}</p>
                            <button
                                onClick={() => setIsAlertDismissed(true)}
                                className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ══════════════════════════════════════
                    TOP SECTION — Weather Hero + Quick Stats
                ══════════════════════════════════════ */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* ── Large Weather Panel (spans 2 cols on desktop) ── */}
                    <div className="lg:col-span-2 relative rounded-[2rem] overflow-hidden min-h-[420px] md:min-h-[480px] shadow-2xl border border-white/10 bg-neutral-900 group">
                        {/* Background image */}
                        <Image
                            src={handleWeatherStatusMatchImage(weatherStatus.toLowerCase())}
                            alt="weather-background"
                            fill
                            className="object-cover blur-[1px] brightness-60 transition-all duration-1000 group-hover:brightness-70 group-hover:scale-[1.02]"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 p-7 md:p-9 h-full flex flex-col justify-between text-white">
                            {/* Top: greeting + date */}
                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div>
                                    <motion.h2
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-3xl md:text-4xl font-black tracking-tight mb-2"
                                    >
                                        {greeting} 👋
                                    </motion.h2>
                                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold">
                                        <Calendar size={12} />
                                        {day}, {date}
                                    </div>
                                </div>
                                {/* Big temperature */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.12, 1], filter: ['brightness(1)', 'brightness(1.6)', 'brightness(1)'] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <Thermometer className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]" size={28} />
                                    </motion.div>
                                    <span className="text-5xl font-black tracking-tighter">
                                        {weatherData ? Math.round(weatherData.temp) : '--'}
                                    </span>
                                    <span className="text-xl font-bold text-white/70 self-start mt-2">°C</span>
                                </motion.div>
                            </div>

                            {/* Middle: quick stat pills */}
                            <div className="flex flex-wrap gap-3 my-4">
                                {[
                                    { label: 'বাতাস', value: `${weatherData?.wind ?? '--'} কিমি/ঘণ্টা`, icon: Wind, color: 'text-blue-300' },
                                    { label: 'আবহাওয়া', value: weatherStatus || '--', icon: CloudRain, color: 'text-emerald-300' },
                                    { label: 'সূর্যোদয়', value: formatTimeBn(weatherData?.sunrise), icon: Sunrise, color: 'text-yellow-300' },
                                    { label: 'সূর্যাস্ত', value: formatTimeBn(weatherData?.sunset), icon: Sunset, color: 'text-purple-300' },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + idx * 0.08 }}
                                        whileHover={{ scale: 1.04 }}
                                        className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 hover:bg-white/20 transition-all"
                                    >
                                        <item.icon size={15} className={item.color} />
                                        <div>
                                            <p className="text-[9px] text-white/50 uppercase tracking-widest font-bold">{item.label}</p>
                                            <p className="text-xs font-black">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom: 7-day forecast */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1 h-4 bg-primary rounded-full" />
                                    <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">সাত দিনের পূর্বাভাস</p>
                                </div>
                                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                                    {fullWeekWeatherData?.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + idx * 0.05 }}
                                            className={cn(
                                                "shrink-0 rounded-2xl p-3 border text-center flex flex-col items-center gap-2 transition-all duration-300 cursor-default min-w-[76px]",
                                                item.day === day
                                                    ? "bg-white/30 border-white/40 shadow-lg"
                                                    : "bg-white/8 border-white/10 hover:bg-white/15 hover:border-white/25"
                                            )}
                                        >
                                            <p className="text-[9px] text-white/70 font-black uppercase">{item.day.slice(0, 3)}</p>
                                            <div className="w-8 h-8">{getWeatherIcon(item.weather)}</div>
                                            <p className="text-base font-black tracking-tighter">{Math.round(item.temp - 273.15)}°</p>
                                        </motion.div>
                                    ))}
                                    {!fullWeekWeatherData && Array.from({ length: 7 }, (_, i) => (
                                        <div key={i} className="shrink-0 w-[76px] h-28 bg-white/5 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Column: location + crop summary ── */}
                    <div className="flex flex-col gap-5">
                        {/* Location Card */}
                        <motion.div
                            variants={itemVariants}
                            className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-sm flex flex-col gap-4"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin size={18} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">আপনার অবস্থান</p>
                                    <p className="text-base font-black text-foreground leading-tight">{locationName?.area ?? '...'}</p>
                                    <p className="text-xs text-muted-foreground">{locationName?.city ?? ''}</p>
                                </div>
                            </div>
                            <div className="h-px bg-border" />
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'আর্দ্রতা', value: '৬৫%', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
                                    { label: 'দৃশ্যমানতা', value: '১০ কিমি', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                                ].map((s, i) => (
                                    <div key={i} className={cn("rounded-xl p-3 flex flex-col gap-1", s.bg)}>
                                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{s.label}</p>
                                        <p className={cn("text-lg font-black", s.color)}>{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Crop Advice Summary */}
                        <motion.div
                            variants={itemVariants}
                            className="relative rounded-2xl border border-border bg-card p-5 shadow-sm flex-1 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/8 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                                        <Leaf size={16} className="text-emerald-500" />
                                    </div>
                                    <h3 className="font-black text-sm text-foreground">ফসলের পরামর্শ</h3>
                                </div>
                                <button
                                    onClick={() => route.push('/crop-advice')}
                                    className="text-[10px] text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    সব দেখুন <ArrowRight size={11} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                {cropAdvice.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: 16, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 + idx * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-border hover:border-emerald-500/30 transition-all"
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            item.urgent ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                                        )}>
                                            <Sprout size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-foreground truncate">{item.name}</p>
                                            <p className="text-[10px] text-muted-foreground">{item.task}</p>
                                        </div>
                                        <span className={cn(
                                            "text-[9px] px-2 py-0.5 rounded-full font-black shrink-0",
                                            item.urgent ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                                        )}>
                                            {item.status}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ══════════════════════════════════════
                    BOTTOM SECTION — Quick Actions + Market
                ══════════════════════════════════════ */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* ── Disease Detection Card ── */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-sm group cursor-pointer"
                        onClick={() => route.push('/disease-detection')}
                    >
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-orange-500/20 transition-all duration-500" />
                        {/* Shine */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <ScanSearch size={22} className="text-orange-500" />
                                </div>
                                <span className="text-[10px] bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                                    <Zap size={9} /> AI
                                </span>
                            </div>
                            <h3 className="text-lg font-black text-foreground mb-2">রোগ শনাক্তকরণ</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-1">
                                ফসলের ছবি তুলুন এবং AI-এর সাহায্যে তাৎক্ষণিকভাবে রোগ শনাক্ত করুন ও সমাধান পান।
                            </p>
                            <button className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-black transition-all duration-300 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group-hover:gap-3">
                                ছবি আপলোড করুন <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>

                    {/* ── AI Chatbot Card ── */}
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-sm group cursor-pointer"
                        onClick={() => route.push('/ai-chatbot')}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <Bot size={22} className="text-purple-500" />
                                </div>
                                <span className="text-[10px] bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                                    <Star size={9} /> ২৪/৭
                                </span>
                            </div>
                            <h3 className="text-lg font-black text-foreground mb-2">এআই চ্যাটবট</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-1">
                                যেকোনো কৃষি প্রশ্নের উত্তর পান মুহূর্তের মধ্যে। আমাদের AI বিশেষজ্ঞ সর্বদা প্রস্তুত।
                            </p>
                            <button className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-sm font-black transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group-hover:gap-3">
                                চ্যাট শুরু করুন <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>

                    {/* ── Market Prices Card ── */}
                    <motion.div
                        variants={itemVariants}
                        className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 shadow-sm md:col-span-2 lg:col-span-1"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/8 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                                    <ChartNoAxesColumn size={18} className="text-blue-500" />
                                </div>
                                <h3 className="font-black text-sm text-foreground">বর্তমান বাজার দর</h3>
                            </div>
                            <button
                                onClick={() => route.push('/market-price')}
                                className="text-[10px] text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                সব দেখুন <ArrowRight size={11} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {marketPrices.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.08 }}
                                    className="group/row flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-border hover:border-blue-500/30 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-7 bg-blue-500/20 rounded-full group-hover/row:bg-blue-500 transition-colors duration-300" />
                                        <div>
                                            <p className="text-xs font-black text-foreground">{item.name}</p>
                                            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">প্রতি {item.unit}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-base font-black text-blue-600 dark:text-blue-400">৳ {item.price}</p>
                                        <div className={cn(
                                            "p-1.5 rounded-lg text-xs",
                                            item.status === 'up' ? "bg-red-500/10 text-red-500" :
                                            item.status === 'down' ? "bg-green-500/10 text-green-500" :
                                            "bg-neutral-500/10 text-neutral-500"
                                        )}>
                                            {item.status === 'up' && <TrendingUp size={13} />}
                                            {item.status === 'down' && <TrendingDown size={13} />}
                                            {item.status === 'stable' && <ChartNoAxesColumn size={13} className="opacity-50" />}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

            </motion.div>
        </DashboardContainer>
    );
};

