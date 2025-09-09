import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, XCircle, Upload, Download } from 'lucide-react';

interface FacultyAttendanceProps {
  currentClass?: string;
}

interface AttendanceEntry {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: 'present' | 'absent';
}

export default function FacultyAttendance({ currentClass }: FacultyAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState<AttendanceEntry[]>([
    { studentId: '1', studentName: 'John Doe', rollNumber: 'CS2021001', status: 'present' },
    { studentId: '2', studentName: 'Jane Smith', rollNumber: 'CS2021002', status: 'present' },
    { studentId: '3', studentName: 'Mike Johnson', rollNumber: 'PH2021003', status: 'absent' },
    { studentId: '4', studentName: 'Sarah Wilson', rollNumber: 'CH2021004', status: 'present' },
    { studentId: '5', studentName: 'David Brown', rollNumber: 'MA2021005', status: 'present' },
    { studentId: '6', studentName: 'Emily Davis', rollNumber: 'EN2021006', status: 'absent' },
  ]);

  const subjects = ['Physics', 'Mathematics', 'Chemistry', 'Computer Science', 'English'];

  const toggleAttendance = (studentId: string) => {
    setAttendanceData(prev => prev.map(student => 
      student.studentId === studentId 
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ));
  };

  const markAllPresent = () => {
    setAttendanceData(prev => prev.map(student => ({ ...student, status: 'present' as const })));
  };

  const markAllAbsent = () => {
    setAttendanceData(prev => prev.map(student => ({ ...student, status: 'absent' as const })));
  };

  const saveAttendance = () => {
    // Handle saving attendance logic here
    alert('Attendance saved successfully!');
  };

  const presentCount = attendanceData.filter(student => student.status === 'present').length;
  const absentCount = attendanceData.length - presentCount;
  const attendancePercentage = (presentCount / attendanceData.length) * 100;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Attendance Management {currentClass && `- ${currentClass}`}
        </h2>
        <p className="text-gray-600">
          {currentClass 
            ? `Mark attendance for ${currentClass} students`
            : 'Mark and manage student attendance for your classes'
          }
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={markAllPresent}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
            >
              All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              All Absent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">{attendanceData.length}</p>
            <p className="text-blue-600 text-sm">Total Students</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">{presentCount}</p>
            <p className="text-green-600 text-sm">Present</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-800">{absentCount}</p>
            <p className="text-red-600 text-sm">Absent</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
            <span className="text-sm font-bold text-gray-800">{attendancePercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                attendancePercentage >= 90 ? 'bg-green-500' :
                attendancePercentage >= 75 ? 'bg-blue-500' :
                attendancePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Attendance</h3>
        <div className="space-y-3">
          {attendanceData.map((student) => (
            <div key={student.studentId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {student.studentName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{student.studentName}</h4>
                  <p className="text-sm text-gray-600">{student.rollNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAttendance(student.studentId)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    student.status === 'present'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {student.status === 'present' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Present
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Absent
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={saveAttendance}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Save Attendance
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>
    </div>
  );
}