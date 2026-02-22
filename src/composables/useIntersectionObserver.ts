import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIntersectionObserver(
  target: Ref<Element | null>,
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const isIntersecting = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (target.value) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry) {
            isIntersecting.value = entry.isIntersecting
            callback(entry.isIntersecting)
          }
        },
        {
          threshold: 0.1,
          ...options
        }
      )
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { isIntersecting }
}