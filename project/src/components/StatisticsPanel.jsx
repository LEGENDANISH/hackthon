import React from 'react';
import { motion } from 'framer-motion';
import { 
    LineChart, 
    Line, 
    AreaChart, 
    Area,
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const StatisticsPanel = ({ data }) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Sample data if no data is provided
    const sampleData = {
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
    };

    const statsData = data || sampleData;

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Farm Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Yield Trends */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Yield Trends</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={statsData.yieldTrends}>
                                <defs>
                                    <linearGradient id="yieldColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#10B981" 
                                    fillOpacity={1} 
                                    fill="url(#yieldColor)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Resource Usage */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Resource Usage</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={statsData.resourceUsage}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line 
                                    type="monotone" 
                                    dataKey="water" 
                                    stroke="#3B82F6" 
                                    strokeWidth={2} 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="energy" 
                                    stroke="#EF4444" 
                                    strokeWidth={2} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {statsData.quickStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className="bg-gray-50 rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="text-sm text-gray-600">{stat.label}</div>
                        <div className="text-2xl font-bold text-gray-800 mt-1">
                            {stat.value}
                        </div>
                        <div className={`text-sm mt-1 ${
                            stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {stat.trend > 0 ? '+' : ''}{stat.trend}%
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default StatisticsPanel; 