# Feature Implementation Workflow

## Overview
Complete workflow for implementing features using autonomous agents following the **plan → build → test** approach.

## 📚 Architecture Decision Records (ADRs)

**MANDATORY:** Agents MUST consult relevant ADRs during workflow execution.

| ADR | When to Consult | Purpose |
|-----|-----------------|---------|
| [ADR-001](../docs/adrs/001-testing-strategy.md) | Phase 3 (TEST) | Testing strategy and quality gates |
| [ADR-002](../docs/adrs/002-state-management-patterns.md) | Phase 1 (PLAN) | State management pattern selection |
| [ADR-003](../docs/adrs/003-development-workflow.md) | All Phases | Development workflow and gates |

**How to use:**
```bash
# Read ADR during relevant phase
cat docs/adrs/001-testing-strategy.md
cat docs/adrs/002-state-management-patterns.md
cat docs/adrs/003-development-workflow.md
```

---

## Phase 1: PLAN 📋

### Step 0: Consult ADRs (MANDATORY)
**Agent Actions:**
1. **Read ADR-002 State Management Patterns:**
   ```bash
   cat docs/adrs/002-state-management-patterns.md
   ```
2. **Read ADR-003 Development Workflow:**
   ```bash
   cat docs/adrs/003-development-workflow.md
   ```
3. Understand relevant patterns and requirements

**Output:** ADRs reviewed and understood

### Step 1: Requirement Analysis
**Agent Actions:**
1. Read the GitHub issue thoroughly
2. Identify acceptance criteria
3. List all requirements (functional & non-functional)
4. Check for dependencies on other issues

**Output:** Clear understanding of what needs to be built

### Step 2: Technical Planning
**Agent Actions:**
1. Review existing codebase structure
2. Identify files to create or modify
3. Plan component hierarchy
4. **Design state management approach (consult ADR-002):**
   - Count components that need state
   - Determine relationship (parent-child vs different branches)
   - Choose pattern: Local State / Props / Context
   - Document decision and reasoning
5. Identify required TypeScript types/interfaces
6. Consider edge cases and error handling

**Output:** Technical implementation plan with state management decision documented

### Step 3: Design Decisions
**Agent Actions:**
1. Choose appropriate React patterns
2. Plan Tailwind CSS styling approach
3. Determine responsive breakpoints
4. Identify accessibility requirements
5. Consider performance implications

**Output:** Architectural decisions documented

---

## Phase 2: BUILD 🔨

### Step 1: Setup
**Agent Actions:**
1. Create branch (if using PR workflow): `git checkout -b feature/issue-X-description`
2. Ensure dependencies are installed: `npm install`
3. Start dev server: `npm run dev`

### Step 2: Implementation
**Agent Actions:**
1. Create new files following Next.js conventions
2. Implement components with TypeScript
3. Add proper type definitions
4. Style with Tailwind CSS (mobile-first)
5. Implement state management (useState, useEffect, etc.)
6. Add error handling and validation
7. Ensure accessibility (semantic HTML, ARIA if needed)

**Code Quality Standards:**
- ✓ TypeScript strict mode compliance
- ✓ Functional components with hooks
- ✓ Single Responsibility Principle
- ✓ DRY (Don't Repeat Yourself)
- ✓ Clear naming conventions
- ✓ Self-documenting code

### Step 3: Integration
**Agent Actions:**
1. Integrate with existing components
2. Update parent components if needed
3. Wire up state and callbacks
4. Test integration points

---

## Phase 3: TEST ✅

### Step 0: Read Testing Strategy (MANDATORY)
**Agent Actions:**
1. **Read ADR-001 Testing Strategy:**
   ```bash
   cat docs/adrs/001-testing-strategy.md
   ```
2. **Read ADR-003 Development Workflow (Gate 4):**
   ```bash
   cat docs/adrs/003-development-workflow.md
   ```
3. Understand testing requirements and browser test gate

**Output:** Testing strategy understood

### Step 1: Functional Testing
**Agent Actions:**
1. Test happy path (main user flow)
2. Test edge cases
3. Test error scenarios
4. Verify all acceptance criteria met

**Checklist:**
- [ ] Core functionality works
- [ ] Edge cases handled
- [ ] Error handling works
- [ ] Validation is correct

### Step 2: UI/UX Testing
**Agent Actions:**
1. Visual inspection (matches design intent)
2. Test all interactions (clicks, inputs, etc.)
3. Verify user feedback (loading states, error messages)
4. Check animations and transitions

**Checklist:**
- [ ] Visual design correct
- [ ] Interactions smooth
- [ ] User feedback clear
- [ ] No UI glitches

### Step 3: Responsive Testing
**Agent Actions:**
Test on multiple viewport sizes:
1. Mobile: 320px - 480px
2. Tablet: 768px - 1024px
3. Desktop: 1280px+

**Checklist:**
- [ ] No horizontal scrolling
- [ ] Text readable on all sizes
- [ ] Touch targets adequate (44x44px min)
- [ ] Layout doesn't break

### Step 4: Technical Testing
**Agent Actions:**
1. Check console for errors/warnings
2. Run TypeScript build: `npm run build`
3. Verify no type errors
4. Check for memory leaks
5. Test performance (load time, interactions)

**Checklist:**
- [ ] No console errors
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Performance acceptable

### Step 5: Integration Testing
**Agent Actions:**
1. Test with existing features
2. Verify no regressions
3. Test complete user flows end-to-end

**Checklist:**
- [ ] Works with other features
- [ ] No regressions
- [ ] End-to-end flow works

### Step 6: Browser Testing Gate ⚠️ MANDATORY - BLOCKING
**THIS IS A BLOCKING GATE - CANNOT PROCEED WITHOUT USER CONFIRMATION**

**Agent Actions:**
1. Ensure dev server is running: `npm run dev`
2. **Request user confirmation** (use exact template below)
3. **WAIT for user response** - DO NOT proceed without confirmation
4. If issues found: Return to Phase 2 (BUILD) and fix
5. Only proceed to Phase 4 after user confirms

**User Request Template:**
```markdown
## 🧪 Browser Testing Required (ADR-001, ADR-003 Gate 4)

I've completed the implementation. Before committing, please verify in browser:

**Test URL:** http://localhost:3000

### Testing Checklist (ADR-001):
- [ ] Feature works as expected
- [ ] No console errors (F12 → Console tab, check for red messages)
- [ ] State changes update UI correctly (if state feature)
- [ ] All user interactions work
- [ ] Responsive design works (try resizing window)
- [ ] localStorage persistence works (if applicable - refresh page)

### Specific Tests for This Feature:
[List feature-specific test steps]

**Please reply:**
- "confirmed" if all tests pass
- Or describe any issues found

⚠️ I will NOT commit until you confirm testing is complete.
```

**Agent must BLOCK here until user responds with confirmation**

**Checklist:**
- [ ] User tested in browser
- [ ] User confirmed all functionality works
- [ ] User confirmed no console errors
- [ ] User confirmed state synchronization (if applicable)
- [ ] Any reported issues have been fixed

**Output:** User confirmation received, safe to proceed to commit

---

## Phase 4: DOCUMENT & COMMIT 📝

### Step 1: Documentation
**Agent Actions:**
1. Add code comments for complex logic
2. Update README.md if needed
3. Document in workflow file (this process)
4. Update specs if applicable

### Step 2: Commit Changes
**Agent Actions:**
1. Stage changes: `git add <files>`
2. Write descriptive commit message:
```bash
git commit -m "feat: implement [feature name]

- Detail 1
- Detail 2
- Detail 3

Resolves #[issue-number]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Step 3: Push and Create PR (if applicable)
**Agent Actions:**
1. Push to remote: `git push origin feature/issue-X-description`
2. Create PR with:
   - Clear title
   - Description of changes
   - Screenshots (if UI changes)
   - Testing notes
   - Reference to issue

---

## Phase 5: CLOSE ISSUE 🎯

### Final Steps
**Agent Actions:**
1. Verify all acceptance criteria met
2. Ensure all tests pass
3. Confirm documentation complete
4. Close GitHub issue with summary comment

**Issue Close Comment Template:**
```markdown
Completed implementation of [feature name].

**Changes Made:**
- List key changes

**Testing:**
- All functional tests passed
- Responsive design verified
- No console errors
- Build succeeds

**Commits:**
- Link to commit(s)

**Screenshots:** (if applicable)
[Add screenshots]

Closing as complete. ✓
```

---

## Success Criteria
- ✅ Feature fully implemented and working
- ✅ All tests passed
- ✅ Code follows project standards
- ✅ Documentation updated
- ✅ Commits show agent attribution
- ✅ Issue can be confidently closed

## Workflow Evidence
This workflow demonstrates autonomous agent development:
- Systematic approach (plan → build → test)
- Thorough testing at each phase
- Clear documentation and commit history
- Agent attribution in commits
- Professional issue management
