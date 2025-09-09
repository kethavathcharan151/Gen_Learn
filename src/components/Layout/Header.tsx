import React, { useState } from 'react';
import { Search, Bell, LogOut, ChevronDown } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onSearch?: (query: string, category: string) => void;
}

export default function Header({ user, onLogout, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const searchCategories = ['All', 'Students', 'Assignments', 'Events', 'Videos'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery, searchCategory);
      setShowSearchResults(true);
    }
  };

  const getDisplayName = () => {
    if (user.role === 'student' && 'name' in user && user.name) {
      return user.name;
    }
    if (user.role === 'faculty' && 'name' in user && user.name) {
      return user.name;
    }
    return user.name || 'User';
  };

  const getInitials = () => {
    const email = user.email;
    return email.charAt(0).toUpperCase();
  };

  const getPlaceholder = () => {
    switch (searchCategory) {
      case 'Students': return 'Search students...';
      case 'Assignments': return 'Search assignments...';
      case 'Events': return 'Search events...';
      case 'Videos': return 'Search videos...';
      default: return 'Search everything...';
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="flex items-center flex-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-l-lg border-r border-gray-300 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">{searchCategory}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                    {searchCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setSearchCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full pl-4 pr-10 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{getDisplayName()}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {showSearchResults && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Search Results for "{searchQuery}" in {searchCategory}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Search functionality ready for backend integration
              </p>
            </div>
            <button
              onClick={() => setShowSearchResults(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}