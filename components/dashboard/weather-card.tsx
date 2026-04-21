import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Cloud, CloudRain, Sun, Wind, MapPin, Thermometer, Calendar, Sunrise, Sunset } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import handleTranslate from '@/lib/convertTextInBangla';
import GlassCard from '../glass-card';
import StormForecast from '../icons/storm-forecast';
import RainCloudIcon from '../icons/RainCloudIcon';
import SunnyCloudIcon from '../icons/SunnyCloudIcon';
import SunIcon from '../icons/SunIcon';
import { MarketPriceWidget } from './market-price-widget';

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
        if (desc.includes('rain')) return <SunnyCloudIcon />;
        if (desc.includes('cloud')) return <RainCloudIcon />;
        return <SunIcon />;
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
        <div className="w-full h-full flex flex-col gap-10 group">
            {/* Top Section: Greeting & Current Weather */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className='text-3xl lg:text-4xl md:text-5xl font-black mb-3 tracking-tight'>
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


            <div className='flex flex-col lg:flex-row gap-4'>
                <div className='w-[400px] h-[300px] flex items-center justify-center '>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-5 bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 shadow-2xl group-hover:bg-white/15 transition-colors duration-500 h-full w-full  justify-center"
                    >
                        <div className="text-right">
                            <div className="text-5xl md:text-6xl font-black flex items-center justify-end tracking-tighter">
                                {weatherData ? Math.round(weatherData.temp) : '--'}
                                <span className="text-2xl md:text-3xl ml-1">°C</span>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Thermometer className="ml-2 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" size={32} />
                                </motion.div>
                            </div>
                            <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black mt-1">সবশেষ আপডেট</p>
                        </div>
                    </motion.div>
                </div>

                <GlassCard className='flex items-center justify-center'>
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        {[
                            { label: 'অবস্থান', value: `${translatedArea}, ${translatedCity}`, icon: MapPin, color: 'primary' },
                            { label: 'বাতাস', value: `${weatherData?.wind || '--'} কিমি/ঘণ্টা`, icon: Wind, color: 'blue-400' },
                            { label: 'আবহাওয়া', value: weatherStatus, icon: CloudRain, color: 'emerald-400' },
                            { label: 'সূর্যোদয়', value: formatTimeBn(weatherData?.sunrise), icon: Sunrise, color: 'orange-400' },
                            { label: 'সূর্যাস্ত', value: formatTimeBn(weatherData?.sunset), icon: Sunset, color: 'purple-400' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300"
                            >
                                <div className={cn(
                                    "p-2.5 rounded-xl bg-white/10 shadow-inner",
                                    `text-${item.color}`
                                )}>
                                    <item.icon size={22} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-white/70 uppercase font-black tracking-wider mb-0.5">{item.label}</p>
                                    <p className="text-sm font-bold truncate leading-none">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </GlassCard>
            </div>


            <div className="mt-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-5 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
                        <h3 className="text-sm font-black text-white/80 uppercase tracking-widest">সাত দিনের পূর্বাভাস</h3>
                    </div>
                </div>
                {/* <GlassCard className='w-full py-4'> */}
                <div className="flex flex-wrap justify-evenly gap-4 overflow-x-auto  no-scrollbar">
                    {fullWeekWeatherData?.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                            className={cn("shrink-0  backdrop-blur-md rounded-[1.5rem] p-4 border border-white/10 hover:border-white/30 hover:bg-white/10 text-center flex flex-col items-center gap-3 transition-all duration-300 group/day", item.day === day && 'w-[180px] bg-white/30')}
                        >
                            <p className="text-[10px] text-white/70 font-black uppercase border-b  border-white">{item.day}</p>
                            <div className="transform transition-transform duration-500 group-hover/day:scale-125 group-hover/day:rotate-6">
                                {getWeatherIcon(item.weather)}
                            </div>
                            <p className="text-2xl font-black tracking-tighter">{Math.round(item.temp - 273.15)}°C</p>
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

