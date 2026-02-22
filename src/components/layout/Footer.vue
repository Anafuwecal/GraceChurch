<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom section-padding">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Church Info -->
        <div>
          <h3 class="text-2xl font-bold mb-4">
            <span class="text-primary-600">Grace</span> Church
          </h3>
          <p class="text-gray-300 mb-4 leading-relaxed">
            A welcoming community where faith, hope, and love come together. 
            Join us as we grow in Christ and serve our community.
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a 
                :href="link.href" 
                class="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                @click.prevent="smoothScroll(link.href)"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Service Times -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Service Times</h4>
          <div class="space-y-3">
            <div v-for="service in serviceTimes" :key="service.name">
              <h5 class="font-medium text-white">{{ service.name }}</h5>
              <p class="text-gray-300 text-sm">{{ service.time }}</p>
              <p class="text-gray-400 text-sm">{{ service.location }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <MapPinIcon class="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-gray-300">123 Faith Street</p>
                <p class="text-gray-300">Hope City, HC 12345</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <PhoneIcon class="w-5 h-5 text-primary-600 flex-shrink-0" />
              <a href="tel:+1234567890" class="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                (123) 456-7890
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <EnvelopeIcon class="w-5 h-5 text-primary-600 flex-shrink-0" />
              <a href="mailto:info@gracechurch.com" class="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                info@gracechurch.com
              </a>
            </div>
          </div>

          <!-- Newsletter Signup -->
          <div class="mt-6">
            <h5 class="font-medium text-white mb-2">Stay Connected</h5>
            <form @submit.prevent="subscribeNewsletter" class="flex">
              <input 
                v-model="newsletterEmail"
                type="email" 
                placeholder="Your email"
                class="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg border border-gray-700 focus:outline-none focus:border-primary-600"
                required
              >
              <button 
                type="submit"
                class="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-lg transition-colors duration-200"
              >
                <PaperAirplaneIcon class="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} Grace Church. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="/privacy" class="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="/terms" class="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
            Terms of Service
          </a>
          <a href="/accessibility" class="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
            Accessibility
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  PaperAirplaneIcon 
} from '@heroicons/vue/24/outline'

// Simple social media icons using heroicons
import { 
  GlobeAltIcon as FacebookIcon,
  CameraIcon as InstagramIcon,
  PlayIcon as YouTubeIcon,
  ChatBubbleLeftIcon as TwitterIcon
} from '@heroicons/vue/24/outline'

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/gracechurch', icon: FacebookIcon },
  { name: 'Instagram', url: 'https://instagram.com/gracechurch', icon: InstagramIcon },
  { name: 'YouTube', url: 'https://youtube.com/gracechurch', icon: YouTubeIcon },
  { name: 'Twitter', url: 'https://twitter.com/gracechurch', icon: TwitterIcon }
]

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Ministries', href: '#ministries' },
  { name: 'Events', href: '#events' },
  { name: 'Sermons', href: '#sermons' },
  { name: 'Give Online', href: '#donate' },
  { name: 'Prayer Requests', href: '#prayer' }
]

const serviceTimes = [
  {
    name: 'Sunday Worship',
    time: '9:00 AM & 11:00 AM',
    location: 'Main Sanctuary'
  },
  {
    name: 'Wednesday Prayer',
    time: '7:00 PM',
    location: 'Prayer Room'
  },
  {
    name: 'Youth Service',
    time: 'Friday 7:00 PM',
    location: 'Youth Center'
  }
]

const newsletterEmail = ref('')
const currentYear = computed(() => new Date().getFullYear())

const smoothScroll = (target: string) => {
  const element = document.querySelector(target)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const subscribeNewsletter = () => {
  // Handle newsletter subscription
  console.log('Newsletter subscription:', newsletterEmail.value)
  // Reset form
  newsletterEmail.value = ''
  // Show success message (implement toast notification)
}
</script>