import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const TasksList = ({ tasks, onTaskComplete }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h2>
            <div className="space-y-4">
                {tasks?.map(task => (
                    <motion.div
                        key={task.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div>
                            <h3 className="font-medium text-gray-800">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onTaskComplete(task.id)}
                            className="p-2 text-green-500 hover:text-green-600"
                        >
                            <CheckCircleIcon className="w-6 h-6" />
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TasksList; 