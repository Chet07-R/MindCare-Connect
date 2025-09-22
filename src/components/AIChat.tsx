import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Phone, Download, History, MoreVertical, Trash2, Sparkles, Heart, Zap } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 h-[600px] flex overflow-hidden">
      {/* Sessions Sidebar */}
      <div className={`border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 ${showSessions ? 'w-80' : 'w-0 overflow-hidden'}`}>
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
                <History className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Chat History</h3>
            </div>
            <button
              onClick={createNewSession}
              className="group flex items-center space-x-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 py-1.5 rounded-xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Sparkles className="h-3 w-3" />
              <span className="text-xs font-medium">New Chat</span>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto h-full bg-white/50 dark:bg-gray-800/50">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group p-3 border-b border-gray-100/50 dark:border-gray-700/50 cursor-pointer hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 dark:hover:from-teal-900/20 dark:hover:to-blue-900/20 transition-all duration-300 ${
                activeSessionId === session.id ? 'bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 border-l-4 border-l-gradient-to-b border-l-teal-500' : ''
              }`}
              onClick={() => setActiveSessionId(session.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">{session.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{session.lastActive.toLocaleDateString()}</p>
                  <div className="flex items-center mt-2">
                    <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                      session.riskLevel === 'crisis' ? 'bg-red-500 shadow-lg shadow-red-500/50' :
                      session.riskLevel === 'high' ? 'bg-orange-500 shadow-lg shadow-orange-500/50' :
                      session.riskLevel === 'medium' ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' : 'bg-green-500 shadow-lg shadow-green-500/50'
                    }`}></div>
                    <span className={`text-xs font-medium capitalize px-2 py-1 rounded-full ${
                      session.riskLevel === 'crisis' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                      session.riskLevel === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                      session.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>{session.riskLevel} risk</span>
                  </div>
                </div>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
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
        <div className="border-b border-gray-200/50 dark:border-gray-700/50 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setShowSessions(!showSessions)}
                className="mr-3 p-2 hover:bg-white/80 dark:hover:bg-gray-600/50 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <History className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur-lg opacity-30"></div>
                <div className="relative p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl">
                  <Bot className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">AI Mental Health Support</h2>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                  <span>{activeSession?.title}</span>
                  <span>•</span>
                  <span>{messages.length} messages</span>
                  <Zap className="h-3 w-3 text-yellow-500" />
                  <span className="text-yellow-600 dark:text-yellow-400">AI-Powered</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {riskLevel !== 'low' && (
                <div className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-medium shadow-lg animate-pulse ${
                  riskLevel === 'crisis' ? 'bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-700 dark:text-red-300 shadow-red-500/25' :
                  riskLevel === 'high' ? 'bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 shadow-orange-500/25' :
                  'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-700 dark:text-yellow-300 shadow-yellow-500/25'
                }`}>
                  <AlertCircle className="h-3 w-3 mr-1.5" />
                  {riskLevel === 'crisis' ? 'Crisis Detected' :
                   riskLevel === 'high' ? 'High Risk' : 'Medium Risk'}
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  className="p-2 hover:bg-white/80 dark:hover:bg-gray-600/50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                {showExportOptions && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl z-10">
                    <div className="py-2">
                      <button
                        onClick={() => exportChat('text')}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 dark:hover:from-blue-900/20 dark:hover:to-teal-900/20 transition-all duration-300 rounded-xl mx-2"
                      >
                        <Download className="h-4 w-4 mr-3 text-blue-500" />
                        Export as Text
                      </button>
                      <button
                        onClick={() => exportChat('json')}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 dark:hover:from-blue-900/20 dark:hover:to-teal-900/20 transition-all duration-300 rounded-xl mx-2"
                      >
                        <Download className="h-4 w-4 mr-3 text-blue-500" />
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
          <div className="bg-gradient-to-r from-red-50/90 to-pink-50/90 dark:from-red-900/30 dark:to-pink-900/30 border-b border-red-200/60 dark:border-red-800/60 p-6 backdrop-blur-sm shadow-lg animate-pulseSoft">
            <div className="flex items-center text-red-800 dark:text-red-300">
              <div className="flex-shrink-0 p-2 bg-red-100/80 dark:bg-red-800/40 rounded-full mr-3 animate-pulse">
                <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <span className="font-semibold text-base">Crisis Support Available</span>
                <p className="text-sm mt-1 font-medium">Call 1800-XXX-XXXX immediately or text 988</p>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex animate-fadeIn ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                  {message.sender === 'ai' ? (
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-800/40 dark:to-emerald-800/40 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <Bot className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/40 dark:to-indigo-800/40 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>
                <div
                  className={`px-5 py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white'
                      : 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/80 dark:to-gray-700/80 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-600/30'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  <div className={`flex items-center justify-between mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <p className="text-xs font-medium">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.sentiment && message.confidence && (
                      <div className="flex items-center ml-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm ${getSentimentColor(message.sentiment)}`}>
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
            <div className="flex justify-start animate-fadeIn">
              <div className="flex max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-800/40 dark:to-emerald-800/40 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Bot className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/80 dark:to-gray-700/80 px-5 py-3 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30">
                  <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2.5 h-2.5 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300/50 dark:border-gray-600/50 rounded-xl px-4 py-2.5 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-xl"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputMessage.trim()}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white p-2.5 rounded-xl hover:from-teal-700 hover:to-emerald-700 dark:hover:from-teal-600 dark:hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            This AI provides general support and crisis detection. For emergencies, call 911 or your local crisis helpline.
          </p>
        </div>
      </div>
    </div>
  );
}