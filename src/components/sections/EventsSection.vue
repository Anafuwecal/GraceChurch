<template>
  <section id="events" class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">What's Happening</span>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6">
          Upcoming <span class="text-primary-600">Events</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join us for inspiring worship services, community gatherings, and special events 
          that bring our church family together in faith and fellowship.
        </p>
      </div>

      <!-- Event Filters -->
      <div class="flex flex-wrap justify-center gap-4 mb-12 reveal">
        <button 
          v-for="category in eventCategories"
          :key="category.value"
          @click="selectedCategory = category.value"
          class="px-6 py-2 rounded-full font-medium transition-all duration-200"
          :class="[
            selectedCategory === category.value 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
          ]"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EventCard 
          v-for="(event, index) in filteredEvents" 
          :key="event.id"
          :event="event"
          class="reveal"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @register="handleEventRegistration"
          @share="handleEventShare"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredEvents.length === 0" class="text-center py-12 reveal">
        <CalendarIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
        <p class="text-gray-500">
          No events match your current filter. Try selecting a different category.
        </p>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreEvents" class="text-center mt-12 reveal">
        <button 
          @click="loadMoreEvents"
          class="btn-secondary"
          :disabled="isLoadingMore"
        >
          <LoadingSpinner v-if="isLoadingMore" size="sm" color="primary" class="mr-2" />
          {{ isLoadingMore ? 'Loading...' : 'Load More Events' }}
        </button>
      </div>

      <!-- Calendar Integration -->
      <div class="text-center mt-16 reveal">
        <div class="bg-white rounded-2xl p-8 shadow-lg">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p class="text-gray-600 mb-6">
            Never miss an event! Subscribe to our calendar or follow us on social media.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">
              <CalendarIcon class="w-5 h-5 mr-2 inline" />
              Subscribe to Calendar
            </button>
            <button class="btn-secondary">
              <BellIcon class="w-5 h-5 mr-2 inline" />
              Get Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarIcon, BellIcon } from '@heroicons/vue/24/outline'
import EventCard from '@/components/ui/EventCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import { events as eventsData } from '@/data/mockData'
import type { Event } from '@/types'

const selectedCategory = ref<string>('all')
const events = ref<Event[]>(eventsData)
const isLoadingMore = ref(false)
const hasMoreEvents = ref(true)
const displayLimit = ref(6)

const eventCategories = [
  { label: 'All Events', value: 'all' },
  { label: 'Worship', value: 'worship' },
  { label: 'Youth', value: 'youth' },
  { label: 'Outreach', value: 'outreach' },
  { label: 'Prayer', value: 'prayer' },
  { label: 'Conference', value: 'conference' }
]

const filteredEvents = computed(() => {
  let filtered = events.value
  
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(event => event.category === selectedCategory.value)
  }
  
  return filtered
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, displayLimit.value)
})

const handleEventRegistration = (event: Event) => {
  // Handle event registration logic
  console.log('Registering for event:', event.title)
  // You would typically open a registration modal or redirect to a registration page
}

const handleEventShare = (event: Event) => {
  // Handle event sharing
  if (navigator.share) {
    navigator.share({
      title: event.title,
      text: event.description,
      url: window.location.href + `#event-${event.id}`
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(window.location.href + `#event-${event.id}`)
  }
}

const loadMoreEvents = async () => {
  isLoadingMore.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  displayLimit.value += 6
  
  // Check if we've loaded all events
  if (displayLimit.value >= events.value.length) {
    hasMoreEvents.value = false
  }
  
  isLoadingMore.value = false
}
</script>