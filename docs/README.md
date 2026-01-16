# Documentation

This directory contains documentation for the Garage Door Builder application.

## State Machine Diagrams

See [state-machines.md](./state-machines.md) for comprehensive state machine diagrams of all major components:

1. **Builder Store State Machine** - Core Zustand store managing all builder selections
2. **AI Preview Generation State Machine** - Flow for generating AI preview images
3. **Builder Navigation Flow** - Step-by-step navigation through the builder
4. **DesignPreview Component Rendering** - Component rendering states
5. **Builder Shell Navigation** - Back button navigation logic
6. **AI Preview Request Flow** - Complete request/generation flow with caching

## Viewing the Diagrams

The state machine diagrams are written in Mermaid format. You can view them:

- **GitHub**: Diagrams render automatically in markdown files
- **VS Code**: Install the "Markdown Preview Mermaid Support" extension
- **Online**: Copy the mermaid code blocks to [mermaid.live](https://mermaid.live)
- **Documentation Sites**: Most markdown renderers support Mermaid

## Key Concepts

### State Management
- **Zustand Store**: Centralized state for all builder selections
- **Local Component State**: Error handling, UI state (e.g., `error` in DesignPreview)
- **Route State**: Navigation state managed by Next.js router

### State Transitions
- **User Actions**: Selections trigger `set*()` actions → Store updates → Components re-render
- **Navigation**: Continue/Back buttons trigger route changes → State persists across routes
- **AI Preview**: Request → Generate → Cache → Display flow

### State Persistence
- Builder selections persist across route navigation
- AI preview images are cached in-memory (10-minute TTL)
- Generated preview keys prevent duplicate requests
