import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dbService } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Appointment, Resource, ForumPost, ChatSession } from '../types';

interface DataContextType {
  // Appointments
  appointments: Appointment[];
  loadingAppointments: boolean;
  createAppointment: (appointmentData: Partial<Appointment>) => Promise<boolean>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<boolean>;
  refreshAppointments: () => Promise<void>;

  // Resources
  resources: Resource[];
  loadingResources: boolean;
  refreshResources: (filters?: any) => Promise<void>;

  // Forum posts
  forumPosts: ForumPost[];
  loadingForumPosts: boolean;
  createForumPost: (postData: Partial<ForumPost>) => Promise<boolean>;
  refreshForumPosts: (filters?: any) => Promise<void>;

  // Chat sessions
  chatSessions: ChatSession[];
  loadingChatSessions: boolean;
  saveChatMessage: (sessionId: string, message: any) => Promise<boolean>;
  refreshChatSessions: () => Promise<void>;

  // Analytics (for admin/counselor)
  analytics: any;
  loadingAnalytics: boolean;
  refreshAnalytics: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const { user, isAuthenticated } = useAuth();
  
  // State for different data types
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [loadingForumPosts, setLoadingForumPosts] = useState(false);
  
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loadingChatSessions, setLoadingChatSessions] = useState(false);
  
  const [analytics, setAnalytics] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Load initial data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshAppointments();
      refreshResources();
      refreshForumPosts();
      refreshChatSessions();
      
      // Load analytics for admin/counselor roles
      if (user.role === 'admin' || user.role === 'counselor') {
        refreshAnalytics();
      }
    }
  }, [isAuthenticated, user]);

  // Appointments functions
  const refreshAppointments = async () => {
    if (!user) return;
    
    setLoadingAppointments(true);
    try {
      const result = await dbService.getAppointments(user.id);
      if (!result.error) {
        setAppointments(result.data as Appointment[]);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const createAppointment = async (appointmentData: Partial<Appointment>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const result = await dbService.createAppointment({
        ...appointmentData,
        student_id: user.id
      });
      
      if (!result.error) {
        await refreshAppointments();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating appointment:', error);
      return false;
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<boolean> => {
    try {
      const result = await dbService.updateAppointment(id, updates);
      
      if (!result.error) {
        await refreshAppointments();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating appointment:', error);
      return false;
    }
  };

  // Resources functions
  const refreshResources = async (filters?: any) => {
    setLoadingResources(true);
    try {
      const result = await dbService.getResources(filters);
      if (!result.error) {
        setResources(result.data as Resource[]);
      }
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoadingResources(false);
    }
  };

  // Forum functions
  const refreshForumPosts = async (filters?: any) => {
    setLoadingForumPosts(true);
    try {
      const result = await dbService.getForumPosts(filters);
      if (!result.error) {
        setForumPosts(result.data as ForumPost[]);
      }
    } catch (error) {
      console.error('Error loading forum posts:', error);
    } finally {
      setLoadingForumPosts(false);
    }
  };

  const createForumPost = async (postData: Partial<ForumPost>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const result = await dbService.createForumPost({
        ...postData,
        author_id: postData.is_anonymous ? 'anonymous' : user.id
      });
      
      if (!result.error) {
        await refreshForumPosts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating forum post:', error);
      return false;
    }
  };

  // Chat functions
  const refreshChatSessions = async () => {
    if (!user) return;
    
    setLoadingChatSessions(true);
    try {
      const result = await dbService.getChatSessions(user.id);
      if (!result.error) {
        setChatSessions(result.data as ChatSession[]);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    } finally {
      setLoadingChatSessions(false);
    }
  };

  const saveChatMessage = async (sessionId: string, message: any): Promise<boolean> => {
    try {
      const result = await dbService.saveChatMessage(sessionId, message);
      
      if (!result.error) {
        // Optionally refresh chat sessions to get updated data
        await refreshChatSessions();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving chat message:', error);
      return false;
    }
  };

  // Analytics functions
  const refreshAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const result = await dbService.getAnalytics();
      if (!result.error) {
        setAnalytics(result.data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const value: DataContextType = {
    // Appointments
    appointments,
    loadingAppointments,
    createAppointment,
    updateAppointment,
    refreshAppointments,

    // Resources
    resources,
    loadingResources,
    refreshResources,

    // Forum posts
    forumPosts,
    loadingForumPosts,
    createForumPost,
    refreshForumPosts,

    // Chat sessions
    chatSessions,
    loadingChatSessions,
    saveChatMessage,
    refreshChatSessions,

    // Analytics
    analytics,
    loadingAnalytics,
    refreshAnalytics
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}