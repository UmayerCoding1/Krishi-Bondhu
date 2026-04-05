'use client'

import { getCityName, getFullWeekWeather, getLocation, getWeatherData, weatherAlert } from '@/lib/location';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Overview = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [weatherData, setWeatherData] = useState<{ temp: number; rain: string; wind: number } | null>(null);
    const [fullWeekWeatherData, setFullWeekWeatherData] = useState<{ day: string; temp: number; weather: string }[] | null>(null);
    const route = useRouter();
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { latitude, longitude } = await getLocation();
                setLocation({ latitude, longitude });
                await getCityName(latitude, longitude);
                await weatherAlert(latitude, longitude);
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
                const temp = weatherData.main.temp;
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
        const fullWeekWeatherData = async () => {
            if (!location) return;
            try {
                const weatherData = await getFullWeekWeather(location.latitude, location.longitude);

                setFullWeekWeatherData(weatherData)
            } catch (err) {
                console.error(err);
            }
        }
        fullWeekWeatherData();
    }, [location])


    console.log(weatherData)
    if (!location) {
        return <div>Loading...</div>;
    }



    return <div>
        <RefreshCcw onClick={() => route.refresh()} />
    </div>;
};