# Tech Stack

## Core Framework
- **Frontend Framework**: Vue.js 3 with Composition API
- **Meta Framework**: Nuxt.js 4 (latest version)
- **Language**: TypeScript (full type safety)
- **Package Manager**: Bun (recommended) with fallback to Node.js 18+

## Styling & UI
- **CSS Framework**: Tailwind CSS with custom extensions
- **Component Library**: Custom components (no external UI library)
- **Icons**: Heroicons (@heroicons/vue)
- **Fonts**: Inter font family via Google Fonts
- **Dark Mode**: Built-in support with class-based toggle

## Architecture Patterns
- **Composition API**: Vue 3 reactive system with composables
- **Component Architecture**: Modular component structure
- **State Management**: Vue reactivity (no external state manager needed)
- **Type Safety**: Full TypeScript integration

## Dependencies
### Development Dependencies
- @nuxt/devtools: Development tools
- nuxt: ^4.0.3 (core framework)
- @nuxtjs/tailwindcss: ^6.8.4 (styling)
- @headlessui/vue: ^1.7.16 (accessible components)
- @heroicons/vue: ^2.0.18 (icons)

### Runtime Dependencies  
- @nuxtjs/google-fonts: ^3.0.2 (font loading)

## Build Tools
- **Bundler**: Vite (via Nuxt)
- **Deployment**: Static generation with prerendering
- **Optimization**: Compression, minification, asset optimization