# Implement Feature Command

## Purpose
**TRIGGER COMMAND** - Executes autonomous feature implementation following structured workflows.

---

## Workflow Reference
This command executes workflows from the `adws/` directory:

- **General features**: `adws/feature-implementation-workflow.md`
- **Game logic**: `adws/game-logic-workflow.md`
- **UI components**: `adws/ui-component-workflow.md`

---

## Instructions for Agent

### STEP 1: Identify Issue & Workflow Type
**Agent Actions:**
1. Get issue number from command arguments (e.g., `#4`)
2. Read GitHub issue: `gh issue view [number]`
3. Determine workflow type based on issue content:
   - **Game Logic** (turn management, win detection, rules) → Use `game-logic-workflow.md`
   - **UI Components** (visual elements, styling) → Use `ui-component-workflow.md`
   - **General Features** (other features) → Use `feature-implementation-workflow.md`

### STEP 2: Load and Execute Workflow
**Agent Actions:**
1. **READ** the complete workflow file from `adws/[workflow-name].md`
2. **EXECUTE** each phase sequentially:
   - Phase 1: PLAN
   - Phase 2: BUILD
   - Phase 3: TEST
   - Phase 4: DOCUMENT & COMMIT
   - Phase 5: CLOSE ISSUE (if applicable)
3. **FOLLOW** every step in the workflow exactly as written

### STEP 3: Document Progress
**Agent Actions:**
1. **COMMENT** on GitHub issue at each phase transition:
   ```bash
   gh issue comment [number] --body "## Phase [N]: [PHASE_NAME]

   [Summary of what was done in this phase]

   **Next**: [Next phase name]"
   ```

2. **FINAL COMMENT** when complete (see workflow for template)

### STEP 4: Commit with Attribution
**Agent Actions:**
1. Follow commit guidelines from workflow
2. **ALWAYS** include:
   ```
   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   ```

---

## Example Execution

```
User: /implement-feature #4
↓
Agent reads issue #4: "Win detection logic"
↓
Agent identifies: Game Logic feature
↓
Agent loads: adws/game-logic-workflow.md
↓
Agent executes:
  ✓ Phase 1: PLAN - Designs win detection algorithm
  ✓ Phase 2: BUILD - Implements checkWinner()
  ✓ Phase 3: TEST - Tests all 8 winning combinations
  ✓ Phase 4: DOCUMENT & COMMIT - Commits with attribution
  ✓ Phase 5: Comments on issue with summary
```

---

## Workflow Selection Guide

| Issue Type | Workflow File | Use When |
|------------|---------------|----------|
| Turn logic, win detection, game rules | `game-logic-workflow.md` | Implementing game mechanics |
| Buttons, boards, status displays | `ui-component-workflow.md` | Creating visual components |
| Full features, integrations | `feature-implementation-workflow.md` | Complex multi-part features |

---

## Success Criteria
- ✅ Correct workflow identified and loaded
- ✅ All workflow phases executed in order
- ✅ Progress documented in GitHub issue
- ✅ Code follows workflow standards
- ✅ Commit includes agent attribution
- ✅ Issue updated with final summary
