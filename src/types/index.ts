export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  image: string;
  category: 'worship' | 'youth' | 'outreach' | 'conference' | 'prayer';
  registrationRequired: boolean;
  maxAttendees?: number;
  currentAttendees?: number;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: Date;
  duration: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript?: string;
  series: string;
  tags: string[];
  thumbnail: string;
  scripture: string;
  downloads: number;
  views: number;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  image: string;
  leader: string;
  contactEmail: string;
  meetingTime: string;
  location: string;
  ageGroup?: string;
  memberCount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  image: string;
  role?: string;
  date: Date;
  featured: boolean;
}

export interface CounterData {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
  description?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone';
}

export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  interests: string[];
}

export interface VerseOfDay {
  verse: string;
  reference: string;
  date: Date;
}