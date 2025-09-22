import { Phone, MessageSquare, MapPin, Clock, AlertTriangle, Heart } from 'lucide-react';

export default function CrisisHelp() {
  const emergencyContacts = [
    {
      name: 'National Crisis Helpline',
      number: '1800-XXX-XXXX',
      description: '24/7 crisis counseling and suicide prevention',
      availability: '24/7'
    },
    {
      name: 'Campus Crisis Line',
      number: '(555) 123-HELP',
      description: 'Immediate support for students in crisis',
      availability: '24/7'
    },
    {
      name: 'Mental Health Emergency',
      number: '911',
      description: 'For immediate medical emergencies',
      availability: '24/7'
    }
  ];

  const campusResources = [
    {
      name: 'Counseling Center',
      location: 'Student Services Building, 2nd Floor',
      hours: 'Mon-Fri: 8AM-6PM',
      contact: '(555) 123-4567'
    },
    {
      name: 'Crisis Intervention Team',
      location: 'Available campus-wide',
      hours: '24/7 on-call',
      contact: '(555) 123-CRISIS'
    },
    {
      name: 'Peer Support Services',
      location: 'Student Union, Room 201',
      hours: 'Mon-Sun: 6PM-12AM',
      contact: '(555) 123-PEER'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Crisis Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="h-8 w-8 text-red-600 mt-1 mr-4 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-red-900 mb-2">Need Immediate Help?</h2>
            <p className="text-red-800 text-lg mb-4">
              If you're having thoughts of suicide or self-harm, or if you're in immediate danger, 
              please reach out for help right now. You're not alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:1800-xxx-xxxx"
                className="inline-flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Crisis Helpline: 1800-XXX-XXXX
              </a>
              <button className="inline-flex items-center justify-center border-2 border-red-600 text-red-600 py-3 px-6 rounded-md hover:bg-red-50 transition-colors font-medium">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Crisis Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col h-full">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex-shrink-0">
                  {contact.availability}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3 flex-grow">{contact.description}</p>
              <a
                href={`tel:${contact.number}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"
              >
                <Phone className="h-4 w-4 mr-2" />
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Resources */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Campus Resources</h3>
        <div className="space-y-4">
          {campusResources.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{resource.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {resource.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {resource.hours}
                    </div>
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  <a
                    href={`tel:${resource.contact}`}
                    className="inline-flex items-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {resource.contact}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-orange-900 mb-4">Warning Signs to Watch For</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">In Yourself:</h4>
            <ul className="space-y-1 text-orange-700 text-sm">
              <li>• Thoughts of suicide or self-harm</li>
              <li>• Feeling hopeless or trapped</li>
              <li>• Severe mood swings</li>
              <li>• Increased substance use</li>
              <li>• Withdrawing from friends and activities</li>
              <li>• Extreme fatigue or insomnia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-800 mb-2">In Others:</h4>
            <ul className="space-y-1 text-orange-700 text-sm">
              <li>• Talking about wanting to die</li>
              <li>• Looking for ways to harm themselves</li>
              <li>• Giving away possessions</li>
              <li>• Saying goodbye to loved ones</li>
              <li>• Dramatic personality changes</li>
              <li>• Loss of interest in activities they enjoy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Planning */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Create a Safety Plan</h3>
        <p className="text-gray-600 mb-6">
          A safety plan is a personalized guide that helps you cope with suicidal thoughts and urges. 
          Work with a counselor to create yours.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Warning Signs</h4>
            <p className="text-sm text-gray-600">Identify your personal warning signs and triggers</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Coping Strategies</h4>
            <p className="text-sm text-gray-600">List activities that help you feel better</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Support Network</h4>
            <p className="text-sm text-gray-600">Identify people you can reach out to</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition-colors">
            Schedule Safety Planning Session
          </button>
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">You Matter</h3>
        <p className="text-green-800 max-w-2xl mx-auto">
          Your life has value and meaning. Even when things feel overwhelming, there are people who care 
          and want to help. Reaching out for support is a sign of strength, not weakness.
        </p>
      </div>
    </div>
  );
}