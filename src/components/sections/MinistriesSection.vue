<template>
  <section id="ministries" class="section-padding bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">Get Involved</span>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6">
          Our <span class="text-primary-600">Ministries</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover ways to grow in faith, serve others, and build meaningful relationships 
          through our diverse ministry programs designed for every age and interest.
        </p>
      </div>

      <!-- Ministries Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div 
          v-for="(ministry, index) in ministries" 
          :key="ministry.id"
          class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 reveal"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Ministry Image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="ministry.image" 
              :alt="ministry.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ ministry.memberCount }} Members
              </span>
            </div>
          </div>

          <!-- Ministry Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
              {{ ministry.name }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ ministry.description }}</p>
            
            <!-- Ministry Details -->
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

            <!-- Leader Info -->
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm text-gray-500">Led by</p>
                <p class="font-semibold text-gray-900">{{ ministry.leader }}</p>
              </div>
            </div>

            <!-- Action Buttons -->
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

      <!-- Call to Action -->
      <div class="text-center mt-16 reveal">
        <div class="bg-primary-50 rounded-2xl p-8 md:p-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking to start new ministries based on the needs and interests of our community. 
            Let us know how you'd like to get involved!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">
              Suggest a Ministry
            </button>
            <button class="btn-secondary">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  ClockIcon, 
  MapPinIcon, 
  UsersIcon, 
  EnvelopeIcon 
} from '@heroicons/vue/24/outline'
import { ministries as ministriesData } from '@/data/mockData'
import type { Ministry } from '@/types'

const ministries = ref(ministriesData)

const contactLeader = (ministry: Ministry) => {
  window.location.href = `mailto:${ministry.contactEmail}?subject=Interest in ${ministry.name}`
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