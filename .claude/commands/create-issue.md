# Create Issue Command

## Purpose
**TRIGGER COMMAND** - Creates comprehensive, well-structured GitHub issues from brief descriptions using the Issue Creation Workflow.

---

## Usage

```bash
/create-issue [brief description]
```

**Examples:**
```bash
/create-issue Add sound effects when placing X or O
/create-issue Implement animations for winning
/create-issue Add multiplayer online mode
/create-issue Fix score not persisting in localStorage
/create-issue Add dark mode toggle
```

---

## What This Command Does

This command automates the creation of professional, complete GitHub issues:

1. **Analyzes** your brief description
2. **Expands** it into a comprehensive issue with technical details
3. **Determines** the appropriate workflow to use
4. **Generates** complete acceptance criteria
5. **Creates** the issue on GitHub
6. **Returns** the issue number and implementation command

---

## Instructions for Agent

### STEP 1: Read Issue Creation Workflow
**Agent Actions:**
1. Load the workflow: `adws/issue-creation-workflow.md`
2. Read the complete workflow to understand the process
3. Prepare to execute all phases sequentially

### STEP 2: Execute Phase 1 - ANALYZE USER INPUT
**Agent Actions:**
1. Parse the user's description from command arguments
2. Identify the issue category:
   - Game Logic
   - UI Component
   - Feature/Enhancement
   - Bug Fix
   - Documentation
   - Infrastructure
3. Determine appropriate workflow file
4. Assess complexity (Low, Medium, High)
5. Identify dependencies

**Output:** Clear understanding of what needs to be built and how

### STEP 3: Execute Phase 2 - EXPAND DESCRIPTION
**Agent Actions:**
1. Transform brief input into comprehensive description
2. Write complete requirements list
3. Add technical details and implementation approach
4. Define clear, testable acceptance criteria
5. List dependencies (if any)
6. Add optional enhancements (if applicable)

**Output:** Complete issue body with all sections

### STEP 4: Execute Phase 3 - DETERMINE WORKFLOW & COMMAND
**Agent Actions:**
1. Select the appropriate workflow file
2. Write workflow section explaining why it's appropriate
3. Include the command trigger to use

**Workflow Assignment:**
- **Game Logic** → `game-logic-workflow.md`
- **UI Component** → `ui-component-workflow.md`
- **Feature** → `feature-implementation-workflow.md`
- **Deployment** → `deployment-workflow.md`
- **Bug/Docs** → `feature-implementation-workflow.md`

### STEP 5: Execute Phase 4 - CREATE GITHUB ISSUE
**Agent Actions:**
1. Format the complete issue with appropriate title
2. Create issue using GitHub CLI:
   ```bash
   gh issue create --title "[Title]" --body "[Body]"
   ```
3. Capture the issue number from output
4. Verify issue creation

### STEP 6: Execute Phase 5 - POST-CREATION SUMMARY
**Agent Actions:**
1. Report issue creation success
2. Display issue number and URL
3. Provide implementation command
4. Give timeline estimate
5. List any dependencies

---

## Title Format

The command should generate titles in this format:

```
[Type]: [Brief description]
```

**Examples:**
- `Feature: Add sound effects for game moves`
- `Enhancement: Improve mobile touch responsiveness`
- `Bug: Fix score not updating after draw`
- `UI: Add dark mode toggle`
- `Docs: Add contribution guidelines`

---

## Complete Issue Template

The generated issue should include ALL of these sections:

```markdown
## Description
[Comprehensive description of what needs to be done]

## Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Technical Details
- [Technical consideration 1]
- [Technical consideration 2]
- [Implementation approach]

## Acceptance Criteria
- [ ] [Testable criterion 1]
- [ ] [Testable criterion 2]
- [ ] [Testable criterion 3]

## Dependencies
- [List dependencies or mark "None"]

## Optional Enhancements
- [Enhancement 1]
- [Enhancement 2]

## Workflow
**Use:** `adws/[workflow-name].md`

[Explanation of why this workflow is appropriate]

**Command to use:**
```bash
/implement-feature #N
```
```

---

## Output Format

When the command completes, output:

```markdown
## ✅ Issue Created Successfully!

**Issue #N:** [Title]
**URL:** https://github.com/[owner]/[repo]/issues/N
**Type:** [Category]
**Workflow:** `adws/[workflow-name].md`
**Complexity:** [Low/Medium/High]

### What's Next?

To implement this issue, run:
```bash
/implement-feature #N
```

The agent will:
1. Load the `[workflow-name].md` workflow
2. Execute PLAN → BUILD → TEST phases
3. Create commits with agent attribution
4. Update and close the issue when complete

### Dependencies
[List dependencies or "None"]

### Estimated Timeline
- Planning: ~5-10 minutes
- Implementation: [Estimate based on complexity]
- Testing: ~10-15 minutes
```

---

## Examples

### Example 1: Simple UI Feature

**Command:**
```bash
/create-issue Add dark mode toggle
```

**Generated Issue:**
- **Title:** `Feature: Add dark mode toggle`
- **Workflow:** `ui-component-workflow.md`
- **Sections:** Description, Requirements, Technical Details, Acceptance Criteria, Workflow
- **Result:** Issue #10 created

**Output:**
```
✅ Issue #10 created: Feature: Add dark mode toggle
URL: https://github.com/macastro90/tic-tac-toe/issues/10

To implement: /implement-feature #10
```

### Example 2: Complex Feature

**Command:**
```bash
/create-issue Add undo/redo functionality for moves
```

**Generated Issue:**
- **Title:** `Feature: Add undo/redo functionality`
- **Workflow:** `game-logic-workflow.md`
- **Sections:** Full description with move history tracking, keyboard shortcuts, UI buttons
- **Dependencies:** Requires understanding of existing game state
- **Result:** Issue #11 created

### Example 3: Bug Fix

**Command:**
```bash
/create-issue Fix score resetting on page refresh
```

**Generated Issue:**
- **Title:** `Bug: Fix score persistence on page refresh`
- **Workflow:** `feature-implementation-workflow.md`
- **Sections:** Problem description, root cause analysis, solution approach
- **Result:** Issue #12 created

---

## Important Notes

### For the Agent:
- **DO NOT guess** - If the description is too vague, ask clarifying questions
- **BE COMPREHENSIVE** - Include all sections, don't skip any
- **BE SPECIFIC** - Make acceptance criteria testable and measurable
- **BE HELPFUL** - Provide context and implementation guidance
- **USE GITHUB CLI** - Always create issues via `gh issue create`
- **VERIFY CREATION** - Confirm the issue was created successfully

### Issue Quality Standards:
- ✅ Clear, descriptive title
- ✅ Comprehensive description
- ✅ Specific requirements
- ✅ Technical details included
- ✅ Testable acceptance criteria
- ✅ Appropriate workflow assigned
- ✅ Implementation command provided
- ✅ Dependencies identified

---

## Error Handling

**If description is too vague:**
```
❌ Description too vague. Please provide more details.

Example: Instead of "improve game"
Try: "Add animations when a player wins"
```

**If issue creation fails:**
```
❌ Failed to create issue.
Error: [error message]

Please check:
- GitHub CLI is authenticated (gh auth status)
- Repository access permissions
- Network connection
```

---

## Success Criteria

- ✅ Brief description transformed into complete issue
- ✅ Appropriate workflow identified and assigned
- ✅ All required sections included
- ✅ Clear acceptance criteria defined
- ✅ GitHub issue created successfully
- ✅ Issue number returned to user
- ✅ Implementation guidance provided

This command streamlines issue creation, ensuring every issue is comprehensive, actionable, and ready for autonomous agent implementation.
