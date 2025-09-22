import { useState } from 'react';
import { Heart, Calendar, MessageSquare, Users, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ setActiveTab }: DashboardProps) {
  const { user, profile } = useAuth();
  const { appointments, analytics } = useData();
  const [wellnessRating, setWellnessRating] = useState<number | null>(null);

  const handleWellnessCheck = (rating: number) => {
    setWellnessRating(rating);
    console.log('Wellness rating saved:', rating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Welcome Section */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <div className="w-1 h-10 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full mr-4 animate-pulse"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-3">
              Your mental wellness dashboard. Here's how you're doing today.
            </p>
            {profile?.department && (
              <div className="flex space-x-3 animate-slide-up">
                <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105">
                  {profile.department}
                </span>
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                  {profile.year_of_study}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => setActiveTab('booking')}
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-teal-500/20 rounded-xl blur-lg group-hover:bg-teal-500/40 transition-all duration-500"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors duration-300">
                  {appointments.filter(apt => apt.status === 'completed').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Sessions</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          <div 
            onClick={() => setActiveTab('resources')}
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:bg-blue-500/40 transition-all duration-500"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                  {Math.floor(Math.random() * 50) + 15}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Resources</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          <div 
            onClick={() => setActiveTab('forum')}
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-lg group-hover:bg-purple-500/40 transition-all duration-500"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">
                  {Math.floor(Math.random() * 20) + 3}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Community</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>

          <div 
            onClick={() => setActiveTab('challenges')}
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-lg group-hover:bg-green-500/40 transition-all duration-500"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors duration-300">
                  {wellnessRating || 'N/A'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Wellness</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            
            <div className="relative z-10 p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg group-hover:bg-blue-500/50 transition-all duration-500"></div>
                  <div className="relative p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">AI Support Chat</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Available 24/7</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow text-lg mb-6">
                Get instant emotional support and personalized coping strategies from our advanced AI companion.
              </p>
              
              <button 
                onClick={() => setActiveTab('chat')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700"
              >
                Start Conversation 💬
              </button>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-teal-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-500/30 rounded-xl blur-lg group-hover:bg-teal-500/50 transition-all duration-500"></div>
                  <div className="relative p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors duration-300">Book Counseling</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Next: Today 2PM</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow text-lg mb-6">
                Schedule confidential sessions with licensed mental health professionals and expert counselors.
              </p>
              
              <button 
                onClick={() => setActiveTab('booking')}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-teal-500/25 transform hover:scale-105 transition-all duration-300 group-hover:from-teal-600 group-hover:to-emerald-700"
              >
                Schedule Session 📅
              </button>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/30 rounded-xl blur-lg group-hover:bg-purple-500/50 transition-all duration-500"></div>
                  <div className="relative p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">Peer Support</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">124 students online</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow text-lg mb-6">
                Connect with fellow students in moderated support groups and share your wellness journey.</p>
              
              <button 
                onClick={() => setActiveTab('forum')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-700"
              >
                Join Community 🤝
              </button>
            </div>
          </div>
        </div>

        {/* Wellness Check */}
        <div className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-orange-500/5 to-yellow-500/5"></div>
          
          <div className="relative z-10 p-8">
            <div className="flex items-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/30 rounded-xl blur-lg"></div>
                <div className="relative p-4 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Wellness Check</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Track your emotional state and get personalized support</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              How are you feeling today? Your input helps us provide better support and personalized recommendations.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <button 
                onClick={() => handleWellnessCheck(4)}
                className={`group relative overflow-hidden p-6 border-2 rounded-2xl transition-all duration-500 hover:scale-105 ${
                  wellnessRating === 4 
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-lg shadow-green-500/25' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">😊</div>
                  <div className="text-center">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">Excellent</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Feeling amazing!</p>
                  </div>
                  {wellnessRating === 4 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => handleWellnessCheck(3)}
                className={`group relative overflow-hidden p-6 border-2 rounded-2xl transition-all duration-500 hover:scale-105 ${
                  wellnessRating === 3 
                    ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-lg shadow-blue-500/25' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🙂</div>
                  <div className="text-center">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">Good</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pretty well</p>
                  </div>
                  {wellnessRating === 3 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => handleWellnessCheck(2)}
                className={`group relative overflow-hidden p-6 border-2 rounded-2xl transition-all duration-500 hover:scale-105 ${
                  wellnessRating === 2 
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 shadow-lg shadow-yellow-500/25' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">😐</div>
                  <div className="text-center">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">Okay</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Managing</p>
                  </div>
                  {wellnessRating === 2 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => handleWellnessCheck(1)}
                className={`group relative overflow-hidden p-6 border-2 rounded-2xl transition-all duration-500 hover:scale-105 ${
                  wellnessRating === 1 
                    ? 'border-red-400 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 shadow-lg shadow-red-500/25' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">😔</div>
                  <div className="text-center">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">Struggling</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Need support</p>
                  </div>
                  {wellnessRating === 1 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
            
            {wellnessRating && wellnessRating <= 2 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/50 rounded-2xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-orange-500 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-200 text-lg mb-2">We're here to help</h4>
                    <p className="text-orange-800 dark:text-orange-200 leading-relaxed mb-4">
                      We notice you're having a tough time. You're not alone in this journey. Consider reaching out to a counselor or using our crisis support resources.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => setActiveTab('crisis')}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                      >
                        Get Immediate Help
                      </button>
                      <button 
                        onClick={() => setActiveTab('booking')}
                        className="bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-lg border border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        Schedule Counseling
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {wellnessRating && wellnessRating >= 3 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-200 text-lg">Great to hear!</h4>
                    <p className="text-green-800 dark:text-green-200">Keep up the positive momentum. Consider exploring our wellness challenges to maintain your good mood.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Crisis Help */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-red-500 rounded-xl shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-200">Need Immediate Help?</h3>
              <p className="text-red-700 dark:text-red-300">Crisis support available 24/7</p>
            </div>
          </div>
          <p className="text-red-800 dark:text-red-200 mb-6 text-lg leading-relaxed">
            If you're in crisis or having thoughts of self-harm, please reach out for immediate support. You are not alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:1800-xxx-xxxx"
              className="bg-red-600 text-white py-4 px-6 rounded-2xl hover:bg-red-700 transition-colors text-center font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
            >
              Crisis Helpline: 1800-XXX-XXXX
            </a>
            <button 
              onClick={() => setActiveTab('crisis')}
              className="border-2 border-red-600 text-red-600 dark:text-red-400 py-4 px-6 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-semibold text-lg"
            >
              Emergency Chat Support
            </button>
          </div>
        </div>

        {/* Admin Analytics Preview */}
        {(user?.role === 'admin' || user?.role === 'counselor') && analytics && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Analytics Overview</h3>
              <button 
                onClick={() => setActiveTab('analytics')}
                className="text-teal-600 dark:text-teal-400 text-sm hover:text-teal-700 dark:hover:text-teal-300 font-medium"
              >
                View Full Analytics →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                onClick={() => setActiveTab('analytics')}
                className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <p className="text-2xl font-bold text-teal-600">{analytics.total_users}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
              </div>
              <div 
                onClick={() => setActiveTab('analytics')}
                className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <p className="text-2xl font-bold text-blue-600">{analytics.active_sessions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Active Sessions</p>
              </div>
              <div 
                onClick={() => setActiveTab('analytics')}
                className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <p className="text-2xl font-bold text-orange-600">{analytics.crisis_interventions}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Crisis Interventions</p>
              </div>
              <div 
                onClick={() => setActiveTab('analytics')}
                className="text-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <p className="text-2xl font-bold text-purple-600">{analytics.forum_posts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Forum Posts</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}