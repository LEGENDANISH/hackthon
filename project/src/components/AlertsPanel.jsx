import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const AlertsPanel = ({ alerts }) => {
    const getAlertIcon = (type) => {
        switch (type) {
            case 'warning':
                return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
            case 'danger':
                return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
            case 'success':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            default:
                return <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />;
        }
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'danger':
                return 'bg-red-50 border-red-200';
            case 'success':
                return 'bg-green-50 border-green-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Alerts</h2>
            
            <div className="space-y-3">
                {alerts.map(alert => (
                    <div 
                        key={alert.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border
                                  ${getAlertStyle(alert.type)}`}
                    >
                        {getAlertIcon(alert.type)}
                        <div>
                            <h4 className="font-medium text-gray-800">
                                {alert.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {alert.message}
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">
                                {alert.timestamp}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsPanel; 