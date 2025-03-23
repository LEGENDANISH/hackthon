import React, { useEffect, useState } from "react";
import { Cloud, Droplets, Thermometer, MapPin, Loader } from "lucide-react";

export const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [temp, setTemp] = useState(localStorage.getItem("temp") || "");
  const [humid, setHumid] = useState(localStorage.getItem("humid") || "");

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const mockWeatherData = {
        temperature: Math.round(15 + Math.random() * 15),
        humidity: Math.round(60 + Math.random() * 20),
        rainfall: Math.round(Math.random() * 10),
        forecast: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
        location: { latitude, longitude, name: locationName }
      };

      setWeather(mockWeatherData);
      setTemp(mockWeatherData.temperature);
      setHumid(mockWeatherData.humidity);
      localStorage.setItem("temp", mockWeatherData.temperature);
      localStorage.setItem("humid", mockWeatherData.humidity);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name.split(",")[0];
    } catch (err) {
      console.error("Geocoding error:", err);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const name = await getLocationName(latitude, longitude);
          setLocationName(name);
          fetchWeatherData(latitude, longitude);
        },
        (err) => {
          setError("Unable to get location. Please enable location services.");
          setLoading(false);
          console.error("Geolocation error:", err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Cloud className="h-4 w-4 mr-2 text-blue-500" />
          Weather
        </h3>
        <div className="bg-red-50 rounded-lg p-2">
          <p className="text-xs text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Cloud className="h-4 w-4 mr-2 text-blue-500" />
          Weather
        </h3>
        <div className="flex items-center justify-center py-3">
          <Loader className="h-4 w-4 text-blue-500 animate-spin" />
          <span className="ml-2 text-xs text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white rounded-lg shadow-md p-3 w-full items-center justify-between">
      {/* Weather Label */}
      <div className="flex items-center space-x-2">
        <Cloud className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-semibold text-gray-900">Weather</span>

        {/* Location */}
        {locationName && (
          <div className="flex items-center text-xs text-gray-600 ml-3">
            <MapPin className="h-3 w-3 text-gray-400 mr-1" />
            <span className="font-medium">{locationName}</span>
          </div>
        )}
        <div className="flex gap-44">
          <WeatherDetail icon={Thermometer} value={`${temp}°C`} color="text-red-500" />
          <WeatherDetail icon={Droplets} value={`${humid}%`} color="text-blue-500" />
          <WeatherDetail icon={Cloud} value={`${weather.rainfall}mm`} color="text-gray-500" />
        </div>
      </div>

      {/* Right-Aligned Last Updated Time */}
      <p className="text-[10px] text-gray-400">Last updated: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

const WeatherDetail = ({ icon: Icon, value, color }) => (
  <div className="flex items-center space-x-1 ml-3">
    <Icon className={`h-3 w-3 ${color}`} />
    <p className="text-xs font-semibold">{value}</p>
  </div>
);

export default WeatherCard;
