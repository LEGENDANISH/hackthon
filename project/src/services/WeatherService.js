const axios = require('axios');
const Redis = require('ioredis');

class WeatherService {
    constructor() {
        this.redis = new Redis(process.env.REDIS_URL);
        this.api = axios.create({
            baseURL: process.env.WEATHER_API_URL,
            headers: {
                'Authorization': `Bearer ${process.env.WEATHER_API_KEY}`
            }
        });
    }

    async getForecast(latitude, longitude, days = 7) {
        const cacheKey = `weather:${latitude}:${longitude}`;
        
        try {
            // Check cache first
            const cachedData = await this.redis.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }

            // Fetch from API if not in cache
            const response = await this.api.get('/forecast', {
                params: { lat: latitude, lon: longitude, days }
            });

            const processedData = this.processWeatherData(response.data);
            
            // Cache for 30 minutes
            await this.redis.setex(cacheKey, 1800, JSON.stringify(processedData));
            
            return processedData;
        } catch (error) {
            console.error('Weather forecast error:', error);
            throw new Error('Failed to fetch weather forecast');
        }
    }

    processWeatherData(data) {
        return {
            current: {
                temperature: data.current.temp_c,
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                condition: data.current.condition.text
            },
            forecast: data.forecast.forecastday.map(day => ({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                rainChance: day.day.daily_chance_of_rain,
                condition: day.day.condition.text
            }))
        };
    }
}

module.exports = WeatherService; 