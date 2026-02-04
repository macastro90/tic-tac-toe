# Test Feature Command

## Purpose
**TRIGGER COMMAND** - Executes Phase 3 (TEST) from feature implementation workflows.

---

## Workflow Reference
This command executes the **TEST phase** from:
- `adws/feature-implementation-workflow.md` (Phase 3)
- `adws/game-logic-workflow.md` (Phase 3)
- `adws/ui-component-workflow.md` (Phase 3)

---

## Instructions for Agent

### STEP 1: Identify Feature Type
**Agent Actions:**
1. Get issue/feature reference from arguments
2. Determine feature type:
   - **Game Logic** → Use Phase 3 from `game-logic-workflow.md`
   - **UI Component** → Use Phase 3 from `ui-component-workflow.md`
   - **General Feature** → Use Phase 3 from `feature-implementation-workflow.md`

### STEP 2: Load Testing Phase from Workflow
**Agent Actions:**
1. **READ** the appropriate workflow file from `adws/`
2. **EXTRACT** Phase 3: TEST section
3. **EXECUTE** all test steps from the workflow

### STEP 3: Execute Test Phase
**Agent Actions:**
1. Follow the exact testing steps in the workflow:
   - **Game Logic**: Run test cases from `game-logic-workflow.md` Phase 3
   - **UI Component**: Run visual, interaction, and responsive tests from `ui-component-workflow.md` Phase 3
   - **General Feature**: Run comprehensive tests from `feature-implementation-workflow.md` Phase 3

2. Check all items in the workflow's testing checklist

3. Run technical verification:
   ```bash
   npm run build  # Verify no TypeScript errors
   npm run lint   # Check code quality
   ```

### STEP 4: Document Test Results
**Agent Actions:**
1. **COMMENT** on GitHub issue with test results:
   ```bash
   gh issue comment [number] --body "## Testing Complete ✅

   **Test Phase Executed**: [workflow-name] Phase 3

   ### Test Results
   - ✅ Functional tests: PASSED
   - ✅ UI/UX tests: PASSED
   - ✅ Responsive tests: PASSED
   - ✅ Technical tests: PASSED
   - ✅ Integration tests: PASSED

   ### Technical Verification
   \`\`\`
   npm run build: ✓ Success
   npm run lint: ✓ No errors
   \`\`\`

   **Status**: Ready for production ✓"
   ```

### STEP 5: Report Issues (if any)
**Agent Actions:**
If tests fail:
1. Document failures clearly
2. List steps to reproduce
3. Suggest fixes
4. Do NOT mark as complete until all tests pass

---

## Example Execution

```
User: /test-feature #4
↓
Agent identifies: Game Logic feature (win detection)
↓
Agent loads: adws/game-logic-workflow.md
↓
Agent executes Phase 3:
  ✓ Test Case 1: Win Detection - Horizontal
  ✓ Test Case 2: Win Detection - Vertical
  ✓ Test Case 3: Win Detection - Diagonal
  ✓ Test Case 4: Draw Detection
  ✓ Test Case 5: Turn Alternation
  ✓ Test Case 6: Invalid Move Prevention
  ✓ Test Case 7: Post-Game Move Prevention
  ✓ Test Case 8: Reset Functionality
↓
Agent runs: npm run build ✓
Agent runs: npm run lint ✓
↓
Agent comments on issue with results
```

---

## Quick Testing Checklist

Use the checklist from the appropriate workflow:

| Feature Type | Workflow | Phase |
|--------------|----------|-------|
| Game Logic | `game-logic-workflow.md` | Phase 3: TEST |
| UI Component | `ui-component-workflow.md` | Phase 3: TEST |
| General Feature | `feature-implementation-workflow.md` | Phase 3: TEST |

---

## Success Criteria
- ✅ Correct workflow testing phase identified
- ✅ All test cases from workflow executed
- ✅ Technical verification passed (build + lint)
- ✅ Test results documented in issue
- ✅ No critical bugs found
- ✅ Feature ready for production
