<template>
  <div class="min-h-screen bg-white">
    <Navbar @open-daily-sidebar="showDailySidebar = true" />
    
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contact <span class="text-primary-600">Us</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here for you! 24/7, everyday, reach out to us with any questions, prayer requests, or just to say hello.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding">
      <div class="container-custom">
        <ContactSection />
      </div>
    </section>

    <Footer />
    <DailyWordSidebar :is-open="showDailySidebar" @close="showDailySidebar = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'
import ContactSection from '../components/sections/ContactSection.vue'

const showDailySidebar = ref(false)
</script>