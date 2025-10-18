# Design Guidelines: AI Image Prompt Generator Tool

## Design Approach

**Selected Approach:** Design System + AI Tool Inspiration (Hybrid)
- **Justification:** This is a utility-focused productivity tool requiring efficiency and clarity. Drawing from Material Design principles combined with modern AI interface patterns (ChatGPT, Midjourney, Linear) ensures professional polish with optimal usability.
- **Core Principle:** Function-first design with clean aesthetics that don't distract from the core workflow.

## Design Philosophy

This tool prioritizes speed, clarity, and workflow efficiency. The interface should feel professional yet approachable, minimizing cognitive load while maximizing prompt generation quality. Dark mode is primary to reduce eye strain during extended use.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 220 15% 12% (deep slate)
- Surface: 220 14% 16% (elevated panels)
- Surface Elevated: 220 13% 20% (cards, mode tabs)
- Border: 220 10% 25% (subtle divisions)
- Text Primary: 220 10% 95%
- Text Secondary: 220 8% 65%
- Primary Brand: 250 95% 65% (vibrant purple for CTAs, active states)
- Primary Hover: 250 95% 70%
- Success: 142 76% 50% (for copy confirmations)
- Accent Subtle: 250 60% 30% (mode tab highlights)

**Light Mode (Secondary):**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Text Primary: 220 15% 15%
- Primary Brand: 250 85% 55%

### B. Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - clean, readable, modern
- Code/Prompts: 'JetBrains Mono' (Google Fonts) - for generated prompt display

**Type Scale:**
- Headings: font-semibold text-xl to text-2xl
- Body: text-base (16px)
- Labels: text-sm font-medium
- Generated Prompts: text-base font-mono leading-relaxed
- Helper Text: text-xs text-secondary

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section gaps: gap-4 to gap-6
- Card spacing: p-6
- Input fields: p-3

**Container Structure:**
- Max-width: max-w-5xl mx-auto
- Page padding: px-4 md:px-6 py-8
- Responsive breakpoints: md (768px), lg (1024px)

### D. Component Library

**1. Mode Selector Tabs**
- Horizontal tabs at top, properly aligned (fix user complaint)
- Active state: background with primary accent, elevated appearance
- Inactive: subtle background, secondary text
- Smooth transitions between modes
- Equal width tabs with centered labels
- Border-bottom indicator for active tab

**2. Input Forms**
- Main textarea: Large, min-h-32, rounded-lg with subtle border
- Additional detail fields: Grouped in grid (grid-cols-1 md:grid-cols-2)
- Field labels: Above inputs, font-medium text-sm
- Placeholders: Helpful, mode-specific examples
- Focus states: Primary color ring, elevated appearance

**3. Generated Prompt Display**
- Dedicated card with elevated surface background
- Code-style formatting with mono font
- Copy button: Positioned top-right, icon + label
- Copy success feedback: Green checkmark with brief animation
- Multi-line support with proper word wrapping
- Minimum height to prevent layout shift

**4. Prompt History Sidebar/Section**
- Collapsible panel or dedicated section
- Each history item: compact card with timestamp
- Actions: Reuse button, delete icon
- Scrollable with max-height
- Empty state illustration when no history

**5. Primary Action Button**
- Large, prominent "Generate Prompt" button
- Full width on mobile, fixed width on desktop
- Loading state: spinner with disabled appearance
- Position: Below input form, above generated prompt area

**6. Navigation/Header**
- Clean top bar with tool name/logo
- Mode indicator showing current selection
- Optional: Settings icon for preferences

### E. Interaction Patterns

**Mode Switching:**
- Instant tab switching with smooth content transitions
- Preserve form state when switching modes (or clear with confirmation)
- Visual feedback on tab selection

**Prompt Generation Flow:**
1. User fills main description + optional details
2. Clicks generate → loading state appears
3. Smooth reveal of generated prompt card
4. Copy button becomes prominent
5. Prompt automatically saves to history

**Copy Interaction:**
- Click to copy → icon changes to checkmark
- Brief success message "Copied!"
- Returns to copy icon after 2 seconds

**History Management:**
- Click history item to populate input fields
- Delete with confirmation (or quick undo)
- Clear all history with confirmation modal

### F. WordPress Integration Considerations

**Standalone Compatibility:**
- Self-contained component with scoped styles
- No global style conflicts
- Embeddable via shortcode or widget
- Responsive within any container width
- Works with common WordPress themes

**Performance:**
- Lazy load history from localStorage
- Debounced API calls
- Minimal external dependencies
- Optimized bundle size

## Visual Hierarchy & Polish

**Information Architecture:**
1. Mode selection (most prominent)
2. Input area (primary workspace)
3. Generate button (clear CTA)
4. Generated prompt (focal result)
5. History (supporting feature)

**Polish Details:**
- Subtle shadows on elevated surfaces (shadow-lg)
- Rounded corners consistently (rounded-lg to rounded-xl)
- Smooth transitions (transition-all duration-200)
- Hover states on interactive elements
- Disabled states clearly differentiated
- Loading skeletons for async operations

**Accessibility:**
- High contrast text (WCAG AA minimum)
- Focus visible indicators
- Keyboard navigation support
- ARIA labels for icon buttons
- Screen reader friendly

## Layout Blueprint

**Single-page application structure:**
- Header with tool branding
- Mode tabs (Sora | VEO3 | Gemini | Nano Banana)
- Input section (2-column grid on desktop: main input left, additional details right)
- Generate button (centered, prominent)
- Generated prompt display (full width card)
- Prompt history (sidebar on desktop, section below on mobile)

No hero image needed - this is a functional tool optimized for workflow efficiency.