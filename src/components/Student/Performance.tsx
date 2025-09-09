import React from 'react';
import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';
import { Performance } from '../../types';

export default function StudentPerformance() {
  const performance: Performance[] = [
    { subject: 'Physics', totalMarks: 400, obtainedMarks: 340, percentage: 85, grade: 'A' },
    { subject: 'Mathematics', totalMarks: 500, obtainedMarks: 450, percentage: 90, grade: 'A+' },
    { subject: 'Chemistry', totalMarks: 350, obtainedMarks: 280, percentage: 80, grade: 'A-' },
    { subject: 'English', totalMarks: 300, obtainedMarks: 255, percentage: 85, grade: 'A' },
    { subject: 'Computer Science', totalMarks: 400, obtainedMarks: 370, percentage: 92.5, grade: 'A+' },
  ];

  const overallStats = {
    totalMarks: performance.reduce((sum, p) => sum + p.totalMarks, 0),
    obtainedMarks: performance.reduce((sum, p) => sum + p.obtainedMarks, 0),
    averagePercentage: performance.reduce((sum, p) => sum + p.percentage, 0) / performance.length,
    overallGrade: 'A'
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'A':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'A-':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Academic Performance</h2>
        <p className="text-gray-600">Track your academic progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallStats.overallGrade}</span>
          </div>
          <p className="text-gray-600 font-medium">Overall Grade</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallStats.averagePercentage.toFixed(1)}%</span>
          </div>
          <p className="text-gray-600 font-medium">Average Percentage</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{overallStats.obtainedMarks}</span>
          </div>
          <p className="text-gray-600 font-medium">Total Marks Obtained</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{performance.length}</span>
          </div>
          <p className="text-gray-600 font-medium">Subjects</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Subject-wise Performance</h3>
        
        <div className="space-y-4">
          {performance.map((subject, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-800">{subject.subject}</h4>
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getGradeColor(subject.grade)}`}>
                  {subject.grade}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                <span>Progress</span>
                <span>{subject.obtainedMarks}/{subject.totalMarks} marks</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Percentage</span>
                <span className="font-semibold text-gray-800">{subject.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Performance Insights</h3>
            <p className="text-gray-600 text-sm">AI-powered analysis of your academic progress</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Strengths</h4>
            <p className="text-sm text-gray-600">Excellent performance in Computer Science and Mathematics. Consistent grades across all subjects.</p>
          </div>
          <div className="bg-white/60 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Improvement Areas</h4>
            <p className="text-sm text-gray-600">Focus on Chemistry concepts. Consider additional practice sessions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}