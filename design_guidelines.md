# Design Guidelines: Jodhpur Sliding Puzzle Game

## Design Approach
**Reference-Based Gaming Experience** drawing inspiration from modern puzzle games like Monument Valley, Alto's Adventure, and Google's Material Design game patterns. Focus on creating an elegant, meditative gaming experience that celebrates Jodhpur's visual beauty while maintaining intuitive gameplay.

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent spacing throughout (p-4, gap-6, mt-8, etc.)

### Home Screen Structure
- Centered vertical layout with max-width container (max-w-2xl)
- Header section with game title and decorative element
- Image gallery grid (2 columns on mobile, 3 columns on tablet/desktop) with aspect-ratio-square cards
- Puzzle size selector as large, tappable button group below gallery
- Generous vertical spacing between sections (space-y-12 to space-y-16)

### Game Screen Layout
- Full-viewport centered design with puzzle board as focal point
- Top bar: Timer (left), Preview button (center), Move counter (right) - sticky positioning
- Puzzle grid centered with maximum playable size while maintaining spacing
- Bottom action bar: Restart and Back to Home buttons with adequate spacing (gap-4)
- All UI elements should feel grounded, not floating in empty space

## Typography Hierarchy

**Font Selection**: Google Fonts combination
- Display/Headers: "Playfair Display" or "Cormorant Garamond" (elegant serif reflecting Rajasthan's heritage)
- UI/Body: "Inter" or "DM Sans" (clean, modern sans-serif for readability)

**Scale**:
- Game Title: text-4xl to text-5xl, font-bold
- Section Headers: text-2xl to text-3xl, font-semibold
- Card Labels: text-lg, font-medium
- UI Stats (timer/moves): text-xl, font-semibold, tabular-nums
- Buttons: text-base to text-lg, font-medium
- Helper Text: text-sm, font-normal

## Component Library

### Image Selection Cards (Home Screen)
- Square aspect ratio cards with rounded-xl corners
- Image fills entire card with subtle gradient overlay on hover
- Landmark name overlaid at bottom with semi-transparent background blur
- Border treatment on selected state (border-4)
- Scale transform on hover (scale-105) with smooth transition
- Shadow elevation: shadow-lg, hover:shadow-2xl

### Puzzle Size Selector
- Horizontal button group with equal-width segments
- Large tap targets (min-h-14 to min-h-16)
- Clear visual distinction between selected and unselected states
- Rounded-full or rounded-xl styling
- Include icon + text (e.g., "4×4 Grid" with small grid icon)

### Puzzle Board
- Grid container with equal-sized cells, gap-1 to gap-2 between tiles
- Each tile: rounded-lg corners with subtle shadow
- Empty space: slight background differentiation, same rounded corners
- Board itself wrapped in rounded-2xl container with shadow-2xl
- Responsive sizing: maintains square aspect ratio, scales to fit viewport

### Preview Button (Critical Feature)
- Positioned centrally in top bar as icon button (eye icon from Heroicons)
- On hover (desktop): overlay appears showing complete image with backdrop blur
- On tap (mobile): same overlay with tap-outside-to-dismiss
- Overlay: full image centered, max-w-md to max-w-lg, rounded-2xl, shadow-2xl
- Semi-transparent backdrop (bg-black/50) with backdrop-blur-sm

### Stats Display (Timer/Moves)
- Card-style containers with rounded-lg, padding p-3 to p-4
- Label above value (small text-sm above large text-2xl numbers)
- Monospaced font for numbers (font-mono or tabular-nums)
- Subtle background treatment differentiating from main background

### Win Modal
- Centered overlay with backdrop blur
- Card container: max-w-md, rounded-2xl, shadow-2xl, padding p-8
- Celebration icon/animation at top (trophy, star burst)
- Final image thumbnail (rounded-xl, smaller size)
- Stats summary: Final time and total moves prominently displayed
- Best score indicator if new record
- Action buttons: "Play Again" (primary) and "Change Puzzle" (secondary)

### Action Buttons
- Primary: larger size (px-6 to px-8, py-3 to py-4), rounded-xl, font-medium
- Secondary: similar sizing but visually lighter treatment
- Icon + text combinations where appropriate
- Minimum touch target 44×44px for mobile
- Clear hover and active states with subtle transform

## Animation Principles

**Tile Sliding**: Smooth position transitions (duration-300 to duration-500, ease-in-out curve)

**Interactive Feedback**:
- Card hovers: scale-105, shadow elevation increase
- Button presses: scale-95
- Page transitions: fade-in with slight slide-up (translate-y-4 to translate-y-0)

**Win Celebration**:
- Confetti or particle effect (Framer Motion)
- Modal entrance: scale from 0.9 with fade-in
- Sequential stat reveals with stagger delay

**Minimize**: No continuous or looping animations. Keep animations purposeful and quick.

## Images

**Jodhpur Landmark Photography**:
- 4-6 high-quality images featuring:
  1. Mehrangarh Fort (dramatic fortress architecture)
  2. Blue City aerial view (iconic blue houses)
  3. Ghanta Ghar clock tower (bustling market scene)
  4. Umaid Bhavan Palace (grand palatial architecture)
  5. Jaswant Thada (white marble memorial)
  6. Toorji Ka Jhalra stepwell (geometric patterns)

**Image Treatment**:
- High resolution (minimum 1200×1200px for puzzle clarity)
- Vibrant but not oversaturated
- Good contrast and detail for tile recognition
- Warm tones reflecting Rajasthan's desert palette

**Placement**:
- Home screen: Thumbnail gallery for selection
- Game screen: Split into puzzle tiles with one empty space
- Preview overlay: Complete image shown on hover/tap
- Win modal: Smaller complete image as celebration visual

## Responsive Considerations

**Mobile (base to md)**:
- Single column layouts
- Larger touch targets
- Puzzle grid scales to screen width with padding-4
- Stats stack vertically if needed
- Preview button triggers tap instead of hover

**Tablet/Desktop (md and up)**:
- Multi-column image gallery (3 columns)
- Larger puzzle board with more comfortable spacing
- Horizontal stat layout
- Hover-based preview interaction

**Breakpoint Strategy**: Mobile-first approach, enhance for larger screens without compromising mobile experience

## Accessibility

- Keyboard navigation for tile selection and movement (arrow keys)
- Clear focus indicators on all interactive elements
- Sufficient contrast ratios for all text
- Touch targets minimum 44×44px
- Preview button accessible via keyboard (Enter to toggle)
- Screen reader announcements for moves, timer, win state