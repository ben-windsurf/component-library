# Component Library

A shared UI component library for the Ticketing project ecosystem, providing reusable React components across multiple applications.

## Overview

This component library serves as the central source of truth for shared UI components used throughout the Ticketing project. It enables consistent design patterns, reduces code duplication, and ensures a unified user experience across all applications in the project.

## Project Structure

The Ticketing project consists of multiple applications that consume components from this library:

- **browse-app** - StubHub home page and sign in flow
- **vg-browse** - viagogo cobrand for home page 
- **my-account-app** - Razor-based support center
- **component-library** - The shared component library

## Architecture

### Build System
- **Bundler**: [tsup](https://tsup.egoist.dev/) for fast TypeScript/JavaScript bundling
- **Output Formats**: CommonJS (`dist/index.js`) and ES Modules (`dist/index.mjs`)
- **External Dependencies**: React and React DOM are marked as peer dependencies

### Package Configuration
- **Package Name**: `@ben-windsurf/component-library`
- **Version**: 1.0.0
- **Main Entry**: `dist/index.js`
- **Module Entry**: `dist/index.mjs`

## Available Components

### SearchBar
A customizable search input component with the following features:
- **Theme Support**: Configurable theme color (default: `#6f42c1`)
- **Icon Integration**: Accepts a search icon prop
- **Placeholder Text**: Customizable placeholder (default: "Search events, artists, teams, and more")
- **Styling**: Includes CSS with CSS custom properties for theming

**Usage Example:**
```jsx
import { SearchBar } from '@ben-windsurf/component-library';

<SearchBar 
  themeColor="#684cbc" 
  searchIcon={searchIconSrc}
  placeholder="Search for tickets..."
/>
```

## Development

### Scripts
- `npm run build` - Build the library for production
- `npm run dev` - Build in watch mode for development
- `npm run clean` - Remove the dist directory

### Adding New Components

1. Create a new component directory in `src/components/`
2. Follow the existing structure:
   ```
   src/components/YourComponent/
   ├── YourComponent.js
   ├── YourComponent.css
   └── index.js
   ```
3. Export the component in `src/index.js`
4. Run `npm run build` to generate the distribution files

## Integration with Other Apps

### Installation
Other applications in the Ticketing project can consume this library by:

1. **Local Development**: Link the package locally
   ```bash
   cd component-library
   npm link
   
   cd ../your-app
   npm link @ben-windsurf/component-library
   ```

2. **Production**: Install from npm registry (when published)
   ```bash
   npm install @ben-windsurf/component-library
   ```

### Usage in Consumer Apps

```jsx
// Import specific components
import { SearchBar } from '@ben-windsurf/component-library';

// Use in your React components
function App() {
  return (
    <div>
      <SearchBar themeColor="#1c74cc" />
    </div>
  );
}
```

## Design System

The component library follows the established design system with these brand colors:
- **Primary**: `#684cbc`
- **Secondary**: `#1c74cc` 
- **Tertiary**: `#647484`
- **Facebook Blue**: `#38569e`

Components are designed with:
- 8px border radius for consistent rounded corners
- Responsive design principles
- Accessibility best practices

## Contributing

When contributing to the component library:

1. Ensure components are reusable and configurable
2. Include proper TypeScript types (when applicable)
3. Add CSS custom properties for theming
4. Test components across different consuming applications
5. Update this README when adding new components

## Build Output

The library generates the following build artifacts in the `dist/` directory:
- `index.js` - CommonJS bundle
- `index.mjs` - ES Module bundle
- `index.js.map` - Source map for debugging
- `index.mjs.map` - ES Module source map

These files are automatically generated and should not be manually edited.