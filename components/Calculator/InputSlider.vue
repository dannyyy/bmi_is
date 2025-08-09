<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center">
      <label :for="id" class="text-sm font-semibold text-gray-700 dark:text-slate-200 transition-colors">
        {{ label }}
      </label>
      <div class="flex items-center space-x-2">
        <span class="text-lg font-bold text-gray-900 dark:text-slate-100 transition-colors">{{ displayValue }}</span>
        <span class="text-sm text-gray-500 dark:text-slate-400 transition-colors">{{ unit }}</span>
      </div>
    </div>
    
    <div class="relative">
      <input
        :id="id"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        class="slider-input"
        :class="{ 'opacity-50': disabled }"
        @input="updateValue"
      >
      
      <!-- Progress bar -->
      <div
        class="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg pointer-events-none"
        :style="{ width: progressWidth }"
      ></div>
    </div>
    
    <div class="flex justify-between text-xs text-gray-400 dark:text-slate-500 transition-colors">
      <span>{{ min }}{{ unit }}</span>
      <span>{{ max }}{{ unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  modelValue: number
  min: number
  max: number
  step: number
  unit: string
  disabled?: boolean
  formatter?: (value: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  formatter: (value: number) => value.toFixed(1)
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', parseFloat(target.value))
}

const displayValue = computed(() => {
  return props.formatter ? props.formatter(props.modelValue) : props.modelValue.toFixed(1)
})

const progressWidth = computed(() => {
  const progress = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return `${Math.min(100, Math.max(0, progress))}%`
})
</script>