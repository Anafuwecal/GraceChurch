<template>
  <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
    <div class="flex items-center mb-6">
      <img 
        :src="testimonial.image" 
        :alt="testimonial.name"
        class="w-16 h-16 rounded-full object-cover mr-4"
      >
      <div>
        <h4 class="text-lg font-semibold text-gray-900">{{ testimonial.name }}</h4>
        <p v-if="testimonial.role" class="text-primary-600 text-sm">{{ testimonial.role }}</p>
        <p class="text-gray-500 text-sm">{{ formatDate(testimonial.date) }}</p>
      </div>
    </div>
    
    <div class="relative">
      <QuoteIcon class="absolute -top-2 -left-2 w-8 h-8 text-primary-200" />
      <p class="text-gray-700 leading-relaxed italic pl-6">
        "{{ testimonial.content }}"
      </p>
    </div>
    
    <div v-if="testimonial.featured" class="mt-4 flex justify-end">
      <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
        Featured Story
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftIcon as QuoteIcon } from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import type { Testimonial } from '@/types'

interface Props {
  testimonial: Testimonial
}

const props = defineProps<Props>()

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy')
}
</script>