import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';
import { 
    SunIcon, 
    CloudIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';

const WeatherWidget = ({ data }) => {
    if (!data) return null;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return <SunIcon className="h-8 w-8 text-yellow-500" />;
            case 'rainy':
                return <CloudIcon className="h-8 w-8 text-blue-500" />;
            default:
                return <CloudIcon className="h-8 w-8 text-gray-500" />;
        }
    };

    return (
        <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Current Weather */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Current Weather</h2>
                        <p className="text-blue-100">{formatDate(new Date())}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <SunIcon className="h-16 w-16" />
                    </motion.div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold">
                            {data.current.temperature}°C
                        </div>
                        <div className="text-blue-100 mt-1">Temperature</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            <CloudIcon className="h-6 w-6 mr-2" />
                            <span className="text-2xl font-bold">
                                {data.current.humidity}%
                            </span>
                        </div>
                        <div className="text-blue-100 mt-1">Humidity</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            <ArrowPathIcon className="h-6 w-6 mr-2" />
                            <span className="text-2xl font-bold">
                                {data.current.windSpeed}
                            </span>
                        </div>
                        <div className="text-blue-100 mt-1">Wind Speed</div>
                    </div>
                </div>
            </div>

            {/* Forecast */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    5-Day Forecast
                </h3>
                <div className="grid grid-cols-5 gap-4">
                    {data.forecast.map((day, index) => (
                        <motion.div
                            key={day.date}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 rounded-xl p-4 text-center"
                        >
                            <div className="text-sm font-medium text-gray-500">
                                {formatDate(day.date, 'short')}
                            </div>
                            <motion.div
                                className="my-3"
                                whileHover={{ scale: 1.1 }}
                            >
                                {getWeatherIcon(day.condition)}
                            </motion.div>
                            <div className="text-lg font-semibold text-gray-800">
                                {day.maxTemp}°C
                            </div>
                            <div className="text-sm text-gray-600">
                                {day.minTemp}°C
                            </div>
                            <div className="mt-2 text-xs font-medium text-blue-500">
                                {day.rainChance}% rain
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget; 