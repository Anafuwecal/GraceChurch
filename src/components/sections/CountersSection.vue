<template>
  <section class="section-padding bg-primary-600 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-pattern"></div>
    </div>

    <div class="container-custom relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <span class="text-primary-200 font-semibold text-sm uppercase tracking-wide">Impact</span>
        <h2 class="text-4xl lg:text-5xl font-bold mt-2 mb-6">
          Making a <span class="text-white">Difference</span>
        </h2>
        <p class="text-lg text-primary-100 max-w-3xl mx-auto leading-relaxed">
          Through God's grace and our community's dedication, we continue to impact lives 
          and serve our community in meaningful ways.
        </p>
      </div>

      <!-- Counters Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <Counter 
          v-for="(counter, index) in counters" 
          :key="counter.label"
          :data="counter"
          class="reveal"
          :style="{ animationDelay: `${index * 0.2}s` }"
        />
      </div>

      <!-- Additional Stats -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
        <div class="text-center">
          <div class="bg-white bg-opacity-10 rounded-lg p-6">
            <h4 class="text-2xl font-bold mb-2">Weekly Programs</h4>
            <p class="text-primary-100">Over 25 different ministries and programs running each week</p>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-white bg-opacity-10 rounded-lg p-6">
            <h4 class="text-2xl font-bold mb-2">Community Partnerships</h4>
            <p class="text-primary-100">Working with 15+ local organizations to serve our city</p>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-white bg-opacity-10 rounded-lg p-6">
            <h4 class="text-2xl font-bold mb-2">Global Missions</h4>
            <p class="text-primary-100">Supporting missionaries and projects in 8 countries</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Counter from '@/components/ui/Counter.vue'
import { counters as countersData } from '@/data/mockData'

const counters = countersData
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E");
}
</style>