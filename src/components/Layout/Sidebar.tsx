import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  Calendar,
  Play,
  Users,
  CheckSquare,
  TrendingUp,
  User as UserIcon
} from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  user: User;
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ user, activeView, onViewChange }: SidebarProps) {
  const studentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'videos', label: 'Learning Videos', icon: Play },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  const facultyMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'videos', label: 'Learning Videos', icon: Play },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  const menuItems = user.role === 'student' ? studentMenuItems : facultyMenuItems;

  return (
    <div className="w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200/50 shadow-lg">
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-lg border-2 border-blue-200">
            {user.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.profile?.name || user.name || 'User'}</h3>
            <p className="text-sm text-gray-600 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}