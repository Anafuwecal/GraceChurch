<template>
  <section id="contact" class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">Get in Touch</span>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6">
          Contact <span class="text-primary-600">Us</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We'd love to hear from you! Whether you have questions, need prayer, 
          or want to get involved, don't hesitate to reach out.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="reveal">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Name and Email Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input 
                    id="name"
                    v-model="form.name"
                    type="text" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your full name"
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input 
                    id="email"
                    v-model="form.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  >
                </div>
              </div>

              <!-- Phone and Subject Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    id="phone"
                    v-model="form.phone"
                    type="tel" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(123) 456-7890"
                  >
                </div>
                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select 
                    id="subject"
                    v-model="form.subject"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="ministry">Ministry Information</option>
                    <option value="events">Events & Programs</option>
                    <option value="pastoral">Pastoral Care</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <!-- Preferred Contact Method -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Contact Method
                </label>
                <div class="flex space-x-6">
                  <label class="flex items-center">
                    <input 
                      v-model="form.preferredContact"
                      type="radio" 
                      value="email"
                      class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    >
                    <span class="ml-2 text-gray-700">Email</span>
                  </label>
                  <label class="flex items-center">
                    <input 
                      v-model="form.preferredContact"
                      type="radio" 
                      value="phone"
                      class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    >
                    <span class="ml-2 text-gray-700">Phone</span>
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
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8 reveal">
          <!-- Contact Details -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            
            <div class="space-y-6">
              <!-- Address -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Visit Us</h4>
                  <p class="text-gray-600">123 Faith Street<br>Hope City, HC 12345</p>
                  <button class="text-primary-600 hover:text-primary-700 text-sm mt-1">
                    Get Directions
                  </button>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneIcon class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Call Us</h4>
                  <a href="tel:+1234567890" class="text-gray-600 hover:text-primary-600">
                    (123) 456-7890
                  </a>
                  <p class="text-sm text-gray-500 mt-1">Mon-Fri 9AM-5PM</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon class="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:info@gracechurch.com" class="text-gray-600 hover:text-primary-600">
                    info@gracechurch.com
                  </a>
                  <p class="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <!-- Emergency -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Emergency</h4>
                  <a href="tel:+1234567899" class="text-gray-600 hover:text-red-600">
                    (123) 456-7899
                  </a>
                  <p class="text-sm text-gray-500 mt-1">24/7 Pastoral Care</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Service Times -->
          <div class="bg-primary-600 text-white rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold mb-6">Service Times</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center border-b border-primary-500 pb-3">
                <div>
                  <h4 class="font-semibold">Sunday Worship</h4>
                  <p class="text-primary-100 text-sm">Main Sanctuary</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold">9:00 AM</p>
                  <p class="font-semibold">11:00 AM</p>
                </div>
              </div>
              
              <div class="flex justify-between items-center border-b border-primary-500 pb-3">
                <div>
                  <h4 class="font-semibold">Wednesday Prayer</h4>
                  <p class="text-primary-100 text-sm">Prayer Room</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold">7:00 PM</p>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-semibold">Youth Service</h4>
                  <p class="text-primary-100 text-sm">Youth Center</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold">Friday 7:00 PM</p>
                </div>
              </div>
            </div>

            <button class="w-full bg-white text-primary-600 hover:bg-primary-50 mt-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Plan Your Visit
            </button>
          </div>

          <!-- Map -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="h-64 bg-gray-200 relative">
              <!-- Replace with actual map integration -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <MapPinIcon class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p class="text-gray-500">Interactive Map</p>
                  <p class="text-sm text-gray-400">123 Faith Street, Hope City</p>
                </div>
              </div>
            </div>
            <div class="p-4">
              <button class="w-full btn-secondary text-sm py-2">
                View Larger Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import type { ContactForm } from '@/types'

const isSubmitting = ref(false)

const form = reactive<ContactForm>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  preferredContact: 'email'
})

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Handle form submission
    console.log('Form submitted:', form)
    
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: 'email'
    })
    
    // Show success message (implement toast notification)
    alert('Thank you for your message! We\'ll get back to you soon.')
    
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('There was an error sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
            