import React from 'react';
import { LayoutDashboard, Plane as Plant, CloudRain, Tractor, LineChart, AlertCircle, Settings, Menu } from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 text-emerald-600">
            <Plant size={24} />
            <span className="font-bold text-xl">FarmSmart</span>
          </div>
        </div>
        <nav className="flex-1 px-4">
          <div className="space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard' },
              { icon: Plant, label: 'Crops' },
              { icon: CloudRain, label: 'Weather' },
              { icon: Tractor, label: 'Equipment' },
              { icon: LineChart, label: 'Analytics' },
              { icon: AlertCircle, label: 'Alerts' },
              { icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-3 px-3 py-2 w-full text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
          <button className="md:hidden mr-4">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Farm Dashboard</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weather Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Weather</h3>
                <CloudRain className="text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">24°C</div>
              <p className="text-gray-600">Partly cloudy</p>
            </div>

            {/* Crop Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Crop Status</h3>
                <Plant className="text-emerald-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wheat</span>
                  <span className="text-emerald-600">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Corn</span>
                  <span className="text-yellow-600">Needs Water</span>
                </div>
              </div>
            </div>

            {/* Equipment Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Equipment</h3>
                <Tractor className="text-gray-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tractors</span>
                  <span className="text-green-600">2 Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Irrigation</span>
                  <span className="text-blue-600">Running</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {[
                  { title: 'Irrigation completed', time: '2 hours ago', type: 'water' },
                  { title: 'Fertilizer applied to Wheat field', time: '5 hours ago', type: 'fertilizer' },
                  { title: 'Equipment maintenance scheduled', time: '1 day ago', type: 'maintenance' },
                ].map((activity, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default App;
