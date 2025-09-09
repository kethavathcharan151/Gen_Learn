import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import StudentProfileComponent from './components/Profile/StudentProfile';
import FacultyProfileComponent from './components/Profile/FacultyProfile';
import StudentDashboard from './components/Student/Dashboard';
import StudentAssignments from './components/Student/Assignments';
import StudentPerformance from './components/Student/Performance';
import StudentAttendance from './components/Student/Attendance';
import FacultyDashboard from './components/Faculty/Dashboard';
import FacultyAssignments from './components/Faculty/Assignments';
import FacultyStudents from './components/Faculty/Students';
import FacultyAnalytics from './components/Faculty/Analytics';
import FacultyAttendance from './components/Faculty/Attendance';
import Videos from './components/Common/Videos';
import Events from './components/Common/Events';

function App() {
  const { user, loading, signOut, updateProfile } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  const handleClassChange = async (className: string) => {
    if (user && user.profile && 'assignedClasses' in user.profile) {
      const updatedProfile = { ...user.profile, currentClass: className };
      await updateProfile(updatedProfile);
    }
  };

  const handleSearch = (query: string, category: string) => {
    // Search functionality can be implemented here
    console.log(`Searching for "${query}" in category "${category}"`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Redirect to profile if not completed
  if (!user.profile && activeView !== 'profile') {
    setActiveView('profile');
  }

  const renderContent = () => {
    if (user.role === 'student') {
      switch (activeView) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'profile':
          return (
            <StudentProfileComponent
              profile={user.profile as any}
            />
          );
        case 'assignments':
          return <StudentAssignments />;
        case 'performance':
          return <StudentPerformance />;
        case 'attendance':
          return <StudentAttendance />;
        case 'videos':
          return <Videos />;
        case 'events':
          return <Events />;
        default:
          return <StudentDashboard />;
      }
    } else {
      switch (activeView) {
        case 'dashboard':
          return <FacultyDashboard currentClass={user.profile?.currentClass} />;
        case 'profile':
          return (
            <FacultyProfileComponent
              profile={user.profile as any}
              onClassChange={handleClassChange}
            />
          );
        case 'assignments':
          return <FacultyAssignments currentClass={user.profile?.currentClass} />;
        case 'students':
          return <FacultyStudents currentClass={user.profile?.currentClass} />;
        case 'analytics':
          return <FacultyAnalytics currentClass={user.profile?.currentClass} />;
        case 'attendance':
          return <FacultyAttendance currentClass={user.profile?.currentClass} />;
        case 'videos':
          return <Videos />;
        case 'events':
          return <Events />;
        default:
          return <FacultyDashboard currentClass={user.profile?.currentClass} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header user={user} onLogout={signOut} onSearch={handleSearch} />
      <div className="flex">
        <Sidebar user={user} activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;