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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Book a Counseling Session</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Schedule a confidential appointment with our licensed mental health professionals. 
          All sessions are private and secure.
        </p>
      </div>

      {/* Session Type Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSessionType('individual')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              sessionType === 'individual'
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 text-teal-600 mr-2" />
              <span className="font-medium">Individual Counseling</span>
            </div>
            <p className="text-sm text-gray-600">
              One-on-one session with a licensed counselor (50 minutes)
            </p>
          </button>
          
          <button
            onClick={() => setSessionType('group')}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              sessionType === 'group'
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 text-purple-600 mr-2" />
              <span className="font-medium">Group Therapy</span>
            </div>
            <p className="text-sm text-gray-600">
              Small group session with peers facing similar challenges (90 minutes)
            </p>
          </button>
        </div>
      </div>

      {/* Language Preference */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Language</h3>
        <select
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="punjabi">Punjabi</option>
          <option value="gujarati">Gujarati</option>
          <option value="tamil">Tamil</option>
          <option value="telugu">Telugu</option>
        </select>
      </div>

      {/* Counselor Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Counselor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              onClick={() => setSelectedCounselor(counselor.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all flex flex-col h-full ${
                selectedCounselor === counselor.id
                  ? 'border-teal-600 bg-teal-50 transform scale-105'
                  : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="text-center flex-grow">
                <img
                  src={counselor.image}
                  alt={counselor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-semibold text-gray-900">{counselor.name}</h4>
                <div className="flex items-center justify-center mt-1 mb-2">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                  <span className="text-sm text-gray-600 ml-1">({counselor.rating})</span>
                </div>
                <div className="space-y-2 flex-grow">
                  <div>
                    <p className="text-xs font-medium text-gray-700">Specializations:</p>
                    <p className="text-xs text-gray-600">
                      {counselor.specialization.slice(0, 2).join(', ')}
                      {counselor.specialization.length > 2 && '...'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">Languages:</p>
                    <p className="text-xs text-gray-600">{counselor.languages.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-xs text-green-600 mt-auto pt-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  Next available: {new Date(counselor.nextAvailable).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      {selectedCounselor && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-2 text-sm border rounded-md transition-colors ${
                      selectedTime === slot.time
                        ? 'bg-teal-600 text-white border-teal-600'
                        : slot.available
                        ? 'border-gray-300 hover:border-teal-400 hover:bg-teal-50'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
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
      )}

      {/* Session Format */}
      {selectedCounselor && selectedDate && selectedTime && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors">
              <Video className="h-5 w-5 text-blue-600 mr-3" />
              <div className="text-left">
                <p className="font-medium">Video Call</p>
                <p className="text-sm text-gray-600">Online session</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-colors">
              <Phone className="h-5 w-5 text-green-600 mr-3" />
              <div className="text-left">
                <p className="font-medium">Phone Call</p>
                <p className="text-sm text-gray-600">Audio only</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 border-2 border-teal-600 bg-teal-50 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600 mr-3" />
              <div className="text-left">
                <p className="font-medium">In-Person</p>
                <p className="text-sm text-gray-600">Campus office</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Booking Summary and Confirmation */}
      {selectedCounselor && selectedDate && selectedTime && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
          <div className="space-y-2 text-sm text-gray-700">
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
              className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition-colors font-medium"
            >
              Confirm Booking
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
          </div>
        </div>
      )}
    </div>
  );
}