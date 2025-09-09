import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AttendanceRecord } from '../../types';

export default function StudentAttendance() {
  const attendanceRecords: AttendanceRecord[] = [
    { subject: 'Physics', totalClasses: 45, attendedClasses: 38, percentage: 84.4 },
    { subject: 'Mathematics', totalClasses: 50, attendedClasses: 46, percentage: 92.0 },
    { subject: 'Chemistry', totalClasses: 40, attendedClasses: 32, percentage: 80.0 },
    { subject: 'English', totalClasses: 35, attendedClasses: 30, percentage: 85.7 },
    { subject: 'Computer Science', totalClasses: 42, attendedClasses: 40, percentage: 95.2 },
  ];

  const overallStats = {
    totalClasses: attendanceRecords.reduce((sum, record) => sum + record.totalClasses, 0),
    attendedClasses: attendanceRecords.reduce((sum, record) => sum + record.attendedClasses, 0),
    averagePercentage: attendanceRecords.reduce((sum, record) => sum + record.percentage, 0) / attendanceRecords.length,
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 90) return { status: 'excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { status: 'good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 75) return { status: 'average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'low', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const recentAttendance = [
    { date: '2025-01-15', subject: 'Physics', status: 'present' },
    { date: '2025-01-15', subject: 'Mathematics', status: 'present' },
    { date: '2025-01-14', subject: 'Chemistry', status: 'absent' },
    { date: '2025-01-14', subject: 'English', status: 'present' },
    { date: '2025-01-13', subject: 'Computer Science', status: 'present' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Attendance Overview</h2>
        <p className="text-gray-600">Monitor your class attendance and maintain academic requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallStats.totalClasses}</span>
          </div>
          <p className="text-gray-600 font-medium">Total Classes</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallStats.attendedClasses}</span>
          </div>
          <p className="text-gray-600 font-medium">Classes Attended</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${
              overallStats.averagePercentage >= 90 ? 'from-green-500 to-green-600' :
              overallStats.averagePercentage >= 80 ? 'from-blue-500 to-blue-600' :
              overallStats.averagePercentage >= 75 ? 'from-yellow-500 to-yellow-600' :
              'from-red-500 to-red-600'
            } rounded-lg flex items-center justify-center`}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallStats.averagePercentage.toFixed(1)}%</span>
          </div>
          <p className="text-gray-600 font-medium">Overall Attendance</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Subject-wise Attendance</h3>
        
        <div className="space-y-4">
          {attendanceRecords.map((record, index) => {
            const status = getAttendanceStatus(record.percentage);
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-800">{record.subject}</h4>
                  <div className={`px-3 py-1 rounded-full ${status.bg} ${status.color} text-sm font-medium`}>
                    {record.percentage.toFixed(1)}%
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                  <span>Attendance Progress</span>
                  <span>{record.attendedClasses}/{record.totalClasses} classes</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ease-out ${
                      record.percentage >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      record.percentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                      record.percentage >= 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${record.percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {record.totalClasses - record.attendedClasses} classes missed
                  </span>
                  <span className={`font-medium ${status.color}`}>
                    {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Attendance
          </h3>
          <div className="space-y-3">
            {recentAttendance.map((attendance, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{attendance.subject}</p>
                  <p className="text-sm text-gray-600">{new Date(attendance.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  {attendance.status === 'present' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    attendance.status === 'present' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Attendance Requirements</h3>
              <p className="text-gray-600 text-sm">Minimum 75% attendance required</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Excellent:</strong> 90%+ attendance (All subjects eligible for exams)
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Warning:</strong> Below 80% (Improvement required)
              </p>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Critical:</strong> Below 75% (Risk of exam debarment)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}