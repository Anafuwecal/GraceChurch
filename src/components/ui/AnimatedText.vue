<template>
  <div :class="className">
    <span 
      v-for="(word, index) in words" 
      :key="index"
      class="inline-block opacity-0 animate-word"
      :style="{ animationDelay: `${delay + index * 0.1}s` }"
    >
      {{ word }}&nbsp;
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  className?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  delay: 0
})

const words = computed(() => props.text.split(' '))
</script>

<style scoped>
@keyframes word-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-word {
  animation: word-reveal 0.6s ease-out forwards;
}
</style>