import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterProps {
  onToggleMode: () => void;
  onClose: () => void;
}

export default function Register({ onToggleMode, onClose }: RegisterProps) {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    phone: '',
    emergencyContact: '',
    preferredLanguage: 'English'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const departments = [
    'Computer Science', 'Business Administration', 'Engineering', 'Liberal Arts',
    'Medicine', 'Psychology', 'Mathematics', 'Biology', 'Chemistry', 'Physics',
    'Economics', 'Political Science', 'Literature', 'Art & Design', 'Music'
  ];

  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'PhD'];
  const languageOptions = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Gujarati', 'Punjabi', 'Marathi'];

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }
    
    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = 'Please select your year of study';
    }
    
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    try {
      const success = await register(formData.email, formData.password, {
        full_name: formData.fullName,
        student_id: formData.studentId,
        department: formData.department,
        year_of_study: formData.yearOfStudy,
        phone: formData.phone,
        emergency_contact: formData.emergencyContact,
        preferred_language: formData.preferredLanguage
      });
      
      if (success) {
        onClose();
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Join MindCare Connect for mental health support</p>
        
        {/* Progress Indicator */}
        <div className="mt-4 flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Account Info</span>
          <span>Personal Details</span>
        </div>
      </div>

      <div className="p-6">
        {errors.general && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-700 text-sm">{errors.general}</span>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
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
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
            >
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                Student ID *
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.studentId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.studentId && (
                <p className="text-red-600 text-sm mt-1">{errors.studentId}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-600 text-sm mt-1">{errors.department}</p>
                )}
              </div>

              <div>
                <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.yearOfStudy ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Year</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.yearOfStudy && (
                  <p className="text-red-600 text-sm mt-1">{errors.yearOfStudy}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-9876543210"
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact
              </label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {languageOptions.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}