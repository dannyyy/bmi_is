# Code Style and Conventions

## Vue/TypeScript Conventions
- **Composition API**: All components use Vue 3 Composition API (not Options API)
- **TypeScript**: Full TypeScript usage with strict typing
- **Script Setup**: Components use `<script setup lang="ts">` syntax
- **Reactivity**: Use `ref()` for reactive values, `computed()` for derived values
- **Props/Emits**: Define with TypeScript interfaces using `defineProps<Props>()`

## Component Naming
- **File Names**: PascalCase for component files (e.g., `BMICalculator.vue`)
- **Directory Structure**: Organized by feature/domain (Calculator/, UI/)
- **Import Names**: Match component file names exactly

## Styling Conventions
- **Tailwind CSS**: Primary styling approach with utility classes
- **Custom Classes**: Defined in `assets/css/main.css` using `@layer components`
- **Responsive**: Mobile-first approach using `md:` and `lg:` breakpoints
- **Dark Mode**: Class-based dark mode with `dark:` prefixes
- **Animations**: Custom animations defined in Tailwind config

## TypeScript Patterns
- **Interfaces**: Defined for component props and data structures
- **Type Safety**: Strict typing on functions and reactive values
- **Event Handling**: Proper typing for event emitters
- **Computed Properties**: Type inference preferred over explicit typing

## Composables Conventions
- **File Names**: `use[Feature].ts` naming pattern
- **Return Objects**: Destructurable objects with reactive properties
- **Pure Functions**: Calculation functions are pure and testable
- **Reactive State**: Use Vue reactivity system within composables

## Code Organization
- **Single Responsibility**: Each component has clear, focused responsibility
- **Composition over Inheritance**: Prefer composables over component inheritance
- **Props Down, Events Up**: Standard Vue data flow pattern
- **Minimal Props**: Keep component interfaces simple and focused

## No Linting/Formatting Tools
- **Manual Consistency**: No ESLint, Prettier, or automated formatting
- **Code Reviews**: Rely on manual code review for style consistency
- **Convention Following**: Developers must manually follow established patterns