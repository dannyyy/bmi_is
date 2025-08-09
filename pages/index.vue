<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center space-y-6 py-12">
      <div class="animate-fade-in">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-4 transition-colors">
          BMI Calculator
        </h1>
        <p class="text-xl text-gray-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors">
          Calculate your Body Mass Index and explore different health scenarios 
          with our interactive calculator
        </p>
      </div>

      <!-- Feature highlights -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div class="flex flex-col items-center space-y-3 p-6 bg-white/60 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm transition-colors">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-slate-100 transition-colors">Real-time Calculation</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300 text-center transition-colors">
            Instant results as you adjust your inputs
          </p>
        </div>

        <div class="flex flex-col items-center space-y-3 p-6 bg-white/60 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm transition-colors">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center transition-colors">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-slate-100 transition-colors">Flexible Targets</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300 text-center transition-colors">
            Calculate weight, height, or BMI as your target
          </p>
        </div>

        <div class="flex flex-col items-center space-y-3 p-6 bg-white/60 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm transition-colors">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center transition-colors">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-slate-100 transition-colors">Health Insights</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300 text-center transition-colors">
            Get detailed health information and recommendations
          </p>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section id="calculator" class="scroll-mt-20">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4 transition-colors">Interactive Calculator</h2>
        <p class="text-lg text-gray-600 dark:text-slate-300 transition-colors">
          Choose what you want to calculate and adjust the sliders
        </p>
      </div>

      <CalculatorBMICalculator />
    </section>

    <!-- About Section -->
    <section id="about" class="scroll-mt-20 py-16">
      <UICard class="max-w-4xl mx-auto">
        <div class="prose prose-lg max-w-none">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-6 transition-colors">About Body Mass Index (BMI)</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-200 transition-colors">What is BMI?</h3>
              <p class="text-gray-600 dark:text-slate-300 transition-colors">
                Body Mass Index (BMI) is a measure that uses your height and weight to work out 
                if your weight is healthy. It's calculated by dividing your weight in kilograms 
                by your height in meters squared.
              </p>
              
              <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-200 transition-colors">How to Use This Calculator</h3>
              <p class="text-gray-600 dark:text-slate-300 transition-colors">
                This calculator allows you to explore different scenarios by choosing which value 
                to calculate as your target. You can find your ideal weight for a target BMI, 
                or discover what BMI you'd achieve at different weights.
              </p>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-200 transition-colors">Important Note</h3>
              <p class="text-gray-600 dark:text-slate-300 transition-colors">
                BMI is a useful screening tool, but it doesn't directly measure body fat or 
                muscle mass. Athletes and very muscular people may have a high BMI but low body fat. 
                Always consult with a healthcare professional for personalized advice.
              </p>

              <div class="bg-blue-50 dark:bg-blue-800/30 p-4 rounded-lg transition-colors">
                <h4 class="font-semibold text-blue-900 dark:text-blue-200 mb-2 transition-colors">Formula</h4>
                <p class="text-blue-800 dark:text-blue-300 font-mono text-sm transition-colors">
                  BMI = weight (kg) ÷ height (m)²
                </p>
              </div>
            </div>
          </div>
        </div>
      </UICard>
    </section>
  </div>
</template>

<script setup lang="ts">
// Set page metadata
useHead({
  title: 'BMI Calculator - Professional Health Tool',
  meta: [
    {
      name: 'description',
      content: 'Calculate your BMI with our interactive calculator. Choose to calculate weight, height, or BMI as your target with real-time results and health insights.'
    }
  ]
})
</script>