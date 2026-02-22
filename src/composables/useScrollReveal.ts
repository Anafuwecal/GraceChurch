import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  let observer: IntersectionObserver | null = null

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up')
        if (observer) {
          observer.unobserve(entry.target)
        }
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, observerOptions)
    
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up')
    revealElements.forEach(el => {
      if (observer) {
        observer.observe(el)
      }
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { observer }
}