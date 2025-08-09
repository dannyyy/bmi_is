# BMI Calculator - Professional Health Tool

A modern, interactive BMI (Body Mass Index) calculator built with Vue.js 3, Nuxt.js 3, and Tailwind CSS.

## Features

- **Interactive Sliders**: Real-time calculation as you adjust inputs
- **Flexible Target Calculation**: Choose to calculate weight, height, or BMI as your target
- **Modern Design**: Professional UI with smooth animations and responsive layout
- **Health Insights**: BMI categories, healthy weight ranges, and age-appropriate information
- **Accessibility**: Full keyboard navigation and screen reader support

## Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Framework**: Nuxt.js 3
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Project Structure

```
├── components/
│   ├── Calculator/
│   │   ├── BMICalculator.vue      # Main calculator component
│   │   ├── InputSlider.vue        # Reusable slider component
│   │   ├── TargetSelector.vue     # Target variable selector
│   │   └── ResultDisplay.vue      # Results with health insights
│   └── UI/
│       ├── Card.vue              # Reusable card component
│       └── Badge.vue             # Status badge component
├── composables/
│   └── useBMI.ts                 # BMI calculation logic
├── layouts/
│   └── default.vue               # Main layout
├── pages/
│   └── index.vue                 # Home page
└── assets/
    └── css/
        └── main.css              # Custom styles
```

## Usage

1. **Select Target**: Choose what you want to calculate (Weight, Height, or BMI)
2. **Adjust Inputs**: Use the sliders to set your age and other parameters
3. **View Results**: See real-time calculations and health insights
4. **Explore Scenarios**: Change targets to explore different health scenarios

## BMI Categories

- **Underweight**: BMI < 18.5
- **Normal weight**: BMI 18.5 - 24.9  
- **Overweight**: BMI 25.0 - 29.9
- **Obese**: BMI ≥ 30.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Disclaimer

This BMI calculator is for informational purposes only and should not be used as a substitute for professional medical advice. Always consult with a healthcare professional for medical guidance.