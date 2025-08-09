<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-slate-100 transition-colors">Calculate Target</h3>
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="option in options"
        :key="option.value"
        @click="$emit('update:modelValue', option.value)"
        :class="[
          'px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm',
          modelValue === option.value
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-800/40 text-blue-700 dark:text-blue-200'
            : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:border-gray-300 dark:hover:border-slate-500'
        ]"
      >
        <div class="flex flex-col items-center space-y-1">
          <component :is="option.icon" class="w-5 h-5" />
          <span>{{ option.label }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScaleIcon, HeartIcon, UsersIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue: 'weight' | 'height' | 'bmi'
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: 'weight' | 'height' | 'bmi']
}>()

const options = [
  {
    value: 'bmi' as const,
    label: 'BMI',
    icon: HeartIcon
  },
  {
    value: 'weight' as const,
    label: 'Weight',
    icon: ScaleIcon
  },
  {
    value: 'height' as const,
    label: 'Height',
    icon: UsersIcon
  }
]
</script>