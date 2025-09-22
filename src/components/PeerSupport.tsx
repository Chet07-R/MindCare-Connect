import { useState } from 'react';
import { MessageCircle, Users, Plus, Heart, Reply, Flag, Lock, Calendar } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  timestamp: string;
  category: string;
  replies: number;
  likes: number;
  isLiked: boolean;
  tags: string[];
}

export default function PeerSupport() {
  const [activeTab, setActiveTab] = useState<'posts' | 'groups' | 'create'>('posts');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Dealing with exam anxiety - anyone else struggling?',
      content: 'Finals are approaching and I\'m feeling overwhelmed. The pressure is getting to me and I can\'t seem to focus. Any tips from fellow students?',
      author: 'Anonymous',
      isAnonymous: true,
      timestamp: '2 hours ago',
      category: 'Academic Stress',
      replies: 12,
      likes: 15,
      isLiked: false,
      tags: ['anxiety', 'exams', 'study-tips']
    },
    {
      id: '2',
      title: 'Building healthy relationships in college',
      content: 'I\'ve been having trouble connecting with people since starting college. It feels like everyone already has their friend groups. How do you make genuine connections?',
      author: 'Student_2024',
      isAnonymous: false,
      timestamp: '4 hours ago',
      category: 'Social & Relationships',
      replies: 8,
      likes: 23,
      isLiked: true,
      tags: ['friendship', 'social-skills', 'college-life']
    },
    {
      id: '3',
      title: 'Coping with homesickness',
      content: 'This is my first year away from home and I\'m really missing my family. The feeling hits especially hard during weekends. Any advice on managing this?',
      author: 'Anonymous',
      isAnonymous: true,
      timestamp: '6 hours ago',
      category: 'Emotional Support',
      replies: 18,
      likes: 31,
      isLiked: false,
      tags: ['homesickness', 'family', 'adjustment']
    }
  ];

  const categories = ['all', 'Academic Stress', 'Social & Relationships', 'Emotional Support', 'Self-Care', 'Life Transitions'];

  const supportGroups = [
    {
      id: '1',
      name: 'Exam Stress Support Circle',
      description: 'A safe space for students dealing with academic pressure and test anxiety',
      members: 45,
      isActive: true,
      nextMeeting: '2024-01-22 at 6:00 PM'
    },
    {
      id: '2',
      name: 'International Students Connect',
      description: 'Support group for international students navigating cultural adjustment',
      members: 28,
      isActive: true,
      nextMeeting: '2024-01-24 at 4:00 PM'
    },
    {
      id: '3',
      name: 'Mindfulness & Meditation Group',
      description: 'Practice mindfulness together and share wellness strategies',
      members: 67,
      isActive: true,
      nextMeeting: '2024-01-25 at 7:00 PM'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="w-1 h-10 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full mr-4 animate-pulse"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
                Peer Support Community
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-3xl mx-auto">
              Connect with fellow students in a safe, moderated environment. Share experiences, 
              get support, and help others on their mental health journey.
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="group relative overflow-hidden bg-gradient-to-r from-yellow-50/90 to-amber-50/90 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-200/60 dark:border-yellow-800/60 rounded-2xl p-4 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-start">
            <div className="flex-shrink-0 p-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Privacy & Safety</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 leading-relaxed">
                All posts are moderated by trained volunteers. You can post anonymously. 
                Personal information should never be shared in public posts.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 border-b border-gray-200/50 dark:border-gray-700/50">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 flex items-center ${
                  activeTab === 'posts'
                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="p-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded mr-2">
                  <MessageCircle className="h-3 w-3 text-white" />
                </div>
                Community Posts
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 flex items-center ${
                  activeTab === 'groups'
                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="p-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded mr-2">
                  <Users className="h-3 w-3 text-white" />
                </div>
                Support Groups
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 flex items-center ${
                  activeTab === 'create'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="p-1 bg-gradient-to-r from-green-500 to-green-600 rounded mr-2">
                <Plus className="h-3 w-3 text-white" />
              </div>
              New Post
            </button>
          </nav>
        </div>

        {/* Community Posts */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-3 py-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-xl"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-medium text-sm">
                            {post.isAnonymous ? '?' : post.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                        </div>
                      </div>
                      <span className="inline-block bg-gradient-to-r from-teal-100 to-teal-200 dark:from-teal-900/40 dark:to-teal-800/40 text-teal-700 dark:text-teal-300 text-xs px-3 py-1 rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/50 dark:to-gray-600/50 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full shadow-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-4">
                        <button
                          className={`flex items-center space-x-1 text-sm transition-all duration-300 hover:scale-105 ${
                            post.isLiked ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                          }`}
                        >
                          <div className="p-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                            <Heart className={`h-3 w-3 text-white ${post.isLiked ? 'fill-current' : ''}`} />
                          </div>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
                          <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                            <Reply className="h-3 w-3 text-white" />
                          </div>
                          <span>{post.replies} replies</span>
                        </button>
                      </div>
                      <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors hover:scale-110 duration-300">
                        <Flag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Support Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          {supportGroups.map((group) => (
            <div key={group.id} className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mr-3 shadow-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                      {group.isActive && (
                        <span className="ml-3 flex items-center">
                          <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{group.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="flex items-center text-gray-500 dark:text-gray-400">
                        <div className="p-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded mr-2">
                          <Users className="h-3 w-3 text-white" />
                        </div>
                        {group.members} members
                      </span>
                      <span className="flex items-center text-gray-500 dark:text-gray-400">
                        <div className="p-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded mr-2">
                          <Calendar className="h-3 w-3 text-white" />
                        </div>
                        Next: {group.nextMeeting}
                      </span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Post */}
      {activeTab === 'create' && (
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mr-4 shadow-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Share Your Experience</h3>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg">
                  <option value="">Select a category</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg resize-none"
                  placeholder="Share your thoughts, experiences, or questions. Remember to be respectful and supportive."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (optional)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg"
                  placeholder="Add relevant tags separated by commas (e.g., stress, anxiety, support)"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Post anonymously
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Post Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}