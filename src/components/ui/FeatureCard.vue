<template>
  <div class="flex items-start space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
    <div class="flex-shrink-0">
      <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
        <component :is="iconComponent" class="w-6 h-6 text-primary-600" />
      </div>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  HeartIcon, 
  UsersIcon, 
  BookOpenIcon, 
  HandRaisedIcon,
  GiftIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

interface Props {
  icon: string
  title: string
  description: string
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
  const icons: Record<string, any> = {
    heart: HeartIcon,
    users: UsersIcon,
    book: BookOpenIcon,
    hand: HandRaisedIcon,
    gift: GiftIcon,
    sparkles: SparklesIcon
  }
  return icons[props.icon] || HeartIcon
})
</script>