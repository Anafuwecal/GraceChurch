<template>
  <div class="min-h-screen bg-white">
    <Navbar @open-daily-sidebar="showDailySidebar = true" />
    
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Sermon <span class="text-primary-600">Library</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of inspiring messages, biblical teachings, and practical wisdom 
            to help you grow in your faith journey.
          </p>
        </div>
      </div>
    </section>

    <!-- Search and Filters -->
    <section class="py-8 bg-white border-b">
      <div class="container-custom">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search sermons..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>

          <!-- Filter Dropdowns -->
          <div class="flex flex-wrap gap-4">
            <!-- Series Filter -->
            <select 
              v-model="selectedSeries"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Series</option>
              <option v-for="series in seriesList" :key="series" :value="series">
                {{ series }}
              </option>
            </select>

            <!-- Speaker Filter -->
            <select 
              v-model="selectedSpeaker"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Speakers</option>
              <option v-for="speaker in speakersList" :key="speaker" :value="speaker">
                {{ speaker }}
              </option>
            </select>

            <!-- Sort Options -->
            <select 
              v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Sermon -->
    <section v-if="featuredSermon && !hasActiveFilters" class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl overflow-hidden text-white">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div class="p-8 lg:p-12">
              <span class="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                Featured Message
              </span>
              <h3 class="text-3xl font-bold mb-4">{{ featuredSermon.title }}</h3>
              <p class="text-primary-100 mb-2">{{ featuredSermon.speaker }}</p>
              <p class="text-primary-100 mb-6">{{ formatDate(featuredSermon.date) }}</p>
              <p class="text-lg mb-8 text-primary-50">{{ featuredSermon.description }}</p>
              <div class="flex space-x-4">
                <button 
                  @click="playVideo(featuredSermon.videoUrl)"
                  class="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  <PlayIcon class="w-5 h-5 mr-2 inline" />
                  Watch Now
                </button>
                <button 
                  @click="playAudio(featuredSermon.audioUrl)"
                  class="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  <SpeakerWaveIcon class="w-5 h-5 mr-2 inline" />
                  Listen
                </button>
              </div>
            </div>
            <div class="relative h-64 lg:h-full">
              <img 
                :src="featuredSermon.thumbnail" 
                :alt="featuredSermon.title"
                class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sermons Grid -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SermonCard 
            v-for="sermon in paginatedSermons" 
            :key="sermon.id"
            :sermon="sermon"
            @play-video="playVideo"
            @play-audio="playAudio"
            @download="downloadSermon"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredSermons.length === 0" class="text-center py-12">
          <BookOpenIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No Sermons Found</h3>
          <p class="text-gray-500">
            No sermons match your search criteria. Try adjusting your filters.
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex space-x-2">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              class="px-4 py-2 border rounded-lg transition-colors duration-200"
              :class="[
                currentPage === page 
                  ? 'bg-primary-600 text-white border-primary-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            
            <button 
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </section>

    <Footer />
    <DailyWordSidebar :is-open="showDailySidebar" @close="showDailySidebar = false" />
    
    <!-- Video Modal -->
    <ModalVideo 
      v-model="showVideoModal" 
      :video-url="currentVideoUrl"
      @close="showVideoModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  MagnifyingGlassIcon, 
  PlayIcon, 
  SpeakerWaveIcon,
  BookOpenIcon 
} from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'
import SermonCard from '../components/ui/SermonCard.vue'
import ModalVideo from '../components/ui/ModalVideo.vue'
import { sermons as sermonsData } from '../data/mockData'

const showDailySidebar = ref(false)
const searchQuery = ref('')
const selectedSeries = ref('')
const selectedSpeaker = ref('')
const sortBy = ref('date-desc')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const showVideoModal = ref(false)
const currentVideoUrl = ref('')

const sermons = ref(sermonsData)

const featuredSermon = computed(() => sermons.value[0])

const seriesList = computed(() => {
  return [...new Set(sermons.value.map(sermon => sermon.series))]
})

const speakersList = computed(() => {
  return [...new Set(sermons.value.map(sermon => sermon.speaker))]
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedSeries.value || selectedSpeaker.value
})

const filteredSermons = computed(() => {
  let filtered = sermons.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(sermon => 
      sermon.title.toLowerCase().includes(query) ||
      sermon.speaker.toLowerCase().includes(query) ||
      sermon.description.toLowerCase().includes(query) ||
      sermon.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Series filter
  if (selectedSeries.value) {
    filtered = filtered.filter(sermon => sermon.series === selectedSeries.value)
  }

  // Speaker filter
  if (selectedSpeaker.value) {
    filtered = filtered.filter(sermon => sermon.speaker === selectedSpeaker.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date-desc':
        return b.date.getTime() - a.date.getTime()
      case 'date-asc':
        return a.date.getTime() - b.date.getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'views':
        return b.views - a.views
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredSermons.value.length / itemsPerPage.value)
})

const paginatedSermons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSermons.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy')
}

const playVideo = (videoUrl?: string) => {
  if (videoUrl) {
    currentVideoUrl.value = videoUrl
    showVideoModal.value = true
  }
}

const playAudio = (audioUrl?: string) => {
  if (audioUrl) {
    console.log('Playing audio:', audioUrl)
  }
}

const downloadSermon = (sermon: any) => {
  console.log('Downloading sermon:', sermon.title)
}
</script>
              