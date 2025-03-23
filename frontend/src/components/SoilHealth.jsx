import React, { useState, useEffect } from "react";
import { Sprout, Loader } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for crops and soil conditions
const cropData = [
  { tempRange: [20, 25], humidityRange: [50, 60], moisture: "Medium", crop: "Wheat", phRange: [6.0, 7.5] },
  { tempRange: [25, 30], humidityRange: [60, 70], moisture: "Medium", crop: "Rice", phRange: [5.0, 6.5] },
  { tempRange: [18, 22], humidityRange: [40, 50], moisture: "Low", crop: "Barley", phRange: [6.0, 7.0] },
  { tempRange: [28, 32], humidityRange: [65, 75], moisture: "High", crop: "Sugarcane", phRange: [5.5, 6.8] },
  { tempRange: [15, 20], humidityRange: [45, 55], moisture: "Medium", crop: "Potato", phRange: [5.0, 6.0] },
  { tempRange: [22, 27], humidityRange: [55, 65], moisture: "Medium", crop: "Maize", phRange: [5.5, 7.0] },
  { tempRange: [30, 35], humidityRange: [70, 80], moisture: "High", crop: "Banana", phRange: [5.5, 7.5] },
  { tempRange: [10, 15], humidityRange: [30, 40], moisture: "Low", crop: "Oats", phRange: [5.5, 7.0] },
  { tempRange: [16, 20], humidityRange: [40, 50], moisture: "Medium", crop: "Carrot", phRange: [5.5, 6.5] },
  { tempRange: [20, 25], humidityRange: [50, 60], moisture: "Medium", crop: "Tomato", phRange: [6.0, 7.0] },
  { tempRange: [25, 30], humidityRange: [60, 70], moisture: "High", crop: "Cucumber", phRange: [5.5, 7.0] },
  { tempRange: [18, 22], humidityRange: [40, 50], moisture: "Low", crop: "Lentils", phRange: [6.0, 7.5] },
  { tempRange: [25, 30], humidityRange: [60, 70], moisture: "Medium", crop: "Chili Pepper", phRange: [5.5, 6.5] },
  { tempRange: [15, 20], humidityRange: [45, 55], moisture: "Medium", crop: "Onion", phRange: [6.0, 7.0] },
  { tempRange: [20, 25], humidityRange: [50, 60], moisture: "Medium", crop: "Garlic", phRange: [6.0, 7.5] },
  { tempRange: [25, 30], humidityRange: [60, 70], moisture: "High", crop: "Pumpkin", phRange: [5.5, 7.0] },
  { tempRange: [10, 15], humidityRange: [30, 40], moisture: "Low", crop: "Peas", phRange: [6.0, 7.5] },
];

const mockSoilData = {
  moisture: localStorage.getItem("humid"),
  ph: 6.5,
  nitrogen: 75,
  phosphorus: 60,
  potassium: 80,
  lastUpdated: new Date().toISOString(),
};

const chartData = [
  { name: "Mon", moisture: 65, ph: 6.5 },
  { name: "Tue", moisture: 68, ph: 6.4 },
  { name: "Wed", moisture: 62, ph: 6.6 },
  { name: "Thu", moisture: 64, ph: 6.5 },
  { name: "Fri", moisture: 66, ph: 6.3 },
  { name: "Sat", moisture: 67, ph: 6.4 },
  { name: "Sun", moisture: 69, ph: 6.2 },
];

export const SoilHealth = () => {
  const [temp, setTemp] = useState(localStorage.getItem("temp") || "");
  const [humid, setHumid] = useState(localStorage.getItem("humid") || "");
  const [bestCrop, setBestCrop] = useState("Unknown");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = localStorage.getItem("temp");
      const newHumid = localStorage.getItem("humid");

      if (!newTemp || !newHumid) {
        console.warn("Temperature or humidity data is missing in localStorage.");
        setBestCrop("Unknown");
        setLoading(false);
        return;
      }

      const temperature = parseFloat(newTemp);
      const humidity = parseFloat(newHumid);

      if (isNaN(temperature) || isNaN(humidity)) {
        console.error("Invalid temperature or humidity values.");
        setBestCrop("Unknown");
        setLoading(false);
        return;
      }

      console.log("Parsed Temperature:", temperature);
      console.log("Parsed Humidity:", humidity);

      const recommendedCrop = cropData.find(({ tempRange, humidityRange, phRange, crop }) => {
        const matchesTemp = temperature >= tempRange[0] && temperature <= tempRange[1];
        const matchesHumidity = humidity >= humidityRange[0] && humidity <= humidityRange[1];
        const matchesPh = mockSoilData.ph >= phRange[0] && mockSoilData.ph <= phRange[1];

        console.log(`Evaluating crop: ${crop}`);
        console.log(`- Matches Temp Range (${tempRange[0]}-${tempRange[1]}):`, matchesTemp);
        console.log(`- Matches Humidity Range (${humidityRange[0]}-${humidityRange[1]}):`, matchesHumidity);
        console.log(`- Matches pH Range (${phRange[0]}-${phRange[1]}):`, matchesPh);

        return matchesTemp && matchesHumidity && matchesPh;
      });

      if (!recommendedCrop) {
        console.warn("No matching crop found for the given conditions.");
        setBestCrop("Okra (Lady's Finger)");
      } else {
        setBestCrop(recommendedCrop.crop);
      }

      setLoading(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Sprout className="h-5 w-5 mr-2 text-brown-500" />
        Soil Health
      </h3>
      <div className="space-y-4">
        {/* Line Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="moisture" stroke="#3b82f6" />
              <Line type="monotone" dataKey="ph" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Soil Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">pH Level</div>
            <div className="text-lg font-semibold text-green-600">{mockSoilData.ph}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Humidity</div>
            <div className="text-lg font-semibold text-blue-600">{humid}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Temperature</div>
            <div className="text-lg font-semibold text-red-600">{temp}°C</div>
          </div>
        </div>

        {/* Recommended Crop */}
        <div className="text-center col-span-3">
          <div className="text-sm text-gray-500">Recommended Crop</div>
          {loading ? (
            <div className="text-lg font-semibold text-gray-400 flex items-center justify-center">
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Loading...
            </div>
          ) : (
            <div className="text-lg font-semibold text-amber-600">{bestCrop}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;