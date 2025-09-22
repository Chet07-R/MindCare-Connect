import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginProps {
  onToggleMode: () => void;
  onClose: () => void;
}

export default function Login({ onToggleMode, onClose }: LoginProps) {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        onClose();
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Demo accounts for testing
  const demoAccounts = [
    { email: 'student@mindcare.edu', role: 'Student' },
    { email: 'counselor@mindcare.edu', role: 'Counselor' },
    { email: 'admin@mindcare.edu', role: 'Admin' }
  ];

  const fillDemoAccount = (email: string) => {
    setFormData({ email, password: 'demo123' });
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to access your mental health dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-700 text-sm">{errors.general}</span>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
            <span className="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <button type="button" className="text-sm text-teal-600 hover:text-teal-700">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Demo Accounts */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-3">Try demo accounts:</p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemoAccount(account.email)}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between"
              >
                <span>{account.email}</span>
                <span className="text-xs text-gray-500">{account.role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign up here
          </button>
        </div>
      </form>
    </div>
  );
}