<template>
  <div class="flex items-center space-x-3">
    <!-- App Icon with theme awareness -->
    <img 
      :src="iconSrc" 
      alt="BMI Calculator" 
      class="w-8 h-8 transition-all duration-300"
    >
    
    <!-- App Title -->
    <span class="text-xl font-bold text-gray-900 dark:text-white transition-colors">
      BMI Calculator
    </span>
  </div>
</template>

<script setup>
import { useDarkMode } from '~/composables/useDarkMode'

const { isDark } = useDarkMode()

const iconSrc = computed(() => 
  isDark.value ? '/icon-dark.svg' : '/icon-light.svg'
)
</script>