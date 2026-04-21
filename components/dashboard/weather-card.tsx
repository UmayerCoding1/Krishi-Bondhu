import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Cloud, CloudRain, Sun, Wind, MapPin, Thermometer, Calendar, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import handleTranslate from '@/lib/convertTextInBangla';
import GlassCard from '../glass-card';

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
        console.log('wwwww', weatherData.rain)
        const translate = async () => {
            const translated = await handleTranslate(weatherData.rain || '');
            console.log(translated)
            setWeatherStatus(translated || '');
        };

        translate();
    }, [weatherData]);

    console.log(weatherStatus)

    return (
        <div className="w-full h-full flex flex-col justify-between gap-8 group">
            {/* Top Section: Greeting & Current Weather */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className='text-4xl md:text-5xl font-black mb-3 tracking-tight'>
                        শুভ {defineDayOrNight()}, <span className="text-primary-foreground/90">{user?.name}</span>
                    </h2>
                    <GlassCard textColor='secondary'>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full ">
                            <Calendar size={14} className="text-primary-foreground" />
                            <span>{day}, {date}</span>
                        </div>

                    </GlassCard>
                </motion.div>


            </div>

            {/* Middle Section: Location & Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'অবস্থান', value: `${translatedArea}, ${translatedCity}`, icon: MapPin, color: 'primary' },
                    { label: 'বাতাস', value: `${weatherData?.wind || '--'} কিমি/ঘণ্টা`, icon: Wind, color: 'blue-400' },
                    { label: 'আবহাওয়া', value: weatherStatus, icon: CloudRain, color: 'emerald-400' },
                    { label: 'সূর্যোদয়', value: formatTimeBn(weatherData?.sunrise), icon: Sunrise, color: 'orange-400' },
                    { label: 'সূর্যাস্ত', value: formatTimeBn(weatherData?.sunset), icon: Sunset, color: 'purple-400' }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300"
                    >
                        <div className={cn(
                            "p-2.5 rounded-xl bg-white/10 shadow-inner",
                            `text-${item.color}`
                        )}>
                            <item.icon size={22} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-white/40 uppercase font-black tracking-wider mb-0.5">{item.label}</p>
                            <p className="text-sm font-bold truncate leading-none">{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Section: Weekly Forecast */}
            <div className="mt-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
                        <h3 className="text-sm font-black text-white/80 uppercase tracking-widest">সাত দিনের পূর্বাভাস</h3>
                    </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {fullWeekWeatherData?.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                            className="shrink-0 min-w-[100px] bg-white/5 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/10 hover:border-white/30 hover:bg-white/10 text-center flex flex-col items-center gap-3 transition-all duration-300 group/day"
                        >
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-tighter">{item.day}</p>
                            <div className="transform transition-transform duration-500 group-hover/day:scale-125 group-hover/day:rotate-6">
                                {getWeatherIcon(item.weather)}
                            </div>
                            <p className="text-base font-black tracking-tighter">{Math.round(item.temp - 273.15)}°C</p>
                        </motion.div>
                    ))}
                    {!fullWeekWeatherData && (
                        <div className="flex gap-4">
                            {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                <div key={i} className="min-w-[100px] h-28 bg-white/5 rounded-[1.5rem] animate-pulse" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

