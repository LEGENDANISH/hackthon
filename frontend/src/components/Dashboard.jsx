import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { format } from "date-fns";
import {
  Cloud,
  Droplets,
  Plane,
  Sun,
  Calendar,
  AlertTriangle,
  Activity,
  Clock,
  Trash2,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { WeatherCard } from "./WeatherCard";
import { CropStatus } from "./CropStatus";
import { SoilHealth } from "./SoilHealth";
import { TaskList } from "./TaskList";
import CropHealthAI from "./CropHealthAI";

export const Dashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newScheduleTime, setNewScheduleTime] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  // Updated data array with all 12 months
  const data = [
    { name: 'Jan', profit: 4000, loss: 2400 },
    { name: 'Feb', profit: 3000, loss: 1398 },
    { name: 'Mar', profit: 5000, loss: 2210 },
    { name: 'Apr', profit: 4780, loss: 2908 },
    { name: 'May', profit: 5890, loss: 2000 },
    { name: 'Jun', profit: 4390, loss: 2500 },
    { name: 'Jul', profit: 6000, loss: 3000 },
    { name: 'Aug', profit: 5500, loss: 2800 },
    { name: 'Sep', profit: 6200, loss: 3200 },
    { name: 'Oct', profit: 7000, loss: 3500 },
    { name: 'Nov', profit: 6800, loss: 3300 },
    { name: 'Dec', profit: 7200, loss: 3600 },
  ];

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (newScheduleDate && newScheduleTime) {
      const newSchedule = {
        id: Date.now(),
        datetime: `${newScheduleDate} ${newScheduleTime}`,
      };
      setSchedules([...schedules, newSchedule]);
      setShowScheduleForm(false);
      setNewScheduleTime('');
      setNewScheduleDate('');
    }
  };

  const handleNavigate = () => {
    navigate("/finance-details"); // Replace with your actual route
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Simulate bot response after 1 second
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { text: "Thank you for your message! How can I assist you?", sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <nav className="bg-white shadow-lg border-b-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src={logo} alt="AgriSmart Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-gray-900">AgriSmart</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">{format(new Date(), "MMMM d, yyyy")}</span>
            </div>
          </div>
        </div>
      </nav>

      <WeatherCard
        weather={{
          temperature: 24,
          humidity: 65,
          rainfall: 0,
          forecast: "Partly Cloudy",
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Financial Overview */}
          <div className="bg-white rounded-lg shadow-md p-6" onClick={handleNavigate}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              Financial Overview
            </h3>
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis stroke="#82ca9d" />
                  <Tooltip />
                  <Line type="monotone" dataKey="profit" stroke="#4CAF50" strokeWidth={2} />
                  <Line type="monotone" dataKey="loss" stroke="#F44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-2">Monthly profit and loss trend</p>
          </div>

          {/* Irrigation Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-blue-500" />
              Irrigation Status
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">Active</div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Scheduled Times</p>
                <button
                  onClick={() => setShowScheduleForm(true)}
                  className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  + Add Schedule
                </button>
              </div>
              {showScheduleForm && (
                <form onSubmit={handleAddSchedule} className="bg-blue-50 rounded-lg p-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Date</label>
                      <input
                        type="date"
                        value={newScheduleDate}
                        onChange={(e) => setNewScheduleDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Time</label>
                      <input
                        type="time"
                        value={newScheduleTime}
                        onChange={(e) => setNewScheduleTime(e.target.value)}
                        className="w-full px-3 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowScheduleForm(false)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add Schedule
                    </button>
                  </div>
                </form>
              )}
              <div className="space-y-2 mt-3">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="group relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {new Date(schedule.datetime).toLocaleDateString()}
                      </span>
                      <Clock className="h-4 w-4 text-gray-500 ml-2" />
                      <span className="text-sm text-gray-700">
                        {new Date(schedule.datetime).toLocaleTimeString()}
                      </span>
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chatbot Box */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-orange-500" />
              Chatbot Assistant
            </h3>
            <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-3 mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Other Components */}
        <div className="flex grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="h-fit">
            <CropStatus />
          </div>
          <div className="w-full">
            <SoilHealth />
          </div>
        </div>

        <div className="mt-8">
          <CropHealthAI />
        </div>

        
      </main>
    </div>
  );
};

export default Dashboard;