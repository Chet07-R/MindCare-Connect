import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Phone, Download, History, MoreVertical, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'critical';
  confidence?: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  riskLevel: 'low' | 'medium' | 'high' | 'crisis';
  createdAt: Date;
  lastActive: Date;
}

export default function AIChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      title: 'General Support Chat',
      messages: [
        {
          id: '1',
          content: "Hello! I'm here to provide emotional support and coping strategies. How are you feeling today?",
          sender: 'ai',
          timestamp: new Date(Date.now() - 10000),
          sentiment: 'positive',
          confidence: 0.9
        }
      ],
      riskLevel: 'low',
      createdAt: new Date(Date.now() - 3600000),
      lastActive: new Date()
    }
  ]);
  
  const [activeSessionId, setActiveSessionId] = useState<string>('session-1');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];
  const riskLevel = activeSession?.riskLevel || 'low';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const analyzeSentiment = (text: string): { sentiment: Message['sentiment']; confidence: number } => {
    // Enhanced sentiment analysis
    const lowerText = text.toLowerCase();
    
    // Crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'hurt myself', 'want to die', 'no point living'];
    const highRiskKeywords = ['hopeless', 'worthless', 'trapped', 'burden', 'alone', 'empty'];
    const negativeKeywords = ['anxious', 'depressed', 'sad', 'worried', 'scared', 'overwhelmed', 'stressed'];
    const positiveKeywords = ['good', 'better', 'happy', 'grateful', 'excited', 'confident', 'peaceful'];

    if (crisisKeywords.some(word => lowerText.includes(word))) {
      return { sentiment: 'critical', confidence: 0.9 };
    }
    
    if (highRiskKeywords.some(word => lowerText.includes(word))) {
      return { sentiment: 'negative', confidence: 0.8 };
    }
    
    const negativeCount = negativeKeywords.filter(word => lowerText.includes(word)).length;
    const positiveCount = positiveKeywords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return { sentiment: 'positive', confidence: Math.min(0.7 + (positiveCount * 0.1), 1.0) };
    } else if (negativeCount > positiveCount) {
      return { sentiment: 'negative', confidence: Math.min(0.6 + (negativeCount * 0.1), 1.0) };
    }
    
    return { sentiment: 'neutral', confidence: 0.5 };
  };

  const generateAIResponse = (input: string, previousMessages: Message[]): { content: string; riskLevel: ChatSession['riskLevel'] } => {
    const sentiment = analyzeSentiment(input);
    const lowercaseInput = input.toLowerCase();
    
    // Advanced response generation based on conversation context
    const recentMessages = previousMessages.slice(-3);
    const hasDiscussedTopic = (topic: string) => 
      recentMessages.some(msg => msg.content.toLowerCase().includes(topic));
    
    // Crisis detection
    if (sentiment.sentiment === 'critical') {
      return {
        content: "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to our crisis helpline immediately at 1800-XXX-XXXX or contact emergency services. You don't have to go through this alone - there are people who want to help you right now. Can I help you connect with a crisis counselor?",
        riskLevel: 'crisis'
      };
    }

    // High risk responses with context awareness
    if (sentiment.sentiment === 'negative' && sentiment.confidence > 0.7) {
      const responses = [
        "I hear that you're going through a really difficult time. These feelings are valid, and it's important that you reached out. Based on what you've shared, I'd strongly recommend connecting with one of our counselors who can provide more personalized support. In the meantime, let's work on some immediate coping strategies.",
        "Thank you for trusting me with these difficult feelings. When we're experiencing intense emotional pain, it can feel overwhelming. Let's break this down together - can you tell me about one small thing that brought you even a moment of peace recently?",
        "I can sense you're struggling deeply right now. That takes courage to share. Many students experience these intense feelings, especially during challenging times. Let's focus on getting you connected with additional support while we talk through some coping techniques."
      ];
      
      return {
        content: responses[Math.floor(Math.random() * responses.length)] + 
                "\n\nWould you like me to:\n• Guide you through a breathing exercise\n• Help you schedule a counseling session\n• Connect you with our crisis support team\n• Explore coping strategies that have helped others",
        riskLevel: 'high'
      };
    }

    // Context-aware responses for specific topics
    if (lowercaseInput.includes('exam') || lowercaseInput.includes('test') || lowercaseInput.includes('academic')) {
      if (hasDiscussedTopic('exam') || hasDiscussedTopic('academic')) {
        return {
          content: "I see we've been talking about academic stress. Let's build on what we discussed. Here are some specific strategies that many students find helpful:\n\n• **Time blocking**: Break study time into focused 25-minute chunks\n• **Active recall**: Test yourself instead of just re-reading\n• **Sleep hygiene**: Aim for 7-8 hours - your brain consolidates learning during sleep\n• **Perspective taking**: Remember that one exam doesn't define your worth or future\n\nWhich of these resonates most with your current situation?",
          riskLevel: sentiment.sentiment === 'negative' ? 'medium' : 'low'
        };
      } else {
        return {
          content: "Academic pressure can feel really intense, especially when exams are approaching. You're not alone in feeling this way - it's one of the most common concerns I hear about.\n\nLet's start with your breathing. Take a moment to breathe in for 4 counts, hold for 4, and exhale for 6. This activates your parasympathetic nervous system and helps reduce cortisol levels.\n\nWhat specific aspect of your academic situation is weighing on you most right now?",
          riskLevel: 'medium'
        };
      }
    }

    if (lowercaseInput.includes('sleep') || lowercaseInput.includes('insomnia') || lowercaseInput.includes('tired')) {
      return {
        content: "Sleep challenges can really impact everything else - your mood, concentration, and overall wellbeing. Let's work on some evidence-based sleep strategies:\n\n🌙 **Sleep Hygiene Tips:**\n• Keep a consistent sleep schedule (even on weekends)\n• Create a wind-down routine 1 hour before bed\n• Limit screens 30 minutes before sleep (blue light disrupts melatonin)\n• Keep your room cool (around 65-68°F)\n• Try progressive muscle relaxation\n\nWhat's your current bedtime routine like? Understanding your habits helps me give more personalized suggestions.",
        riskLevel: 'low'
      };
    }

    if (lowercaseInput.includes('anxious') || lowercaseInput.includes('anxiety') || lowercaseInput.includes('panic')) {
      return {
        content: "Anxiety can feel overwhelming, but there are effective techniques to help manage it. Let's try the **5-4-3-2-1 grounding technique**:\n\n• **5** things you can see around you\n• **4** things you can physically touch\n• **3** things you can hear\n• **2** things you can smell\n• **1** thing you can taste\n\nThis helps anchor you in the present moment. Anxiety often comes from our mind racing to future scenarios.\n\nCan you try this technique now and let me know how it feels? Also, is this a new feeling for you, or something you've experienced before?",
        riskLevel: 'medium'
      };
    }

    if (lowercaseInput.includes('lonely') || lowercaseInput.includes('alone') || lowercaseInput.includes('friends')) {
      return {
        content: "Feeling lonely, especially as a student, is more common than you might think. Many people struggle with this, particularly in new environments or during stressful times.\n\n**Some ways to build connections:**\n• Join study groups in your classes\n• Participate in campus clubs related to your interests\n• Consider our peer support forums - many students find meaningful connections there\n• Volunteer for causes you care about\n• Attend campus events, even if it feels uncomfortable at first\n\nSometimes we feel lonely even when surrounded by people. Can you tell me more about what loneliness feels like for you specifically?",
        riskLevel: sentiment.sentiment === 'negative' ? 'medium' : 'low'
      };
    }

    // Positive responses
    if (sentiment.sentiment === 'positive') {
      const positiveResponses = [
        "I'm so glad to hear you're feeling good! It's wonderful when we can recognize and appreciate these positive moments. What do you think has contributed to feeling this way?",
        "That's fantastic! Positive emotions are just as important to explore as difficult ones. What strategies or activities have been helping you maintain this positive state?",
        "It's great to hear some positivity in your message! These good feelings can be really valuable - they often give us insights into what works well for our mental health."
      ];
      
      return {
        content: positiveResponses[Math.floor(Math.random() * positiveResponses.length)] + 
                "\n\nWould you like to talk about what's going well, or is there something else on your mind?",
        riskLevel: 'low'
      };
    }

    // Default supportive responses with more depth
    const supportiveResponses = [
      "Thank you for sharing that with me. It takes courage to reach out and express what you're feeling. I'm here to listen and support you through this.",
      "I appreciate you opening up about this. Your feelings and experiences are valid, and I want to help you work through whatever you're facing.",
      "I can hear that you're going through something challenging right now. It's completely normal to have difficult times, and seeking support shows real strength.",
      "It sounds like you have a lot on your mind. Sometimes just talking through our thoughts and feelings can help us gain clarity and feel less overwhelmed."
    ];

    return {
      content: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)] + 
              "\n\nCan you tell me more about what's been on your mind lately? I'm here to listen and help however I can.",
      riskLevel: sentiment.sentiment === 'negative' ? 'medium' : 'low'
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeSession) return;

    const sentiment = analyzeSentiment(inputMessage);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      sentiment: sentiment.sentiment,
      confidence: sentiment.confidence
    };

    // Update the active session with the new message
    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { 
            ...session, 
            messages: [...session.messages, userMessage],
            lastActive: new Date()
          }
        : session
    ));
    
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date(),
        sentiment: 'neutral',
        confidence: 0.9
      };
      
      setSessions(prev => prev.map(session => 
        session.id === activeSessionId 
          ? { 
              ...session, 
              messages: [...session.messages, aiMessage],
              riskLevel: aiResponse.riskLevel,
              lastActive: new Date()
            }
          : session
      ));
      
      setIsTyping(false);
    }, 1500);

    setInputMessage('');
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: `Chat ${sessions.length + 1}`,
      messages: [
        {
          id: '1',
          content: "Hello! I'm here to provide emotional support and coping strategies. How are you feeling today?",
          sender: 'ai',
          timestamp: new Date(),
          sentiment: 'positive',
          confidence: 0.9
        }
      ],
      riskLevel: 'low',
      createdAt: new Date(),
      lastActive: new Date()
    };
    
    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSession.id);
    setShowSessions(false);
  };

  const deleteSession = (sessionId: string) => {
    if (sessions.length === 1) return; // Keep at least one session
    
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    
    if (activeSessionId === sessionId) {
      const remainingSession = sessions.find(s => s.id !== sessionId);
      if (remainingSession) {
        setActiveSessionId(remainingSession.id);
      }
    }
  };

  const exportChat = (format: 'text' | 'json') => {
    if (!activeSession) return;
    
    let content: string;
    let filename: string;
    let mimeType: string;
    
    if (format === 'json') {
      content = JSON.stringify(activeSession, null, 2);
      filename = `mindcare-chat-${activeSession.id}-${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
    } else {
      content = `MindCare Connect - Chat Session\n`;
      content += `Session: ${activeSession.title}\n`;
      content += `Date: ${activeSession.createdAt.toLocaleDateString()}\n`;
      content += `Risk Level: ${activeSession.riskLevel}\n`;
      content += `\n${'='.repeat(50)}\n\n`;
      
      activeSession.messages.forEach(message => {
        const sender = message.sender === 'user' ? 'You' : 'AI Support';
        const time = message.timestamp.toLocaleTimeString();
        content += `[${time}] ${sender}:\n${message.content}\n\n`;
      });
      
      filename = `mindcare-chat-${activeSession.id}-${new Date().toISOString().split('T')[0]}.txt`;
      mimeType = 'text/plain';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportOptions(false);
  };

  const getSentimentColor = (sentiment: Message['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'critical': return 'text-red-800';
      case 'neutral':
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 h-[700px] flex">
      {/* Sessions Sidebar */}
      <div className={`border-r border-gray-200 transition-all duration-300 ${showSessions ? 'w-80' : 'w-0 overflow-hidden'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Chat History</h3>
            <button
              onClick={createNewSession}
              className="text-sm bg-teal-600 text-white px-3 py-1 rounded-md hover:bg-teal-700"
            >
              New Chat
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-full">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                activeSessionId === session.id ? 'bg-teal-50 border-l-4 border-l-teal-600' : ''
              }`}
              onClick={() => setActiveSessionId(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 truncate">{session.title}</p>
                  <p className="text-xs text-gray-500">{session.lastActive.toLocaleDateString()}</p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                      session.riskLevel === 'crisis' ? 'bg-red-600' :
                      session.riskLevel === 'high' ? 'bg-orange-500' :
                      session.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></span>
                    <span className="text-xs text-gray-500 capitalize">{session.riskLevel} risk</span>
                  </div>
                </div>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setShowSessions(!showSessions)}
                className="mr-3 p-1 hover:bg-gray-100 rounded"
              >
                <History className="h-5 w-5 text-gray-600" />
              </button>
              <Bot className="h-6 w-6 text-teal-600 mr-2" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AI Mental Health Support</h2>
                <p className="text-sm text-gray-600">
                  {activeSession?.title} • {messages.length} messages
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {riskLevel !== 'low' && (
                <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  riskLevel === 'crisis' ? 'bg-red-100 text-red-700' :
                  riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {riskLevel === 'crisis' ? 'Crisis Detected' :
                   riskLevel === 'high' ? 'High Risk' : 'Medium Risk'}
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
                {showExportOptions && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => exportChat('text')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export as Text
                      </button>
                      <button
                        onClick={() => exportChat('json')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export as JSON
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Alert */}
        {riskLevel === 'crisis' && (
          <div className="bg-red-50 border-b border-red-200 p-4">
            <div className="flex items-center text-red-800">
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-medium">Crisis Support: Call 1800-XXX-XXXX immediately or text 988</span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                  {message.sender === 'ai' ? (
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-teal-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <div className={`flex items-center justify-between mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <p className="text-xs">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.sentiment && message.confidence && (
                      <div className="flex items-center ml-2">
                        <span className={`text-xs ${getSentimentColor(message.sentiment)}`}>
                          {message.sentiment} ({Math.round(message.confidence * 100)}%)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-teal-600" />
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputMessage.trim()}
              className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This AI provides general support and crisis detection. For emergencies, call 911 or your local crisis helpline.
          </p>
        </div>
      </div>
    </div>
  );
}