import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, Calendar, Award } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  university: string;
  story: string;
  rating: number;
  image: string;
  outcome: string;
  timeframe: string;
  category: 'anxiety' | 'depression' | 'academic-stress' | 'relationships' | 'general';
}

interface SuccessMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function TestimonialsAndStories() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      age: 20,
      university: 'Delhi University',
      story: "I was struggling with severe exam anxiety that was affecting my sleep and concentration. The AI chat feature helped me learn breathing techniques, and my counselor Dr. Patel taught me cognitive restructuring. Within 3 months, I went from panic attacks before every test to feeling confident and prepared. The peer support group made me realize I wasn't alone in this journey.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5cc?w=150&h=150&fit=crop&crop=face&auto=format',
      outcome: 'Reduced anxiety by 80%, improved grades',
      timeframe: '3 months',
      category: 'anxiety'
    },
    {
      id: '2',
      name: 'Rahul Kumar',
      age: 22,
      university: 'IIT Mumbai',
      story: "Engineering was overwhelming me. I felt like I was drowning in assignments and social expectations. The crisis support team connected me with resources when I was at my lowest point. Through regular counseling sessions and joining study groups, I learned to manage my perfectionism and ask for help when needed. Now I'm thriving academically and personally.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
      outcome: 'Completed degree with honors, better work-life balance',
      timeframe: '6 months',
      category: 'academic-stress'
    },
    {
      id: '3',
      name: 'Aisha Patel',
      age: 19,
      university: 'Mumbai University',
      story: "Moving away from home for college triggered depression I never knew I had. Simple tasks felt impossible. The 24/7 chat support was a lifeline during my darkest nights. My counselor helped me understand that seeking help shows strength, not weakness. The mindfulness resources and mood tracking tools became part of my daily routine. I'm now a peer mentor helping other students.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
      outcome: 'Overcame depression, became peer mentor',
      timeframe: '4 months',
      category: 'depression'
    },
    {
      id: '4',
      name: 'Arjun Singh',
      age: 21,
      university: 'Bangalore University',
      story: "I was struggling with relationships and social anxiety. Making friends felt impossible, and dating was terrifying. The peer support forums showed me that many students face similar challenges. Through group therapy sessions and social skills workshops, I learned to communicate authentically. I'm now in a healthy relationship and have a solid friend group.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      outcome: 'Improved social confidence, healthy relationships',
      timeframe: '5 months',
      category: 'relationships'
    },
    {
      id: '5',
      name: 'Sneha Reddy',
      age: 20,
      university: 'Hyderabad University',
      story: "Balancing academics, part-time work, and family expectations was crushing me. I felt guilty for struggling when I should feel grateful for opportunities. The wellness check-ins helped me track my mental state, and the resource library taught me about self-compassion. Learning to set boundaries and prioritize self-care changed everything.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format',
      outcome: 'Better work-life balance, reduced guilt',
      timeframe: '4 months',
      category: 'general'
    }
  ];

  const successMetrics: SuccessMetric[] = [
    {
      label: 'Students Helped',
      value: '15,000+',
      icon: <Heart className="h-6 w-6" />,
      color: 'text-red-600'
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: <Award className="h-6 w-6" />,
      color: 'text-green-600'
    },
    {
      label: 'Average Recovery Time',
      value: '3.5 months',
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-blue-600'
    },
    {
      label: 'Satisfaction Rating',
      value: '4.9/5',
      icon: <Star className="h-6 w-6" />,
      color: 'text-yellow-600'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Stories' },
    { value: 'anxiety', label: 'Anxiety & Panic' },
    { value: 'depression', label: 'Depression' },
    { value: 'academic-stress', label: 'Academic Stress' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'general', label: 'General Wellness' }
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentStory = filteredTestimonials[currentTestimonial];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Real Stories, Real Healing
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover how thousands of students have transformed their mental health journey with our support. 
          These are real stories from real students who found hope, healing, and happiness.
        </p>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {successMetrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 text-center hover:shadow-xl transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`mx-auto mb-3 ${metric.color}`}>
              {metric.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => {
              setSelectedCategory(category.value);
              setCurrentTestimonial(0);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Main Testimonial Display */}
      {currentStory && (
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="relative p-8 md:p-12">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 h-8 w-8 text-teal-600 opacity-50" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Story Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  "{currentStory.story}"
                </div>
                
                {/* Outcome */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="font-semibold text-green-800 dark:text-green-300 mb-1">
                    Outcome:
                  </div>
                  <div className="text-green-700 dark:text-green-400">
                    {currentStory.outcome}
                  </div>
                </div>
              </div>

              {/* Student Profile */}
              <div className="space-y-6">
                <div className="text-center">
                  <img
                    src={currentStory.image}
                    alt={currentStory.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-dark-600 shadow-lg"
                  />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentStory.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Age {currentStory.age}, {currentStory.university}
                  </p>
                </div>

                {/* Rating */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < currentStory.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Journey completed in {currentStory.timeframe}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-sm font-medium rounded-full">
                    {categories.find(c => c.value === currentStory.category)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                disabled={filteredTestimonials.length <= 1}
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous Story
              </button>

              <div className="flex space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? 'bg-teal-600'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                disabled={filteredTestimonials.length <= 1}
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Story
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-700 dark:to-blue-700 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Own Success Story?</h3>
        <p className="text-lg mb-6 opacity-90">
          Join thousands of students who have transformed their mental health journey. 
          Your story of healing and growth starts today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Free Chat
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
            Book Counseling
          </button>
        </div>
      </div>
    </div>
  );
}