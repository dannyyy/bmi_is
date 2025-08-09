# Codebase Structure

## Root Directory
```
bmi_is/
├── app.vue                 # Root Vue component (minimal layout wrapper)
├── nuxt.config.ts         # Nuxt configuration
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
├── CLAUDE.md             # Development guidance for Claude Code
├── README.md             # Project documentation
└── Dockerfile            # Container configuration
```

## Directory Structure
```
├── assets/
│   └── css/
│       └── main.css      # Global styles and custom Tailwind components
├── components/
│   ├── Calculator/       # BMI calculator components
│   │   ├── BMICalculator.vue    # Main orchestrator component
│   │   ├── InputSlider.vue      # Reusable slider with progress bar
│   │   ├── TargetSelector.vue   # Target variable selection
│   │   └── ResultDisplay.vue    # BMI results with health insights
│   └── UI/              # Reusable UI components
│       ├── Card.vue     # Card container component
│       └── Badge.vue    # Status/category badges
├── composables/         # Vue composables (shared logic)
│   ├── useBMI.ts       # BMI calculations and health insights
│   └── useDarkMode.ts  # Dark mode functionality
├── layouts/            # Nuxt layouts (auto-imported)
├── pages/              # Nuxt pages (file-based routing)
│   └── index.vue       # Main landing page
└── server/             # Server-side code (if needed)
```

## Component Architecture
- **BMICalculator.vue**: Main orchestrator managing state and calculations
- **InputSlider.vue**: Reusable slider component with progress visualization
- **TargetSelector.vue**: UI for selecting calculation target (BMI/weight/height)
- **ResultDisplay.vue**: Shows calculated results with health category information
- **UI Components**: Shared Card and Badge components for consistent styling

## Composables Pattern
- **useBMI.ts**: Contains all BMI calculation logic, health categories, and insights
- **useDarkMode.ts**: Handles theme switching functionality
- Composables provide reactive, reusable logic across components