# ADR-001: Testing Strategy and Quality Assurance

## Status
Accepted

## Date
2026-02-04

## Context

During development of Issue #19 (3D board integration), we encountered a critical bug where game mode state changes weren't propagating to the UI. The issue was only discovered during manual browser testing, not during implementation.

**Problem identified:**
- State was changing in console logs but UI wasn't updating
- Multiple components had separate state instances
- Bug wasn't caught until manual browser testing

This revealed gaps in our testing strategy:
- No systematic integration testing between components
- No verification that state changes propagate correctly
- Browser testing was not mandatory before committing

## Decision

We establish a **comprehensive testing strategy** with mandatory checks at each development phase:

### 1. Development Phase Testing

**State Management Verification (Mandatory)**
- [ ] Verify state changes log correctly in console
- [ ] Verify UI updates when state changes
- [ ] Test state synchronization across all consuming components
- [ ] Check localStorage persistence works correctly

**Component Integration Testing (Mandatory)**
- [ ] Test component in isolation
- [ ] Test component integrated with parent components
- [ ] Verify props and callbacks work correctly
- [ ] Test conditional rendering branches

**Browser Testing (Mandatory - BEFORE COMMIT)**
- [ ] Start dev server: `npm run dev`
- [ ] Open browser at `localhost:3000`
- [ ] Test all user interactions manually
- [ ] Verify no console errors (red messages)
- [ ] Test on different viewport sizes (responsive)
- [ ] Clear localStorage and test fresh state
- [ ] Test state persistence (refresh page)

### 2. Testing Checklist by Feature Type

**State Management Features:**
```markdown
- [ ] State initializes correctly
- [ ] State updates propagate to all consumers
- [ ] No duplicate state instances
- [ ] localStorage sync works (if applicable)
- [ ] Console shows correct values
- [ ] UI reflects state changes
- [ ] Tested in browser with console open
```

**UI Component Features:**
```markdown
- [ ] Component renders correctly
- [ ] All interactions work (click, hover, etc.)
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Accessibility tested (keyboard navigation)
- [ ] No visual regressions
- [ ] Tested in browser
```

**Game Logic Features:**
```markdown
- [ ] Logic functions correctly in all scenarios
- [ ] Edge cases handled
- [ ] UI updates reflect logic changes
- [ ] No race conditions
- [ ] Tested complete game flow in browser
```

### 3. Pre-Commit Requirements

**BLOCKING REQUIREMENTS** - Cannot commit without:
1. ✅ Browser testing completed
2. ✅ No console errors
3. ✅ All user interactions tested manually
4. ✅ State synchronization verified (if applicable)

### 4. Debugging Strategy

When bugs are found:
1. Add `console.log()` statements to track state flow
2. Verify state in browser DevTools
3. Check React DevTools for component state
4. Verify localStorage in Application tab
5. Remove debug logs before final commit

## Consequences

### Positive
- ✅ Catch state synchronization bugs before commit
- ✅ Ensure UI matches internal state
- ✅ Reduce debugging time
- ✅ Higher code quality
- ✅ Better user experience
- ✅ Clear testing checklist for all features

### Negative
- ⏱️ Adds ~5-10 minutes per feature for browser testing
- 🔄 Requires running dev server for all features
- 📝 More steps in workflow

### Neutral
- Debug logs temporarily added/removed
- Browser DevTools become standard tool

## Implementation Notes

### For AI Agents

**In Phase 3 (TEST) of any workflow:**

1. **ALWAYS read this ADR first**: `cat docs/adrs/001-testing-strategy.md`

2. **Execute browser testing:**
   ```bash
   # Start dev server if not running
   npm run dev

   # Inform user to test in browser
   echo "🧪 Browser testing required - please test at localhost:3000"
   ```

3. **Ask user for confirmation:**
   ```markdown
   ## Browser Testing Checklist
   Please verify:
   - [ ] Feature works as expected
   - [ ] No console errors (red messages)
   - [ ] State changes update UI correctly
   - [ ] All interactions work
   - [ ] Responsive on different screen sizes

   Reply 'confirmed' when testing is complete.
   ```

4. **Only proceed to commit after user confirms**

### For Manual Testing

1. Open browser DevTools (F12)
2. Go to Console tab
3. Test feature while watching console
4. Check Application > Local Storage
5. Use React DevTools (if installed)

## Related

- Issue #19: State synchronization bug
- Commit `965d2d4`: React Context fix
- ADR-002: State Management Patterns
- ADR-003: Development Workflow
