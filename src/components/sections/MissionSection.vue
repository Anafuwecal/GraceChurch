<template>
  <section id="about" class="section-padding bg-gray-50">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="reveal">
          <div class="mb-6">
            <span class="text-primary-600 font-semibold text-sm uppercase tracking-wide">About Us</span>
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Our <span class="text-primary-600">Mission</span>
            </h2>
          </div>
          
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            At Grace Church, we are committed to creating a welcoming community where people can 
            encounter God's love, grow in their faith, and serve others with compassion.
          </p>
          
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Through worship, fellowship, and outreach, we strive to make a positive impact in our 
            community and beyond, sharing the transformative message of hope and redemption.
          </p>
          
          <!-- Mission Values -->
          <div class="space-y-6">
            <FeatureCard 
              v-for="feature in missionFeatures"
              :key="feature.title"
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
            />
          </div>

          <!-- CTA Button -->
          <div class="mt-8">
            <button class="btn-primary">
              Learn More About Us
              <ArrowRightIcon class="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>

        <!-- Image Grid -->
        <div class="reveal">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400&h=300&fit=crop" 
                alt="Church Community" 
                class="rounded-lg shadow-lg w-full h-48 object-cover hover:shadow-xl transition-shadow duration-300"
              >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                alt="Worship Service" 
                class="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-xl transition-shadow duration-300"
              >
            </div>
            <div class="space-y-4 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop" 
                alt="Community Outreach" 
                class="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-xl transition-shadow duration-300"
              >
              <img 
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop" 
                alt="Youth Ministry" 
                class="rounded-lg shadow-lg w-full h-48 object-cover hover:shadow-xl transition-shadow duration-300"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center reveal">
          <div class="text-4xl font-bold text-primary-600 mb-2">{{ stat.value }}</div>
          <div class="text-gray-600 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import FeatureCard from '@/components/ui/FeatureCard.vue'

const missionFeatures = ref([
  {
    icon: 'heart',
    title: 'Love & Compassion',
    description: 'We believe in showing God\'s love through our actions and words, creating a caring community for all.'
  },
  {
    icon: 'users',
    title: 'Community & Fellowship',
    description: 'Building meaningful relationships and supporting one another through life\'s joys and challenges.'
  },
  {
    icon: 'book',
    title: 'Biblical Teaching',
    description: 'Grounded in Scripture, we provide practical teaching that applies God\'s Word to everyday life.'
  },
  {
    icon: 'hand',
    title: 'Service & Outreach',
    description: 'Actively serving our local community and reaching out to those in need with practical help and hope.'
  }
])

const stats = ref([
  { value: '25+', label: 'Years of Ministry' },
  { value: '1,200+', label: 'Church Members' },
  { value: '50+', label: 'Weekly Programs' },
  { value: '15K+', label: 'Lives Touched' }
])
</script>