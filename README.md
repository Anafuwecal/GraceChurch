# Grace Church Website

A modern, responsive church website built with Vue 3, TypeScript, and Tailwind CSS. Features a clean design with red, white, and black color scheme, smooth animations, and comprehensive church management features.


##  Features

### Core Functionality
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, accessible design with smooth animations
- **SEO Optimized** - Structured data and meta tags for better search visibility
- **Fast Performance** - Optimized images, lazy loading, and efficient code splitting

### Church-Specific Features
- **Hero Section** - Dynamic background with service countdown and live indicators
- **Sermon Library** - Searchable video/audio sermons with filtering and pagination
- **Event Management** - Upcoming events with registration and calendar integration
- **Ministry Directory** - Comprehensive ministry information with contact details
- **Prayer Requests** - Secure, confidential prayer submission system
- **Daily Word Sidebar** - Verse of the day, devotions, and quick access features
- **Contact Forms** - Multiple contact methods with form validation
- **Testimonials** - Member stories and experiences
- **Live Counters** - Church impact statistics with animations

### Technical Features
- **Vue 3 Composition API** - Modern reactive framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vue Router** - Client-side routing
- **Responsive Images** - Optimized loading with placeholder support
- **Accessibility** - WCAG compliant with keyboard navigation
- **Progressive Web App** - Installable with offline capabilities

##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/grace-church-website.git
   cd grace-church-website

   **Install dependencies**
   npm install

   **Start development server**
   npm run dev

   **Open your browser**
   Navigate to http://localhost:5173

   **Project Structure**

   grace-church-website/
├── public/                 # Static assets
│   ├── images/            # Image assets
│   ├── videos/            # Video assets
│   ├── favicon.svg        # Website icon
│   └── index.html         # HTML template
├── src/
│   ├── assets/            # Compiled assets
│   │   └── main.css       # Global styles
│   ├── components/        # Vue components
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── AnimatedText.vue
│   │   │   ├── EventCard.vue
│   │   │   ├── SermonCard.vue
│   │   │   ├── Counter.vue
│   │   │   ├── ModalVideo.vue
│   │   │   └── DailyWordSidebar.vue
│   │   ├── sections/      # Page sections
│   │   │   ├── HeroSection.vue
│   │   │   ├── MissionSection.vue
│   │   │   ├── MinistriesSection.vue
│   │   │   ├── EventsSection.vue
│   │   │   ├── SermonLibrary.vue
│   │   │   ├── TestimonialsSection.vue
│   │   │   ├── CountersSection.vue
│   │   │   ├── VerseOfTheDay.vue
│   │   │   └── ContactSection.vue
│   │   └── layout/        # Layout components
│   │       ├── Navbar.vue
│   │       └── Footer.vue
│   ├── composables/       # Vue composables
│   │   ├── useScrollReveal.ts
│   │   ├── useCounter.ts
│   │   └── useIntersectionObserver.ts
│   ├── data/              # Mock data and constants
│   │   └── mockData.ts
│   ├── router/            # Vue Router configuration
│   │   └── index.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── views/             # Page components
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── MinistriesView.vue
│   │   ├── EventsView.vue
│   │   ├── SermonsView.vue
│   │   ├── ContactView.vue
│   │   └── PrayerRequestView.vue
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation

# Available Scripts

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run type-check   # TypeScript type checking
npm run lint         # ESLint code linting
npm run format       # Prettier code formatting

# Testing (if implemented)
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests

# Design System

# Color Palette

**Primary Red** : #dc2626 - Main brand color
**Dark Red** : #b91c1c - Hover states and accents
**Light Red** : #ef4444 - Backgrounds and highlights
**White** : #ffffff - Text and backgrounds
**Gray Scale** : #f8fafc to #1f2937 - Supporting colors

# Typography

**Headings** : Playfair Display (serif)
**Body Text** : Inter (sans-serif)
**Font Weights** : 300, 400, 500, 600, 700, 800, 900

# Components

**Buttons** : Primary, secondary, and outline variants
**Cards** : Consistent shadow and border radius
**Forms** : Accessible inputs with validation states
**Navigation** : Responsive with smooth transitions

# Responsive Breakpoints

sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */

# Configuration

# Environment Variables

Create a .env file in the root directory:

# API Configuration
VITE_API_BASE_URL=https://api.gracechurch.com
VITE_CONTACT_EMAIL=info@gracechurch.com

# External Services
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id

# Customization

# Colors

Update tailwind.config.js to change the color scheme:

theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef2f2',
        // ... your custom colors
        600: '#dc2626', // Main brand color
        // ...
      }
    }
  }
}

# Content

Update mock data in src/data/mockData.ts:

.Church information
.Service times
.Staff details
.Event listings
.Sermon content

# Deployment

# Netlify

.Connect your GitHub repository
.Set build command: npm run build
.Set publish directory: dist
.Deploy!

# Vercel
npm i -g vercel
vercel

# Traditional Hosting

npm run build
# Upload contents of 'dist' folder to your web server

# Security Considerations

.Form Validation: Client and server-side validation
.HTTPS: Always use HTTPS in production
.Environment Variables: Never commit sensitive data
.Content Security Policy: Implement CSP headers
.Input Sanitization: Sanitize all user inputs

#  Accessibility Features

.Keyboard Navigation: Full keyboard support
.Screen Reader Support: Proper ARIA labels and roles
.Color Contrast: WCAG AA compliant contrast ratios
.Focus Management: Visible focus indicators
.Semantic HTML: Proper heading hierarchy and landmarks

#  Testing

Unit Tests (Recommended setup)
npm install -D vitest @vue/test-utils

# E2E Tests (Recommended setup)

npm install -D cypress

# Performance Optimization

.Image Optimization: WebP format with fallbacks
.Code Splitting: Route-based code splitting
.Lazy Loading: Images and components
.Caching: Browser and CDN caching strategies
.Bundle Analysis: Use npm run build -- --analyze

# Contributing

.Fork the repository
.Create a feature branch (git checkout -b feature/amazing-feature)
.Commit your changes (git commit -m 'Add amazing feature')
.Push to the branch (git push origin feature/amazing-feature)
.Open a Pull Request

# Development Guidelines

.Follow TypeScript best practices
.Use Composition API for new components
.Maintain consistent code formatting
.Write descriptive commit messages
.Test your changes thoroughly

# License

.This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgments

.Vue.js Team - For the amazing framework
.Tailwind CSS - For the utility-first CSS framework
.Heroicons - For the beautiful icon set
.Unsplash - For placeholder images
.Church Community - For inspiration and feedback

# Support

For support and questions:

.Email: support@gracechurch.com
.Phone: (123) 456-7890
.Issues: GitHub Issues

# Roadmap

# Phase 1 (Current)

. Basic website structure
. Responsive design
. Core pages and components
. Prayer request system

# Phase 2 (Planned)
 
.User authentication
. Member portal
. Online giving integration
. Event registration system
. Newsletter management

# Phase 3 (Future)

.Mobile app
.Live streaming integration
.Advanced analytics
.Multi-language support
.CMS integration

