<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300"
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="transform translate-x-full"
      enter-to-class="transform translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="transform translate-x-0"
      leave-to-class="transform translate-x-full"
    >
      <div 
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-full sm:w-96 md:w-[28rem] bg-white shadow-2xl z-[70] overflow-y-auto"
        @click.stop
      >
        <!-- Header -->
        <div class="bg-primary-600 text-white p-4 sm:p-6 sticky top-0 z-10">
          <div class="flex items-center justify-between">
            <h2 class="text-lg sm:text-xl font-bold">Daily Word</h2>
            <button 
              @click="closeSidebar"
              class="p-2 hover:bg-primary-700 rounded-full transition-colors duration-200 touch-manipulation"
              aria-label="Close Daily Word"
            >
              <XMarkIcon class="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <p class="text-primary-100 text-sm mt-2">{{ formatDate(new Date()) }}</p>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-20">
          <!-- Verse of the Day -->
          <div class="bg-primary-50 rounded-lg p-4 sm:p-6">
            <div class="flex items-center mb-3 sm:mb-4">
              <BookOpenIcon class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2" />
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Verse of the Day</h3>
            </div>
            <blockquote class="text-sm sm:text-base text-gray-800 italic mb-3 leading-relaxed">
              "{{ dailyVerse.verse }}"
            </blockquote>
            <cite class="text-sm sm:text-base text-primary-600 font-semibold">{{ dailyVerse.reference }}</cite>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <button 
                @click="shareVerse"
                class="flex-1 bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors touch-manipulation"
              >
                <ShareIcon class="w-4 h-4 mr-1 inline" />
                Share
              </button>
              <button 
                @click="saveVerse"
                class="flex-1 border border-primary-600 text-primary-600 px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-primary-50 transition-colors touch-manipulation"
              >
                <BookmarkIcon class="w-4 h-4 mr-1 inline" />
                Save
              </button>
            </div>
          </div>

          <!-- Daily Devotion -->
          <div class="border rounded-lg p-4 sm:p-6">
            <div class="flex items-center mb-3 sm:mb-4">
              <HeartIcon class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2" />
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Daily Devotion</h3>
            </div>
            <h4 class="font-semibold text-gray-900 mb-3 text-sm sm:text-base">{{ dailyDevotion.title }}</h4>
            <div class="text-gray-700 leading-relaxed space-y-2 sm:space-y-3 text-sm sm:text-base">
              <p v-for="paragraph in dailyDevotion.content" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
            <div class="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h5 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Prayer</h5>
              <p class="text-gray-700 italic text-sm sm:text-base">{{ dailyDevotion.prayer }}</p>
            </div>
          </div>

          <!-- Today's Sermon Highlight -->
          <div v-if="todaysSermon" class="border rounded-lg p-4 sm:p-6">
            <div class="flex items-center mb-3 sm:mb-4">
              <PlayIcon class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2" />
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Today's Message</h3>
            </div>
            <img 
              :src="todaysSermon.thumbnail" 
              :alt="todaysSermon.title"
              class="w-full h-24 sm:h-32 object-cover rounded-lg mb-3 sm:mb-4"
            >
            <h4 class="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{{ todaysSermon.title }}</h4>
            <p class="text-primary-600 text-xs sm:text-sm mb-2">{{ todaysSermon.speaker }}</p>
            <p class="text-gray-600 text-xs sm:text-sm mb-4">{{ todaysSermon.description }}</p>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button 
                @click="playSermon"
                class="flex-1 bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors touch-manipulation"
              >
                <PlayIcon class="w-4 h-4 mr-1 inline" />
                Watch
              </button>
              <button 
                @click="listenSermon"
                class="flex-1 border border-primary-600 text-primary-600 px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-primary-50 transition-colors touch-manipulation"
              >
                <SpeakerWaveIcon class="w-4 h-4 mr-1 inline" />
                Listen
              </button>
            </div>
          </div>

          <!-- Prayer Requests -->
          <div class="border rounded-lg p-4 sm:p-6">
            <div class="flex items-center mb-3 sm:mb-4">
              <HandRaisedIcon class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2" />
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Submit Prayer Request</h3>
            </div>
            <p class="text-gray-600 text-xs sm:text-sm mb-4">
              Share your prayer needs with our church family. All requests are kept confidential.
            </p>
            <router-link 
              to="/prayer-request"
              class="w-full bg-primary-600 text-white px-4 py-3 rounded-lg text-center block hover:bg-primary-700 transition-colors text-sm sm:text-base touch-manipulation"
              @click="closeSidebar"
            >
              Submit Prayer Request
            </router-link>
          </div>

          <!-- Quick Actions -->
          <div class="border rounded-lg p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div class="space-y-2 sm:space-y-3">
              <router-link 
                to="/sermons"
                class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                @click="closeSidebar"
              >
                <PlayIcon class="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700 text-sm sm:text-base">Browse All Sermons</span>
              </router-link>
              <router-link 
                to="/events"
                class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                @click="closeSidebar"
              >
                <CalendarIcon class="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700 text-sm sm:text-base">Upcoming Events</span>
              </router-link>
              <button 
                @click="subscribeToDaily"
                class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full text-left touch-manipulation"
              >
                <BellIcon class="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700 text-sm sm:text-base">Get Daily Notifications</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue' // Add 'watch' here
import { 
  XMarkIcon, 
  BookOpenIcon, 
  ShareIcon, 
  BookmarkIcon, 
  HeartIcon, 
  PlayIcon, 
  SpeakerWaveIcon, 
  HandRaisedIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/vue/24/outline'
import { format } from 'date-fns'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'play-sermon'])

const dailyVerse = ref({
  verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
  reference: "Jeremiah 29:11"
})

const dailyDevotion = ref({
  title: "God's Perfect Plan",
  content: [
    "In times of uncertainty, it's easy to feel lost and wonder about our future. Today's verse reminds us that God has a perfect plan for each of our lives.",
    "His plans are not to harm us but to give us hope and a future. Even when we can't see the path ahead clearly, we can trust in His goodness and sovereignty.",
    "Take time today to surrender your worries and plans to God, knowing that His ways are higher than our ways."
  ],
  prayer: "Heavenly Father, help me to trust in Your perfect plan for my life. When I feel anxious about the future, remind me of Your faithfulness and love. Guide my steps today and help me to walk in Your will. Amen."
})

const todaysSermon = ref({
  title: "Walking in Faith",
  speaker: "Pastor John Smith",
  description: "Discover what it means to truly walk by faith and not by sight in our daily lives.",
  thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop"
})

const formatDate = (date: Date) => {
  return format(date, 'EEEE, MMMM dd, yyyy')
}

const closeSidebar = () => {
  emit('close')
}

// Prevent body scroll when sidebar is open
const preventBodyScroll = () => {
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '0px' // Prevent layout shift
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeSidebar()
  }
}

const shareVerse = () => {
  const text = `"${dailyVerse.value.verse}" - ${dailyVerse.value.reference}`
  
  if (navigator.share) {
    navigator.share({
      title: 'Verse of the Day',
      text: text,
      url: window.location.href
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('Verse copied to clipboard!')
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Verse copied to clipboard!')
    })
  }
}

const saveVerse = () => {
  try {
    const savedVerses = JSON.parse(localStorage.getItem('savedVerses') || '[]')
    savedVerses.push({
      ...dailyVerse.value,
      date: new Date().toISOString()
    })
    localStorage.setItem('savedVerses', JSON.stringify(savedVerses))
    alert('Verse saved to your favorites!')
  } catch (error) {
    console.error('Error saving verse:', error)
    alert('Unable to save verse. Please try again.')
  }
}

const playSermon = () => {
  emit('play-sermon', todaysSermon.value)
  closeSidebar()
}

const listenSermon = () => {
  // Handle audio playback
  console.log('Playing audio sermon')
  alert('Audio player coming soon!')
}

const subscribeToDaily = () => {
  // Handle subscription
  alert('Daily notifications feature coming soon!')
}

// Watch for prop changes
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  // Clean up body styles
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})

// Watch for isOpen changes to handle body scroll
watch(() => props.isOpen, (newValue) => {
  preventBodyScroll()
}, { immediate: true })
</script>