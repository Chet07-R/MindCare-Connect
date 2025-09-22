import { useState } from 'react';
import { Calendar, Clock, User, MapPin, Video, Phone } from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  specialization: string[];
  languages: string[];
  rating: number;
  nextAvailable: string;
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingSystem() {
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'individual' | 'group'>('individual');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('english');

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: ['Anxiety', 'Depression', 'Academic Stress'],
      languages: ['English', 'Hindi'],
      rating: 4.9,
      nextAvailable: '2024-01-20',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: ['Relationship Issues', 'Family Counseling', 'Substance Abuse'],
      languages: ['Hindi', 'English', 'Punjabi'],
      rating: 4.8,
      nextAvailable: '2024-01-19',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialization: ['Eating Disorders', 'Self-Esteem', 'LGBTQ+ Issues'],
      languages: ['English', 'Hindi', 'Gujarati'],
      rating: 4.9,
      nextAvailable: '2024-01-21',
      image: 'https://images.pexels.com/photos/5327654/pexels-photo-5327654.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true }
  ];

  const handleBooking = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) {
      alert('Please select all required fields');
      return;
    }

    // Here you would typically make an API call to book the appointment
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    
    // Reset form
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-1 h-10 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full mr-4 animate-pulse"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
                Book a Counseling Session
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
              Schedule a confidential appointment with our licensed mental health professionals. 
              All sessions are private and secure.
            </p>
          </div>
        </div>

        {/* Session Type Selection */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Session Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSessionType('individual')}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                  sessionType === 'individual'
                    ? 'border-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 shadow-lg shadow-teal-500/25'
                    : 'border-gray-300/50 dark:border-gray-600/50 hover:border-teal-400 bg-white/50 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="p-1.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg mr-3">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Individual Counseling</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  One-on-one session with a licensed counselor (50 minutes)
                </p>
              </button>
              
              <button
                onClick={() => setSessionType('group')}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                  sessionType === 'group'
                    ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 shadow-lg shadow-purple-500/25'
                    : 'border-gray-300/50 dark:border-gray-600/50 hover:border-purple-400 bg-white/50 dark:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="p-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Group Therapy</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Small group session with peers facing similar challenges (90 minutes)
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Language Preference */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Preferred Language</h3>
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="w-full md:w-64 border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-2.5 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-xl"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="punjabi">Punjabi</option>
              <option value="gujarati">Gujarati</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
            </select>
          </div>
        </div>

        {/* Counselor Selection */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Choose a Counselor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  onClick={() => setSelectedCounselor(counselor.id)}
                  className={`group/card p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 flex flex-col h-full backdrop-blur-sm hover:scale-105 ${
                    selectedCounselor === counselor.id
                      ? 'border-teal-600 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 shadow-lg shadow-teal-500/25'
                      : 'border-gray-300/50 dark:border-gray-600/50 hover:border-teal-400 bg-white/50 dark:bg-gray-700/50 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center flex-grow">
                    <div className="relative mb-3 mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur-md opacity-30 group-hover/card:opacity-50 transition-opacity duration-300"></div>
                      <img
                        src={counselor.image}
                        alt={counselor.name}
                        className="relative w-20 h-20 rounded-full mx-auto object-cover shadow-lg"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{counselor.name}</h4>
                    <div className="flex items-center justify-center mt-1 mb-2">
                      <span className="text-yellow-400 text-sm">★★★★★</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">({counselor.rating})</span>
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Specializations:</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {counselor.specialization.slice(0, 2).join(', ')}
                          {counselor.specialization.length > 2 && '...'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Languages:</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{counselor.languages.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-xs text-green-600 dark:text-green-400 mt-auto pt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      Next available: {new Date(counselor.nextAvailable).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Date and Time Selection */}
        {selectedCounselor && (
          <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Select Date & Time</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-2.5 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 text-sm border rounded-xl transition-all duration-300 backdrop-blur-sm ${
                          selectedTime === slot.time
                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white border-teal-600 shadow-lg shadow-teal-500/25'
                            : slot.available
                            ? 'border-gray-300/50 dark:border-gray-600/50 hover:border-teal-400 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 dark:hover:from-teal-900/20 dark:hover:to-teal-800/20 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100'
                            : 'border-gray-200/50 bg-gray-100/50 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Clock className="h-3 w-3 inline mr-1" />
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session Format */}
        {selectedCounselor && selectedDate && selectedTime && (
          <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Session Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="group/btn flex items-center p-4 border-2 border-gray-300/50 dark:border-gray-600/50 rounded-xl hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 backdrop-blur-sm hover:scale-105 bg-white/50 dark:bg-gray-700/50">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3 group-hover/btn:scale-110 transition-transform duration-300">
                    <Video className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Video Call</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Online session</p>
                  </div>
                </button>
                
                <button className="group/btn flex items-center p-4 border-2 border-gray-300/50 dark:border-gray-600/50 rounded-xl hover:border-green-400 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/20 dark:hover:to-green-800/20 transition-all duration-300 backdrop-blur-sm hover:scale-105 bg-white/50 dark:bg-gray-700/50">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-3 group-hover/btn:scale-110 transition-transform duration-300">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Phone Call</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Audio only</p>
                  </div>
                </button>
                
                <button className="group/btn flex items-center p-4 border-2 border-purple-600 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-3">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">In-Person</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Campus office</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Summary and Confirmation */}
        {selectedCounselor && selectedDate && selectedTime && (
          <div className="group relative overflow-hidden bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><span className="font-medium">Counselor:</span> {counselors.find(c => c.id === selectedCounselor)?.name}</p>
                <p><span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
                <p><span className="font-medium">Duration:</span> {sessionType === 'individual' ? '50 minutes' : '90 minutes'}</p>
                <p><span className="font-medium">Session Type:</span> {sessionType === 'individual' ? 'Individual Counseling' : 'Group Therapy'}</p>
                <p><span className="font-medium">Language:</span> {preferredLanguage.charAt(0).toUpperCase() + preferredLanguage.slice(1)}</p>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBooking}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white py-3 px-6 rounded-xl hover:from-teal-700 hover:to-emerald-700 dark:hover:from-teal-600 dark:hover:to-emerald-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
                >
                  Confirm Booking
                </button>
                <button className="flex-1 border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-300 backdrop-blur-sm hover:scale-105">
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}