<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
    <div class="relative h-48 overflow-hidden group">
      <img 
        :src="sermon.thumbnail" 
        :alt="sermon.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      >
      <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button 
          @click="$emit('play-video', sermon.videoUrl)"
          class="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
        >
          <PlayIcon class="w-8 h-8 text-primary-600" />
        </button>
      </div>
      <div class="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
        {{ sermon.duration }}
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
          {{ sermon.series }}
        </span>
        <span class="text-sm text-gray-500">{{ formatDate(sermon.date) }}</span>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ sermon.title }}</h3>
      <p class="text-primary-600 font-medium mb-3">{{ sermon.speaker }}</p>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ sermon.description }}</p>
      
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <BookOpenIcon class="w-4 h-4 mr-2" />
        <span>{{ sermon.scripture }}</span>
      </div>
      
      <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <EyeIcon class="w-4 h-4 mr-1" />
            <span>{{ sermon.views.toLocaleString() }}</span>
          </div>
          <div class="flex items-center">
            <ArrowDownTrayIcon class="w-4 h-4 mr-1" />
            <span>{{ sermon.downloads.toLocaleString() }}</span>
          </div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in sermon.tags.slice(0, 3)" 
          :key="tag"
          class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
        >
          #{{ tag }}
        </span>
      </div>
      
      <div class="flex space-x-2">
        <button 
          @click="$emit('play-video', sermon.videoUrl)"
          class="flex-1 btn-primary text-sm py-2"
        >
          Watch
        </button>
        <button 
          @click="$emit('play-audio', sermon.audioUrl)"
          class="btn-secondary text-sm py-2 px-4"
        >
          Listen
        </button>
        <button 
          @click="$emit('download', sermon)"
          class="btn-secondary text-sm py-2 px-4"
        >
          <ArrowDownTrayIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PlayIcon, 
  BookOpenIcon, 
  EyeIcon, 
  ArrowDownTrayIcon 
} from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import type { Sermon } from '@/types'

interface Props {
  sermon: Sermon
}

const props = defineProps<Props>()

defineEmits(['play-video', 'play-audio', 'download'])

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy')
}
</script>