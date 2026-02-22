<template>
  <div ref="counterRef" class="text-center">
    <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <component :is="iconComponent" class="w-8 h-8 text-primary-600" />
    </div>
    <div class="text-4xl font-bold text-gray-900 mb-2">
      {{ prefix }}{{ displayValue }}{{ suffix }}
    </div>
    <div class="text-lg font-semibold text-gray-700 mb-1">{{ data.label }}</div>
    <div v-if="data.description" class="text-sm text-gray-500">{{ data.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCounter } from '@/composables/useCounter'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { 
  UsersIcon, 
  HeartIcon, 
  GiftIcon, 
  CalendarIcon,
  ChartBarIcon 
} from '@heroicons/vue/24/outline'
import type { CounterData } from '@/types'

interface Props {
  data: CounterData
}

const props = defineProps<Props>()

const counterRef = ref<HTMLElement | null>(null)
const { currentValue, startCounter } = useCounter(props.data.value, 2500)

const iconComponent = computed(() => {
  const icons: Record<string, any> = {
    users: UsersIcon,
    heart: HeartIcon,
    gift: GiftIcon,
    calendar: CalendarIcon,
    chart: ChartBarIcon
  }
  return icons[props.data.icon] || ChartBarIcon
})

const displayValue = computed(() => {
  return currentValue.value.toLocaleString()
})

const prefix = computed(() => props.data.prefix || '')
const suffix = computed(() => props.data.suffix || '')

useIntersectionObserver(counterRef, (isIntersecting) => {
  if (isIntersecting) {
    startCounter()
  }
})
</script>