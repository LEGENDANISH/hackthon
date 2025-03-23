import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const AlertDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch alert details
        const fetchAlertDetails = async () => {
            try {
                const response = await fetch(`/api/alerts/${id}`);
                const data = await response.json();
                setAlert(data);
            } catch (error) {
                console.error('Error fetching alert details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlertDetails();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </motion.button>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                ) : alert ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 
                            ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                            alert.type === 'danger' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'}`}
                        >
                            {alert.type}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{alert.title}</h1>
                        
                        <div className="prose max-w-none">
                            <p className="text-gray-600">{alert.description}</p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Reported on:</span>
                                <span className="font-medium">{alert.timestamp}</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center text-gray-600">Alert not found</div>
                )}
            </div>
        </div>
    );
};

export default AlertDetails; 