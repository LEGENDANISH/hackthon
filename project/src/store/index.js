import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import dashboardReducer from './reducers/dashboardReducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store; 