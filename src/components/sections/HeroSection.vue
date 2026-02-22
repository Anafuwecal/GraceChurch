<template>
  <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image (since video might not work in development) -->
    <div class="absolute inset-0 z-0">
      <div 
        class="w-full h-full bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop')"
      ></div>
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Parallax Content -->
    <div 
      class="relative z-10 text-center text-white max-w-5xl mx-auto px-4"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    >
      <AnimatedText 
        :text="heroTitle" 
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
        :delay="0.2"
      />
      <AnimatedText 
        :text="heroSubtitle" 
        class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed px-2"
        :delay="0.4"
      />
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up px-2" style="animation-delay: 0.6s;">
        <button 
          class="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl w-full sm:w-auto"
          @click="$emit('join-service')"
        >
          <CalendarIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
          Join Service
        </button>
        <button 
          class="btn-secondary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 text-white border-white hover:bg-white hover:text-gray-900 w-full sm:w-auto"
          @click="$emit('donate')"
        >
          <HeartIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
          Donate
        </button>
        <button 
          class="btn-secondary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 text-white border-white hover:bg-white hover:text-gray-900 w-full sm:w-auto"
          @click="$emit('watch-sermons')"
        >
          <PlayIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
          Watch Sermons
        </button>
      </div>

      <!-- Live Service Indicator -->
      <div v-if="isLiveServiceActive" class="mt-6 sm:mt-8 animate-pulse">
        <div class="inline-flex items-center bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
          <div class="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mr-2 sm:mr-3 animate-ping"></div>
          <span class="font-semibold">LIVE NOW - Join Our Service</span>
        </div>
      </div>

      <!-- Service Countdown -->
      <div v-else-if="nextServiceCountdown" class="mt-6 sm:mt-8">
        <div class="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 sm:p-6 inline-block">
          <p class="text-xs sm:text-sm text-gray-300 mb-2">Next Service In:</p>
          <div class="flex space-x-2 sm:space-x-4 text-center">
            <div v-for="(unit, key) in nextServiceCountdown" :key="key" class="flex flex-col">
              <span class="text-lg sm:text-xl lg:text-2xl font-bold">{{ unit.value }}</span>
              <span class="text-xs text-gray-300 uppercase">{{ unit.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { 
  CalendarIcon, 
  HeartIcon, 
  PlayIcon, 
  ChevronDownIcon 
} from '@heroicons/vue/24/outline'
import AnimatedText from '@/components/ui/AnimatedText.vue'

const heroTitle = ref("Welcome to Grace Church")
const heroSubtitle = ref("A place where faith, hope, and love come together in community")
const parallaxOffset = ref(0)
const isLiveServiceActive = ref(false)
const nextServiceTime = ref(new Date('2026-02-23T10:00:00'))

defineEmits(['join-service', 'donate', 'watch-sermons'])

// Parallax effect
const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.5
}

// Countdown to next service
const nextServiceCountdown = computed(() => {
  const now = new Date()
  const diff = nextServiceTime.value.getTime() - now.getTime()
  
  if (diff <= 0) return null
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return {
    days: { value: days.toString().padStart(2, '0'), label: 'Days' },
    hours: { value: hours.toString().padStart(2, '0'), label: 'Hours' },
    minutes: { value: minutes.toString().padStart(2, '0'), label: 'Min' },
    seconds: { value: seconds.toString().padStart(2, '0'), label: 'Sec' }
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Update countdown every second
  setInterval(() => {
    // Force reactivity update
    nextServiceTime.value = new Date(nextServiceTime.value)
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}
</style>