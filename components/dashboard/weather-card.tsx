import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Cloud, CloudRain, Sun, Wind, MapPin, Thermometer, Calendar, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import handleTranslate from '@/lib/convertTextInBangla';

interface WeatherCardProps {
    weatherData: { temp: number; rain: string; wind: number; sunrise: number; sunset: number } | null;
    fullWeekWeatherData: { day: string; temp: number; weather: string }[] | null;
    locationName: { area: string; city: string } | null;
    setWeatherStatus: (status: string) => void;
    weatherStatus: string;
}

export const WeatherCard = ({ weatherData, fullWeekWeatherData, locationName, setWeatherStatus, weatherStatus }: WeatherCardProps) => {
    const { user } = useAuth();
    const now = new Date();
    const day = now.toLocaleDateString('bn-BD', { weekday: 'long' });
    const date = now.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

    const defineDayOrNight = () => {
        const hour = now.getHours();
        if (hour >= 5 && hour < 12) return 'সকাল';
        if (hour >= 12 && hour < 15) return 'দুপুর';
        if (hour >= 15 && hour < 18) return 'বিকাল';
        if (hour >= 18 && hour < 20) return 'সন্ধ্যা';
        return 'রাত';
    }

    const formatTimeBn = (unixTimestamp: number | undefined) => {
        if (!unixTimestamp) return '--:--';
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const getWeatherIcon = (description: string) => {
        const desc = description.toLowerCase();
        if (desc.includes('rain')) return <CloudRain className="text-blue-400" size={24} />;
        if (desc.includes('cloud')) return <Cloud className="text-gray-400" size={24} />;
        return <Sun className="text-yellow-400" size={24} />;
    };

    const [translatedArea, setTranslatedArea] = useState('');
    const [translatedCity, setTranslatedCity] = useState('');

    useEffect(() => {
        const translate = async () => {
            const area = await handleTranslate(locationName?.area || 'খুঁজছি...');
            const city = await handleTranslate(locationName?.city || '');

            setTranslatedArea(area || 'খুঁজছি...');
            setTranslatedCity(city || '');
        };

        translate();
    }, [locationName]);

    useEffect(() => {
        if (!weatherData) return;

        const translate = async () => {
            const translated = await handleTranslate(weatherData.rain || '');
            console.log(translated)
            setWeatherStatus(translated || '');
        };

        translate();
    }, [weatherData]);

    return (
        <div className="w-full h-full flex flex-col justify-between gap-6">
            {/* Top Section: Greeting & Current Weather */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='text-3xl md:text-4xl font-bold mb-1'>
                        শুভ {defineDayOrNight()}, {user?.name}
                    </h2>
                    <div className="flex items-center gap-2 text-neutral-200 text-sm">
                        <Calendar size={14} />
                        <span>{day}, {date}</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                    <div className="text-right">
                        <div className="text-4xl font-bold flex items-center justify-end">
                            {weatherData ? Math.round(weatherData.temp) : '--'}°C
                            <Thermometer className="ml-1 text-orange-400" size={24} />
                        </div>
                        <p className="text-xs text-neutral-300 uppercase tracking-widest">সর্বশেষ আপডেট</p>
                    </div>
                </motion.div>
            </div>

            {/* Middle Section: Location & Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase">অবস্থান</p>
                        <p className="text-sm font-medium truncate">{translatedArea}, {translatedCity}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Wind size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase">বাতাস</p>
                        <p className="text-sm font-medium">{weatherData ? weatherData.wind : '--'} কিমি/ঘণ্টা</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <CloudRain size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase">আবহাওয়া</p>
                        <p className="text-sm font-medium">{weatherStatus}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Sunrise size={20} className="text-orange-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase">সূর্যোদয়</p>
                        <p className="text-sm font-medium">{formatTimeBn(weatherData?.sunrise)}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Sunset size={20} className="text-purple-400" />
                    </div>
                    <div>
                        <p className="text-[10px] text-neutral-400 uppercase">সূর্যাস্ত</p>
                        <p className="text-sm font-medium">{formatTimeBn(weatherData?.sunset)}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Weekly Forecast */}
            <div className="mt-2">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    <h3 className="text-sm font-semibold text-neutral-200">সাত দিনের পূর্বাভাস</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {fullWeekWeatherData?.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="shrink-0 min-w-[90px] bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10 text-center flex flex-col items-center gap-2"
                        >
                            <p className="text-[10px] text-neutral-400">{item.day}</p>
                            {getWeatherIcon(item.weather)}
                            <p className="text-sm font-bold">{Math.round(item.temp - 273.15)}°C</p>
                        </motion.div>
                    ))}
                    {!fullWeekWeatherData && (
                        <p className="text-xs text-neutral-500 italic">পূর্বাভাস লোড হচ্ছে...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

