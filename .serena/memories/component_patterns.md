# Component Patterns and Architecture

## Core Component Architecture

### BMI Calculator Pattern
**Main Orchestrator**: `BMICalculator.vue`
- Manages all state: age, weight, height, targetBMI, targetVariable
- Uses watchers to sync calculations when target variable changes  
- Conditionally renders inputs based on selected target
- Coordinates between input sliders and result display

### Reusable Slider Pattern
**InputSlider.vue** provides:
- Custom progress bar visualization showing current value
- Props: `id`, `label`, `modelValue`, `min`, `max`, `step`, `unit`, `disabled`, `formatter`
- Emits: `update:modelValue` for v-model compatibility
- Custom styling with webkit and moz range slider styles

### Calculation Flow
1. User selects target variable (BMI, weight, or height)
2. Appropriate input slider gets disabled to prevent circular calculation
3. Watchers update dependent values in real-time using composable functions
4. Results display updates automatically via computed properties

## Vue 3 Composition API Patterns

### Reactive State Management
```typescript
// BMICalculator.vue pattern
const weight = ref(70)
const height = ref(170) 
const targetBMI = ref(22)
const targetVariable = ref<'bmi' | 'weight' | 'height'>('bmi')

// Computed calculations
const calculatedBMI = computed(() => calculateBMI(weight.value, height.value))
```

### Watcher Patterns
```typescript
// Sync values when target changes
watch(targetVariable, (newTarget) => {
  if (newTarget === 'weight') {
    weight.value = calculateWeight(height.value, targetBMI.value)
  }
  // Similar for other targets
}, { immediate: true })
```

### Composable Integration
- Import calculation functions from `useBMI.ts` composable
- Use reactive refs within composables for shared state
- Pure calculation functions for testability

## Component Communication

### Props Down Pattern
- Parent components pass data down via props
- TypeScript interfaces define prop shapes
- Use `defineProps<Interface>()` syntax

### Events Up Pattern  
- Child components emit events to communicate state changes
- Use `defineEmits<{ 'update:modelValue': [value: number] }>()` for v-model
- Parent components listen to events and update state

### v-model Integration
- InputSlider implements v-model protocol with modelValue prop and update:modelValue emit
- Allows two-way binding: `<InputSlider v-model="weight" />`

## Styling Architecture

### Tailwind Utility Pattern
- Primary styling through Tailwind utilities
- Responsive modifiers: `md:grid-cols-2`, `lg:text-xl`
- State modifiers: `hover:shadow-xl`, `focus:ring-2`, `dark:bg-slate-800`

### Custom Component Classes
```css
/* assets/css/main.css */
@layer components {
  .slider-input { /* custom slider styles */ }
  .hover-lift { /* card hover effects */ }
}
```

### Animation Integration
- Custom animations defined in `tailwind.config.js`
- Applied via classes: `animate-fade-in`, `animate-slide-up`
- Smooth transitions with `transition-all duration-300`

## TypeScript Integration Patterns

### Component Props Interface
```typescript
interface Props {
  modelValue: number
  min: number
  max: number
  disabled?: boolean
  formatter?: (value: number) => string
}
```

### Event Typing
```typescript
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()
```

### Composable Return Types
```typescript
// useBMI.ts pattern
interface BMIData {
  bmi: number
  category: BMICategory
  healthyWeightRange: { min: number; max: number }
}
```