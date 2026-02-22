<template>
  <div class="min-h-screen bg-white">
    <Navbar @open-daily-sidebar="showDailySidebar = true" />
    
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span class="text-primary-600">Grace Church</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 25 years, we've been a beacon of hope and love in our community, 
            dedicated to sharing God's grace and building lasting relationships.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Grace Church was founded in 1999 by Pastor David and Mary Johnson with a simple vision: 
                to create a place where people could experience God's unconditional love and grow in their faith journey.
              </p>
              <p>
                What started as a small gathering of 20 people in a rented community center has grown into 
                a thriving congregation of over 1,200 members from diverse backgrounds and walks of life.
              </p>
              <p>
                Throughout our history, we've remained committed to our core values of love, service, 
                community, and biblical truth. We believe that everyone has a place at God's table, 
                and we strive to create an environment where all people feel welcomed and valued.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop" 
              alt="Church History" 
              class="rounded-lg shadow-lg w-full"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Team -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated leaders who guide our church family with wisdom, compassion, and faith.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="leader in leaders" :key="leader.name" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              :src="leader.image" 
              :alt="leader.name"
              class="w-full h-64 object-cover"
            >
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ leader.name }}</h3>
              <p class="text-primary-600 font-medium mb-3">{{ leader.position }}</p>
              <p class="text-gray-600 text-sm leading-relaxed">{{ leader.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="bg-primary-600 text-white rounded-2xl p-8">
            <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
            <p class="text-primary-100 leading-relaxed">
              To love God, love people, and serve our community by sharing the transformative 
              message of Jesus Christ through worship, fellowship, discipleship, and outreach.
            </p>
          </div>
          <div class="bg-gray-100 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p class="text-gray-600 leading-relaxed">
              To be a church where every person can find hope, healing, and purpose through 
              a personal relationship with Jesus Christ, and where lives are transformed 
              to impact our community and the world.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="section-padding bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p class="text-lg text-gray-600">The principles that guide everything we do</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="value in coreValues" :key="value.title" class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="value.icon" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    <DailyWordSidebar :is-open="showDailySidebar" @close="showDailySidebar = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon, UsersIcon, BookOpenIcon, HandRaisedIcon } from '@heroicons/vue/24/outline'
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/Footer.vue'
import DailyWordSidebar from '../components/ui/DailyWordSidebar.vue'

const showDailySidebar = ref(false)

const leaders = ref([
  {
    name: "Pastor John Smith",
    position: "Senior Pastor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    bio: "Pastor John has been leading Grace Church for over 15 years with a heart for teaching and community outreach."
  },
  {
    name: "Pastor Sarah Johnson",
    position: "Associate Pastor",
    image: "https://plus.unsplash.com/premium_photo-1702058277966-03e4c6c6e239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGZlbWFsZSUyMHBhc3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    
    bio: "Pastor Sarah oversees our women's ministry and counseling programs, bringing compassion and wisdom to our community."
  },
  {
    name: "Michael Brown",
    position: "Worship Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
    bio: "Michael leads our worship team and music ministry, creating an atmosphere of praise and worship each Sunday."
  }
])

const coreValues = ref([
  {
    title: "Love",
    description: "We believe love is the foundation of our faith and the driving force behind all we do.",
    icon: HeartIcon
  },
  {
    title: "Community",
    description: "We are committed to building authentic relationships and supporting one another.",
    icon: UsersIcon
  },
  {
    title: "Truth",
    description: "We are grounded in biblical truth and committed to teaching God's Word with integrity.",
    icon: BookOpenIcon
  },
  {
    title: "Service",
    description: "We actively serve our community and reach out to those in need with practical help.",
    icon: HandRaisedIcon
  }
])
</script>