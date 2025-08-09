# BMI Calculator

A modern, interactive BMI (Body Mass Index) calculator built with Vue.js 3, Nuxt.js 4, and Tailwind CSS.

## ✨ Features

- **Interactive Sliders**: Real-time calculation as you adjust inputs with visual progress bars
- **Flexible Target Calculation**: Choose to calculate weight, height, or BMI as your target variable
- **Modern Design**: Professional UI with smooth animations and responsive layout
- **Health Insights**: BMI categories, healthy weight ranges, and personalized recommendations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Framework**: Nuxt.js 4 (latest)
- **Styling**: Tailwind CSS with custom extensions
- **Icons**: Heroicons
- **Fonts**: Inter (Google Fonts)
- **Package Manager**: Bun
- **TypeScript**: Full type safety

## 🛠️ Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/dannyyy/bmi_is.git
cd bmi_is

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:3000`

### Build Commands

```bash
# Build for production
bun run build

# Preview production build
bun run preview

# Generate static site
bun run generate

# Prepare Nuxt (runs automatically after install)
bun run postinstall
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

## 📱 Usage

1. **Select Target**: Choose what you want to calculate (Weight, Height, or BMI)
2. **Adjust Inputs**: Use interactive sliders to set your age and other parameters
3. **View Results**: See real-time calculations with health insights and recommendations
4. **Explore Scenarios**: Switch targets to explore different health scenarios
5. **Toggle Dark Mode**: Use the theme toggle for comfortable viewing

## 📊 BMI Categories

The calculator uses standard BMI categories:

- **Underweight**: BMI < 18.5 (Blue indicator)
- **Normal weight**: BMI 18.5 - 24.9 (Green indicator)
- **Overweight**: BMI 25.0 - 29.9 (Yellow indicator)
- **Obese**: BMI ≥ 30.0 (Red indicator)

## 🏗️ Architecture

### Key Design Patterns

- **Target-Based Calculation System**: Users can choose BMI, weight, or height as the target variable
- **Composable-Based Logic**: `useBMI.ts` contains pure calculation functions
- **Reactive Data Flow**: Vue reactivity with real-time updates
- **Component Architecture**: Reusable, well-structured components

### Core Components

- **BMICalculator.vue**: Main orchestrator component
- **InputSlider.vue**: Reusable slider with progress visualization
- **TargetSelector.vue**: Target variable selection interface
- **ResultDisplay.vue**: Results with health insights and recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## ⚠️ Disclaimer

This BMI calculator is for informational purposes only and should not be used as a substitute for professional medical advice. BMI is just one indicator of health status and may not be appropriate for all individuals. Always consult with a healthcare professional for personalized medical guidance.