<template>
  <div class="min-h-screen bg-white">
    <Navbar @open-daily-sidebar="showDailySidebar = true" />
    
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Prayer <span class="text-primary-600">Requests</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in the power of prayer. Share your prayer needs with our church family, 
            and know that you are lifted up in love and faith.
          </p>
        </div>
      </div>
    </section>

    <!-- Prayer Request Form -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Form -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-2xl shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Submit Your Prayer Request</h2>
                
                <form @submit.prevent="submitPrayerRequest" class="space-y-6">
                  <!-- Personal Information -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input 
                        id="firstName"
                        v-model="form.firstName"
                        type="text" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your first name"
                      >
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input 
                        id="lastName"
                        v-model="form.lastName"
                        type="text" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your last name"
                      >
                    </div>
                  </div>

                  <!-- Contact Information -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input 
                        id="email"
                        v-model="form.email"
                        type="email" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      >
                    </div>
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input 
                        id="phone"
                        v-model="form.phone"
                        type="tel" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="(123) 456-7890"
                      >
                    </div>
                  </div>

                  <!-- Prayer Request Type -->
                  <div>
                    <label for="requestType" class="block text-sm font-medium text-gray-700 mb-2">
                      Prayer Request Type
                    </label>
                    <select 
                      id="requestType"
                      v-model="form.requestType"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      <option value="healing">Healing & Health</option>
                      <option value="family">Family & Relationships</option>
                      <option value="financial">Financial Needs</option>
                      <option value="spiritual">Spiritual Growth</option>
                      <option value="guidance">Guidance & Direction</option>
                      <option value="thanksgiving">Thanksgiving & Praise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <!-- Prayer Request Details -->
                  <div>
                    <label for="prayerRequest" class="block text-sm font-medium text-gray-700 mb-2">
                      Prayer Request Details *
                    </label>
                    <textarea 
                      id="prayerRequest"
                      v-model="form.prayerRequest"
                      rows="6"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Please share your prayer request. Be as specific as you'd like - we're here to pray with you."
                    ></textarea>
                  </div>

                  <!-- Privacy Options -->
                  <div class="space-y-4">
                    <div class="flex items-start">
                      <input 
                        id="anonymous"
                        v-model="form.anonymous"
                        type="checkbox"
                        class="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      >
                      <label for="anonymous" class="ml-3 text-sm text-gray-700">
                        Submit this request anonymously
                      </label>
                    </div>
                    
                    <div class="flex items-start">
                      <input 
                        id="publicShare"
                        v-model="form.publicShare"
                        type="checkbox"
                        class="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      >
                      <label for="publicShare" class="ml-3 text-sm text-gray-700">
                        I'm comfortable with this request being shared with our prayer team
                        <span class="block text-xs text-gray-500 mt-1">
                          (If unchecked, only pastoral staff will see this request)
                        </span>
                      </label>
                    </div>

                    <div class="flex items-start">
                      <input 
                        id="followUp"
                        v-model="form.followUp"
                        type="checkbox"
                        class="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      >
                      <label for="followUp" class="ml-3 text-sm text-gray-700">
                        I would like someone from our pastoral team to follow up with me
                      </label>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <button 
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full btn-primary py-4 text-lg"
                  >
                    <LoadingSpinner v-if="isSubmitting" size="sm" color="white" class="mr-2" />
                    {{ isSubmitting ? 'Submitting...' : 'Submit Prayer Request' }}
                  </button>
                </form>
              </div>
            </div>

            <!-- Sidebar Information -->
            <div class="space-y-6">
              <!-- Prayer Guidelines -->
              <div class="bg-primary-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Prayer Guidelines</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li class="flex items-start">
                    <CheckIcon class="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    All prayer requests are confidential
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    Our prayer team prays daily for all requests
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    Pastoral follow-up available upon request
                  </li>
                  <li class="flex items-start">
                    <CheckIcon class="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    Emergency requests receive immediate attention
                  </li>
                </ul>
              </div>

              <!-- Contact Information -->
              <div class="bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Need Immediate Prayer?</h3>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <PhoneIcon class="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <p class="font-medium text-gray-900">Prayer Hotline</p>
                      <a href="tel:+1234567899" class="text-primary-600 hover:text-primary-700">
                        (123) 456-7899
                      </a>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <EnvelopeIcon class="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <p class="font-medium text-gray-900">Prayer Email</p>
                      <a href="mailto:prayer@gracechurch.com" class="text-primary-600 hover:text-primary-700">
                        prayer@gracechurch.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Scripture Encouragement -->
              <div class="bg-gray-100 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Scripture Promise</h3>
                <blockquote class="text-gray-700 italic mb-3">
                  "Do not be anxious about anything, but in every situation, by prayer and petition, 
                  with thanksgiving, present your requests to God."
                </blockquote>
                <cite class="text-primary-600 font-semibold">Philippians 4:6</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div 
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <div class="text-center">
          <CheckCircleIcon class="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">Prayer Request Submitted</h3>
          <p class="text-gray-600 mb-6">
            Thank you for sharing your prayer request. Our prayer team will be lifting you up in prayer.
          </p>
          <button 
            @click="showSuccessModal = false"
            class="btn-primary w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <Footer />
    <DailyWordSidebar :is-open="showDailySidebar" @close="showDailySidebar = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  CheckIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CheckCircleIcon 
} from '@heroicons/vue/24/outline'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const showDailySidebar = ref(false)
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  requestType: '',
  prayerRequest: '',
  anonymous: false,
  publicShare: true,
  followUp: false
})

const submitPrayerRequest = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Handle form submission
    console.log('Prayer request submitted:', form)
    
    // Reset form
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      requestType: '',
      prayerRequest: '',
      anonymous: false,
      publicShare: true,
      followUp: false
    })
    
    // Show success modal
    showSuccessModal.value = true
    
  } catch (error) {
    console.error('Error submitting prayer request:', error)
    alert('There was an error submitting your prayer request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>