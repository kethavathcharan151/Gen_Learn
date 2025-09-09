import React from 'react';
import { BookOpen, Clock, TrendingUp, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export default function StudentDashboard() {
  const stats = [
    { label: 'Pending Assignments', value: '4', icon: BookOpen, color: 'bg-orange-500' },
    { label: 'Attendance', value: '85%', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Average Grade', value: 'A-', icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Upcoming Events', value: '2', icon: Calendar, color: 'bg-purple-500' },
  ];

  const recentActivities = [
    { title: 'Physics Assignment submitted', time: '2 hours ago', type: 'success' },
    { title: 'Math Quiz - Grade: A', time: '1 day ago', type: 'success' },
    { title: 'Chemistry Lab due tomorrow', time: '1 day ago', type: 'warning' },
    { title: 'English Essay feedback received', time: '2 days ago', type: 'info' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here's what's happening with your academics today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.title}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg text-left transition-all duration-200 border border-blue-200">
              <div className="font-medium text-blue-800">Submit pending assignments</div>
              <div className="text-blue-600 text-sm">4 assignments due this week</div>
            </button>
            <button className="w-full p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg text-left transition-all duration-200 border border-green-200">
              <div className="font-medium text-green-800">View attendance report</div>
              <div className="text-green-600 text-sm">Current attendance: 85%</div>
            </button>
            <button className="w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg text-left transition-all duration-200 border border-purple-200">
              <div className="font-medium text-purple-800">Watch learning videos</div>
              <div className="text-purple-600 text-sm">New videos available</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}