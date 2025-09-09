import React, { useState } from 'react';
import { User, BookOpen, Phone, MapPin, Award, Briefcase, Save, Users } from 'lucide-react';
import { FacultyProfile as FacultyProfileType } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface FacultyProfileProps {
  profile: FacultyProfileType | null;
  onClassChange: (className: string) => void;
}

export default function FacultyProfile({ profile, onClassChange }: FacultyProfileProps) {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState<FacultyProfileType>(profile || {
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    phone: '',
    address: '',
    qualification: '',
    experience: '',
    assignedClasses: [],
    currentClass: '',
  });

  const [isEditing, setIsEditing] = useState(!profile);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await updateProfile(formData);
    
    if (!error) {
      setIsEditing(false);
    }
    
    setSaving(false);
  };

  const availableClasses = ['Class 10A', 'Class 10B', 'Class 11A', 'Class 11B', 'Class 12A', 'Class 12B'];
  const departments = ['Science', 'Commerce', 'Arts', 'Mathematics', 'English', 'Computer Science'];
  const designations = ['Assistant Professor', 'Associate Professor', 'Professor', 'Head of Department', 'Principal'];

  const handleClassAssignment = (className: string) => {
    const updatedClasses = formData.assignedClasses.includes(className)
      ? formData.assignedClasses.filter(c => c !== className)
      : [...formData.assignedClasses, className];
    
    setFormData({ ...formData, assignedClasses: updatedClasses });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Faculty Profile</h2>
          <p className="text-gray-600">Manage your professional profile and class assignments</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>

      {profile && profile.assignedClasses.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Class Management
          </h3>
          <div className="flex flex-wrap gap-3">
            {profile.assignedClasses.map(className => (
              <button
                key={className}
                onClick={() => onClassChange(className)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  profile.currentClass === className
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {className}
              </button>
            ))}
          </div>
          {profile.currentClass && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium">Currently managing: {profile.currentClass}</p>
              <p className="text-blue-600 text-sm">Dashboard data will show information for this class</p>
            </div>
          )}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Employee ID
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                placeholder="Enter employee ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="w-4 h-4 inline mr-2" />
                Designation
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                required
              >
                <option value="">Select Designation</option>
                {designations.map(designation => (
                  <option key={designation} value={designation}>{designation}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                placeholder="Enter address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                placeholder="Enter qualification"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                placeholder="Enter years of experience"
                required
              />
            </div>
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Users className="w-4 h-4 inline mr-2" />
                Assigned Classes
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableClasses.map(className => (
                  <label key={className} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.assignedClasses.includes(className)}
                      onChange={() => handleClassAssignment(className)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{className}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
              {profile && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}