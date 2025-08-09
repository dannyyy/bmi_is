<template>
  <div class="space-y-8">
    <!-- Target Selection -->
    <UICard :hover="true">
      <CalculatorTargetSelector 
        v-model="targetVariable"
      />
    </UICard>

    <!-- Input Controls -->
    <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <!-- Weight Input (shown when target is BMI or Height) -->
      <UICard v-if="targetVariable === 'bmi' || targetVariable === 'height'" :hover="true">
        <CalculatorInputSlider
          id="weight"
          label="Weight"
          v-model="weight"
          :min="30"
          :max="200"
          :step="0.1"
          unit=" kg"
        />
      </UICard>

      <!-- Height Input (shown when target is BMI or Weight) -->
      <UICard v-if="targetVariable === 'bmi' || targetVariable === 'weight'" :hover="true">
        <CalculatorInputSlider
          id="height"
          label="Height"
          v-model="height"
          :min="100"
          :max="220"
          :step="0.5"
          unit=" cm"
        />
      </UICard>

      <!-- BMI Input (shown when target is Weight or Height) -->
      <UICard v-if="targetVariable === 'weight' || targetVariable === 'height'" :hover="true">
        <CalculatorInputSlider
          id="target-bmi"
          label="Target BMI"
          v-model="targetBMI"
          :min="15"
          :max="40"
          :step="0.1"
          unit=""
        />
      </UICard>
    </div>

    <!-- Results Display -->
    <UICard v-if="targetVariable === 'bmi'" class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600">
      <CalculatorResultDisplay
        :bmi="calculatedBMI"
        :height="height"
      />
    </UICard>

    <!-- Calculated Target Value -->
    <UICard v-if="targetVariable !== 'bmi'" class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-emerald-800/40 dark:to-green-800/40">
      <div class="text-center space-y-4">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 transition-colors">
          {{ targetVariable === 'weight' ? 'Target Weight' : 'Target Height' }}
        </h3>
        <div class="text-4xl font-bold text-green-600 dark:text-emerald-300 transition-colors">
          {{ targetValue.toFixed(1) }}
          {{ targetVariable === 'weight' ? 'kg' : 'cm' }}
        </div>
        <p class="text-sm text-gray-600 dark:text-slate-300 transition-colors">
          {{ targetVariable === 'weight' 
            ? `To reach BMI of ${targetBMI.toFixed(1)} at ${height}cm` 
            : `To reach BMI of ${targetBMI.toFixed(1)} at ${weight}kg`
          }}
        </p>
      </div>
    </UICard>
  </div>
</template>

<script setup lang="ts">
const { calculateBMI, calculateWeight, calculateHeight } = useBMI()

// Reactive data
const weight = ref(70)
const height = ref(175)
const targetBMI = ref(22)
const targetVariable = ref<'bmi' | 'weight' | 'height'>('bmi')

// Computed values
const calculatedBMI = computed(() => {
  if (targetVariable.value === 'bmi') {
    return targetBMI.value
  }
  return calculateBMI(weight.value, height.value)
})

const targetValue = computed(() => {
  if (targetVariable.value === 'weight') {
    return calculateWeight(targetBMI.value, height.value)
  } else if (targetVariable.value === 'height') {
    return calculateHeight(targetBMI.value, weight.value)
  }
  return 0
})

// Watch for changes in target variable to update values
watch(targetVariable, (newTarget) => {
  if (newTarget === 'bmi') {
    targetBMI.value = calculateBMI(weight.value, height.value)
  }
})

// Update weight when target is weight
watch([targetBMI, height], () => {
  if (targetVariable.value === 'weight') {
    weight.value = calculateWeight(targetBMI.value, height.value)
  }
}, { immediate: false })

// Update height when target is height
watch([targetBMI, weight], () => {
  if (targetVariable.value === 'height') {
    height.value = calculateHeight(targetBMI.value, weight.value)
  }
}, { immediate: false })

// Update BMI when target is BMI
watch([weight, height], () => {
  if (targetVariable.value === 'bmi') {
    targetBMI.value = calculateBMI(weight.value, height.value)
  }
}, { immediate: false })
</script>