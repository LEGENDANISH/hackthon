import React from 'react';
import { motion } from 'framer-motion';

const CropHealthCard = ({ crop, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(crop.id)}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all"
        >
            {/* Card content */}
        </motion.div>
    );
};

export default CropHealthCard; 