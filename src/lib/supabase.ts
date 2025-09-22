import { createClient } from '@supabase/supabase-js';

// For demonstration purposes, using placeholder values
// In a real app, these would come from environment variables
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// For the demo, we'll use a mock client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Disable for demo
  }
});

// Mock database functions for demo purposes
class MockSupabaseService {
  // Users and authentication
  async signUp(email: string, _password: string, _userData: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    return {
      data: {
        user: {
          id: Date.now().toString(),
          email,
          created_at: new Date().toISOString()
        }
      },
      error: null
    };
  }

  async signIn(email: string, _password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock user based on email
    const mockUser = {
      id: '1',
      email,
      role: email.includes('admin') ? 'admin' : email.includes('counselor') ? 'counselor' : 'student',
      created_at: new Date().toISOString()
    };

    return {
      data: { user: mockUser },
      error: null
    };
  }

  async signOut() {
    return { error: null };
  }

  // User profiles
  async getUserProfile(userId: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      data: {
        id: userId,
        user_id: userId,
        full_name: 'Demo User',
        student_id: 'STU2024001',
        department: 'Computer Science',
        year_of_study: '3rd Year',
        phone: '+91-9876543210',
        emergency_contact: '+91-9876543211',
        preferred_language: 'English',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      error: null
    };
  }

  async updateUserProfile(_userId: string, updates: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: { ...updates, updated_at: new Date().toISOString() },
      error: null
    };
  }

  // Appointments
  async getAppointments(userId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockAppointments = [
      {
        id: '1',
        student_id: userId,
        counselor_id: '2',
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        duration: 50,
        status: 'scheduled',
        type: 'individual',
        counselor_name: 'Dr. Sarah Johnson',
        notes: '',
        created_at: new Date().toISOString()
      }
    ];

    return {
      data: mockAppointments,
      error: null
    };
  }

  async createAppointment(appointmentData: any) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      data: {
        id: Date.now().toString(),
        ...appointmentData,
        status: 'scheduled',
        created_at: new Date().toISOString()
      },
      error: null
    };
  }

  async updateAppointment(appointmentId: string, updates: any) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      data: { id: appointmentId, ...updates },
      error: null
    };
  }

  // Chat sessions
  async getChatSessions(userId: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockSessions = [
      {
        id: '1',
        user_id: userId,
        risk_level: 'low',
        escalated: false,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        ended_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        messages: [
          {
            id: '1',
            content: 'Hello! How are you feeling today?',
            sender: 'ai',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            content: 'I\'m feeling a bit anxious about my upcoming exams.',
            sender: 'user',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000).toISOString()
          }
        ]
      }
    ];

    return {
      data: mockSessions,
      error: null
    };
  }

  async saveChatMessage(sessionId: string, message: any) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      data: {
        id: Date.now().toString(),
        session_id: sessionId,
        ...message,
        timestamp: new Date().toISOString()
      },
      error: null
    };
  }

  // Resources
  async getResources(_filters?: any) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockResources = [
      {
        id: '1',
        title: '5-Minute Breathing Exercise for Anxiety',
        type: 'video',
        category: 'Anxiety Management',
        language: 'Hindi',
        content_url: '#',
        thumbnail_url: 'https://images.pexels.com/photos/3759163/pexels-photo-3759163.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Learn simple breathing techniques to manage anxiety and panic attacks.',
        tags: ['anxiety', 'breathing', 'relaxation'],
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Sleep Stories for Better Rest',
        type: 'audio',
        category: 'Sleep & Relaxation',
        language: 'English',
        content_url: '#',
        thumbnail_url: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Calming bedtime stories designed to help you relax and fall asleep.',
        tags: ['sleep', 'relaxation', 'stories'],
        created_at: new Date().toISOString()
      }
    ];

    return {
      data: mockResources,
      error: null
    };
  }

  // Forum posts
  async getForumPosts(_filters?: any) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const mockPosts = [
      {
        id: '1',
        author_id: 'anonymous',
        title: 'Dealing with exam anxiety - anyone else struggling?',
        content: 'Finals are approaching and I\'m feeling overwhelmed. The pressure is getting to me and I can\'t seem to focus. Any tips from fellow students?',
        category: 'Academic Stress',
        is_anonymous: true,
        status: 'active',
        replies_count: 12,
        likes_count: 15,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author_name: 'Anonymous'
      }
    ];

    return {
      data: mockPosts,
      error: null
    };
  }

  async createForumPost(postData: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: Date.now().toString(),
        ...postData,
        status: 'active',
        replies_count: 0,
        likes_count: 0,
        created_at: new Date().toISOString()
      },
      error: null
    };
  }

  // Analytics (for admin/counselor roles)
  async getAnalytics() {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockAnalytics = {
      total_users: 1247,
      active_sessions: 89,
      crisis_interventions: 23,
      forum_posts: 156,
      department_stats: [
        { department: 'Computer Science', active_users: 342, sessions: 28, avg_risk: 'medium' },
        { department: 'Business Administration', active_users: 289, sessions: 22, avg_risk: 'low' },
        { department: 'Engineering', active_users: 245, sessions: 19, avg_risk: 'medium' }
      ],
      risk_distribution: {
        low: 742,
        medium: 358,
        high: 124,
        crisis: 23
      }
    };

    return {
      data: mockAnalytics,
      error: null
    };
  }
}

// Export the mock service for demo purposes
export const dbService = new MockSupabaseService();

// Database schema for reference (would be created in Supabase dashboard)
export const DATABASE_SCHEMA = {
  users: `
    CREATE TABLE users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      email VARCHAR UNIQUE NOT NULL,
      role VARCHAR CHECK (role IN ('student', 'counselor', 'admin', 'volunteer')) DEFAULT 'student',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  user_profiles: `
    CREATE TABLE user_profiles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      full_name VARCHAR NOT NULL,
      student_id VARCHAR,
      department VARCHAR,
      year_of_study VARCHAR,
      phone VARCHAR,
      emergency_contact VARCHAR,
      preferred_language VARCHAR DEFAULT 'English',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  appointments: `
    CREATE TABLE appointments (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      student_id UUID REFERENCES users(id),
      counselor_id UUID REFERENCES users(id),
      scheduled_at TIMESTAMPTZ NOT NULL,
      duration INTEGER DEFAULT 50,
      status VARCHAR CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')) DEFAULT 'scheduled',
      type VARCHAR CHECK (type IN ('individual', 'group', 'crisis')) DEFAULT 'individual',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  chat_sessions: `
    CREATE TABLE chat_sessions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      risk_level VARCHAR CHECK (risk_level IN ('low', 'medium', 'high', 'crisis')) DEFAULT 'low',
      escalated BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      ended_at TIMESTAMPTZ
    );
  `,
  chat_messages: `
    CREATE TABLE chat_messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      sender VARCHAR CHECK (sender IN ('user', 'ai')) NOT NULL,
      sentiment_score DECIMAL,
      timestamp TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  resources: `
    CREATE TABLE resources (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title VARCHAR NOT NULL,
      type VARCHAR CHECK (type IN ('video', 'audio', 'article', 'guide')) NOT NULL,
      content_url VARCHAR NOT NULL,
      thumbnail_url VARCHAR,
      description TEXT,
      language VARCHAR DEFAULT 'English',
      category VARCHAR NOT NULL,
      tags TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  forum_posts: `
    CREATE TABLE forum_posts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      author_id UUID REFERENCES users(id),
      title VARCHAR NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR NOT NULL,
      is_anonymous BOOLEAN DEFAULT FALSE,
      status VARCHAR CHECK (status IN ('active', 'moderated', 'archived')) DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `
};