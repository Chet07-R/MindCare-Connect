# 🧠 MindCare-Connect

<div align="center">

![MindCare-Connect Logo](https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop&auto=format&q=80)

**A Modern Mental Health Platform for Students**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.57.4-3ECF8E.svg)](https://supabase.com/)

[Live Demo](http://localhost:5173) | [Documentation](#documentation) | [Contributing](#contributing)

</div>

---

## 🌟 Overview

MindCare-Connect is a comprehensive mental health platform designed specifically for students and educational institutions. It provides a safe, accessible, and modern environment for mental health support, resources, and community interaction.

### 🎯 Mission
To break down barriers to mental health care in educational settings by providing students with immediate access to resources, professional support, and peer communities.

---

## ✨ Features

### 🏠 **Dashboard**
- **Personalized Overview**: Quick access to important metrics and activities
- **Quick Actions**: Instant access to frequently used features
- **Smart Notifications**: Real-time updates on appointments, messages, and resources
- **Progress Tracking**: Visual representation of mental health journey
- **Dark Mode Support**: Comfortable viewing in any lighting condition

### 🤖 **AI Chat Assistant**
- **24/7 Support**: Always available AI-powered mental health assistant
- **Natural Conversations**: Advanced natural language processing
- **Crisis Detection**: Automatic identification of urgent situations
- **Resource Recommendations**: Personalized suggestions based on conversations
- **Privacy-First**: All conversations are encrypted and secure

### 📚 **Resources Library**
- **Evidence-Based Content**: Curated by mental health professionals
- **Multiple Formats**: Articles, videos, audio content, and interactive PDFs
- **Smart Search**: Advanced filtering and search capabilities
- **Personalized Recommendations**: Content tailored to individual needs
- **Progress Tracking**: Mark resources as completed and track learning

### 📅 **Booking System**
- **Easy Scheduling**: Book appointments with counselors and therapists
- **Calendar Integration**: Sync with personal calendars
- **Reminder System**: Automated reminders for upcoming appointments
- **Virtual Sessions**: Integrated video calling for remote consultations
- **Professional Profiles**: Detailed information about available professionals

### 👥 **Peer Support Forum**
- **Anonymous Posting**: Safe space for sharing experiences
- **Moderated Environment**: Professional oversight for safety
- **Topic Categories**: Organized discussions on various mental health topics
- **Support Groups**: Scheduled group sessions and discussions
- **Peer Mentorship**: Connect with students who've had similar experiences

### 🆘 **Crisis Help**
- **Emergency Contacts**: Quick access to crisis hotlines and emergency services
- **Safety Planning**: Interactive tools for creating personal safety plans
- **Immediate Resources**: Instant access to crisis intervention resources
- **Location-Based Services**: Find nearby emergency mental health services
- **24/7 Availability**: Always accessible when needed most

### 📊 **Analytics Dashboard**
- **Progress Visualization**: Charts and graphs showing mental health journey
- **Usage Statistics**: Track engagement with various platform features
- **Mood Tracking**: Daily mood logging with trend analysis
- **Goal Setting**: Set and track personal mental health goals
- **Professional Insights**: Share anonymized data with counselors (with consent)

### 👤 **User Profiles**
- **Personalized Settings**: Customize experience based on preferences
- **Privacy Controls**: Granular control over data sharing and visibility
- **Academic Integration**: Connect with institutional student services
- **Multi-Language Support**: Available in multiple languages
- **Accessibility Features**: Screen reader support and keyboard navigation

---

## 🛠️ Tech Stack

### **Frontend**
- **[React 18.3.1](https://reactjs.org/)** - Modern UI library with concurrent features
- **[TypeScript 5.5.3](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vite 5.4.2](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable SVG icons

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - Open-source Firebase alternative
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Authentication & authorization
  - Edge functions

### **Development Tools**
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linting
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Automatic vendor prefixing

### **Architecture Patterns**
- **Component-Based Architecture** - Modular, reusable React components
- **Context API** - State management for authentication and themes
- **Custom Hooks** - Reusable logic for data fetching and state management
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Progressive Web App (PWA)** - Offline capabilities and mobile optimization

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chet07-R/MindCare-Connect.git
   cd MindCare-Connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```



### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
MindCare-Connect/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── AIChat.tsx     # AI chat interface
│   │   ├── Analytics.tsx  # Analytics dashboard
│   │   ├── BookingSystem.tsx
│   │   ├── CrisisHelp.tsx
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   ├── MentalHealthBlog.tsx
│   │   ├── Navigation.tsx # Navigation component
│   │   ├── PeerSupport.tsx
│   │   ├── Resources.tsx  # Resources library
│   │   ├── TestimonialsAndStories.tsx
│   │   ├── UserProfile.tsx
│   │   └── WellnessChallenges.tsx
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── DataContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/               # Utility libraries
│   │   └── supabase.ts    # Supabase client
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── package.json
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md
```

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Purple to Blue gradient (`from-purple-600 to-blue-600`)
- **Secondary**: Teal (`teal-600`)
- **Accent**: Yellow (`yellow-500`)
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Green (success), Red (error), Blue (info)

### **Typography**
- **Headings**: Font weights from 600-900
- **Body**: Regular (400) and medium (500) weights
- **Interactive**: Semi-bold (600) for buttons and links

### **Components**
- **Rounded corners**: 12px-24px for modern look
- **Shadows**: Layered shadows for depth
- **Gradients**: Subtle gradients for visual appeal
- **Animations**: Smooth transitions and hover effects

---

## 📊 Development Progress

### ✅ **Completed Features**

#### 🏠 Dashboard Enhancement
- [x] Modern gradient design with glass morphism effects
- [x] Interactive stats cards with hover animations
- [x] Quick action buttons with proper navigation
- [x] Responsive grid layout for all screen sizes
- [x] Dark mode support with smooth transitions

#### 📚 Resources Library (Recently Enhanced)
- [x] Beautiful hero section with gradient typography
- [x] Advanced search functionality with real-time filtering
- [x] Category filter pills with resource counts
- [x] Featured resources banner with special highlighting
- [x] Enhanced resource cards with:
  - Smooth hover animations and scaling effects
  - Color-coded type badges (article, video, audio, PDF)
  - Star ratings and view count displays
  - Author attribution and metadata
  - Gradient action buttons with micro-interactions
- [x] Professional dark mode implementation
- [x] Responsive design optimized for all devices
- [x] Error handling with graceful image fallbacks
- [x] Empty state messaging for better UX

### 🔄 **In Progress**

#### 🤖 AI Chat Enhancement
- [ ] Modern chat interface with bubble animations
- [ ] Typing indicators and message status
- [ ] File upload capabilities
- [ ] Voice message support
- [ ] Dark mode chat themes

#### 📅 Booking System Modernization
- [ ] Calendar UI with month/week/day views
- [ ] Professional profile cards
- [ ] Advanced filtering and search
- [ ] Automated reminder system
- [ ] Video call integration

### 📋 **Upcoming Features**

#### 👥 Peer Support Forum
- [ ] Modern post cards with engagement metrics
- [ ] Real-time messaging and notifications
- [ ] Advanced moderation tools
- [ ] Topic tagging and categorization
- [ ] Anonymous posting options

#### 🆘 Crisis Help Enhancement
- [ ] Emergency contact cards with quick actions
- [ ] Location-based service finder
- [ ] Safety planning tools
- [ ] Crisis chatbot integration
- [ ] Professional crisis intervention features

#### 📊 Analytics Dashboard
- [ ] Interactive charts and visualizations
- [ ] Mood tracking with trend analysis
- [ ] Goal setting and progress tracking
- [ ] Usage analytics and insights
- [ ] Export and sharing capabilities

#### 🔧 Additional Enhancements
- [ ] User Profile customization
- [ ] Mental Health Blog platform
- [ ] Testimonials and Success Stories
- [ ] Wellness Challenges gamification
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1 AA compliance)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### **Code Style**
- Follow the existing TypeScript and React patterns
- Use Tailwind CSS for styling
- Ensure responsive design for all components
- Include proper TypeScript types
- Add JSDoc comments for complex functions

### **Commit Guidelines**
- Use conventional commit format
- Examples:
  - `feat: add crisis help emergency contacts`
  - `fix: resolve mobile navigation issue`
  - `docs: update API documentation`
  - `style: improve button hover animations`

---

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

---

## 🔒 Privacy & Security

- **End-to-end encryption** for sensitive communications
- **HIPAA compliance** considerations for health data
- **Row Level Security** in Supabase for data protection
- **Anonymous usage** options for privacy-conscious users
- **Regular security audits** and updates

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mental Health Professionals** who provided guidance on best practices
- **Students** who shared their experiences and feedback
- **Open Source Community** for the amazing tools and libraries
- **Educational Institutions** supporting mental health initiatives

---

## 📞 Support

- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues](https://github.com/Chet07-R/MindCare-Connect/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Chet07-R/MindCare-Connect/discussions)
- **Email**: support@mindcare-connect.com

---

## 🗺️ Roadmap

### **Phase 1: Foundation** ✅
- Basic component structure
- Authentication system
- Core navigation
- Database setup

### **Phase 2: Core Features** 🔄
- Enhanced UI/UX for all components
- AI Chat integration
- Booking system implementation
- Resources library completion

### **Phase 3: Advanced Features** 📋
- Real-time messaging
- Video calling integration
- Advanced analytics
- Mobile app development

### **Phase 4: Scale & Optimize** 🚀
- Performance optimization
- Accessibility enhancements
- Multi-language support
- Enterprise features

---

<div align="center">

**Made with ❤️ for Mental Health Awareness**

[⭐ Star this repo](https://github.com/Chet07-R/MindCare-Connect) | [🐛 Report Bug](https://github.com/Chet07-R/MindCare-Connect/issues) | [✨ Request Feature](https://github.com/Chet07-R/MindCare-Connect/issues)

</div>