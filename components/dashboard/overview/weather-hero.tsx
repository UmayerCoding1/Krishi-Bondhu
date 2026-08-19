'use client'

import React from 'react'
import Image from 'next/image'
import { Calendar, Thermometer, Wind, CloudRain, Sunrise, Sunset } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface WeatherHeroProps {
    greeting: string
    day: string
    date: string
    weatherData: {
        temp: number
        rain: string
        wind: number
        sunrise: number
        sunset: number
    } | null
    weatherStatus: string
    fullWeekWeatherData: { day: string; temp: number; weather: string }[] | null
    formatTimeBn: (unixTimestamp: number | undefined) => string
    getWeatherIcon: (description: string) => React.JSX.Element
    handleWeatherStatusMatchImage: (status: string) => string
}

export const WeatherHeroCard = ({
    greeting,
    day,
    date,
    weatherData,
    weatherStatus,
    fullWeekWeatherData,
    formatTimeBn,
    getWeatherIcon,
    handleWeatherStatusMatchImage,
}: WeatherHeroProps) => {
    return (
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[440px] shadow-2xl border border-white/10 bg-neutral-900 group">
            <Image
                src={handleWeatherStatusMatchImage(weatherStatus.toLowerCase())}
                alt="weather-background"
                fill
                className="object-cover blur-[1px] brightness-65 transition-all duration-1000 group-hover:brightness-75 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between text-white">
                {/* Top Header */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2"
                        >
                            {greeting} 👋
                        </motion.h2>
                        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                            <Calendar size={13} />
                            <span>{day}, {date}</span>
                        </div>
                    </div>

                    {/* Main Temperature Indicator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-xl"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Thermometer className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" size={30} />
                        </motion.div>
                        <span className="text-4xl sm:text-5xl font-black tracking-tighter">
                            {weatherData ? Math.round(weatherData.temp) : '--'}
                        </span>
                        <span className="text-xl font-bold text-white/70 self-start mt-1">°C</span>
                    </motion.div>
                </div>

                {/* Quick Stat Badges */}
                <div className="flex flex-wrap gap-2.5 my-4">
                    {[
                        { label: 'বাতাস', value: `${weatherData?.wind ?? '--'} কিমি/ঘণ্টা`, icon: Wind, color: 'text-sky-300' },
                        { label: 'আবহাওয়া', value: weatherStatus || 'স্বাভাবিক', icon: CloudRain, color: 'text-emerald-300' },
                        { label: 'সূর্যোদয়', value: formatTimeBn(weatherData?.sunrise), icon: Sunrise, color: 'text-amber-300' },
                        { label: 'সূর্যাস্ত', value: formatTimeBn(weatherData?.sunset), icon: Sunset, color: 'text-purple-300' },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2 hover:bg-white/20 transition-all"
                        >
                            <item.icon size={15} className={item.color} />
                            <div>
                                <p className="text-[9px] text-white/60 uppercase tracking-widest font-bold">
                                    {item.label}
                                </p>
                                <p className="text-xs font-black">{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 7-Day Forecast */}
                <div>
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-1 h-3.5 bg-emerald-400 rounded-full" />
                        <p className="text-[10px] text-white/70 font-black uppercase tracking-widest">
                            সাত দিনের পূর্বাভাস
                        </p>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {fullWeekWeatherData?.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + idx * 0.05 }}
                                className={cn(
                                    'shrink-0 rounded-2xl p-2.5 text-center flex flex-col items-center gap-1.5 transition-all duration-300 cursor-default min-w-[70px]',
                                    item.day === day
                                        ? 'bg-white/30 border border-white/40 shadow-lg'
                                        : 'bg-white/10 border border-white/10 hover:bg-white/20'
                                )}
                            >
                                <p className="text-[9px] text-white/80 font-black uppercase">
                                    {item.day.slice(0, 3)}
                                </p>
                                <div className="w-7 h-7">{getWeatherIcon(item.weather)}</div>
                                <p className="text-sm font-black tracking-tighter">
                                    {Math.round(item.temp - 273.15)}°
                                </p>
                            </motion.div>
                        ))}
                        {!fullWeekWeatherData &&
                            Array.from({ length: 7 }, (_, i) => (
                                <div key={i} className="shrink-0 w-16 h-24 bg-white/10 rounded-2xl animate-pulse" />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
