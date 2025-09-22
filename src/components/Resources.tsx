import React, { useState } from 'react';
import { 
  Book, Video, Headphones, Download, Search, 
  Play, Clock, Users, Star, Heart,
  BookOpen, FileText, Award
} from 'lucide-react';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety',
      type: 'article',
      category: 'anxiety',
      description: 'A comprehensive guide to understanding triggers, symptoms, and evidence-based management strategies for anxiety disorders.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      duration: '15 min read',
      views: 12400,
      rating: 4.8,
      author: 'Dr. Sarah Johnson',
      featured: true
    },
    {
      id: 2,
      title: 'Guided Meditation for Beginners',
      type: 'video',
      category: 'meditation',
      description: 'Learn the fundamentals of mindfulness meditation with this step-by-step video guide perfect for newcomers.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      duration: '20 minutes',
      views: 8900,
      rating: 4.9,
      author: 'Mindfulness Center'
    },
    {
      id: 3,
      title: 'Sleep Stories for Better Rest',
      type: 'audio',
      category: 'sleep',
      description: 'Calming bedtime stories designed to help you relax and fall asleep naturally.',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop',
      duration: '45 minutes',
      views: 15600,
      rating: 4.7,
      author: 'Sleep Wellness'
    },
    {
      id: 4,
      title: 'Cognitive Behavioral Therapy Workbook',
      type: 'pdf',
      category: 'therapy',
      description: 'Interactive workbook with CBT exercises and techniques for managing negative thought patterns.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      duration: 'Self-paced',
      views: 6700,
      rating: 4.6,
      author: 'CBT Institute',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'anxiety', label: 'Anxiety', count: resources.filter(r => r.category === 'anxiety').length },
    { id: 'meditation', label: 'Meditation', count: resources.filter(r => r.category === 'meditation').length },
    { id: 'sleep', label: 'Sleep', count: resources.filter(r => r.category === 'sleep').length },
    { id: 'therapy', label: 'Therapy', count: resources.filter(r => r.category === 'therapy').length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'article': return <BookOpen className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Headphones className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      default: return <Book className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'article': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'video': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'audio': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'pdf': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const totalViews = resources.reduce((sum, resource) => sum + resource.views, 0);
  const avgRating = resources.reduce((sum, resource) => sum + resource.rating, 0) / resources.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Book className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Mental Health Resources
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover evidence-based resources, expert content, and practical tools to support your mental health journey
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {resources.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {(totalViews / 1000).toFixed(1)}k
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {avgRating.toFixed(1)}★
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, topics, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 shadow-md'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Resources Banner */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.filter(r => r.featured).map(resource => (
                <div key={resource.id} className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-1 shadow-xl">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-16 h-16 rounded-xl object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0zMiAyMHYyNE0yMCAzMmgyNCIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{resource.description.slice(0, 100)}...</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {resource.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {(resource.views / 1000).toFixed(1)}k views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredResources.length} of {resources.length} resources
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(resource => (
            <div key={resource.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwdjUwTTE3NSAxMjVoNTAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Type Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  <div className="flex items-center gap-1">
                    {getIcon(resource.type)}
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </div>
                </div>

                {/* Featured Badge */}
                {resource.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}

                {/* Play Button for Videos */}
                {resource.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs">
                  <Clock className="w-3 h-3" />
                  {resource.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>

                {/* Author */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  By {resource.author}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {resource.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {(resource.views / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  <Download className="w-4 h-4" />
                  Access Resource
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;