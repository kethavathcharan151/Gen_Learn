import React, { useState } from 'react';
import { Play, Clock, BookOpen, Search } from 'lucide-react';
import { Video } from '../../types';

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const videos: Video[] = [
    {
      id: '1',
      title: 'Introduction to Quantum Physics',
      youtubeId: 'dQw4w9WgXcQ',
      subject: 'Physics',
      duration: '15:30',
      description: 'Learn the fundamentals of quantum physics and its applications in modern technology.',
    },
    {
      id: '2',
      title: 'Advanced Calculus Techniques',
      youtubeId: 'dQw4w9WgXcQ',
      subject: 'Mathematics',
      duration: '22:45',
      description: 'Master advanced calculus methods including integration by parts and series expansion.',
    },
    {
      id: '3',
      title: 'Organic Chemistry Reactions',
      youtubeId: 'dQw4w9WgXcQ',
      subject: 'Chemistry',
      duration: '18:20',
      description: 'Explore common organic chemistry reactions and their mechanisms.',
    },
    {
      id: '4',
      title: 'Shakespeare\'s Literary Techniques',
      youtubeId: 'dQw4w9WgXcQ',
      subject: 'English',
      duration: '25:10',
      description: 'Analyze the literary devices and techniques used by William Shakespeare.',
    },
    {
      id: '5',
      title: 'Data Structures and Algorithms',
      youtubeId: 'dQw4w9WgXcQ',
      subject: 'Computer Science',
      duration: '30:45',
      description: 'Learn fundamental data structures and algorithm analysis techniques.',
    },
    {
      id: '6',
      title: 'World War II History',
      youtubeId: 'dQw4w9WgXcQ',
      subject: 'History',
      duration: '20:15',
      description: 'Comprehensive overview of World War II events and their global impact.',
    },
  ];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subjects = [...new Set(videos.map(video => video.subject))];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Videos</h2>
        <p className="text-gray-600">Access educational content to enhance your learning</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">{video.subject}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">{selectedVideo.subject}</span>
                <Clock className="w-4 h-4 text-gray-500 ml-2" />
                <span className="text-sm text-gray-600">{selectedVideo.duration}</span>
              </div>
              <p className="text-gray-600">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}