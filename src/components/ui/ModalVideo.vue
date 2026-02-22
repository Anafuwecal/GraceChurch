<template>
  <Teleport to="body">
    <div 
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      @click="closeModal"
    >
      <div 
        class="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
        @click.stop
      >
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
        
        <div class="aspect-video">
          <iframe
            v-if="videoUrl"
            :src="videoUrl"
            class="w-full h-full"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  videoUrl?: string
  modelValue?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'update:modelValue'])

const isVisible = ref(false)

watch(() => props.modelValue, (newValue) => {
  isVisible.value = !!newValue
})

watch(() => props.videoUrl, (newValue) => {
  isVisible.value = !!newValue
})

const closeModal = () => {
  isVisible.value = false
  emit('close')
  emit('update:modelValue', false)
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isVisible.value) {
    closeModal()
  }
})
</script>