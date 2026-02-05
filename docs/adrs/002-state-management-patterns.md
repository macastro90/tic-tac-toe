# ADR-002: State Management Patterns

## Status
Accepted

## Date
2026-02-04

## Context

During implementation of Issue #19, we discovered a critical bug caused by improper state management:

**The Problem:**
- `useGameMode()` hook was called in multiple components
- Each call created a separate state instance
- `ModeToggle` changed its own state
- `Home` component had a different state instance
- UI didn't update when toggle was clicked

**Root Cause:**
Using local `useState` in a custom hook creates separate state instances for each component that calls the hook. This breaks state synchronization.

## Decision

We establish **clear patterns for when to use different state management approaches**:

### Pattern 1: Local Component State
**Use when:** State is only needed within a single component

```typescript
// ✅ GOOD: State used only in this component
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Rules:**
- State never leaves this component
- No props passed to share state
- No other components need this value

### Pattern 2: Props Drilling (Lift State Up)
**Use when:** State shared between 2-3 components with clear parent-child relationship

```typescript
// ✅ GOOD: Parent owns state, children receive via props
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <Child1 value={value} />
      <Child2 onUpdate={setValue} />
    </>
  );
}
```

**Rules:**
- Maximum 2-3 components
- Clear hierarchy (parent → child)
- State ownership is obvious
- Minimal prop drilling depth

### Pattern 3: React Context (Global State)
**Use when:** State shared between 3+ components OR across different tree branches

```typescript
// ✅ GOOD: Context for shared state across app
export function GameModeProvider({ children }) {
  const [gameMode, setGameMode] = useState('2D');
  // ... more state and logic
  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode }}>
      {children}
    </GameModeContext.Provider>
  );
}

// Consumed in many components
export function useGameMode() {
  const context = useContext(GameModeContext);
  if (!context) {
    throw new Error('useGameMode must be used within GameModeProvider');
  }
  return context;
}
```

**Rules:**
- State needed in 3+ components
- Components are in different tree branches
- State is "global" to the app
- Single source of truth needed

### Pattern 4: URL State (Future)
**Use when:** State should be shareable via URL

```typescript
// For future use with routing
const [gameMode] = useSearchParams();
```

**Rules:**
- State needs to be bookmarkable
- State needs to be shareable
- Deep linking required

## Decision Matrix

| Scenario | Pattern | Why |
|----------|---------|-----|
| Button click counter | Local State | Only used in one component |
| Form data in modal | Local State | Self-contained |
| Parent ↔ 2 children | Props | Simple relationship |
| Game mode (2D/3D) across app | Context | 3+ components, different branches |
| Theme across app | Context | Global setting |
| User authentication | Context | Global, many consumers |
| Current route | URL State | Shareable, bookmarkable |

## Anti-Patterns to Avoid

### ❌ DON'T: Custom hooks with useState for shared state

```typescript
// ❌ BAD: Creates separate state in each component
export function useGameMode() {
  const [mode, setMode] = useState('2D'); // NEW instance each time!
  return { mode, setMode };
}

// Component A and B will have DIFFERENT state
function ComponentA() {
  const { mode } = useGameMode(); // instance 1
}

function ComponentB() {
  const { mode } = useGameMode(); // instance 2 (different!)
}
```

**Why it's wrong:** Each component gets a new state instance. Changes in one don't affect the other.

**Fix:** Use Context instead (see Pattern 3)

### ❌ DON'T: Excessive prop drilling

```typescript
// ❌ BAD: Props passed through 4+ levels
<A mode={mode}>
  <B mode={mode}>
    <C mode={mode}>
      <D mode={mode}>
        <E mode={mode} /> // Finally used here
      </D>
    </C>
  </B>
</A>
```

**Why it's wrong:** Maintenance nightmare, refactoring hell

**Fix:** Use Context if drilling more than 2-3 levels

### ❌ DON'T: Multiple contexts for related state

```typescript
// ❌ BAD: Separate contexts for related state
<GameModeProvider>
  <View3DModeProvider>
    <ScoreProvider>
```

**Why it's wrong:** State might need to be synchronized

**Fix:** Combine related state in single context

## Implementation Notes

### For AI Agents

**During Phase 1 (PLAN) - State Management Decision:**

1. **ALWAYS read this ADR**: `cat docs/adrs/002-state-management-patterns.md`

2. **Ask these questions:**
   - How many components need this state?
   - Are they parent-child or different branches?
   - Is this global app state?

3. **Choose pattern based on answers:**
   ```markdown
   State Analysis:
   - Components needing state: [list]
   - Relationship: [parent-child / different branches]
   - Decision: [Local State / Props / Context]
   - Reason: [based on decision matrix]
   ```

4. **Document in plan:**
   ```markdown
   ## State Management (ADR-002)
   Pattern chosen: [Context]
   Reason: State shared between ModeToggle, View3DToggle, and Home (3+ components)
   Implementation: Create GameModeContext with provider
   ```

### Checklist for State Management Features

When implementing features with state:

```markdown
- [ ] Read ADR-002 State Management Patterns
- [ ] Identify all components needing state
- [ ] Choose appropriate pattern from decision matrix
- [ ] If Context: Create provider and wrap in layout
- [ ] If Context: Create custom hook with error handling
- [ ] Update all consuming components to use pattern
- [ ] Test state synchronization (ADR-001)
- [ ] Verify no duplicate state instances
```

### Context Implementation Template

```typescript
// contexts/MyContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextValue {
  value: string;
  setValue: (value: string) => void;
}

const MyContext = createContext<MyContextValue | undefined>(undefined);

export function MyProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('default');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}
```

## Consequences

### Positive
- ✅ Clear guidelines prevent state synchronization bugs
- ✅ Predictable state management across app
- ✅ Easy to reason about where state lives
- ✅ Scalable pattern for growing app
- ✅ Prevents Issue #19 type bugs

### Negative
- 🔧 More boilerplate for Context setup
- 📚 Need to understand patterns before implementing
- ⚖️ Need to make correct decision upfront

### Neutral
- Different patterns for different scenarios
- Context adds one level of nesting in tree

## Related

- Issue #19: State synchronization bug that motivated this ADR
- Commit `965d2d4`: React Context implementation
- ADR-001: Testing Strategy
- File: `contexts/GameModeContext.tsx` - Reference implementation
