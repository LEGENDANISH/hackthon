// Action Types
export const FETCH_DASHBOARD_DATA_START = 'FETCH_DASHBOARD_DATA_START';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_ERROR = 'FETCH_DASHBOARD_DATA_ERROR';

// Sample data (remove this when connecting to real API)
const sampleData = {
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
    ]
};

// Action Creators
export const fetchDashboardData = () => async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_DATA_START });

    try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, return sample data
        // Replace this with actual API call when ready
        dispatch({
            type: FETCH_DASHBOARD_DATA_SUCCESS,
            payload: sampleData
        });
    } catch (error) {
        dispatch({
            type: FETCH_DASHBOARD_DATA_ERROR,
            payload: error.message
        });
    }
};

// Task completion action
export const completeTask = (taskId) => async (dispatch) => {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Refresh dashboard data after task completion
        dispatch(fetchDashboardData());
    } catch (error) {
        console.error('Error completing task:', error);
    }
}; 