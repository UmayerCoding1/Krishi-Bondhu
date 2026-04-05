export const getLocation = () => {
    return new Promise<{ latitude: number; longitude: number }>(
        (resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocation not supported');
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {

                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error.message);
                }
            );
        }
    );
};

export const getWeatherData = async (latitude: number, longitude: number) => {
    console.log(process.env.NEXT_PUBLIC_WEATHER_API_KEY!)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
    const data = await response.json();
    return data;
};

export const getSunriseSunset = async (latitude: number, longitude: number) => {
    const data = await getWeatherData(latitude, longitude);
    return {
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
    };
};


export const getCityName = async (latitude: number, longitude: number) => {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
        return "Unknown Location";
    }
    console.log(data);
    return {
        area: data[0].name,
        city: data[0].state,
        country: data[0].country
    };
};

export const getFullWeekWeather = async (latitude: number, longitude: number) => {
    const dailyData = []
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
    const data = await response.json();
    const list = data.list.map((item: any) => {
        return {
            temp: item.main.temp,
            description: item.weather[0].description
        }
    });

    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];

        const date = new Date(item.dt_txt);
        const dayNameBn = date.toLocaleDateString("bn-BD", { weekday: "long" });

        const temp = item.main.temp;
        const weather = item.weather[0].description;

        dailyData.push({
            day: dayNameBn,
            temp: temp,
            weather: weather
        });
    }


    return dailyData;
};


export const weatherAlert = async (latitude: number, longitude: number) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
    const data = await response.json();

    if (!data || !data.weather) return null;

    const mainWeather = data.weather[0].main;
    const description = data.weather[0].description.toLowerCase();
    const tempCelsius = data.main.temp - 273.15;
    const windSpeedKmH = data.wind.speed * 3.6;

    if (mainWeather === 'Thunderstorm') {
        return { type: 'danger', message: 'বজ্রবৃষ্টির সতর্কতা! নিরাপদ স্থানে থাকুন এবং মাঠে থাকা থেকে বিরত থাকুন।' };
    }

    // Heat Wave alert (Moderate/Severe >38°C)
    if (tempCelsius > 38) {
        return { type: 'warning', message: 'তীব্র তাপপ্রবাহ! ফসলের গোড়ায় ২-৩ ইঞ্চি পানি ধরে রাখুন এবং নিয়মিত সেচ দিন।' };
    }

    // Cold Wave alert (Mild <10.1°C) - Critical for Boro rice and potatoes
    if (tempCelsius < 10.1) {
        return { type: 'warning', message: 'শৈত্যপ্রবাহের সতর্কতা! বোরো ধানের চারা ও শীতকালীন সবজি ঢেকে রাখার ব্যবস্থা করুন।' };
    }

    // Heavy Rain alert
    if (description.includes('heavy rain')) {
        return { type: 'warning', message: 'ভারী বৃষ্টির সম্ভাবনা! দ্রুত পাকা ফসল সংগ্রহ করুন এবং নিকাশী নালা পরিষ্কার রাখুন।' };
    }

    // High Wind alert (>40 km/h) - Nor'westers or Cyclones
    if (windSpeedKmH > 40) {
        return { type: 'warning', message: 'তীব্র ঝড়ো বাতাসের সম্ভাবনা! কলা ও অন্যান্য নরম কাণ্ডের ফসলের জন্য খুঁটি দিন।' };
    }

    return null;
};