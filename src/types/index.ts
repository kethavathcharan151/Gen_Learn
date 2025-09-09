export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  avatar?: string;
  profile?: StudentProfile | FacultyProfile;
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  class: string;
  year: string;
  department: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
}

export interface FacultyProfile {
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  phone: string;
  address: string;
  qualification: string;
  experience: string;
  assignedClasses: string[];
  currentClass?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  marks?: number;
  maxMarks: number;
  submission?: string;
  submissionDate?: string;
  feedback?: string;
}

export interface Performance {
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
}

export interface AttendanceRecord {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'workshop' | 'seminar' | 'exam' | 'holiday' | 'other';
  location?: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  subject: string;
  duration: string;
  description: string;
}