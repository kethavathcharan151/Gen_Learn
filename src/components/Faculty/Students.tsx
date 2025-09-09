import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, GraduationCap, TrendingUp } from 'lucide-react';

interface FacultyStudentsProps {
  currentClass?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
  year: string;
  class: string;
  gpa: number;
  attendance: number;
  avatar: string;
}

export default function FacultyStudents({ currentClass }: FacultyStudentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@college.edu',
      rollNumber: 'CS2021001',
      course: 'Computer Science',
      year: '3rd Year',
      class: 'Class 12A',
      gpa: 8.5,
      attendance: 92,
      avatar: 'J'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@college.edu',
      rollNumber: 'CS2021002',
      course: 'Computer Science',
      year: '3rd Year',
      class: 'Class 12A',
      gpa: 9.2,
      attendance: 88,
      avatar: 'J'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@college.edu',
      rollNumber: 'PH2021003',
      course: 'Physics',
      year: '2nd Year',
      class: 'Class 11B',
      gpa: 7.8,
      attendance: 85,
      avatar: 'M'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@college.edu',
      rollNumber: 'CH2021004',
      course: 'Chemistry',
      year: '3rd Year',
      class: 'Class 12A',
      gpa: 8.9,
      attendance: 94,
      avatar: 'S'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@college.edu',
      rollNumber: 'MA2021005',
      course: 'Mathematics',
      year: '1st Year',
      class: 'Class 10A',
      gpa: 8.1,
      attendance: 90,
      avatar: 'D'
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily.davis@college.edu',
      rollNumber: 'EN2021006',
      course: 'English',
      year: '2nd Year',
      class: 'Class 11A',
      gpa: 8.7,
      attendance: 87,
      avatar: 'E'
    },
  ];

  // Filter students by current class if selected
  const classFilteredStudents = currentClass 
    ? students.filter(student => student.class === currentClass)
    : students;

  const filteredStudents = classFilteredStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === '' || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const courses = [...new Set(students.map(student => student.course))];

  const getGPAColor = (gpa: number) => {
    if (gpa >= 9) return 'text-green-600 bg-green-100';
    if (gpa >= 8) return 'text-blue-600 bg-blue-100';
    if (gpa >= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-blue-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Student Management {currentClass && `- ${currentClass}`}
        </h2>
        <p className="text-gray-600">
          {currentClass 
            ? `Managing students in ${currentClass} (${filteredStudents.length} students)`
            : 'View and manage student information and performance'
          }
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                {student.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.rollNumber}</p>
                <p className="text-sm text-gray-600">{student.course} • {student.year}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{student.email}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">GPA</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGPAColor(student.gpa)}`}>
                  {student.gpa}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Attendance</span>
                </div>
                <span className={`text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                View Profile
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}