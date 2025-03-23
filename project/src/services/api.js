// Mock data instead of real API calls
const mockData = {
    weather: {
        current: {
            temperature: 25,
            humidity: 60,
            windSpeed: 12,
            condition: 'Sunny'
        },
        forecast: [
            { date: '2024-03-20', maxTemp: 26, minTemp: 18, rainChance: 10, condition: 'Sunny' },
            { date: '2024-03-21', maxTemp: 24, minTemp: 17, rainChance: 30, condition: 'Cloudy' },
            { date: '2024-03-22', maxTemp: 23, minTemp: 16, rainChance: 60, condition: 'Rainy' },
            { date: '2024-03-23', maxTemp: 25, minTemp: 18, rainChance: 20, condition: 'Partly Cloudy' },
            { date: '2024-03-24', maxTemp: 27, minTemp: 19, rainChance: 0, condition: 'Sunny' }
        ]
    },
    crops: [
        {
            id: 1,
            name: 'Wheat Field A',
            healthStatus: 'excellent',
            moisture: 65,
            age: 45,
            growthStage: 'Mature',
            lastWatered: '2 hours ago',
            nextAction: 'Scheduled for harvest in 5 days',
            growthProgress: 85
        },
        {
            id: 2,
            name: 'Corn Field B',
            healthStatus: 'good',
            moisture: 58,
            age: 30,
            growthStage: 'Growing',
            lastWatered: '5 hours ago',
            nextAction: 'Irrigation scheduled tomorrow',
            growthProgress: 60
        }
    ],
    tasks: [
        {
            id: 1,
            title: 'Irrigate Corn Field',
            description: 'Schedule irrigation for Field B',
            priority: 'high',
            dueDate: '2024-03-21'
        },
        {
            id: 2,
            title: 'Harvest Preparation',
            description: 'Prepare equipment for wheat harvest',
            priority: 'medium',
            dueDate: '2024-03-25'
        }
    ],
    alerts: [
        {
            id: 1,
            type: 'warning',
            title: 'Low Soil Moisture',
            message: 'Field B requires irrigation soon',
            timestamp: '2024-03-20 10:30'
        },
        {
            id: 2,
            type: 'info',
            title: 'Weather Alert',
            message: 'Rain expected in next 48 hours',
            timestamp: '2024-03-20 09:15'
        }
    ],
    statistics: {
        yieldTrends: [
            { month: 'Jan', value: 30 },
            { month: 'Feb', value: 40 },
            { month: 'Mar', value: 45 },
            { month: 'Apr', value: 50 },
            { month: 'May', value: 55 }
        ],
        resourceUsage: [
            { date: '01/05', water: 200, energy: 150 },
            { date: '02/05', water: 220, energy: 160 },
            { date: '03/05', water: 190, energy: 140 },
            { date: '04/05', water: 230, energy: 170 },
            { date: '05/05', water: 210, energy: 155 }
        ],
        quickStats: [
            { label: 'Total Yield', value: '2.5 tons', trend: 12 },
            { label: 'Water Usage', value: '1000L', trend: -5 },
            { label: 'Energy', value: '500 kWh', trend: 8 },
            { label: 'Efficiency', value: '92%', trend: 3 }
        ]
    }
};

// API methods that return mock data
const api = {
    async getWeatherData() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.weather;
    },

    async getCropsData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.crops;
    },

    async getTasksData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.tasks;
    },

    async getAlertsData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.alerts;
    },

    async getStatisticsData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.statistics;
    }
};

export default api; 