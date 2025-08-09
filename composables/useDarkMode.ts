export const useDarkMode = () => {
  // Initialize dark mode state from localStorage or system preference
  const isDark = ref(false)

  // Initialize on client side
  onMounted(() => {
    const stored = localStorage.getItem('dark-mode')
    if (stored) {
      isDark.value = stored === 'true'
    } else {
      // Use system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateDOM()
  })

  // Update DOM classes
  const updateDOM = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Toggle dark mode
  const toggle = () => {
    isDark.value = !isDark.value
    if (process.client) {
      localStorage.setItem('dark-mode', isDark.value.toString())
      updateDOM()
    }
  }

  // Watch for changes
  watch(isDark, updateDOM)

  return {
    isDark: readonly(isDark),
    toggle
  }
}