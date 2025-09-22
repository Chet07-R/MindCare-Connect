import { useState } from 'react';
import { Calendar, Clock, Heart, Bookmark, Eye, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  featured: boolean;
}

export default function MentalHealthBlog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '5 Scientifically-Proven Techniques to Reduce Exam Anxiety',
      excerpt: 'Discover evidence-based strategies that can help you manage pre-exam stress and perform at your best when it matters most.',
      content: 'Full article content would go here...',
      author: {
        name: 'Dr. Priya Sharma',
        role: 'Clinical Psychologist',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face&auto=format'
      },
      publishedAt: '2025-09-20',
      readTime: 6,
      category: 'Academic Stress',
      tags: ['anxiety', 'exams', 'study tips', 'breathing exercises'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format',
      views: 2847,
      likes: 234,
      featured: true
    },
    {
      id: '2',
      title: 'The Hidden Signs of Depression in College Students',
      excerpt: 'Learn to recognize the subtle symptoms of depression that often go unnoticed in academic settings.',
      content: 'Full article content would go here...',
      author: {
        name: 'Dr. Rahul Kumar',
        role: 'Psychiatrist',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face&auto=format'
      },
      publishedAt: '2025-09-18',
      readTime: 8,
      category: 'Mental Health Awareness',
      tags: ['depression', 'symptoms', 'college life', 'awareness'],
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop&auto=format',
      views: 1923,
      likes: 187,
      featured: true
    },
    {
      id: '3',
      title: 'Building Resilience: A Student\'s Guide to Bouncing Back',
      excerpt: 'Practical strategies to develop emotional resilience and cope with life\'s challenges more effectively.',
      content: 'Full article content would go here...',
      author: {
        name: 'Dr. Aisha Patel',
        role: 'Counseling Psychologist',
        image: 'https://images.unsplash.com/photo-1594824947020-d29f7a6c11d2?w=150&h=150&fit=crop&crop=face&auto=format'
      },
      publishedAt: '2025-09-15',
      readTime: 7,
      category: 'Personal Development',
      tags: ['resilience', 'coping skills', 'emotional intelligence'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format',
      views: 1654,
      likes: 142,
      featured: false
    },
    {
      id: '4',
      title: 'Sleep Hygiene for Students: Why Your Sleep Schedule Matters',
      excerpt: 'Understanding the crucial connection between quality sleep and mental health, with practical tips for better rest.',
      content: 'Full article content would go here...',
      author: {
        name: 'Dr. Vikram Singh',
        role: 'Sleep Specialist',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face&auto=format'
      },
      publishedAt: '2025-09-12',
      readTime: 5,
      category: 'Wellness',
      tags: ['sleep', 'health', 'routine', 'productivity'],
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop&auto=format',
      views: 2156,
      likes: 201,
      featured: false
    },
    {
      id: '5',
      title: 'Social Anxiety in University: Finding Your Tribe',
      excerpt: 'Navigate social situations with confidence and build meaningful connections during your university years.',
      content: 'Full article content would go here...',
      author: {
        name: 'Dr. Sneha Reddy',
        role: 'Social Psychologist',
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face&auto=format'
      },
      publishedAt: '2025-09-10',
      readTime: 6,
      category: 'Social Skills',
      tags: ['social anxiety', 'friendships', 'communication', 'confidence'],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop&auto=format',
      views: 1789,
      likes: 156,
      featured: false
    },
    {
      id: '6',
      title: 'Mindfulness Meditation for Beginners: A Student\'s Journey',
      excerpt: 'Start your mindfulness practice with simple, effective techniques designed specifically for busy student life.',
      content: 'Full article content would go here...',
      author: {
        name: 'Dr. Arjun Gupta',
        role: 'Mindfulness Instructor',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format'
      },
      publishedAt: '2025-09-08',
      readTime: 9,
      category: 'Mindfulness',
      tags: ['meditation', 'mindfulness', 'stress relief', 'focus'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
      views: 2034,
      likes: 189,
      featured: true
    }
  ];

  const categories = [
    'all',
    'Academic Stress',
    'Mental Health Awareness',
    'Personal Development',
    'Wellness',
    'Social Skills',
    'Mindfulness'
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Mental Health Insights
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Expert advice, research-backed strategies, and practical tips to support your mental wellness journey.
          Written by licensed professionals specifically for students.
        </p>
      </div>

      {/* Featured Posts Carousel */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Articles</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredPosts.slice(0, 2).map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      likedPosts.has(post.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      bookmarkedPosts.has(post.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-sm">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime} min read
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {post.author.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
            }`}
          >
            {category === 'all' ? 'All Articles' : category}
          </button>
        ))}
      </div>

      {/* Main Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group"
          >
            <div className="relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 dark:bg-dark-800/90 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime} min
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-dark-700">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author.name}
                  </span>
                </div>
                
                <button className="text-teal-600 hover:text-teal-700 transition-colors flex items-center text-sm font-medium">
                  Read More
                  <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-700 dark:to-teal-700 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Stay Updated with Mental Health Tips</h3>
        <p className="text-lg mb-6 opacity-90">
          Get weekly insights, practical strategies, and the latest research delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}