# Suggested Development Commands

## Primary Development Commands

### Start Development
```bash
bun run dev
```
- Starts Nuxt development server at `http://localhost:3000`
- Enables hot reload and development tools
- Primary command for daily development work

### Install Dependencies  
```bash
bun install
```
- Installs all project dependencies
- Runs automatically after cloning the project
- Also runs `bun run postinstall` automatically

### Build Commands
```bash
bun run build        # Build for production
bun run preview      # Preview production build locally  
bun run generate     # Generate static site
```

### Nuxt-Specific Commands
```bash
bun run postinstall  # Prepare Nuxt (runs automatically after install)
```

## System Commands (macOS)
- **File Operations**: `ls`, `cd`, `mkdir`, `rm`, `cp`, `mv`
- **Text Processing**: `grep`, `find`, `cat`, `less`, `head`, `tail`
- **Git**: `git status`, `git add`, `git commit`, `git push`, `git pull`
- **Process Management**: `ps`, `kill`, `top`, `htop`

## Development Workflow
1. **Start Development**: `bun run dev`
2. **Make Changes**: Edit files with hot reload
3. **Test Manually**: Interact with the application in browser
4. **Build for Production**: `bun run build` when ready
5. **Preview**: `bun run preview` to test production build

## Important Notes
- **No Testing Commands**: Project has no test suite configured
- **No Linting/Formatting**: No ESLint, Prettier, or similar tools
- **Manual Quality Control**: Code quality maintained through manual review
- **Bun Preferred**: Use `bun` commands instead of `npm` when possible