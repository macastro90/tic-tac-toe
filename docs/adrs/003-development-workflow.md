# ADR-003: Development Workflow and Integration Testing

## Status
Accepted

## Date
2026-02-04

## Context

The Issue #19 incident revealed that our development workflow lacked:
1. **Mandatory integration testing** before commits
2. **Browser verification** as a required step
3. **Clear handoff points** between development and testing
4. **Documentation** of when testing is sufficient

This led to committing code that:
- ✅ Compiled successfully
- ✅ Had no TypeScript errors
- ❌ But didn't work correctly in the browser

## Decision

We establish a **mandatory development workflow** with clear gates that must be passed before proceeding:

### Workflow Phases with Gates

```
PLAN → BUILD → INTEGRATE → BROWSER TEST → COMMIT → PUSH
        ↓         ↓            ↓              ↓        ↓
      [Gate 1] [Gate 2]    [Gate 3]      [Gate 4] [Gate 5]
```

### Gate 1: Plan Complete ✅
**Cannot proceed to BUILD until:**
- [ ] Requirements understood
- [ ] State management pattern chosen (ADR-002)
- [ ] Files to create/modify identified
- [ ] Testing strategy planned (ADR-001)

**Agent Action:** Document plan in issue comment

### Gate 2: Build Complete 🔨
**Cannot proceed to INTEGRATE until:**
- [ ] All files created/modified
- [ ] TypeScript compiles with no errors
- [ ] Code follows patterns from ADRs
- [ ] No obvious bugs in code

**Agent Action:** Code written and compiles

### Gate 3: Integration Complete 🔗
**Cannot proceed to BROWSER TEST until:**
- [ ] Component integrated with app
- [ ] Imports/exports correct
- [ ] Dev server starts without errors
- [ ] Hot reload works

**Agent Action:** Dev server running, no compile errors

### Gate 4: Browser Test Complete ✅ **CRITICAL GATE**
**Cannot proceed to COMMIT until:**
- [ ] User manually tested in browser
- [ ] All functionality works as expected
- [ ] No console errors (red messages)
- [ ] State synchronization verified
- [ ] UI updates correctly
- [ ] Responsive design works

**Agent Action:**
1. Start dev server if not running
2. Request user confirmation:
   ```markdown
   ## 🧪 Browser Testing Required

   Please test at http://localhost:3000

   Checklist:
   - [ ] Feature works as expected
   - [ ] No console errors
   - [ ] State updates correctly
   - [ ] All interactions work
   - [ ] Responsive design OK

   Reply 'confirmed' when complete, or describe any issues found.
   ```
3. **BLOCK until user confirms**
4. If issues found: Return to BUILD phase

**User Action:** Test in browser, confirm or report issues

### Gate 5: Commit Ready 📝
**Cannot COMMIT until:**
- [ ] All previous gates passed
- [ ] Debug logs removed
- [ ] Code cleaned up
- [ ] Commit message prepared

**Agent Action:** Create commit with proper message

### Gate 6: Push Ready 🚀
**Can PUSH when:**
- [ ] Commit created successfully
- [ ] User approves push (if required)

**Agent Action:** Push to remote branch

## Workflow by Feature Type

### State Management Features

```markdown
1. PLAN
   - Read ADR-002
   - Choose state pattern
   - Document decision

2. BUILD
   - Implement state (Context/Props/Local)
   - Add consumer components
   - TypeScript compile check

3. INTEGRATE
   - Connect all components
   - Verify imports
   - Dev server starts

4. BROWSER TEST ⚠️ CRITICAL
   - User opens browser
   - Click toggles/buttons
   - Watch console for state logs
   - Verify UI updates
   - Check localStorage
   - Test state persistence (refresh)
   - User confirms: "state working"

5. COMMIT (only after confirmation)
```

### UI Component Features

```markdown
1. PLAN
   - Design component structure
   - Plan responsive breakpoints
   - Accessibility requirements

2. BUILD
   - Create component
   - Style with Tailwind
   - TypeScript types

3. INTEGRATE
   - Add to parent component
   - Pass props correctly

4. BROWSER TEST ⚠️ CRITICAL
   - User opens browser
   - Visual verification
   - Test interactions (click, hover)
   - Test responsive (resize window)
   - Keyboard navigation
   - User confirms: "UI working"

5. COMMIT (only after confirmation)
```

### Game Logic Features

```markdown
1. PLAN
   - Identify logic requirements
   - Edge cases
   - Integration points

2. BUILD
   - Implement logic
   - Handle edge cases
   - Update UI integration

3. INTEGRATE
   - Connect logic to UI
   - Verify state updates

4. BROWSER TEST ⚠️ CRITICAL
   - User opens browser
   - Play through scenarios
   - Test edge cases
   - Verify win detection
   - Test full game flow
   - User confirms: "logic working"

5. COMMIT (only after confirmation)
```

## Agent Responsibilities

### Before Browser Test Gate

Agent **can and should** do autonomously:
- ✅ Read files
- ✅ Write code
- ✅ Create components
- ✅ Run TypeScript compiler
- ✅ Start dev server
- ✅ Check for compile errors
- ✅ Plan implementation

### At Browser Test Gate

Agent **must wait for user**:
- ⏸️ Cannot verify UI updates correctly
- ⏸️ Cannot see browser rendering
- ⏸️ Cannot test interactions
- ⏸️ Cannot verify user experience
- ⏸️ Must request user confirmation
- ⏸️ Must block until confirmed

### After User Confirmation

Agent **can proceed** with:
- ✅ Remove debug logs
- ✅ Create commit
- ✅ Push to remote
- ✅ Update issue
- ✅ Close issue

## Implementation Notes

### For AI Agents

**In every workflow execution:**

1. **At start of Phase 3 (TEST):**
   ```bash
   # Read this ADR
   cat docs/adrs/003-development-workflow.md

   # Read testing strategy
   cat docs/adrs/001-testing-strategy.md
   ```

2. **Before committing:**
   ```markdown
   ## Gate Check: Browser Testing Required

   I've completed the build and integration. Before committing,
   I need you to verify the feature works in the browser.

   **How to test:**
   1. Open http://localhost:3000
   2. Open DevTools (F12) → Console tab
   3. [Specific testing steps for this feature]

   **What to verify:**
   - [ ] [Feature-specific checklist]
   - [ ] No red errors in console
   - [ ] All interactions work

   Please reply:
   - "confirmed" if everything works
   - Or describe any issues you find

   ⚠️ I will NOT commit until you confirm.
   ```

3. **Handle user response:**
   - If "confirmed" → Proceed to commit
   - If issues reported → Return to BUILD phase, fix issues
   - If unclear → Ask for clarification

### For Manual Development

When developing manually:
1. Write code
2. **Stop and test in browser before committing**
3. Open DevTools console
4. Test all functionality
5. Only commit when verified

## Anti-Patterns to Avoid

### ❌ DON'T: Commit without browser testing

```bash
# ❌ BAD
git add .
git commit -m "feat: add feature"
# Did you test in browser? No? BUG RISK!
```

### ❌ DON'T: Assume "compiles = works"

```typescript
// ✅ TypeScript compiles
// ✅ No errors
// ❌ Doesn't work in browser (state not syncing)
const { mode } = useGameMode(); // Separate instance!
```

### ❌ DON'T: Skip user confirmation

```markdown
# ❌ BAD agent behavior
Agent: "I've implemented the feature"
Agent: [commits immediately without testing]
User: "It doesn't work"
Agent: "Oops, let me fix it"

# ✅ GOOD agent behavior
Agent: "I've implemented the feature. Please test at localhost:3000"
Agent: [waits for confirmation]
User: "confirmed"
Agent: [now commits]
```

## Consequences

### Positive
- ✅ Bugs caught before commit (earlier = cheaper to fix)
- ✅ Higher code quality in git history
- ✅ Fewer "fix" commits
- ✅ User involved in verification
- ✅ Clear handoff points
- ✅ Predictable workflow

### Negative
- ⏱️ Adds 5-10 minutes for browser testing
- 🛑 Blocks agent progress until user confirms
- 👤 Requires user availability
- 📝 More communication overhead

### Neutral
- Clear responsibility boundaries
- Structured workflow phases
- Testing becomes explicit requirement

## Metrics

We should track:
- **Bug escape rate:** Bugs found after commit vs before
- **Rework rate:** "fix" commits as % of total commits
- **Time to detection:** When bugs are caught (build vs test vs production)

**Goal:** Catch 95%+ of bugs at Browser Test Gate

## Related

- Issue #19: Bug that motivated this ADR
- ADR-001: Testing Strategy (what to test)
- ADR-002: State Management (common bug source)
- Files: `adws/*.md` - Will be updated to reference this ADR
