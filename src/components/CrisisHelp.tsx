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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Crisis Alert */}
        <div className="group relative overflow-hidden bg-gradient-to-r from-red-50/90 to-orange-50/90 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-200/60 dark:border-red-800/60 rounded-2xl p-6 backdrop-blur-sm shadow-lg animate-pulseSoft hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-start">
            <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-800/40 rounded-full mr-4 animate-pulse">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-600 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent mb-3">Need Immediate Help?</h2>
              <p className="text-red-800 dark:text-red-300 text-base mb-4 leading-relaxed">
                If you're having thoughts of suicide or self-harm, or if you're in immediate danger, 
                please reach out for help right now. You're not alone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:1800-xxx-xxxx"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 text-white py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Crisis Helpline: 1800-XXX-XXXX
                </a>
                <button className="inline-flex items-center justify-center border-2 border-red-600/60 dark:border-red-500/60 text-red-600 dark:text-red-400 py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-800/20 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105 shadow-lg">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Start Crisis Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">Emergency Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="group/card bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-700/80 dark:to-gray-600/80 p-4 rounded-xl border border-gray-200/50 dark:border-gray-600/50 flex flex-col h-full backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h4>
                    <span className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full flex-shrink-0 shadow-lg">
                      {contact.availability}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow leading-relaxed">{contact.description}</p>
                  <a
                    href={`tel:${contact.number}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-auto transition-all duration-300 hover:scale-105"
                  >
                    <div className="p-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-2">
                      <Phone className="h-3 w-3 text-white" />
                    </div>
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campus Resources */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">Campus Resources</h3>
            <div className="space-y-4">
              {campusResources.map((resource, index) => (
                <div key={index} className="group/card border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-4 bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-700/50 dark:to-gray-600/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <div className="p-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded mr-2">
                            <MapPin className="h-3 w-3 text-white" />
                          </div>
                          {resource.location}
                        </div>
                        <div className="flex items-center">
                          <div className="p-1 bg-gradient-to-r from-green-500 to-green-600 rounded mr-2">
                            <Clock className="h-3 w-3 text-white" />
                          </div>
                          {resource.hours}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <a
                        href={`tel:${resource.contact}`}
                        className="inline-flex items-center bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white py-2 px-4 rounded-xl hover:from-teal-700 hover:to-emerald-700 dark:hover:from-teal-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
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
        </div>

        {/* Warning Signs */}
        <div className="group relative overflow-hidden bg-gradient-to-r from-orange-50/90 to-yellow-50/90 dark:from-orange-900/30 dark:to-yellow-900/30 border border-orange-200/60 dark:border-orange-800/60 rounded-2xl p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-orange-600 dark:from-orange-400 dark:to-orange-300 bg-clip-text text-transparent mb-4">Warning Signs to Watch For</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl backdrop-blur-sm">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-3 flex items-center">
                  <div className="p-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg mr-2">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  In Yourself:
                </h4>
                <ul className="space-y-2 text-orange-700 dark:text-orange-300 text-sm">
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Thoughts of suicide or self-harm</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Feeling hopeless or trapped</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Severe mood swings</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Increased substance use</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Withdrawing from friends and activities</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Extreme fatigue or insomnia</li>
                </ul>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl backdrop-blur-sm">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-3 flex items-center">
                  <div className="p-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg mr-2">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  In Others:
                </h4>
                <ul className="space-y-2 text-orange-700 dark:text-orange-300 text-sm">
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Talking about wanting to die</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Looking for ways to harm themselves</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Giving away possessions</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Saying goodbye to loved ones</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Dramatic personality changes</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Loss of interest in activities they enjoy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Planning */}
        <div className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">Create a Safety Plan</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              A safety plan is a personalized guide that helps you cope with suicidal thoughts and urges. 
              Work with a counselor to create yours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="group/step text-center p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover/step:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Warning Signs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Identify your personal warning signs and triggers</p>
              </div>
              
              <div className="group/step text-center p-4 bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-900/30 dark:to-green-800/30 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover/step:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Coping Strategies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">List activities that help you feel better</p>
              </div>
              
              <div className="group/step text-center p-4 bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover/step:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Support Network</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Identify people you can reach out to</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white py-3 px-6 rounded-xl hover:from-teal-700 hover:to-emerald-700 dark:hover:from-teal-600 dark:hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm">
                Schedule Safety Planning Session
              </button>
            </div>
          </div>
        </div>

        {/* You Matter */}
        <div className="group relative overflow-hidden bg-gradient-to-r from-green-50/90 to-emerald-50/90 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200/60 dark:border-green-800/60 rounded-2xl p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg animate-pulse">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent mb-3">You Matter</h3>
            <p className="text-green-800 dark:text-green-300 max-w-2xl mx-auto leading-relaxed">
              Your life has value and meaning. Even when things feel overwhelming, there are people who care 
              and want to help. Reaching out for support is a sign of strength, not weakness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}