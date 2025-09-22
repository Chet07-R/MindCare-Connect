import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MessageSquare, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ setActiveTab }: DashboardProps) {
  const { user, profile } = useAuth();
  const { appointments, resources } = useData();
  const [wellnessRating, setWellnessRating] = useState<number | null>(null);

  const handleWellnessCheck = (rating: number) => {
    setWellnessRating(rating);
    console.log('Wellness rating saved:', rating);
  };

  const upcomingAppointments = appointments
    .filter(
      (apt) =>
        new Date(apt.scheduled_at) > new Date() && apt.status === 'scheduled'
    )
    .slice(0, 3);

  const featuredResources = resources.slice(0, 3);

  /** Animation variants **/
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, type: 'spring' },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your mental wellness dashboard. Here's how you're doing today.
          </p>
          {profile?.department && (
            <div className="mt-3 flex space-x-2">
              <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm">
                {profile.department}
              </span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                {profile.year_of_study}
              </span>
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Calendar className="h-8 w-8 text-teal-600" />,
              label: 'Sessions',
              value: appointments.filter((apt) => apt.status === 'completed')
                .length,
              tab: 'booking',
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
              label: 'Resources',
              value: Math.floor(Math.random() * 50) + 15,
              tab: 'resources',
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              label: 'Community',
              value: Math.floor(Math.random() * 20) + 3,
              tab: 'forum',
            },
            {
              icon: <Heart className="h-8 w-8 text-green-600" />,
              label: 'Wellness',
              value: wellnessRating || 'N/A',
              tab: 'challenges',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => setActiveTab(stat.tab)}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
              ),
              title: 'AI Support Chat',
              desc: 'Get instant support and guidance from our AI companion.',
              tab: 'chat',
              color: 'bg-blue-600 hover:bg-blue-700',
            },
            {
              icon: <Calendar className="h-6 w-6 text-teal-600 mr-3" />,
              title: 'Book Counseling',
              desc: 'Schedule a session with professional counselors.',
              tab: 'booking',
              color: 'bg-teal-600 hover:bg-teal-700',
            },
            {
              icon: <Users className="h-6 w-6 text-purple-600 mr-3" />,
              title: 'Peer Support',
              desc: 'Connect with fellow students in support groups.',
              tab: 'forum',
              color: 'bg-purple-600 hover:bg-purple-700',
            },
          ].map((action, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                {action.icon}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {action.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {action.desc}
              </p>
              <button
                onClick={() => setActiveTab(action.tab)}
                className={`w-full ${action.color} text-white py-2 px-4 rounded-lg transition-colors`}
              >
                {action.tab === 'chat'
                  ? 'Start Chat'
                  : action.tab === 'booking'
                  ? 'Book Session'
                  : 'Join Community'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Daily Wellness Check */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily Wellness Check
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            How are you feeling today? Rate your wellness:
          </p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWellnessCheck(rating)}
                className={`px-4 py-2 rounded-lg ${
                  wellnessRating === rating
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {rating}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
