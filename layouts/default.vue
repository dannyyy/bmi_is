<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-600 sticky top-0 z-50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <UIAppIcon />
          
          <div class="flex items-center space-x-6">
            <nav class="hidden md:flex space-x-8">
              <a href="#calculator" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors">
                Calculator
              </a>
              <a href="#about" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors">
                About BMI
              </a>
            </nav>
            
            <!-- Dark Mode Toggle -->
            <button
              @click="toggle"
              class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              <svg v-if="!isDark" class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-600 mt-16 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center space-y-4">
          <p class="text-gray-600 dark:text-gray-300 transition-colors">
            <strong>Disclaimer:</strong> This BMI calculator is for informational purposes only. 
            Please consult with a healthcare professional for medical advice.
          </p>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            <span>© {{ currentYear }} BMI Calculator</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle } = useDarkMode()
const currentYear = new Date().getFullYear()
</script>