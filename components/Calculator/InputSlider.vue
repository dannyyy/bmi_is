<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center">
      <label :for="id" class="text-sm font-semibold text-gray-700 dark:text-slate-200 transition-colors">
        {{ label }}
      </label>
      <div class="flex items-center space-x-2">
        <div class="relative inline-flex items-center">
          <span 
            v-if="!isEditing"
            @click="enterEditMode"
            class="text-lg font-bold text-gray-900 dark:text-slate-100 transition-all cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded-md select-none"
            :class="{ 'opacity-50': disabled }"
            :aria-label="`Click to edit ${label.toLowerCase()}`"
            :title="`Click to edit ${label.toLowerCase()}`"
          >
            {{ displayValue }}
            <svg class="w-3 h-3 ml-1 opacity-60 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </span>
          <input
            v-else
            ref="editInput"
            type="number"
            v-model="tempValue"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            @blur="saveValue"
            @keydown="handleKeydown"
            class="text-lg font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-slate-100 px-2 py-1 text-center number-input-no-spinner"
            :style="{ width: `${Math.max(String(tempValue).length + 2, 4)}ch` }"
          />
        </div>
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
        class="absolute left-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg pointer-events-none z-0"
        :style="{ width: progressWidth, top: '9.5px' }"
      ></div>
    </div>
    
    <div class="flex justify-between text-xs text-gray-400 dark:text-slate-500 transition-colors">
      <span>{{ min }}{{ unit }}</span>
      <span>{{ max }}{{ unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'

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

// State for click-to-edit functionality
const isEditing = ref(false)
const tempValue = ref('')
const editInput = ref<HTMLInputElement>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', parseFloat(target.value))
}

// Click-to-edit functionality
const enterEditMode = () => {
  if (props.disabled) return
  
  isEditing.value = true
  tempValue.value = String(props.modelValue)
  
  nextTick(() => {
    if (editInput.value) {
      editInput.value.focus()
      editInput.value.select()
    }
  })
}

const saveValue = () => {
  const numValue = parseFloat(tempValue.value)
  
  if (!isNaN(numValue)) {
    const validatedValue = validateInput(numValue)
    emit('update:modelValue', validatedValue)
  }
  
  exitEditMode()
}

const cancelEdit = () => {
  tempValue.value = String(props.modelValue)
  exitEditMode()
}

const exitEditMode = () => {
  isEditing.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveValue()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}

const validateInput = (value: number): number => {
  // Ensure value is within bounds
  const clampedValue = Math.max(props.min, Math.min(props.max, value))
  
  // Round to nearest step
  const steps = Math.round((clampedValue - props.min) / props.step)
  return props.min + (steps * props.step)
}

const displayValue = computed(() => {
  return props.formatter ? props.formatter(props.modelValue) : props.modelValue.toFixed(1)
})

const progressWidth = computed(() => {
  const progress = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return `${Math.min(100, Math.max(0, progress))}%`
})
</script>