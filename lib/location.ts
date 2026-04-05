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

export const getCityName = async (latitude: number, longitude: number) => {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
        return "Unknown Location";
    }
    console.log(data)
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
    console.log('data', data)
    return data;
};