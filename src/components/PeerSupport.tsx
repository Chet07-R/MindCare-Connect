import React, { useState } from 'react';
import { MessageCircle, Users, Plus, Heart, Reply, Flag, Lock } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Peer Support Community</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Connect with fellow students in a safe, moderated environment. Share experiences, 
          get support, and help others on their mental health journey.
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Lock className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-800">Privacy & Safety</h3>
            <p className="text-sm text-yellow-700 mt-1">
              All posts are moderated by trained volunteers. You can post anonymously. 
              Personal information should never be shared in public posts.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'posts'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageCircle className="h-4 w-4 inline mr-2" />
            Community Posts
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'groups'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Support Groups
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Plus className="h-4 w-4 inline mr-2" />
            New Post
          </button>
        </nav>
      </div>

      {/* Community Posts */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {post.isAnonymous ? '?' : post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <span className="inline-block bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      className={`flex items-center space-x-1 text-sm ${
                        post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                      } transition-colors`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                      <Reply className="h-4 w-4" />
                      <span>{post.replies} replies</span>
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Flag className="h-4 w-4" />
                  </button>
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
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                    {group.isActive && (
                      <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{group.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {group.members} members
                    </span>
                    <span>Next meeting: {group.nextMeeting}</span>
                  </div>
                </div>
                <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                  Join Group
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Post */}
      {activeTab === 'create' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h3>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="What would you like to discuss?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select a category</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Share your thoughts, experiences, or questions. Remember to be respectful and supportive."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add relevant tags separated by commas (e.g., stress, anxiety, support)"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Post anonymously
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
              >
                Post Message
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}