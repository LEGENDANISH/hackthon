import api from '../../services/api';

// Action Types
export const FETCH_DASHBOARD_DATA_START = 'FETCH_DASHBOARD_DATA_START';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_ERROR = 'FETCH_DASHBOARD_DATA_ERROR';
export const COMPLETE_TASK = 'COMPLETE_TASK';

// Action Creators
export const fetchDashboardData = () => async (dispatch) => {
    dispatch({ type: FETCH_DASHBOARD_DATA_START });

    try {
        const [weather, crops, tasks, alerts, statistics] = await Promise.all([
            api.getWeatherData(),
            api.getCropsData(),
            api.getTasksData(),
            api.getAlertsData(),
            api.getStatisticsData()
        ]);

        dispatch({
            type: FETCH_DASHBOARD_DATA_SUCCESS,
            payload: {
                weather,
                crops,
                tasks,
                alerts,
                statistics
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_DASHBOARD_DATA_ERROR,
            payload: error.message
        });
    }
};

export const completeTask = (taskId) => async (dispatch) => {
    try {
        // Simulate API call for task completion
        await new Promise(resolve => setTimeout(resolve, 500));
        
        dispatch({
            type: COMPLETE_TASK,
            payload: taskId
        });

        // Refresh dashboard data after task completion
        dispatch(fetchDashboardData());
    } catch (error) {
        console.error('Error completing task:', error);
    }
}; 