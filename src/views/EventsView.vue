<template>
  <div class="min-h-screen bg-white">
    <Navbar @open-daily-sidebar="showDailySidebar = true" />
    
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Upcoming <span class="text-primary-600">Events</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join us for inspiring worship services, community gatherings, and special events 
            that bring our church family together in faith and fellowship.
          </p>
        </div>
      </div>
    </section>

    <!-- Event Filters -->
    <section class="py-8 bg-white border-b">
      <div class="container-custom">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            v-for="category in eventCategories"
            :key="category.value"
            @click="selectedCategory = category.value"
            class="px-6 py-2 rounded-full font-medium transition-all duration-200"
            :class="[
              selectedCategory === category.value 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            ]"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Events Grid -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard 
            v-for="event in filteredEvents" 
            :key="event.id"
            :event="event"
            @register="handleEventRegistration"
            @share="handleEventShare"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="text-center py-12">
          <CalendarIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
          <p class="text-gray-500">
            No events match your current filter. Try selecting a different category.
          </p>
        </div>
      </div>
    </section>

    <!-- Calendar Integration -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Never miss an event! Subscribe to our calendar or get notifications for upcoming events.
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
    </section>

    <Footer />
    <DailyWordSidebar :is-open="showDailySidebar" @close="showDailySidebar = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarIcon, BellIcon } from '@heroicons/vue/24/outline'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'
import EventCard from '../components/ui/EventCard.vue'
import { events as eventsData } from '../data/mockData'

const showDailySidebar = ref(false)
const selectedCategory = ref('all')

const eventCategories = [
  { label: 'All Events', value: 'all' },
  { label: 'Worship', value: 'worship' },
  { label: 'Youth', value: 'youth' },
  { label: 'Outreach', value: 'outreach' },
  { label: 'Prayer', value: 'prayer' },
  { label: 'Conference', value: 'conference' }
]

const events = ref(eventsData)

const filteredEvents = computed(() => {
  if (selectedCategory.value === 'all') {
    return events.value
  }
  return events.value.filter(event => event.category === selectedCategory.value)
})

const handleEventRegistration = (event: any) => {
  console.log('Registering for event:', event.title)
  alert(`Registration for "${event.title}" - Feature coming soon!`)
}

const handleEventShare = (event: any) => {
  if (navigator.share) {
    navigator.share({
      title: event.title,
      text: event.description,
      url: window.location.href + `#event-${event.id}`
    })
  } else {
    navigator.clipboard.writeText(window.location.href + `#event-${event.id}`)
    alert('Event link copied to clipboard!')
  }
}
</script>