import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, userData: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('mindcare_user');
        const storedProfile = localStorage.getItem('mindcare_profile');
        
        if (storedUser && storedProfile) {
          setUser(JSON.parse(storedUser));
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('mindcare_user');
        localStorage.removeItem('mindcare_profile');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call - In real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data for demonstration
      const mockUser: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : email.includes('counselor') ? 'counselor' : 'student',
        profile: {
          id: '1',
          user_id: '1',
          full_name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          student_id: 'STU2024001',
          department: 'Computer Science',
          year_of_study: '3rd Year',
          phone: '+91-9876543210',
          emergency_contact: '+91-9876543211',
          preferred_language: 'English',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      setUser(mockUser);
      setProfile(mockUser.profile);
      
      // Store in localStorage for persistence
      localStorage.setItem('mindcare_user', JSON.stringify(mockUser));
      localStorage.setItem('mindcare_profile', JSON.stringify(mockUser.profile));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, _password: string, userData: Partial<UserProfile>): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        role: 'student',
        profile: {
          id: Date.now().toString(),
          user_id: Date.now().toString(),
          full_name: userData.full_name || '',
          student_id: userData.student_id || '',
          department: userData.department || '',
          year_of_study: userData.year_of_study || '',
          phone: userData.phone || '',
          emergency_contact: userData.emergency_contact || '',
          preferred_language: userData.preferred_language || 'English',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      setUser(mockUser);
      setProfile(mockUser.profile);
      
      localStorage.setItem('mindcare_user', JSON.stringify(mockUser));
      localStorage.setItem('mindcare_profile', JSON.stringify(mockUser.profile));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('mindcare_user');
    localStorage.removeItem('mindcare_profile');
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!profile) return false;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProfile = { ...profile, ...updates, updated_at: new Date().toISOString() };
      setProfile(updatedProfile);
      localStorage.setItem('mindcare_profile', JSON.stringify(updatedProfile));
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    login,
    logout,
    register,
    updateProfile,
    resetPassword,
    isAuthenticated: !!user,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}