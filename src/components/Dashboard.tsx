import { useState } from 'react';
import { Heart, Calendar, MessageSquare, Users, AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ setActiveTab }: DashboardProps) {
  const { user, profile } = useAuth();
  const { appointments, loadingAppointments, resources, analytics } = useData();
  const [wellnessRating, setWellnessRating] = useState<number | null>(null);

  const handleWellnessCheck = (rating: number) => {
    setWellnessRating(rating);
    // In a real app, this would save to the database
    console.log('Wellness rating saved:', rating);
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.scheduled_at) > new Date() && apt.status === 'scheduled'
  ).slice(0, 3);

  const featuredResources = resources.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}!
            </h2>
            <p className="text-teal-100">
              Your mental wellness matters. Here's what's happening today.
            </p>
            {profile?.department && (
              <p className="text-teal-100 text-sm mt-1">
                {profile.department} • {profile.year_of_study}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-teal-100">Member since</p>
            <p className="text-sm font-medium">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('booking')}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-teal-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sessions Attended</p>
              <p className="text-2xl font-bold text-teal-600">
                {appointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-teal-600" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('resources')}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resources Accessed</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(Math.random() * 50) + 15}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('forum')}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-purple-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Community Posts</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.floor(Math.random() * 20) + 3}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('challenges')}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-green-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wellness Score</p>
              <p className="text-2xl font-bold text-green-600">
                {wellnessRating ? `${wellnessRating}/4` : 'N/A'}
              </p>
            </div>
            <Heart className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">AI Support Chat</h3>
          </div>
          <p className="text-gray-600 mb-4 flex-grow">Get immediate coping strategies and emotional support</p>
          <button 
            onClick={() => setActiveTab('chat')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-auto"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Book Counseling</h3>
          </div>
          <p className="text-gray-600 mb-4 flex-grow">Schedule a confidential session with our counselors</p>
          <button 
            onClick={() => setActiveTab('booking')}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors mt-auto"
          >
            Book Session
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-purple-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Peer Support</h3>
          </div>
          <p className="text-gray-600 mb-4 flex-grow">Connect with fellow students in a safe space</p>
          <button 
            onClick={() => setActiveTab('forum')}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors mt-auto"
          >
            Join Community
          </button>
        </div>
      </div>

      {/* Wellness Check */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 text-red-500" />
          <h3 className="ml-2 text-lg font-semibold text-gray-900">Daily Wellness Check</h3>
        </div>
        <p className="text-gray-600 mb-4">How are you feeling today? Your input helps us provide better support.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleWellnessCheck(4)}
            className={`flex flex-col items-center p-4 border rounded-md hover:border-green-400 hover:bg-green-50 transition-colors ${
              wellnessRating === 4 ? 'border-green-400 bg-green-50' : 'border-gray-300'
            }`}
          >
            <span className="text-2xl mb-2">😊</span>
            <span className="text-sm text-gray-700">Great</span>
          </button>
          <button 
            onClick={() => handleWellnessCheck(3)}
            className={`flex flex-col items-center p-4 border rounded-md hover:border-blue-400 hover:bg-blue-50 transition-colors ${
              wellnessRating === 3 ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <span className="text-2xl mb-2">🙂</span>
            <span className="text-sm text-gray-700">Good</span>
          </button>
          <button 
            onClick={() => handleWellnessCheck(2)}
            className={`flex flex-col items-center p-4 border rounded-md hover:border-yellow-400 hover:bg-yellow-50 transition-colors ${
              wellnessRating === 2 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'
            }`}
          >
            <span className="text-2xl mb-2">😐</span>
            <span className="text-sm text-gray-700">Okay</span>
          </button>
          <button 
            onClick={() => handleWellnessCheck(1)}
            className={`flex flex-col items-center p-4 border rounded-md hover:border-red-400 hover:bg-red-50 transition-colors ${
              wellnessRating === 1 ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
          >
            <span className="text-2xl mb-2">😔</span>
            <span className="text-sm text-gray-700">Struggling</span>
          </button>
        </div>
        {wellnessRating && wellnessRating <= 2 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-orange-800 text-sm">
              We notice you're having a tough time. Consider reaching out to a counselor or using our crisis support resources.
            </p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
          {loadingAppointments ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              <span className="ml-2 text-gray-600">Loading appointments...</span>
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.type === 'individual' ? 'Individual Counseling' : 'Group Session'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(appointment.scheduled_at).toLocaleDateString()} at{' '}
                      {new Date(appointment.scheduled_at).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-green-600">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.duration}min
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-2">No upcoming sessions</p>
              <button 
                onClick={() => setActiveTab('booking')}
                className="text-teal-600 text-sm hover:text-teal-700 font-medium"
              >
                Schedule a session
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Resources</h3>
          <div className="space-y-3">
            {featuredResources.map((resource) => (
              <div 
                key={resource.id} 
                onClick={() => setActiveTab('resources')}
                className="flex items-center p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">
                    {resource.type === 'video' ? '▶' : resource.type === 'audio' ? '🎵' : '📄'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{resource.title}</p>
                  <p className="text-xs text-gray-500">{resource.category} • {resource.language}</p>
                </div>
              </div>
            ))}
            {featuredResources.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">Loading resources...</p>
              </div>
            )}
            {featuredResources.length > 0 && (
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="text-teal-600 text-sm hover:text-teal-700 font-medium"
                >
                  View All Resources →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Crisis Help */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h3 className="ml-2 text-lg font-semibold text-red-900">Need Immediate Help?</h3>
        </div>
        <p className="text-red-800 mb-4">
          If you're in crisis or having thoughts of self-harm, please reach out for immediate support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href="tel:1800-xxx-xxxx"
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-center"
          >
            Crisis Helpline: 1800-XXX-XXXX
          </a>
          <button 
            onClick={() => setActiveTab('crisis')}
            className="border border-red-600 text-red-600 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
          >
            Emergency Chat Support
          </button>
        </div>
      </div>

      {/* Admin Analytics Preview */}
      {(user?.role === 'admin' || user?.role === 'counselor') && analytics && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Analytics Overview</h3>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="text-teal-600 text-sm hover:text-teal-700 font-medium"
            >
              View Full Analytics →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('analytics')}
              className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-2xl font-bold text-teal-600">{analytics.total_users}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div 
              onClick={() => setActiveTab('analytics')}
              className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-2xl font-bold text-blue-600">{analytics.active_sessions}</p>
              <p className="text-sm text-gray-600">Active Sessions</p>
            </div>
            <div 
              onClick={() => setActiveTab('analytics')}
              className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-2xl font-bold text-orange-600">{analytics.crisis_interventions}</p>
              <p className="text-sm text-gray-600">Crisis Interventions</p>
            </div>
            <div 
              onClick={() => setActiveTab('analytics')}
              className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p className="text-2xl font-bold text-purple-600">{analytics.forum_posts}</p>
              <p className="text-sm text-gray-600">Forum Posts</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}