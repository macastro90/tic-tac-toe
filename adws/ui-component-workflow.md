# UI Component Implementation Workflow

## Purpose
Specialized workflow for creating React UI components with Next.js, TypeScript, and Tailwind CSS.

## 📚 Architecture Decision Records (ADRs)

**MANDATORY:** Agents MUST consult relevant ADRs during workflow execution.

| ADR | When to Consult | Purpose |
|-----|-----------------|---------|
| [ADR-001](../docs/adrs/001-testing-strategy.md) | Phase 3 (TEST) | Testing strategy - UI testing checklist |
| [ADR-002](../docs/adrs/002-state-management-patterns.md) | Phase 1 (PLAN) | When component needs state or shares state |
| [ADR-003](../docs/adrs/003-development-workflow.md) | Phase 3 (TEST) | Browser testing gate - visual verification |

**Key Points for UI Components:**
- Most UI components use local state or receive props
- Shared UI state (like theme, mode) requires Context (ADR-002)
- Browser testing MANDATORY to verify visual rendering
- Must verify responsive design at multiple breakpoints
- Must verify interactions (clicks, hovers, focus states)

---

## Phase 1: PLAN - Component Design 📋

### Step 1: Component Requirements
**Agent Actions:**
1. Identify component purpose and responsibility
2. Define props interface
3. Determine state requirements
4. List user interactions
5. Plan responsive behavior

**Example: GameBoard Component**
```typescript
// Purpose: Display 3x3 game grid with clickable cells

// Props
interface GameBoardProps {
  board: Cell[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

// State: None (stateless component)
// Interactions: Click on cells
// Responsive: Scale grid for mobile/tablet/desktop
```

### Step 2: Visual Design Planning
**Agent Actions:**
1. Sketch layout structure
2. Plan color scheme (Tailwind colors)
3. Define spacing and sizing
4. Plan hover/active states
5. Consider accessibility (focus states, contrast)

### Step 3: Responsive Breakpoints
**Agent Actions:**
Plan for different screen sizes:
- **Mobile (< 640px)**: Smaller grid, larger touch targets
- **Tablet (640px - 1024px)**: Medium grid
- **Desktop (> 1024px)**: Larger grid, hover effects

---

## Phase 2: BUILD - Component Implementation 🔨

### Step 1: Create Component File
**Agent Actions:**
```typescript
// components/GameBoard.tsx
'use client';

import React from 'react';

interface GameBoardProps {
  board: Cell[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

export function GameBoard({ board, onCellClick, disabled = false }: GameBoardProps) {
  return (
    // Component JSX
  );
}
```

### Step 2: Implement Layout Structure
**Agent Actions:**
```tsx
<div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
  {board.map((cell, index) => (
    <button
      key={index}
      onClick={() => onCellClick(index)}
      disabled={disabled || cell !== null}
      className="..." // Tailwind classes
    >
      {cell}
    </button>
  ))}
</div>
```

### Step 3: Style with Tailwind CSS
**Agent Actions:**

**Mobile-First Approach:**
```tsx
className={`
  // Base (mobile) styles
  aspect-square
  flex items-center justify-center
  text-4xl font-bold
  bg-white
  border-2 border-gray-300
  rounded-lg
  transition-all duration-200

  // Hover states (desktop)
  hover:bg-gray-50
  hover:border-blue-400

  // Active state
  active:scale-95

  // Disabled state
  disabled:cursor-not-allowed
  disabled:opacity-50

  // Focus state (accessibility)
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2

  // Responsive sizing
  sm:text-5xl
  md:text-6xl
  lg:text-7xl

  // Dark mode (optional)
  dark:bg-gray-800
  dark:border-gray-600
`}
```

### Step 4: Add Conditional Styling
**Agent Actions:**
```tsx
// Dynamic classes based on cell value
const getCellClassName = (cell: Cell) => {
  const baseClasses = "aspect-square flex items-center justify-center ...";

  if (cell === 'X') {
    return `${baseClasses} text-blue-600`;
  }
  if (cell === 'O') {
    return `${baseClasses} text-red-600`;
  }
  return `${baseClasses} text-gray-400`;
};
```

### Step 5: Implement Accessibility
**Agent Actions:**
```tsx
<button
  onClick={() => onCellClick(index)}
  disabled={disabled || cell !== null}
  aria-label={`Cell ${index + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
  className="..."
>
  {cell || <span className="opacity-0">-</span>}
</button>
```

---

## Phase 3: TEST - Component Validation ✅

### Visual Testing
**Agent Actions:**
1. **Layout Check**
   - [ ] Grid displays as 3x3
   - [ ] Cells are square (aspect-square)
   - [ ] Spacing is consistent
   - [ ] Centered on page

2. **Styling Check**
   - [ ] Colors match design
   - [ ] Text is readable
   - [ ] Borders visible
   - [ ] Hover states work (desktop)

3. **State Display**
   - [ ] Empty cells display correctly
   - [ ] X symbol displays correctly (blue)
   - [ ] O symbol displays correctly (red)

### Interaction Testing
**Agent Actions:**
1. **Click Handling**
   - [ ] Empty cells are clickable
   - [ ] Occupied cells are disabled
   - [ ] onCellClick callback fires
   - [ ] Correct index passed

2. **Disabled State**
   - [ ] All cells disabled when prop is true
   - [ ] Visual feedback for disabled state
   - [ ] Cursor shows not-allowed

3. **Keyboard Navigation**
   - [ ] Can Tab through cells
   - [ ] Enter/Space triggers click
   - [ ] Focus visible (ring)

### Responsive Testing
**Agent Actions:**

**Mobile (375px - iPhone)**
```
✓ Grid fits screen
✓ Cells are touch-friendly (min 44x44px)
✓ Text is readable (4xl)
✓ No horizontal scroll
✓ Touch targets adequate
```

**Tablet (768px - iPad)**
```
✓ Grid scales appropriately
✓ Text size increases (5xl)
✓ Layout remains centered
✓ Spacing is comfortable
```

**Desktop (1280px+)**
```
✓ Grid is well-sized
✓ Text is large (6xl-7xl)
✓ Hover effects work
✓ Visual feedback clear
```

### Accessibility Testing
**Agent Actions:**
1. **Keyboard Navigation**
   - [ ] Tab order is logical
   - [ ] Enter/Space work
   - [ ] Focus visible

2. **Screen Reader**
   - [ ] aria-label descriptive
   - [ ] Button role clear
   - [ ] State announced

3. **Color Contrast**
   - [ ] Text has sufficient contrast (WCAG AA)
   - [ ] Focus ring visible
   - [ ] Colors distinguishable

---

## Phase 4: INTEGRATION & REFINEMENT ⚡

### Step 1: Integrate with Parent
**Agent Actions:**
```tsx
// app/page.tsx
import { GameBoard } from '@/components/GameBoard';

export default function Home() {
  const { board, makeMove, isGameOver } = useGameLogic();

  return (
    <GameBoard
      board={board}
      onCellClick={makeMove}
      disabled={isGameOver}
    />
  );
}
```

### Step 2: Test Integration
**Agent Actions:**
1. Verify data flows correctly
2. Test state updates render
3. Ensure callbacks work
4. Check for re-render issues

### Step 3: Performance Check
**Agent Actions:**
1. Check React DevTools for unnecessary re-renders
2. Verify component memoization if needed
3. Ensure animations are smooth (60fps)

---

## Component Checklist ✅

### Code Quality
- [ ] TypeScript types defined
- [ ] Props interface exported
- [ ] Component exported
- [ ] No console errors
- [ ] No TypeScript errors

### Styling
- [ ] Tailwind CSS used exclusively
- [ ] Mobile-first approach
- [ ] Responsive breakpoints
- [ ] Hover/focus/active states
- [ ] Consistent spacing

### Functionality
- [ ] All props work correctly
- [ ] Callbacks fire properly
- [ ] State updates reflected
- [ ] Edge cases handled

### Accessibility
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Focus visible
- [ ] Color contrast sufficient

### Responsive Design
- [ ] Mobile tested (< 640px)
- [ ] Tablet tested (640-1024px)
- [ ] Desktop tested (> 1024px)
- [ ] No layout breaks
- [ ] Touch-friendly on mobile

---

## Success Criteria
- ✅ Component renders correctly
- ✅ All interactions work
- ✅ Responsive on all screen sizes
- ✅ Accessible to keyboard and screen readers
- ✅ Type-safe with TypeScript
- ✅ Styled consistently with Tailwind
- ✅ No performance issues
- ✅ Integrates properly with parent

## Best Practices Applied
1. **Component Composition**: Small, focused components
2. **Type Safety**: Full TypeScript coverage
3. **Accessibility First**: WCAG compliance
4. **Mobile First**: Responsive by default
5. **Performance**: Optimized rendering
6. **Maintainability**: Clean, readable code

This workflow ensures professional, production-ready UI components built by autonomous agents.
