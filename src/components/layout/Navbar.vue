<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent',
      isScrolled ? 'text-gray-900' : 'text-white'
    ]"
  >
    <div class="container-custom">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-xl sm:text-2xl font-bold">
            <span class="text-primary-600">Grace</span> 
            <span :class="isScrolled ? 'text-gray-900' : 'text-white'">Church</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link 
              v-for="item in menuItems" 
              :key="item.name"
              :to="item.to"
              class="hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Desktop CTA Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <button 
            class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium"
            @click="handleDailyWordClick"
          >
            Daily Word
          </button>
          <router-link 
            to="/prayer-request"
            class="border-2 border-current hover:bg-current hover:text-white px-6 py-2 rounded-lg font-medium"
          >
            Prayer
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-md hover:bg-gray-100 hover:bg-opacity-20"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg border-t">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link 
          v-for="item in menuItems" 
          :key="item.name"
          :to="item.to"
          class="block px-3 py-3 text-gray-900 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        
        <!-- Mobile CTA Buttons -->
        <div class="px-3 py-2 space-y-3 border-t border-gray-200 mt-3 pt-3">
          <button 
            class="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium"
            @click="handleMobileDailyWordClick"
          >
            Daily Word
          </button>
          <router-link 
            to="/prayer-request"
            class="w-full block text-center border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-3 rounded-lg font-medium"
            @click="mobileMenuOpen = false"
          >
            Prayer Request
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Ministries', to: '/ministries' },
  { name: 'Events', to: '/events' },
  { name: 'Sermons', to: '/sermons' },
  { name: 'Contact', to: '/contact' }
]

const emit = defineEmits(['open-daily-sidebar'])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleDailyWordClick = () => {
  console.log('Desktop Daily Word clicked')
  emit('open-daily-sidebar')
}

const handleMobileDailyWordClick = () => {
  console.log('Mobile Daily Word clicked')
  mobileMenuOpen.value = false
  // Add a small delay to ensure menu closes first
  setTimeout(() => {
    emit('open-daily-sidebar')
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>