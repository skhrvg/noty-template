import { computed, ref } from 'vue'

const canInstall = ref(false)

export function usePWA() {
  function check() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      window.deferredPrompt = event
      canInstall.value = true
    })
  }

  function prompt() {
    canInstall.value = false
    window.deferredPrompt.prompt()
    window.deferredPrompt.userChoice.then(() => {
      window.deferredPrompt = null
    })
  }

  const isInstallable = computed(() => canInstall.value)

  return { isInstallable, check, prompt }
}
