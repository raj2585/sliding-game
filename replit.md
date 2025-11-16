# Jodhpur Sliding Puzzle Game

A polished, responsive React sliding puzzle game featuring stunning landmarks from Jodhpur, Rajasthan.

## Project Overview

An elegant sliding puzzle game (15-puzzle and 24-puzzle variants) themed around the beautiful city of Jodhpur, India. Players can choose from 6 iconic landmarks and two difficulty levels to create a meditative, visually stunning puzzle experience.

## Features

### Core Gameplay
- **4×4 (15-puzzle) and 5×5 (24-puzzle)** grid sizes
- **Solvable shuffle algorithm** ensuring every puzzle can be completed
- **Smooth tile animations** using Framer Motion for polished interactions
- **Intuitive controls** - click/tap tiles to move them into the empty space

### Visual Assets
Six high-quality images of Jodhpur landmarks:
1. **Mehrangarh Fort** - Dramatic fortress architecture
2. **Blue City** - Iconic aerial view of blue houses
3. **Ghanta Ghar** - Historic clock tower
4. **Umaid Bhavan Palace** - Grand palatial architecture
5. **Jaswant Thada** - White marble memorial
6. **Toorji Ka Jhalra** - Geometric stepwell patterns

### User Experience
- **Home Screen**: Image gallery grid with size selector
- **Game Screen**: 
  - Live timer and move counter
  - Preview button with hover/tap overlay to see the complete image
  - Restart button to shuffle and start over
  - Best score indicator
- **Win Modal**: Celebration screen showing final stats and new best score notification
- **Responsive Design**: Optimized for mobile and desktop
- **Local Storage**: Persistent best scores (time and moves) for each image/size combination

### Design System
- **Typography**: 
  - Headers: Playfair Display (elegant serif)
  - UI/Body: Inter (clean sans-serif)
- **Color Palette**: Warm Rajasthan-inspired colors
- **Animations**: Smooth spring-based tile movements, subtle hover effects

## Project Structure

```
client/
  src/
    pages/
      home.tsx          - Image selection and difficulty chooser
      game.tsx          - Main puzzle game interface
    components/
      puzzle-tile.tsx   - Individual tile component with animations
      win-modal.tsx     - Victory celebration modal
      ui/               - Shadcn UI components
    lib/
      storage.ts        - Local storage utilities for best scores
shared/
  schema.ts            - TypeScript types and data models
```

## Data Models

### GameState
Manages the current puzzle state including:
- Tile positions and correct positions
- Move counter
- Timer (start time)
- Completion status
- Selected image and puzzle size

### BestScores
Stores best completion times and move counts in local storage, organized by:
- Puzzle size (4×4 or 5×5)
- Image selection
- Includes timestamp for each record

## Tech Stack

- **Frontend**: React with TypeScript
- **Routing**: Wouter
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS with Shadcn UI components
- **Build Tool**: Vite
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Data Persistence**: Browser Local Storage

## Recent Changes (November 16, 2025)

- Implemented complete puzzle game with 6 Jodhpur landmark images
- Built solvable shuffle algorithm for 4×4 and 5×5 grids
- Created smooth tile sliding animations with Framer Motion
- Added hover-activated preview button during gameplay
- Implemented win detection and celebration modal
- Set up local storage for best score tracking
- Designed responsive layouts for mobile and desktop
- Configured Playfair Display + Inter typography system

## User Preferences

- Focus on visual excellence and polished interactions
- Meditative, elegant gaming experience inspired by Monument Valley
- Warm color palette reflecting Rajasthan's desert landscape
- Smooth animations without being distracting
- Clear visual hierarchy and generous spacing
