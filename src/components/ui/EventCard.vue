<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="event.image" 
        :alt="event.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      >
      <div class="absolute top-4 left-4">
        <span class="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
          {{ event.category }}
        </span>
      </div>
      <div v-if="event.registrationRequired" class="absolute top-4 right-4">
        <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Registration Required
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex items-center text-sm text-gray-500 mb-3">
        <CalendarIcon class="w-4 h-4 mr-2" />
        <span>{{ formatDate(event.date) }}</span>
        <ClockIcon class="w-4 h-4 ml-4 mr-2" />
        <span>{{ event.time }}</span>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ event.description }}</p>
      
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <MapPinIcon class="w-4 h-4 mr-2" />
        <span>{{ event.location }}</span>
      </div>
      
      <div v-if="event.registrationRequired && event.maxAttendees" class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>Attendees</span>
          <span>{{ event.currentAttendees }}/{{ event.maxAttendees }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-primary-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${(event.currentAttendees! / event.maxAttendees) * 100}%` }"
          ></div>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button 
          class="flex-1 btn-primary text-sm py-2"
          @click="$emit('register', event)"
        >
          {{ event.registrationRequired ? 'Register' : 'Learn More' }}
        </button>
        <button 
          class="btn-secondary text-sm py-2 px-4"
          @click="$emit('share', event)"
        >
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import type { Event } from '@/types'

interface Props {
  event: Event
}

const props = defineProps<Props>()

defineEmits(['register', 'share'])

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy')
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>