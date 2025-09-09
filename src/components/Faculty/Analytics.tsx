import React from 'react';
import { BarChart3, TrendingUp, Users, Award, BookOpen, Calendar } from 'lucide-react';

interface FacultyAnalyticsProps {
  currentClass?: string;
}

export default function FacultyAnalytics({ currentClass }: FacultyAnalyticsProps) {
  const classPerformance = [
    { subject: 'Physics', averageGrade: 8.2, totalStudents: 45, passRate: 92 },
    { subject: 'Mathematics', averageGrade: 7.8, totalStudents: 50, passRate: 88 },
    { subject: 'Chemistry', averageGrade: 8.5, totalStudents: 42, passRate: 95 },
    { subject: 'Computer Science', averageGrade: 8.9, totalStudents: 38, passRate: 97 },
  ];

  const monthlyTrends = [
    { month: 'Jan', attendance: 85, performance: 8.2 },
    { month: 'Feb', attendance: 87, performance: 8.4 },
    { month: 'Mar', attendance: 82, performance: 8.1 },
    { month: 'Apr', attendance: 89, performance: 8.6 },
    { month: 'May', attendance: 91, performance: 8.8 },
  ];

  const topPerformers = [
    { name: 'Jane Smith', course: 'Computer Science', gpa: 9.2, improvement: '+0.3' },
    { name: 'Sarah Wilson', course: 'Chemistry', gpa: 8.9, improvement: '+0.2' },
    { name: 'Emily Davis', course: 'English', gpa: 8.7, improvement: '+0.4' },
    { name: 'John Doe', course: 'Computer Science', gpa: 8.5, improvement: '+0.1' },
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return 'text-green-600';
    if (grade >= 8) return 'text-blue-600';
    if (grade >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Analytics Dashboard {currentClass && `- ${currentClass}`}
        </h2>
        <p className="text-gray-600">
          {currentClass 
            ? `Analytics for ${currentClass} - Class-specific performance metrics`
            : 'Comprehensive insights into student performance and class metrics'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">175</span>
          </div>
          <p className="text-gray-600 font-medium">Total Students</p>
          <p className="text-green-600 text-sm mt-1">+12 this semester</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">8.4</span>
          </div>
          <p className="text-gray-600 font-medium">Average GPA</p>
          <p className="text-green-600 text-sm mt-1">+0.2 from last term</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">93%</span>
          </div>
          <p className="text-gray-600 font-medium">Pass Rate</p>
          <p className="text-green-600 text-sm mt-1">+3% improvement</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">87%</span>
          </div>
          <p className="text-gray-600 font-medium">Avg Attendance</p>
          <p className="text-blue-600 text-sm mt-1">Stable this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Subject Performance
          </h3>
          <div className="space-y-4">
            {classPerformance.map((subject, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{subject.subject}</h4>
                  <span className={`font-semibold ${getGradeColor(subject.averageGrade)}`}>
                    {subject.averageGrade}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{subject.totalStudents} students</span>
                  <span>{subject.passRate}% pass rate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${subject.passRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top Performers
          </h3>
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{student.gpa}</p>
                  <p className="text-green-600 text-sm">{student.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Monthly Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {monthlyTrends.map((month, index) => (
            <div key={index} className="text-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">{month.month}</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="font-semibold text-blue-600">{month.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="font-semibold text-green-600">{month.performance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Insights</h3>
            <p className="text-gray-600 text-sm">Automated analysis of class performance</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Key Strengths</h4>
            <p className="text-sm text-gray-600">Computer Science shows exceptional performance with 97% pass rate. Student engagement is highest in practical subjects.</p>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Areas for Improvement</h4>
            <p className="text-sm text-gray-600">Mathematics attendance could be improved. Consider interactive teaching methods to boost engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}