import React, { useState } from 'react';
import { Plus, Calendar, FileText, Users, Edit, Trash2, Upload } from 'lucide-react';
import { Assignment } from '../../types';

interface FacultyAssignmentsProps {
  currentClass?: string;
}

export default function FacultyAssignments({ currentClass }: FacultyAssignmentsProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Physics Lab Report',
      description: 'Complete the electromagnetic induction lab report with calculations and observations.',
      subject: 'Physics',
      dueDate: '2025-01-20',
      status: 'pending',
      maxMarks: 50,
    },
    {
      id: '2',
      title: 'Mathematics Problem Set',
      description: 'Solve calculus problems from chapter 5-7.',
      subject: 'Mathematics',
      dueDate: '2025-01-18',
      status: 'submitted',
      maxMarks: 100,
      submissionDate: '2025-01-17',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    maxMarks: '',
    file: null as File | null
  });

  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.description && newAssignment.subject && newAssignment.dueDate && newAssignment.maxMarks) {
      const assignment: Assignment = {
        id: Math.random().toString(36).substr(2, 9),
        title: newAssignment.title,
        description: newAssignment.description,
        subject: newAssignment.subject,
        dueDate: newAssignment.dueDate,
        status: 'pending',
        maxMarks: parseInt(newAssignment.maxMarks),
      };
      
      setAssignments([...assignments, assignment]);
      setNewAssignment({ title: '', description: '', subject: '', dueDate: '', maxMarks: '', file: null });
      setShowCreateModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAssignment({ ...newAssignment, file });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Assignment Management</h2>
          <p className="text-gray-600">Create and manage assignments for your students</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(assignment.status)}`}>
                {assignment.status}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{assignment.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{assignment.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Max Marks: {assignment.maxMarks}</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200">
              View Submissions
            </button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Create New Assignment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter assignment title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-24 resize-none"
                  placeholder="Enter assignment description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select Subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                  <input
                    type="number"
                    value={newAssignment.maxMarks}
                    onChange={(e) => setNewAssignment({ ...newAssignment, maxMarks: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter max marks"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Assignment File (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click to upload assignment file</p>
                    <p className="text-gray-400 text-sm">PDF, DOC, DOCX, TXT files only</p>
                  </label>
                  {newAssignment.file && (
                    <p className="text-green-600 text-sm mt-2">File selected: {newAssignment.file.name}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssignment}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}