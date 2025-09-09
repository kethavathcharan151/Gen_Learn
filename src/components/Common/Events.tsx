import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Event } from '../../types';

export default function Events() {
  const events: Event[] = [
    {
      id: '1',
      title: 'Annual Science Fair',
      description: 'Students showcase their innovative projects and research work.',
      date: '2025-01-25',
      type: 'workshop',
      location: 'Main Auditorium',
    },
    {
      id: '2',
      title: 'Guest Lecture: AI in Healthcare',
      description: 'Industry expert discusses the applications of AI in modern healthcare.',
      date: '2025-01-22',
      type: 'seminar',
      location: 'Conference Room A',
    },
    {
      id: '3',
      title: 'Mid-term Examinations',
      description: 'Mid-semester examinations for all courses begin.',
      date: '2025-02-01',
      type: 'exam',
      location: 'Examination Halls',
    },
    {
      id: '4',
      title: 'Winter Break',
      description: 'College closed for winter holidays.',
      date: '2025-02-15',
      type: 'holiday',
      location: '',
    },
    {
      id: '5',
      title: 'Tech Workshop: React Development',
      description: 'Hands-on workshop on modern React development techniques.',
      date: '2025-01-28',
      type: 'workshop',
      location: 'Computer Lab 2',
    },
    {
      id: '6',
      title: 'Career Counseling Session',
      description: 'Professional guidance for career planning and job opportunities.',
      date: '2025-01-30',
      type: 'other',
      location: 'Student Center',
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'seminar':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'exam':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'holiday':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return '🛠️';
      case 'seminar':
        return '🎓';
      case 'exam':
        return '📝';
      case 'holiday':
        return '🏖️';
      default:
        return '📅';
    }
  };

  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">College Events</h2>
        <p className="text-gray-600">Stay updated with upcoming events and activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedEvents.map((event) => (
          <div key={event.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {new Date(event.date).getDate()}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm">
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Event Notifications</h3>
            <p className="text-gray-600 text-sm">Get notified about upcoming events</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Enable notifications to receive reminders about important events, deadlines, and activities.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          Enable Notifications
        </button>
      </div>
    </div>
  );
}