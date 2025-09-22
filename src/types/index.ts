export interface User {
  id: string;
  email: string;
  role: 'student' | 'counselor' | 'admin' | 'volunteer';
  profile: UserProfile;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  student_id?: string;
  department?: string;
  year_of_study?: string;
  phone?: string;
  emergency_contact?: string;
  preferred_language: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  student_id: string;
  counselor_id: string;
  scheduled_at: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'individual' | 'group' | 'crisis';
  notes?: string;
  created_at: string;
}

export interface Counselor {
  id: string;
  user_id: string;
  specialization: string[];
  availability: CounselorAvailability[];
  max_daily_appointments: number;
  languages: string[];
  created_at: string;
}

export interface CounselorAvailability {
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'article' | 'guide';
  content_url: string;
  thumbnail_url?: string;
  description: string;
  language: string;
  category: string;
  tags: string[];
  created_at: string;
}

export interface ForumPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  is_anonymous: boolean;
  status: 'active' | 'moderated' | 'archived';
  replies_count: number;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  messages: ChatMessage[];
  risk_level: 'low' | 'medium' | 'high' | 'crisis';
  escalated: boolean;
  created_at: string;
  ended_at?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  sentiment_score?: number;
}

export interface ScreeningResult {
  id: string;
  user_id: string;
  tool_type: 'PHQ-9' | 'GAD-7' | 'GHQ-12';
  score: number;
  risk_level: 'minimal' | 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  created_at: string;
}