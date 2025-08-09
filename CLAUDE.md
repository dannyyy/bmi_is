# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development Server:**
```bash
bun run dev
```
Runs the Nuxt.js development server at `http://localhost:3000` with hot reload

**Build for Production:**
```bash
bun run build      # Build the application
bun run preview    # Preview production build locally
bun run generate   # Generate static site
```

**Dependencies:**
```bash
bun install        # Install all dependencies
bun run postinstall # Prepare Nuxt (runs automatically after install)
```

## Architecture Overview

This is a **Nuxt.js 4** application using **Vue.js 3 Composition API** for a BMI calculator with interactive sliders and real-time calculations.

### Core Architecture Patterns

**Target-Based Calculation System:**
- Users can choose to calculate BMI, weight, or height as the target variable
- Real-time calculations update as users adjust sliders
- Disabled inputs prevent circular calculations

**Composable-Based Logic:**
- `useBMI.ts` contains all BMI calculation logic and health category determination
- Pure functions for `calculateBMI`, `calculateWeight`, `calculateHeight`
- Health insights with BMI categories and healthy weight ranges

**Reactive Data Flow:**
- Vue reactivity with `ref()` for input values
- `computed()` properties for calculated results
- `watch()` functions to sync values when target variable changes

### Key Components Structure

```
components/
├── Calculator/
│   ├── BMICalculator.vue      # Main orchestrator component
│   ├── InputSlider.vue        # Reusable slider with progress bar
│   ├── TargetSelector.vue     # Target variable selection
│   └── ResultDisplay.vue      # BMI results with health insights
└── UI/
    ├── Card.vue              # Reusable card container
    └── Badge.vue             # Status/category badges
```

**BMICalculator.vue** is the main orchestrator that:
- Manages state for age, weight, height, targetBMI, and targetVariable
- Uses watchers to keep calculations in sync when target changes
- Conditionally renders inputs based on selected target

### Styling Architecture

**Tailwind CSS with Custom Extensions:**
- Custom primary color palette (blue theme)
- Custom animations: `fade-in`, `slide-up`, `pulse-soft`
- Component-specific styles in `assets/css/main.css`

**Slider Component Styling:**
- Custom webkit and moz slider thumb styles
- Progress bar visualization showing current value
- Hover and focus states with smooth transitions

**Visual Hierarchy:**
- Gradient backgrounds for result cards (`bg-gradient-to-br`)
- Color-coded BMI categories (blue, green, yellow, red)
- Hover effects with lift animation (`hover-lift` class)

## Component Patterns

**InputSlider Component:**
- Props: `id`, `label`, `modelValue`, `min`, `max`, `step`, `unit`, `disabled`, `formatter`
- Emits: `update:modelValue` for v-model compatibility
- Features: Custom progress bar, min/max labels, optional formatting function

**Calculation Flow:**
1. User selects target variable (BMI, weight, or height)
2. Appropriate input slider gets disabled to prevent circular calculation
3. Watchers update dependent values in real-time
4. Results display updates automatically via computed properties

## TypeScript Integration

**Key Interfaces:**
- `BMIData`: Main data structure for calculator state
- `BMICategory`: Health category with styling information
- Component props use TypeScript interfaces with `defineProps<Props>()`

**Type Safety Features:**
- Strict typing on calculation functions
- Event handling with proper type assertions
- Computed properties with inferred return types

## Styling Conventions

**Tailwind Utilities:**
- `space-y-*` for vertical spacing
- `grid gap-* md:grid-cols-*` for responsive layouts  
- `text-*` and `bg-*` for semantic color usage
- `transition-all duration-*` for smooth animations

**Component Classes:**
- `.slider-input` for custom range input styling
- `.hover-lift` for card hover effects
- Custom webkit scrollbar styling

## Important Technical Details

**Calculation Precision:**
- Height stored in centimeters, converted to meters for BMI calculation
- Weight and height sliders use appropriate step values (0.1kg, 0.5cm)
- Results displayed with 1 decimal place precision

**Accessibility:**
- Proper label associations with slider inputs
- Keyboard navigation support
- Screen reader friendly structure

**Responsive Design:**
- Mobile-first approach with `md:` and `lg:` breakpoints
- Grid layouts that stack on mobile
- Touch-friendly slider controls