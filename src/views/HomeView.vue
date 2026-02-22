<template>
  <div class="min-h-screen bg-white">     
    <!-- Navigation -->
    <Navbar 
      @open-daily-sidebar="showDailySidebar = true"
    />

    <!-- Main Content -->
    <main>
      <HeroSection 
        @join-service="handleJoinService"
        @donate="handleDonate"
        @watch-sermons="scrollToSermons"
      />
      <MissionSection />
      <MinistriesSection />
      <EventsSection />
      <SermonLibrary />
      <TestimonialsSection />
      <CountersSection />
      <VerseOfTheDay />
      <ContactSection />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Daily Word Sidebar -->
    <DailyWordSidebar 
      :is-open="showDailySidebar" 
      @close="handleCloseDailySidebar"
    />

    <!-- Modals -->
    <ModalVideo 
      v-if="showVideoModal" 
      :video-url="currentVideoUrl"
      @close="showVideoModal = false" 
    />

    <!-- Floating Action Buttons -->
    <div class="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
      <!-- Live Service Button -->
      <button 
        v-if="isLiveServiceActive"
        @click="joinLiveService"
        class="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        <PlayIcon class="w-6 h-6" />
      </button>
      
      <!-- Prayer Request Button -->
      <router-link 
        to="/prayer-request"
        class="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg block"
      >
        <HandRaisedIcon class="w-6 h-6" />
      </router-link>
      
      <!-- Scroll to Top Button -->
      <button 
        v-if="showScrollTop"
        @click="scrollToTop"
        class="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg"
      >
        <ChevronUpIcon class="w-6 h-6" />
      </button>
    </div>

    <!-- Toast Notifications -->
    <div 
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 bg-white border-l-4 border-primary-600 rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div class="flex items-center">
        <CheckCircleIcon class="w-6 h-6 text-green-600 mr-3" />
        <div>
          <p class="font-semibold text-gray-900">{{ toast.title }}</p>
          <p class="text-gray-600 text-sm">{{ toast.message }}</p>
        </div>
        <button 
          @click="toast.show = false"
          class="ml-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  PlayIcon, 
  HandRaisedIcon, 
  ChevronUpIcon, 
  CheckCircleIcon, 
  XMarkIcon 
} from '@heroicons/vue/24/outline'
import { useScrollReveal } from '../composables/useScrollReveal'

// Components
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import MissionSection from '../components/sections/MissionSection.vue'
import MinistriesSection from '../components/sections/MinistriesSection.vue'
import EventsSection from '../components/sections/EventsSection.vue'
import SermonLibrary from '../components/sections/SermonLibrary.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import CountersSection from '../components/sections/CountersSection.vue'
import VerseOfTheDay from '../components/sections/VerseOfTheDay.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'
import ModalVideo from '../components/ui/ModalVideo.vue'

// State
const showDailySidebar = ref(false)
const showVideoModal = ref(false)
const currentVideoUrl = ref('')
const isLiveServiceActive = ref(false)
const showScrollTop = ref(false)

const toast = ref({
  show: false,
  title: '',
  message: ''
})

// Scroll handling
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500
}

// Event handlers
const handleJoinService = () => {
  showToast('Service Information', 'Redirecting to service registration...')
  // Handle join service logic
}

const handleDonate = () => {
  showToast('Donation', 'Opening secure donation portal...')
  // Handle donation logic
}

const handleOpenDailySidebar = () => {
  console.log('handleOpenDailySidebar called')
  showDailySidebar.value = true
  console.log('showDailySidebar is now:', showDailySidebar.value)
}

const handleCloseDailySidebar = () => {
  console.log('handleCloseDailySidebar called')
  showDailySidebar.value = false
  console.log('showDailySidebar is now:', showDailySidebar.value)
}


const scrollToSermons = () => {
  const element = document.querySelector('#sermons')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handlePlaySermon = (sermon: any) => {
  if (sermon.videoUrl) {
    currentVideoUrl.value = sermon.videoUrl
    showVideoModal.value = true
  }
}

const joinLiveService = () => {
  showToast('Live Service', 'Joining live stream...')
  // Handle live service join
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showToast = (title: string, message: string) => {
  toast.value = { show: true, title, message }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

// Lifecycle
onMounted(() => {
  useScrollReveal()
  window.addEventListener('scroll', handleScroll)
  
  // Check for live service status
  const now = new Date()
  const serviceTime = new Date()
  serviceTime.setHours(10, 0, 0, 0) // 10 AM service
  
  const timeDiff = Math.abs(now.getTime() - serviceTime.getTime())
  const hoursDiff = timeDiff / (1000 * 60 * 60)
  
  isLiveServiceActive.value = hoursDiff < 2 // Show if within 2 hours of service
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>