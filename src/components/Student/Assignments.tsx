import React, { useState } from 'react';
import { Upload, Calendar, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Assignment } from '../../types';

export default function StudentAssignments() {
  const [assignments] = useState<Assignment[]>([
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
    {
      id: '3',
      title: 'Chemistry Research Paper',
      description: 'Write a research paper on organic compounds and their applications.',
      subject: 'Chemistry',
      dueDate: '2025-01-25',
      status: 'graded',
      maxMarks: 75,
      marks: 68,
      submissionDate: '2025-01-15',
      feedback: 'Good work! Well-structured paper with clear explanations.',
    },
    {
      id: '4',
      title: 'English Literature Essay',
      description: 'Analyze the themes in Shakespeare\'s Hamlet.',
      subject: 'English',
      dueDate: '2025-01-22',
      status: 'pending',
      maxMarks: 60,
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const handleSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
  };

  const submitAssignment = () => {
    // Handle submission logic here
    setShowSubmissionModal(false);
    setSubmissionText('');
    setSelectedAssignment(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'submitted':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'graded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
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
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Assignments</h2>
        <p className="text-gray-600">Manage and submit your assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(assignment.status)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>
              {assignment.marks && (
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{assignment.marks}/{assignment.maxMarks}</span>
                  <div className="text-sm text-gray-600">marks</div>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{assignment.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              {assignment.submissionDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Submitted: {new Date(assignment.submissionDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {assignment.feedback && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">{assignment.feedback}</p>
              </div>
            )}

            {assignment.status === 'pending' && (
              <button
                onClick={() => handleSubmit(assignment)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Submit Assignment
              </button>
            )}
          </div>
        ))}
      </div>

      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit Assignment</h3>
            <p className="text-gray-600 mb-4">{selectedAssignment.title}</p>
            
            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="Enter your submission or paste your work here..."
              className="w-full h-32 px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={submitAssignment}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}