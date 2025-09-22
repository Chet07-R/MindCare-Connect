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
      <div className="max-w-6xl mx-auto p-4">
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="relative z-10 text-center">
            <div className="p-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl inline-block mb-4 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">No user profile found. Please log in.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="group relative overflow-hidden bg-gradient-to-r from-teal-500/90 to-blue-600/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 text-white hover:shadow-xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm">
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
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-all duration-300 hover:scale-105"
                >
                  <div className="p-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded mr-2">
                    <Edit3 className="h-3 w-3 text-white" />
                  </div>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300 hover:scale-105"
                  >
                    <div className="p-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded mr-2">
                      <X className="h-3 w-3 text-white" />
                    </div>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 disabled:opacity-50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="p-1 bg-gradient-to-r from-green-500 to-green-600 rounded mr-2">
                      <Save className="h-3 w-3 text-white" />
                    </div>
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
                <h3 className="font-medium text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-gray-700/50 pb-2">Personal Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3 shadow-lg">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg mr-3 shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.full_name}
                          onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                          className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg mt-1"
                        />
                      ) : (
                        <p className="font-medium text-gray-900 dark:text-white">{profile.full_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3 shadow-lg">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter phone number"
                          className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg mt-1"
                        />
                      ) : (
                        <p className="font-medium text-gray-900 dark:text-white">{profile.phone || 'Not provided'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg mr-3 shadow-lg">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Contact</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.emergency_contact}
                          onChange={(e) => setEditData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                          placeholder="Enter emergency contact"
                          className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg mt-1"
                        />
                      ) : (
                        <p className="font-medium text-gray-900 dark:text-white">{profile.emergency_contact || 'Not provided'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3 shadow-lg">
                      <Globe className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Preferred Language</p>
                      {isEditing ? (
                        <select
                          value={editData.preferred_language}
                          onChange={(e) => setEditData(prev => ({ ...prev, preferred_language: e.target.value }))}
                          className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg mt-1"
                        >
                          {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      ) : (
                        <p className="font-medium text-gray-900 dark:text-white">{profile.preferred_language}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white border-b border-gray-200/50 dark:border-gray-700/50 pb-2">Academic Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg mr-3 shadow-lg">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Student ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.student_id}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mr-3 shadow-lg">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg mr-3 shadow-lg">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Year of Study</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.year_of_study}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg mr-3 shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 p-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Account Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group relative overflow-hidden text-center p-6 bg-gradient-to-br from-teal-50/50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl border border-teal-200/50 dark:border-teal-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sessions Attended</p>
              </div>
            </div>
            <div className="group relative overflow-hidden text-center p-6 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">45</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resources Accessed</p>
              </div>
            </div>
            <div className="group relative overflow-hidden text-center p-6 bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Forum Posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="group relative overflow-hidden bg-gradient-to-r from-blue-50/80 to-blue-100/80 dark:from-blue-900/40 dark:to-blue-800/40 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 p-6">
          <div className="flex items-start">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4 shadow-lg flex-shrink-0">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Privacy & Data Security</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                Your personal information is encrypted and secured. We follow strict privacy guidelines 
                and never share your data with third parties. You can request data deletion at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}