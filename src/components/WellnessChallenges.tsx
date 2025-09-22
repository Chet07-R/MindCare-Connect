import { useState } from 'react';
import { Trophy, Target, Users, CheckCircle, Star, Play } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'mindfulness' | 'exercise' | 'social' | 'academic' | 'self-care';
  participants: number;
  completionRate: number;
  rewards: string[];
  dailyTasks: string[];
  image: string;
  status: 'available' | 'in-progress' | 'completed';
  progress?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function WellnessChallenges() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '7-Day Mindfulness Journey',
      description: 'Start your mindfulness practice with daily 10-minute guided meditations designed specifically for students.',
      duration: '7 days',
      difficulty: 'beginner',
      category: 'mindfulness',
      participants: 2847,
      completionRate: 78,
      rewards: ['Mindful Student Badge', '100 Wellness Points', 'Meditation Timer Unlock'],
      dailyTasks: [
        'Complete 10-minute morning meditation',
        'Practice mindful breathing during study breaks',
        'Write down 3 things you\'re grateful for',
        'Do a body scan before bed'
      ],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
      status: 'available'
    },
    {
      id: '2',
      title: 'Stress-Free Study Week',
      description: 'Learn effective study techniques and stress management strategies to boost your academic performance.',
      duration: '7 days',
      difficulty: 'intermediate',
      category: 'academic',
      participants: 1923,
      completionRate: 82,
      rewards: ['Study Master Badge', '150 Wellness Points', 'Focus Timer Feature'],
      dailyTasks: [
        'Use Pomodoro technique for 2 hours',
        'Take 5-minute breaks every 25 minutes',
        'Practice active recall methods',
        'Review material before sleeping'
      ],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format',
      status: 'in-progress',
      progress: 65
    },
    {
      id: '3',
      title: 'Social Connection Challenge',
      description: 'Build meaningful relationships and overcome social anxiety with daily social activities.',
      duration: '14 days',
      difficulty: 'intermediate',
      category: 'social',
      participants: 1156,
      completionRate: 71,
      rewards: ['Social Butterfly Badge', '200 Wellness Points', 'Group Chat Access'],
      dailyTasks: [
        'Start a conversation with a classmate',
        'Join a study group or activity',
        'Practice active listening',
        'Share something positive with someone'
      ],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format',
      status: 'available'
    },
    {
      id: '4',
      title: 'Self-Care Sunday Series',
      description: 'Dedicate time each week to activities that nurture your mental and physical well-being.',
      duration: '4 weeks',
      difficulty: 'beginner',
      category: 'self-care',
      participants: 3421,
      completionRate: 85,
      rewards: ['Self-Care Champion Badge', '120 Wellness Points', 'Wellness Tracker'],
      dailyTasks: [
        'Take a relaxing bath or shower',
        'Do something creative for 30 minutes',
        'Spend time in nature',
        'Practice skincare routine mindfully'
      ],
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&auto=format',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Move Your Mood',
      description: 'Discover how physical activity can boost your mental health with fun, student-friendly exercises.',
      duration: '10 days',
      difficulty: 'beginner',
      category: 'exercise',
      participants: 2234,
      completionRate: 76,
      rewards: ['Fitness Enthusiast Badge', '180 Wellness Points', 'Workout Playlist'],
      dailyTasks: [
        'Take a 15-minute walk',
        'Do 5 minutes of stretching',
        'Try a new physical activity',
        'Dance to your favorite song'
      ],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
      status: 'available'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first wellness challenge',
      icon: '🎯',
      unlockedAt: '2025-09-15',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Mindful Master',
      description: 'Completed 5 mindfulness challenges',
      icon: '🧘',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Social Connector',
      description: 'Helped 10 peers in challenges',
      icon: '🤝',
      unlockedAt: '2025-09-10',
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Wellness Warrior',
      description: 'Completed challenges for 30 consecutive days',
      icon: '⚔️',
      rarity: 'legendary'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Challenges', color: 'bg-gray-500' },
    { value: 'mindfulness', label: 'Mindfulness', color: 'bg-purple-500' },
    { value: 'academic', label: 'Academic', color: 'bg-blue-500' },
    { value: 'social', label: 'Social', color: 'bg-green-500' },
    { value: 'exercise', label: 'Exercise', color: 'bg-red-500' },
    { value: 'self-care', label: 'Self-Care', color: 'bg-pink-500' }
  ];

  const filteredChallenges = selectedCategory === 'all'
    ? challenges
    : challenges.filter(challenge => challenge.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50 dark:bg-gray-900';
      case 'rare': return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'epic': return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'legendary': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-gray-400 bg-gray-50 dark:bg-gray-900';
    }
  };

  const joinChallenge = (challengeId: string) => {
    // In a real app, this would make an API call
    console.log('Joining challenge:', challengeId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Wellness Challenges
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Join thousands of students in fun, evidence-based wellness challenges. 
          Build healthy habits, earn rewards, and transform your mental health journey.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 text-center">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 text-center">
          <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 text-center">
          <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">2,450</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Points Earned</div>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 text-center">
          <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">127</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Challenge Buddies</div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)} ${
                achievement.unlockedAt ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {achievement.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {achievement.description}
                </p>
                {achievement.unlockedAt && (
                  <div className="mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
              selectedCategory === category.value
                ? `${category.color} text-white shadow-md`
                : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className="bg-white/90 dark:bg-dark-800/90 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                  {challenge.duration}
                </span>
              </div>
              {challenge.status === 'in-progress' && challenge.progress && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 dark:bg-dark-800/90 rounded-full p-2">
                    <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {challenge.status === 'completed' && (
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white p-2 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {challenge.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                {challenge.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {challenge.participants.toLocaleString()} participants
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    {challenge.completionRate}% completion
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Daily Tasks:</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {challenge.dailyTasks.slice(0, 2).map((task, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                    {challenge.dailyTasks.length > 2 && (
                      <li className="text-teal-600 dark:text-teal-400">
                        +{challenge.dailyTasks.length - 2} more tasks
                      </li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Rewards:</h4>
                  <div className="flex flex-wrap gap-1">
                    {challenge.rewards.slice(0, 2).map((reward, index) => (
                      <span
                        key={index}
                        className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-2 py-1 rounded text-xs"
                      >
                        {reward}
                      </span>
                    ))}
                    {challenge.rewards.length > 2 && (
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs">
                        +{challenge.rewards.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => joinChallenge(challenge.id)}
                disabled={challenge.status === 'completed'}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  challenge.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 cursor-not-allowed'
                    : challenge.status === 'in-progress'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {challenge.status === 'completed' ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : challenge.status === 'in-progress' ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continue Challenge
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Join Challenge
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Custom Challenge */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Create Your Own Challenge</h3>
        <p className="text-lg mb-6 opacity-90">
          Have a unique wellness goal? Design a personalized challenge and invite friends to join you!
        </p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Design Challenge
        </button>
      </div>
    </div>
  );
}