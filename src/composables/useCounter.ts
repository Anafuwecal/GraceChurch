import { ref, onMounted } from 'vue'

export function useCounter(endValue: number, duration: number = 2000) {
  const currentValue = ref(0)
  const isVisible = ref(false)

  const startCounter = () => {
    if (isVisible.value) return
    
    isVisible.value = true
    const startTime = Date.now()
    const startValue = 0

    const updateCounter = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      currentValue.value = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        currentValue.value = endValue
      }
    }

    requestAnimationFrame(updateCounter)
  }

  return {
    currentValue,
    startCounter,
    isVisible
  }
}