<template>
  <div
    :class="[
      'bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-600 transition-colors duration-300',
      { 'hover-lift': hover }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false
})
</script>