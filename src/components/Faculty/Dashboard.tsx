import React from 'react';
import { Users, ClipboardList, TrendingUp, Calendar, CheckCircle, BookOpen } from 'lucide-react';

interface FacultyDashboardProps {
  currentClass?: string;
}

export default function FacultyDashboard({ currentClass }: FacultyDashboardProps) {
  const stats = [
    { label: 'Total Students', value: currentClass ? '32' : '156', icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Assignments', value: '23', icon: ClipboardList, color: 'bg-orange-500' },
    { label: 'Classes Today', value: '4', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Attendance Rate', value: '87%', icon: CheckCircle, color: 'bg-purple-500' },
  ];

  const recentActivities = [
    { title: 'Physics Assignment graded for 25 students', time: '1 hour ago', type: 'success' },
    { title: 'Attendance uploaded for Math class', time: '3 hours ago', type: 'success' },
    { title: 'New assignment created for Chemistry', time: '5 hours ago', type: 'info' },
    { title: 'Student performance report generated', time: '1 day ago', type: 'info' },
  ];

  const upcomingClasses = [
    { subject: 'Advanced Physics', time: '10:00 AM', students: 28, room: 'Lab-A1' },
    { subject: 'Quantum Mechanics', time: '2:00 PM', students: 24, room: 'Room-305' },
    { subject: 'Applied Mathematics', time: '4:00 PM', students: 32, room: 'Room-201' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Faculty Dashboard {currentClass && `- ${currentClass}`}
        </h2>
        <p className="text-gray-600">
          {currentClass 
            ? `Managing ${currentClass} - View class-specific data and analytics`
            : 'Manage your classes and student performance effectively.'
          }
        </p>
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
            <Calendar className="w-5 h-5" />
            Today's Classes
          </h3>
          <div className="space-y-4">
            {upcomingClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div>
                  <h4 className="font-medium text-gray-800">{classItem.subject}</h4>
                  <p className="text-sm text-gray-600">{classItem.room} • {classItem.students} students</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-blue-600">{classItem.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.title}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg text-left transition-all duration-200 border border-green-200">
            <div className="font-medium text-green-800">Create New Assignment</div>
            <div className="text-green-600 text-sm">Set up assignments for your classes</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg text-left transition-all duration-200 border border-blue-200">
            <div className="font-medium text-blue-800">Upload Attendance</div>
            <div className="text-blue-600 text-sm">Mark attendance for today's classes</div>
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg text-left transition-all duration-200 border border-purple-200">
            <div className="font-medium text-purple-800">View Analytics</div>
            <div className="text-purple-600 text-sm">Check class performance metrics</div>
          </button>
        </div>
      </div>
    </div>
  );
}