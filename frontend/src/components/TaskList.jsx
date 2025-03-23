import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const mockTasks = [
  {
    id: '1',
    title: 'Apply Fertilizer - Field A',
    description: 'Apply nitrogen-rich fertilizer to wheat field',
    dueDate: '2024-03-20',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Irrigation System Maintenance',
    description: 'Check and repair any leaks in the irrigation system',
    dueDate: '2024-03-22',
    status: 'in-progress',
    priority: 'medium'
  }
];

export const TaskList = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
        Tasks
      </h3>
      <div className="space-y-4">
        {mockTasks.map(task => (
          <div
            key={task.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Due: {task.dueDate}</span>
              <span
                className={`ml-4 flex items-center ${
                  task.status === 'completed'
                    ? 'text-green-600'
                    : task.status === 'in-progress'
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                {task.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : task.status === 'in-progress' ? (
                  <Clock className="h-4 w-4 mr-1" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-1" />
                )}
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
