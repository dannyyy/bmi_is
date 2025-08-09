# Task Completion Workflow

## Current State (No Automated Tools)
The project currently has **NO** automated testing, linting, or formatting tools configured.

## Manual Validation Steps
When completing any development task, perform these manual checks:

### 1. Code Quality Checks
- **TypeScript**: Ensure no TypeScript errors in IDE
- **Vue Template Syntax**: Verify template syntax is correct
- **Import/Export**: Check all imports resolve correctly
- **Component Props**: Validate prop types and interfaces

### 2. Browser Testing
- **Development Mode**: Test changes in `bun run dev`
- **Production Build**: Run `bun run build` and `bun run preview` 
- **Responsive Testing**: Check mobile, tablet, desktop layouts
- **Dark Mode**: Verify both light and dark themes work
- **Interactive Elements**: Test sliders, buttons, and calculations

### 3. Accessibility Testing
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader**: Test with VoiceOver (macOS) or similar
- **Focus States**: Ensure visible focus indicators
- **ARIA Labels**: Verify accessibility attributes

### 4. Cross-Browser Testing
- **Chrome/Safari**: Primary browsers for macOS development
- **Mobile Safari**: Test on iPhone/iPad if possible
- **Basic Functionality**: Ensure core features work across browsers

## What to Run After Code Changes
1. **Start Dev Server**: `bun run dev` (if not already running)
2. **Browser Refresh**: Reload page to see changes
3. **Manual Testing**: Interact with changed functionality
4. **Build Test**: `bun run build` to ensure production build works
5. **Preview Test**: `bun run preview` to test production behavior

## Future Tooling Recommendations
Consider adding these tools for better development experience:
- **ESLint**: Code quality and consistency
- **Prettier**: Automated code formatting  
- **Vitest**: Unit testing framework
- **Playwright/Cypress**: E2E testing
- **TypeScript strict mode**: Enhanced type checking

## Git Workflow
- Make atomic commits with clear messages
- Test thoroughly before pushing
- Consider using conventional commit format