<template>
  <section class="section-padding bg-white">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center reveal">
        <!-- Header -->
        <div class="mb-8">
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">Daily Inspiration</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Verse of the <span class="text-primary-600">Day</span>
          </h2>
        </div>

        <!-- Verse Card -->
        <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12 shadow-lg">
          <div class="relative">
            <!-- Quote Icon -->
            <ChatBubbleLeftIcon class="absolute -top-4 -left-4 w-12 h-12 text-primary-200" />
            
            <!-- Verse Text -->
            <blockquote class="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 leading-relaxed mb-6 italic">
              "{{ verse.verse }}"
            </blockquote>
            
            <!-- Reference -->
            <cite class="text-lg md:text-xl font-semibold text-primary-600">
              {{ verse.reference }}
            </cite>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              @click="shareVerse"
              class="btn-primary"
            >
              <ShareIcon class="w-5 h-5 mr-2 inline" />
              Share Verse
            </button>
            <button 
              @click="saveVerse"
              class="btn-secondary"
            >
              <BookmarkIcon class="w-5 h-5 mr-2 inline" />
              Save to Favorites
            </button>
            <button 
              @click="readMore"
              class="btn-secondary"
            >
              <BookOpenIcon class="w-5 h-5 mr-2 inline" />
              Read Chapter
            </button>
          </div>
        </div>

        <!-- Previous Verses -->
        <div class="mt-12">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Recent Daily Verses</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(prevVerse, index) in previousVerses" 
              :key="index"
              class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              @click="selectVerse(prevVerse)"
            >
              <p class="text-gray-700 mb-3 line-clamp-3">{{ prevVerse.verse }}</p>
              <p class="text-primary-600 font-semibold text-sm">{{ prevVerse.reference }}</p>
              <p class="text-gray-500 text-xs mt-1">{{ formatDate(prevVerse.date) }}</p>
            </div>
          </div>
        </div>

        <!-- Newsletter Signup -->
        <div class="mt-12 bg-primary-600 rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">Get Daily Verses</h3>
          <p class="text-primary-100 mb-6">
            Receive inspiring Bible verses delivered to your inbox every morning.
          </p>
          <form @submit.prevent="subscribeToVerses" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              required
            >
            <button 
              type="submit"
              class="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  BookmarkIcon, 
  BookOpenIcon 
} from '@heroicons/vue/24/outline'
import { format } from 'date-fns'
import { verseOfTheDay } from '@/data/mockData'
import type { VerseOfDay } from '@/types'

const verse = ref(verseOfTheDay)
const email = ref('')

const previousVerses = ref<VerseOfDay[]>([
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5",
    date: new Date('2026-02-19')
  },
  {
    verse: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    date: new Date('2026-02-18')
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    date: new Date('2026-02-17')
  }
])

const formatDate = (date: Date) => {
  return format(date, 'MMM dd')
}

const shareVerse = () => {
  const text = `"${verse.value.verse}" - ${verse.value.reference}`
  
  if (navigator.share) {
    navigator.share({
      title: 'Verse of the Day',
      text: text,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(text)
    // Show toast notification
    console.log('Verse copied to clipboard')
  }
}

const saveVerse = () => {
  // Save to local storage or user favorites
  const savedVerses = JSON.parse(localStorage.getItem('savedVerses') || '[]')
  savedVerses.push(verse.value)
  localStorage.setItem('savedVerses', JSON.stringify(savedVerses))
  console.log('Verse saved to favorites')
}

const readMore = () => {
  // Open Bible app or website with the chapter
  const reference = verse.value.reference
  const url = `https://www.bible.com/search/bible?q=${encodeURIComponent(reference)}`
  window.open(url, '_blank')
}

const selectVerse = (selectedVerse: VerseOfDay) => {
  verse.value = selectedVerse
}

const subscribeToVerses = () => {
  // Handle subscription
  console.log('Subscribing email:', email.value)
  email.value = ''
  // Show success message
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