'use client'

import { getCityName, getFullWeekWeather, getLocation, getWeatherData, weatherAlert } from '@/lib/location';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { ScanSearch, MessageSquare, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { DashboardContainer } from '@/components/dashboard/dashboard-container';
import { WeatherCard } from '@/components/dashboard/weather-card';
import { MarketPriceWidget } from '@/components/dashboard/market-price-widget';
import { CropAdviceWidget } from '@/components/dashboard/crop-advice-widget';
import { SummaryCard } from '@/components/dashboard/summary-card';

const CACHE_KEY_PREFIX = 'kb_weather_';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

export default function Page() {
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
        if (status === 'মেঘলা') return '/assets/card-bg.png';
        if (status === 'হালকা কুয়াশা') return '/assets/haze-bg.png';
        if (status === 'কুয়াশা') return '/assets/mist.bg.png';
        return '/assets/card-bg.png';
    }

    if (!location) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // console.log(we)
    return (
        <DashboardContainer>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-8 p-1"
            >
                <AnimatePresence>
                    {alert && !isAlertDismissed && (
                        <motion.div
                            variants={itemVariants}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            className={cn(
                                "relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 border shadow-lg z-50",
                                alert.type === 'danger'
                                    ? "bg-red-500/10 border-red-500/20 text-red-600 dark:bg-red-500/20"
                                    : "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:bg-orange-500/20"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl",
                                alert.type === 'danger' ? "bg-red-500/20" : "bg-orange-500/20"
                            )}>
                                <AlertTriangle size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{alert.message}</p>
                            </div>
                            <button
                                onClick={() => setIsAlertDismissed(true)}
                                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Section: Weather & Greetings */}
                <motion.div
                    variants={itemVariants}
                    className='w-full relative rounded-[2.5rem] min-h-64 overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 bg-neutral-900'
                >
                    <Image
                        src={handleWeatherStatusMatchImage(weatherStatus.toLowerCase())}
                        alt="weather-background"
                        width={2000}
                        height={2000}
                        className='absolute top-0 left-0 w-full h-full object-cover blur-[1px] brightness-75 transition-transform duration-1000 group-hover:scale-105'
                    />
                    <div className='relative z-10 p-8 md:p-10 w-full h-full text-white bg-linear-to-br from-black/40 via-transparent to-black/20'>
                        <WeatherCard
                            weatherData={weatherData}
                            fullWeekWeatherData={fullWeekWeatherData}
                            locationName={locationName}
                            weatherStatus={weatherStatus}
                            setWeatherStatus={setWeatherStatus}
                        />
                    </div>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Market Prices */}
                    <motion.div variants={itemVariants}>
                        <MarketPriceWidget />
                    </motion.div>

                    {/* Crop Advice */}
                    <motion.div variants={itemVariants}>
                        <CropAdviceWidget />
                    </motion.div>

                    {/* Quick Access & AI Chatbot */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-8">
                        <SummaryCard
                            title="রোগ শনাক্তকরণ"
                            icon={ScanSearch}
                            iconColor="text-orange-500"
                            bgColor="bg-orange-500/20 backdrop-blur-md"
                        >
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                                AI প্রযুক্তির মাধ্যমে আপনার ফসলের রোগ দ্রুত শনাক্ত করুন এবং তাৎক্ষণিক সমাধান পান।
                            </p>
                            <button
                                onClick={() => route.push('/dashboard/disease-detection')}
                                className="group/btn relative w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl shadow-xl shadow-orange-600/30 transition-all active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10">ছবি আপলোড করুন</span>
                                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                            </button>
                        </SummaryCard>

                        <SummaryCard
                            title="এআই চ্যাটবট"
                            icon={MessageSquare}
                            iconColor="text-purple-500"
                            bgColor="bg-purple-500/20 backdrop-blur-md"
                        >
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                                আপনার কৃষি জিজ্ঞাসার উত্তর পান ২৪/৭। আমাদের বট আপনাকে সাহায্য করতে সর্বদা প্রস্তুত।
                            </p>
                            <button
                                onClick={() => route.push('/dashboard/ai-chatbot')}
                                className="group/btn relative w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-xl shadow-purple-600/30 transition-all active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10">চ্যাট শুরু করুন</span>
                                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                            </button>
                        </SummaryCard>
                    </motion.div>
                </div>
            </motion.div>
        </DashboardContainer>
    );
};
