'use client'

import { getCityName, getFullWeekWeather, getLocation, getWeatherData, weatherAlert } from '@/lib/location';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DashboardContainer } from './dashboard-container';
import { WeatherCard } from './weather-card';
import Image from 'next/image';

import { MarketPriceWidget } from './market-price-widget';
import { CropAdviceWidget } from './crop-advice-widget';
import { SummaryCard } from './summary-card';
import { ScanSearch, MessageSquare, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export const Overview = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [weatherData, setWeatherData] = useState<{ temp: number; rain: string; wind: number } | null>(null);
    const [fullWeekWeatherData, setFullWeekWeatherData] = useState<{ day: string; temp: number; weather: string }[] | null>(null);
    const [locationName, setLocationName] = useState<{ area: string; city: string } | null>(null);
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
    const [isAlertDismissed, setIsAlertDismissed] = useState(false);
    const [weatherStatus, setWeatherStatus] = useState('');
    const route = useRouter();

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { latitude, longitude } = await getLocation();
                setLocation({ latitude, longitude });
                const cityInfo = await getCityName(latitude, longitude);
                if (typeof cityInfo !== 'string') {
                    setLocationName({ area: cityInfo.area, city: cityInfo.city });
                }
                const activeAlert = await weatherAlert(latitude, longitude);
                if (activeAlert) {
                    setAlert(activeAlert);
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
                const weatherData = await getWeatherData(location.latitude, location.longitude);
                const temp = weatherData.main.temp - 273.15; // Convert Kelvin to Celsius
                const rain = weatherData.weather[0].main;
                const wind = weatherData.wind.speed;
                setWeatherData({ temp, rain, wind })
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
                const weatherData = await getFullWeekWeather(location.latitude, location.longitude);
                setFullWeekWeatherData(weatherData)
            } catch (err) {
                console.error(err);
            }
        }
        fetchFullWeekWeatherData();
    }, [location]);


    const handleWeatherStatusMatchImage = (status: string) => {
        console.log('status', status)
        if (status === 'rain') {
            return '/assets/rain-bg.png';
        } else if (status === 'clear') {
            return '/assets/Clear-bg.png';
        } else if (status === 'clouds') {
            return '/assets/card-bg.png';
        } else if (status === 'haze') {
            return '/assets/haze-bg.png';
        } else if (status === 'mist') {
            return '/assets/mist.bg.png';
        }
        //  else if (weatherStatus === 'Fog') { 
        //     return '/assets/fog.jpg';
        // } else if (weatherStatus === 'Drizzle') {
        //     return '/assets/drizzle.jpg';
        // } else if (weatherStatus === 'Thunderstorm') {
        //     return '/assets/thunderstorm.jpg';
        // } else if (weatherStatus === 'Snow') {
        //     return '/assets/snow.jpg';
        // } else if (weatherStatus === 'Sand') {
        //     return '/assets/sand.jpg';
        // } else if (weatherStatus === 'Ash') {
        //     return '/assets/ash.jpg';
        // } else if (weatherStatus === 'Squall') {
        //     return '/assets/squall.jpg';
        // } else if (weatherStatus === 'Tornado') {
        //     return '/assets/tornado.jpg';
        // }
        else {
            return '/assets/card-bg.png';
        }
    }


    if (!location) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <DashboardContainer>
            <div className="flex flex-col gap-6 p-1">
                <AnimatePresence>
                    {alert && !isAlertDismissed && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            className={cn(
                                "relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 border shadow-lg",
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
                <div className='w-full relative rounded-3xl min-h-64 overflow-hidden shadow-2xl border border-white/20'>
                    <Image
                        src={handleWeatherStatusMatchImage(weatherStatus.toLowerCase())}
                        alt="weather-background"
                        width={2000}
                        height={2000}
                        className='absolute top-0 left-0 w-full h-full object-cover blur-[2px] brightness-75 transition-transform duration-700 hover:scale-105'
                    />
                    <div className='relative z-10 p-6 md:p-8 w-full h-full text-white bg-black/10'>
                        <WeatherCard
                            weatherData={weatherData}
                            fullWeekWeatherData={fullWeekWeatherData}
                            locationName={locationName}
                            // weatherStatus={weatherStatus}
                            setWeatherStatus={setWeatherStatus}
                        />
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Market Prices */}
                    <MarketPriceWidget />

                    {/* Crop Advice */}
                    <CropAdviceWidget />

                    {/* Quick Access & AI Chatbot */}
                    <div className="flex flex-col gap-6">
                        <SummaryCard
                            title="রোগ শনাক্তকরণ"
                            icon={ScanSearch}
                            iconColor="text-orange-500"
                            bgColor="bg-orange-500/10"
                        >
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                AI প্রযুক্তির মাধ্যমে আপনার ফসলের রোগ দ্রুত শনাক্ত করুন।
                            </p>
                            <button
                                onClick={() => route.push('/dashboard/disease-detection')}
                                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 transition-all active:scale-95"
                            >
                                ছবি আপলোড করুন
                            </button>
                        </SummaryCard>

                        <SummaryCard
                            title="এআই চ্যাটবট"
                            icon={MessageSquare}
                            iconColor="text-purple-500"
                            bgColor="bg-purple-500/10"
                        >
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                আপনার কৃষি জিজ্ঞাসার উত্তর পান ২৪/৭।
                            </p>
                            <button
                                onClick={() => route.push('/dashboard/ai-chatbot')}
                                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-95"
                            >
                                চ্যাট শুরু করুন
                            </button>
                        </SummaryCard>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};
