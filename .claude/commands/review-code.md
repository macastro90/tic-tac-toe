# Review Code Command

## Purpose
**STANDALONE COMMAND** - Performs comprehensive code review for quality, consistency, and best practices.

---

## Instructions for Agent

### STEP 1: Identify Scope
**Agent Actions:**
1. Get file(s) or issue reference from arguments
2. If issue number provided, read all changed files from commits
3. If file path(s) provided, review those specific files

### STEP 2: Read Code
**Agent Actions:**
1. **READ** all files in scope using Read tool
2. Understand the context and purpose of changes
3. Identify patterns and architectural decisions

### STEP 3: Execute Review Checklist

#### 1. Code Quality Check
**Agent Actions:**
- [ ] **Readability**: Code is easy to understand?
- [ ] **Naming**: Variables, functions, components well-named?
- [ ] **Complexity**: No unnecessary complexity?
- [ ] **DRY Principle**: No code duplication?

#### 2. TypeScript Verification
**Agent Actions:**
- [ ] All types properly defined?
- [ ] No `any` type (unless absolutely necessary)?
- [ ] Interfaces defined for objects and props?
- [ ] Function parameters and returns typed?
- [ ] Run `npm run build` - no TypeScript errors?

#### 3. React Best Practices
**Agent Actions:**
- [ ] Functional components with hooks?
- [ ] Proper use of useState, useEffect, etc.?
- [ ] No unnecessary re-renders?
- [ ] Props properly typed?
- [ ] Event handlers correctly implemented?

#### 4. Next.js Conventions
**Agent Actions:**
- [ ] App Router structure correct?
- [ ] Client/Server components used appropriately?
- [ ] File naming follows Next.js conventions?
- [ ] 'use client' directive used when needed?

#### 5. Styling Review
**Agent Actions:**
- [ ] Tailwind CSS used consistently?
- [ ] Mobile-first responsive design?
- [ ] No inline styles?
- [ ] Color scheme consistent?
- [ ] Accessibility (contrast, touch targets)?

#### 6. Performance Considerations
**Agent Actions:**
- [ ] No unnecessary API calls?
- [ ] React memoization if needed?
- [ ] No memory leaks (useEffect cleanup)?
- [ ] Efficient algorithms?

#### 7. Security Check
**Agent Actions:**
- [ ] No hardcoded secrets?
- [ ] Proper input validation?
- [ ] No XSS vulnerabilities?
- [ ] Safe handling of user input?

#### 8. Testing Verification
**Agent Actions:**
- [ ] Feature manually tested?
- [ ] Edge cases considered?
- [ ] Error states handled?
- [ ] No console errors?

### STEP 4: Generate Review Report
**Agent Actions:**

Create a structured review report:

```markdown
# Code Review Report

**Scope**: [Files reviewed]
**Date**: [Current date]
**Reviewer**: Claude Sonnet 4.5

---

## ✅ Strengths
[List what was done well]
- Clean, readable code
- Proper TypeScript typing
- Good component structure
- etc.

## ⚠️ Issues Found
[Critical problems that MUST be fixed]
- Issue 1: [Description] (File: path/to/file.ts:line)
- Issue 2: [Description] (File: path/to/file.ts:line)

## 💡 Suggestions
[Optional improvements]
- Suggestion 1: [Description]
- Suggestion 2: [Description]

## 📊 Review Checklist
- [x] Code Quality: ✓ PASS
- [x] TypeScript: ✓ PASS
- [x] React Best Practices: ✓ PASS
- [x] Next.js Conventions: ✓ PASS
- [x] Styling: ✓ PASS
- [x] Performance: ✓ PASS
- [x] Security: ✓ PASS
- [x] Testing: ✓ PASS

## 🎯 Approval Status
[Choose one:]
✅ **APPROVED** - Ready to merge
⚠️ **NEEDS CHANGES** - Fix issues before merging
❌ **REJECTED** - Major problems, requires redesign

---
🤖 Automated review by Claude Sonnet 4.5
```

### STEP 5: Post Review (if issue provided)
**Agent Actions:**
1. **COMMENT** review report on GitHub issue:
   ```bash
   gh issue comment [number] --body "[Review report markdown]"
   ```

---

## Example Execution

```
User: /review-code hooks/useGameLogic.ts
↓
Agent reads: hooks/useGameLogic.ts
↓
Agent executes checklist:
  ✓ Code Quality: Clean, readable
  ✓ TypeScript: All types defined
  ✓ React: Proper hooks usage
  ⚠️ Issue: Missing cleanup in useEffect
↓
Agent generates review report
↓
Agent posts report
```

---

## Success Criteria
- ✅ All files in scope reviewed
- ✅ Checklist completed
- ✅ Report generated with clear feedback
- ✅ Issues identified with file:line references
- ✅ Approval status provided
- ✅ Review posted to issue (if applicable)
