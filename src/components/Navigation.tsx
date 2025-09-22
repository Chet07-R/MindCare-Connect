import { useState, useEffect } from 'react';
import { Heart, MessageSquare, Calendar, BookOpen, Users, BarChart3, Phone, User, ChevronDown, LogOut, Moon, Sun, Star, FileText, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: string;
}

export default function Navigation({ activeTab, setActiveTab, userRole }: NavigationProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout, user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Primary navigation items (most important)
  const primaryMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Heart },
    { id: 'chat', label: 'AI Support', icon: MessageSquare },
    { id: 'booking', label: 'Book Session', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'crisis', label: 'Crisis Help', icon: Phone },
  ];

  // Secondary navigation items (grouped under "More")
  const secondaryMenuItems = [
    { id: 'testimonials', label: 'Success Stories', icon: Star },
    { id: 'blog', label: 'Mental Health Tips', icon: FileText },
    { id: 'challenges', label: 'Wellness Challenges', icon: Target },
    { id: 'forum', label: 'Peer Support', icon: Users },
  ];

  // Add admin/counselor items to secondary menu
  if (userRole === 'admin' || userRole === 'counselor') {
    secondaryMenuItems.push({ id: 'analytics', label: 'Analytics', icon: BarChart3 });
  }

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowMoreMenu(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-dark-900 shadow-sm border-b border-gray-200 dark:border-dark-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-teal-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">MindCare Connect</h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Primary Navigation Menu */}
            {primaryMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden sr-only">{item.label}</span>
                </button>
              );
            })}

            {/* More Menu Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  secondaryMenuItems.some(item => item.id === activeTab)
                    ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800'
                }`}
              >
                <span className="hidden xl:inline mr-1">More</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  {secondaryMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setShowMoreMenu(false);
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors ${
                          activeTab === item.id
                            ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-10 h-10 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            <div className="relative ml-3 dropdown-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              >
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="hidden md:block">
                  {user?.profile?.full_name || user?.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user?.profile?.full_name || 'Student User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay to close menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
}