import React, { useState, useEffect, Suspense, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowPathIcon,
    BellIcon, 
    ChartBarIcon,
    Cog6ToothIcon 
} from '@heroicons/react/24/outline';
import ErrorBoundary from './ErrorBoundary';

// Lazy load components
const WeatherWidget = React.lazy(() => import('./WeatherWidget'));
const CropHealthCard = React.lazy(() => import('./CropHealthCard'));
const TasksList = React.lazy(() => import('./TasksList'));
const AlertsPanel = React.lazy(() => import('./AlertsPanel'));
const StatisticsPanel = React.lazy(() => import('./StatisticsPanel'));

import { fetchDashboardData, completeTask } from '../store/actions/dashboardActions';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { weather, crops, tasks, alerts, statistics } = useSelector(state => state.dashboard);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            startTransition(() => {
                dispatch(fetchDashboardData());
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    // Loading component
    const LoadingFallback = () => (
        <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Farm Dashboard</h1>
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={loadDashboardData}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                        disabled={isLoading}
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                    </motion.button>
                </div>
            </div>

            {/* Main Content */}
            <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Weather and Alerts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <WeatherWidget data={weather} />
                            </div>
                            <div>
                                <AlertsPanel alerts={alerts} />
                            </div>
                        </div>

                        {/* Statistics */}
                        <StatisticsPanel data={statistics} />

                        {/* Crops */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {crops?.map(crop => (
                                <CropHealthCard
                                    key={crop.id}
                                    crop={crop}
                                    onClick={() => navigate(`/crops/${crop.id}`)}
                                />
                            ))}
                        </div>

                        {/* Tasks */}
                        <TasksList tasks={tasks} />
                    </div>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default Dashboard; 