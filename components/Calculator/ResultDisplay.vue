<template>
  <div class="text-center space-y-6 animate-fade-in">
    <!-- BMI Value -->
    <div class="space-y-2">
      <div class="text-5xl font-bold text-gray-900 dark:text-slate-100 animate-pulse-soft transition-colors">
        {{ bmi.toFixed(1) }}
      </div>
      <div class="text-lg text-gray-600 dark:text-slate-300 transition-colors">Body Mass Index</div>
    </div>

    <!-- BMI Category Badge -->
    <div class="flex justify-center">
      <UIBadge :bg-color="category.bgColor" :text-color="category.color">
        {{ category.name }} ({{ category.range }})
      </UIBadge>
    </div>

    <!-- Health Information -->
    <div class="bg-gray-50 dark:bg-slate-700/60 rounded-lg p-4 space-y-3 transition-colors">
      <h4 class="font-semibold text-gray-800 dark:text-slate-100 transition-colors">Health Information</h4>
      
      <div class="text-sm text-gray-600 dark:text-slate-300 space-y-2 transition-colors">
        <div class="flex justify-between">
          <span>Current BMI:</span>
          <span class="font-medium">{{ bmi.toFixed(1) }}</span>
        </div>
        
        <div class="flex justify-between">
          <span>Healthy weight range:</span>
          <span class="font-medium">
            {{ healthyRange.min.toFixed(1) }} - {{ healthyRange.max.toFixed(1) }} kg
          </span>
        </div>
        
      </div>
    </div>

    <!-- BMI Categories Reference -->
    <div class="bg-white dark:bg-slate-700/60 border dark:border-slate-600 rounded-lg p-4 transition-colors">
      <h4 class="font-semibold text-gray-800 dark:text-slate-100 mb-3 transition-colors">BMI Categories</h4>
      <div class="space-y-2 text-sm">
        <div
          v-for="cat in bmiCategories"
          :key="cat.name"
          class="flex justify-between items-center"
        >
          <span class="text-gray-700 dark:text-slate-200 transition-colors">{{ cat.name }}</span>
          <UIBadge :bg-color="cat.bgColor" :text-color="cat.color">
            {{ cat.range }}
          </UIBadge>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getBMICategory, getHealthyWeightRange } = useBMI()

interface Props {
  bmi: number
  height: number
}

const props = defineProps<Props>()

const category = computed(() => getBMICategory(props.bmi))

const healthyRange = computed(() => getHealthyWeightRange(props.height))


const bmiCategories = [
  {
    name: 'Underweight',
    range: '< 18.5',
    color: 'text-blue-600 dark:text-blue-300',
    bgColor: 'bg-blue-100 dark:bg-blue-800/40'
  },
  {
    name: 'Normal',
    range: '18.5 - 24.9',
    color: 'text-green-600 dark:text-green-300',
    bgColor: 'bg-green-100 dark:bg-green-800/40'
  },
  {
    name: 'Overweight',
    range: '25.0 - 29.9',
    color: 'text-yellow-600 dark:text-yellow-300',
    bgColor: 'bg-yellow-100 dark:bg-yellow-800/40'
  },
  {
    name: 'Obese',
    range: '≥ 30.0',
    color: 'text-red-600 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-800/40'
  }
]
</script>