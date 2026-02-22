<template>
  <section class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">Stories</span>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6">
          Life <span class="text-primary-600">Testimonies</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Hear how God is working in the lives of our church family members, 
          transforming hearts and bringing hope to our community.
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <div class="relative reveal">
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(slide, index) in testimonialSlides" 
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard 
                  v-for="testimonial in slide" 
                  :key="testimonial.id"
                  :testimonial="testimonial"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button 
          v-if="testimonialSlides.length > 1"
          @click="previousSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <ChevronLeftIcon class="w-6 h-6 text-gray-600" />
        </button>
        
        <button 
          v-if="testimonialSlides.length > 1"
          @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <ChevronRightIcon class="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <!-- Slide Indicators -->
      <div v-if="testimonialSlides.length > 1" class="flex justify-center mt-8 space-x-2">
        <button 
          v-for="(slide, index) in testimonialSlides" 
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="[
            currentSlide === index 
              ? 'bg-primary-600' 
              : 'bg-gray-300 hover:bg-gray-400'
          ]"
        ></button>
      </div>

      <!-- Share Your Story CTA -->
      <div class="text-center mt-16 reveal">
        <div class="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">
            Share Your Story
          </h3>
          <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Has God been working in your life? We'd love to hear your testimony and 
            share it with our church family to encourage others.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">
              <PencilIcon class="w-5 h-5 mr-2 inline" />
              Submit Your Story
            </button>
            <button class="btn-secondary">
              <ChatBubbleLeftIcon class="w-5 h-5 mr-2 inline" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PencilIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/vue/24/outline'
import TestimonialCard from '@/components/ui/TestimonialCard.vue'
import { testimonials as testimonialsData } from '@/data/mockData'

const testimonials = ref(testimonialsData)
const currentSlide = ref(0)
const autoplayInterval = ref<number | null>(null)
const itemsPerSlide = ref(3)

// Responsive items per slide
const updateItemsPerSlide = () => {
  if (window.innerWidth < 768) {
    itemsPerSlide.value = 1
  } else if (window.innerWidth < 1024) {
    itemsPerSlide.value = 2
  } else {
    itemsPerSlide.value = 3
  }
}

const testimonialSlides = computed(() => {
  const slides = []
  for (let i = 0; i < testimonials.value.length; i += itemsPerSlide.value) {
    slides.push(testimonials.value.slice(i, i + itemsPerSlide.value))
  }
  return slides
})

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonialSlides.value.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? testimonialSlides.value.length - 1 
    : currentSlide.value - 1
}

const startAutoplay = () => {
  autoplayInterval.value = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

onMounted(() => {
  updateItemsPerSlide()
  window.addEventListener('resize', updateItemsPerSlide)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerSlide)
  stopAutoplay()
})
</script>