import type { Event, Sermon, Ministry, Testimonial, CounterData, VerseOfDay } from '@/types'

export const events: Event[] = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    date: new Date('2026-02-23'),
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly worship service with inspiring music and powerful preaching.',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop',
    category: 'worship',
    registrationRequired: false
  },
  {
    id: '2',
    title: 'Youth Night',
    date: new Date('2026-02-25'),
    time: '7:00 PM',
    location: 'Youth Center',
    description: 'An evening of fun, fellowship, and faith-building activities for teens.',
    image: 'https://plus.unsplash.com/premium_photo-1728302531385-7656460a6d8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91dGglMjBtaW5pc3RyeXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'youth',
    registrationRequired: true,
    maxAttendees: 50,
    currentAttendees: 32
  },
  {
    id: '3',
    title: 'Community Outreach',
    date: new Date('2026-02-28'),
    time: '9:00 AM',
    location: 'Downtown Community Center',
    description: 'Serving meals and sharing love with our community members in need.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
    category: 'outreach',
    registrationRequired: true,
    maxAttendees: 30,
    currentAttendees: 18
  },
  {
    id: '4',
    title: 'Prayer Meeting',
    date: new Date('2026-03-01'),
    time: '6:30 PM',
    location: 'Prayer Room',
    description: 'Come together in prayer for our church, community, and world.',
    image: 'https://media.istockphoto.com/id/2164159009/photo/christian-and-prayer-christian-group-of-people-holding-hands-praying-worships-together-to.webp?a=1&b=1&s=612x612&w=0&k=20&c=gX3so4YPOhTFcQujWHgcgsx-1Nm5lJYZ-J_6hx8M9xE=',
    category: 'prayer',
    registrationRequired: false
  }
]

export const sermons: Sermon[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    speaker: 'Pastor John Smith',
    date: new Date('2026-02-16'),
    duration: '45:30',
    description: 'Discover what it means to truly walk by faith and not by sight in our daily lives.',
    videoUrl: '',
    audioUrl: 'https://example.com/sermon1.mp3',
    series: 'Faith Journey',
    tags: ['faith', 'trust', 'spiritual growth'],
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop',
    scripture: 'Hebrews 11:1',
    downloads: 245,
    views: 1250
  },
  {
    id: '2',
    title: 'Love in Action',
    speaker: 'Pastor Sarah Johnson',
    date: new Date('2026-02-09'),
    duration: '38:15',
    description: 'How we can demonstrate God\'s love through our actions and service to others.',
    videoUrl: '',
    audioUrl: 'https://example.com/sermon2.mp3',
    series: 'Living Love',
    tags: ['love', 'service', 'community'],
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
    scripture: '1 John 4:7-8',
    downloads: 189,
    views: 980
  },
  {
    id: '3',
    title: 'Finding Hope in Difficult Times',
    speaker: 'Pastor Michael Brown',
    date: new Date('2026-02-02'),
    duration: '42:20',
    description: 'Discovering God\'s hope and peace even in the midst of life\'s challenges.',
    videoUrl: '',
    audioUrl: 'https://example.com/sermon3.mp3',
    series: 'Hope Anchored',
    tags: ['hope', 'peace', 'trials'],
    thumbnail: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&h=400&fit=crop',
    scripture: 'Romans 15:13',
    downloads: 312,
    views: 1450
  }
]

export const ministries: Ministry[] = [
  {
    id: '1',
    name: 'Children\'s Ministry',
    description: 'Nurturing young hearts and minds in God\'s love through engaging activities and biblical teaching.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop',
    leader: 'Lisa Anderson',
    contactEmail: 'children@gracechurch.com',
    meetingTime: 'Sundays 10:00 AM',
    location: 'Children\'s Wing',
    ageGroup: '0-12 years',
    memberCount: 85
  },
  {
    id: '2',
    name: 'Youth Ministry',
    description: 'Empowering teenagers to grow in faith, build lasting friendships, and discover their purpose.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop',
    leader: 'David Wilson',
    contactEmail: 'youth@gracechurch.com',
    meetingTime: 'Wednesdays 7:00 PM',
    location: 'Youth Center',
    ageGroup: '13-18 years',
    memberCount: 42
  },
  {
    id: '3',
    name: 'Worship Team',
    description: 'Leading the congregation in heartfelt worship through music and creative arts.',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop',
    leader: 'Rachel Martinez',
    contactEmail: 'worship@gracechurch.com',
    meetingTime: 'Thursdays 7:30 PM',
    location: 'Main Sanctuary',
    memberCount: 28
  },
  {
    id: '4',
    name: 'Community Outreach',
    description: 'Serving our local community through various outreach programs and charitable initiatives.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
    leader: 'Robert Taylor',
    contactEmail: 'outreach@gracechurch.com',
    meetingTime: 'Saturdays 9:00 AM',
    location: 'Community Center',
    memberCount: 35
  }
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Emily Rodriguez',
    content: 'Grace Church has been a beacon of hope in my life. The community here welcomed me with open arms, and I\'ve grown so much in my faith journey.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'Small Group Leader',
    date: new Date('2026-01-15'),
    featured: true
  },
  {
    id: '2',
    name: 'James Thompson',
    content: 'The youth ministry here changed my life. I found purpose, made lifelong friends, and discovered God\'s plan for my future.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Youth Member',
    date: new Date('2026-01-20'),
    featured: true
  },
  {
    id: '3',
    name: 'Maria Santos',
    content: 'After losing my husband, this church family surrounded me with love and support. I\'ve found healing and hope here.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'Widow\'s Ministry',
    date: new Date('2026-01-25'),
    featured: false
  },
  {
    id: '4',
    name: 'Daniel Kim',
    content: 'The men\'s ministry helped me become a better husband and father. The accountability and fellowship are incredible.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Men\'s Ministry',
    date: new Date('2026-02-01'),
    featured: true
  }
]

export const counters: CounterData[] = [
  {
    label: 'Active Members',
    value: 1250,
    icon: 'users',
    description: 'Growing church family'
  },
  {
    label: 'Lives Transformed',
    value: 450,
    icon: 'heart',
    description: 'Through God\'s grace'
  },
  {
    label: 'Community Meals Served',
    value: 15000,
    suffix: '+',
    icon: 'gift',
    description: 'Feeding those in need'
  },
  {
    label: 'Years of Ministry',
    value: 25,
    icon: 'calendar',
    description: 'Serving our community'
  }
]

export const verseOfTheDay: VerseOfDay = {
  verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.',
  reference: 'Jeremiah 29:11',
  date: new Date('2026-02-20')
}