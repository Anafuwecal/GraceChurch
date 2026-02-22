<template>
  <div class="min-h-screen bg-white">
    <Navbar @open-daily-sidebar="showDailySidebar = true" />
    
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span class="text-primary-600">Ministries</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover opportunities to grow in faith, serve others, and build meaningful 
            relationships through our diverse ministry programs.
          </p>
        </div>
      </div>
    </section>

    <!-- Ministry Categories -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-6 py-2 rounded-full font-medium transition-all duration-200"
            :class="[
              selectedCategory === category 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Ministries Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="ministry in filteredMinistries" 
            :key="ministry.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="ministry.image" 
                :alt="ministry.name"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              >
              <div class="absolute top-4 left-4">
                <span class="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ ministry.category }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ ministry.name }}</h3>
              <p class="text-gray-600 mb-4">{{ ministry.description }}</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-500">
                  <ClockIcon class="w-4 h-4 mr-2 text-primary-600" />
                  <span>{{ ministry.meetingTime }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <MapPinIcon class="w-4 h-4 mr-2 text-primary-600" />
                  <span>{{ ministry.location }}</span>
                </div>
                <div v-if="ministry.ageGroup" class="flex items-center text-sm text-gray-500">
                  <UsersIcon class="w-4 h-4 mr-2 text-primary-600" />
                  <span>{{ ministry.ageGroup }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm text-gray-500">Led by</p>
                  <p class="font-semibold text-gray-900">{{ ministry.leader }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-500">Members</p>
                  <p class="font-semibold text-primary-600">{{ ministry.memberCount }}</p>
                </div>
              </div>

              <div class="flex space-x-2">
                <button class="flex-1 btn-primary text-sm py-2">
                  Join Ministry
                </button>
                <button 
                  class="btn-secondary text-sm py-2 px-4"
                  @click="contactLeader(ministry)"
                >
                  <EnvelopeIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Get Involved CTA -->
    <section class="section-padding bg-primary-600 text-white">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Involved?</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join one of our ministries and become part of a community that's making a difference.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/contact" class="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact Us
          </router-link>
          <router-link to="/events" class="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-all">
            View Events
          </router-link>
        </div>
      </div>
    </section>

    <Footer />
    <DailyWordSidebar :is-open="showDailySidebar" @close="showDailySidebar = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ClockIcon, MapPinIcon, UsersIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'

const showDailySidebar = ref(false)
const selectedCategory = ref('All')

const categories = ['All', 'Children', 'Youth', 'Adults', 'Seniors', 'Music', 'Outreach']

const ministries = ref([
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
    memberCount: 85,
    category: 'Children'
  },
  {
    id: '2',
    name: 'Youth Ministry',
    description: 'Empowering teenagers to grow in faith, build lasting friendships, and discover their purpose.',
    image: 'https://images.unsplash.com/photo-1593896385987-16bcbf9451e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91dGglMjBtaW5pc3RyeXxlbnwwfHwwfHx8MA%3D%3D',
    leader: 'David Wilson',
    contactEmail: 'youth@gracechurch.com',
    meetingTime: 'Wednesdays 7:00 PM',
    location: 'Youth Center',
    ageGroup: '13-18 years',
    memberCount: 42,
    category: 'Youth'
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
    memberCount: 28,
    category: 'Music'
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
    memberCount: 35,
    category: 'Outreach'
  },
  {
    id: '5',
    name: 'Men\'s Ministry',
    description: 'Building strong Christian men through fellowship, accountability, and service.',
    image: 'https://media.istockphoto.com/id/1484840207/photo/pastor-stand-preaching-with-arms-raised-in-front-of-congregation.webp?a=1&b=1&s=612x612&w=0&k=20&c=pcNa7f2L0kRjVrrPzfH6oeM8JPZQBOdchbxUkL43ads=',
    leader: 'Mark Johnson',
    contactEmail: 'men@gracechurch.com',
    meetingTime: 'Saturdays 7:00 AM',
    location: 'Fellowship Hall',
    ageGroup: '18+ years',
    memberCount: 24,
    category: 'Adults'
  },
  {
    id: '6',
    name: 'Women\'s Ministry',
    description: 'Encouraging women to grow in faith and build meaningful relationships.',
    image: 'https://plus.unsplash.com/premium_photo-1661443962880-5cd6783bcf3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBtaW5pc3RyeXxlbnwwfHwwfHx8MA%3D%3D',
    leader: 'Jennifer Smith',
    contactEmail: 'women@gracechurch.com',
    meetingTime: 'Tuesdays 10:00 AM',
    location: 'Conference Room',
    ageGroup: '18+ years',
    memberCount: 38,
    category: 'Adults'
  }
])

const filteredMinistries = computed(() => {
  if (selectedCategory.value === 'All') {
    return ministries.value
  }
  return ministries.value.filter(ministry => ministry.category === selectedCategory.value)
})

const contactLeader = (ministry: any) => {
  window.location.href = `mailto:${ministry.contactEmail}?subject=Interest in ${ministry.name}`
}
</script>