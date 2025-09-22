import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import BookingSystem from './components/BookingSystem';
import Resources from './components/Resources';
import PeerSupport from './components/PeerSupport';
import CrisisHelp from './components/CrisisHelp';
import Analytics from './components/Analytics';
import UserProfile from './components/UserProfile';
import TestimonialsAndStories from './components/TestimonialsAndStories';
import MentalHealthBlog from './components/MentalHealthBlog';
import WellnessChallenges from './components/WellnessChallenges';
import AuthModal from './components/auth/AuthModal';

function AppContent() {
  const { isAuthenticated, user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'chat': return <AIChat />;
      case 'booking': return <BookingSystem />;
      case 'resources': return <Resources />;
      case 'testimonials': return <TestimonialsAndStories />;
      case 'blog': return <MentalHealthBlog />;
      case 'challenges': return <WellnessChallenges />;
      case 'forum': return <PeerSupport />;
      case 'crisis': return <CrisisHelp />;
      case 'analytics': return <Analytics />;
      case 'profile': return <UserProfile />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading MindCare Connect...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-dark-900 dark:to-dark-800 transition-colors">
        {/* Landing Page Header */}
        <nav className="bg-white dark:bg-dark-900 shadow-sm border-b border-gray-200 dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MC</span>
                  </div>
                  <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">MindCare Connect</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Mental Health{' '}
              <span className="text-teal-600 block">Matters</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Access confidential mental health support, professional counseling, peer communities, 
              and wellness resources designed specifically for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleAuthClick('register')}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => handleAuthClick('login')}
                className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-teal-50 transition-colors"
              >
                I Have an Account
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-dark-800 py-20 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Comprehensive Mental Health Support
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Everything you need for your mental wellness journey in one secure platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-600 dark:text-teal-400 text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">24/7 AI Support</h3>
                <p className="text-gray-600 dark:text-gray-300">Get immediate emotional support and coping strategies any time of day</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Professional Counseling</h3>
                <p className="text-gray-600 dark:text-gray-300">Book confidential sessions with licensed mental health professionals</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Peer Community</h3>
                <p className="text-gray-600 dark:text-gray-300">Connect with fellow students in moderated support groups</p>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Section */}
        <div className="bg-red-50 dark:bg-red-900/20 py-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-4">Need Immediate Help?</h2>
            <p className="text-red-800 dark:text-red-200 mb-6">
              If you're in crisis or having thoughts of self-harm, help is available right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800-xxx-xxxx"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Call Crisis Helpline: 1800-XXX-XXXX
              </a>
              <button className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Emergency Chat Support
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-semibold mb-4">MindCare Connect</h3>
            <p className="text-gray-400 mb-4">
              Digital Psychological Intervention System
            </p>
            <p className="text-gray-400 text-sm">
              Confidential • Secure • Available 24/7
            </p>
          </div>
        </footer>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode={authMode}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        userRole={user?.role}
      />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderActiveComponent()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              MindCare Connect - Digital Psychological Intervention System
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
              Confidential • Secure • Available 24/7
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Crisis Helpline: 1800-XXX-XXXX | Emergency: 911
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;