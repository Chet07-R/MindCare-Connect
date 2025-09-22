import { useState } from 'react';
import { User, Mail, Phone, BookOpen, Calendar, MapPin, Globe, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, profile, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    emergency_contact: profile?.emergency_contact || '',
    preferred_language: profile?.preferred_language || 'English'
  });
  const [saving, setSaving] = useState(false);

  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Gujarati', 'Punjabi', 'Marathi'];

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await updateProfile(editData);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      emergency_contact: profile?.emergency_contact || '',
      preferred_language: profile?.preferred_language || 'English'
    });
    setIsEditing(false);
  };

  if (!user || !profile) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">No user profile found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              <p className="text-teal-100">{user.email}</p>
              <p className="text-teal-100 text-sm">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {profile.student_id}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center text-teal-600 hover:text-teal-700"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center text-gray-600 hover:text-gray-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center text-teal-600 hover:text-teal-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-1" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.full_name}
                        onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ) : (
                      <p className="font-medium">{profile.full_name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter phone number"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ) : (
                      <p className="font-medium">{profile.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.emergency_contact}
                        onChange={(e) => setEditData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                        placeholder="Enter emergency contact"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ) : (
                      <p className="font-medium">{profile.emergency_contact || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Preferred Language</p>
                    {isEditing ? (
                      <select
                        value={editData.preferred_language}
                        onChange={(e) => setEditData(prev => ({ ...prev, preferred_language: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {languages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="font-medium">{profile.preferred_language}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">Academic Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-medium">{profile.student_id}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{profile.department}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Year of Study</p>
                    <p className="font-medium">{profile.year_of_study}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Account Type</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Account Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-teal-600">12</p>
            <p className="text-sm text-gray-600">Sessions Attended</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-600">Resources Accessed</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">Forum Posts</p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Privacy & Data Security</h4>
        <p className="text-blue-800 text-sm">
          Your personal information is encrypted and secured. We follow strict privacy guidelines 
          and never share your data with third parties. You can request data deletion at any time.
        </p>
      </div>
    </div>
  );
}