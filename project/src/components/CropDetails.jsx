import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CropDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch crop details
        const fetchCropDetails = async () => {
            try {
                const response = await fetch(`/api/crops/${id}`);
                const data = await response.json();
                setCrop(data);
            } catch (error) {
                console.error('Error fetching crop details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCropDetails();
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
                ) : crop ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{crop.name}</h1>
                        
                        {/* Crop Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Growth Information</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Growth Stage:</span>
                                        <span className="font-medium">{crop.growthStage}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Age:</span>
                                        <span className="font-medium">{crop.age} days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Health Status:</span>
                                        <span className="font-medium">{crop.healthStatus}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Maintenance</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Last Watered:</span>
                                        <span className="font-medium">{crop.lastWatered}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Next Action:</span>
                                        <span className="font-medium">{crop.nextAction}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center text-gray-600">Crop not found</div>
                )}
            </div>
        </div>
    );
};

export default CropDetails; 