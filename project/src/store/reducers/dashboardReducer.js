import {
    FETCH_DASHBOARD_DATA_START,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_ERROR,
    COMPLETE_TASK
} from '../actions/dashboardActions';

const initialState = {
    weather: null,
    crops: [],
    tasks: [],
    alerts: [],
    statistics: null,
    loading: false,
    error: null
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_DATA_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload
            };
        case FETCH_DASHBOARD_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case COMPLETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        default:
            return state;
    }
};

export default dashboardReducer; 