# Issue Creation Workflow

## Purpose
Automated workflow for creating well-structured GitHub issues from brief descriptions. Analyzes user input, expands it with technical details, assigns appropriate workflow, and creates the issue.

---

## Phase 1: ANALYZE USER INPUT 📋

### Step 1: Parse Description
**Agent Actions:**
1. Read the user's brief description
2. Identify the core request or feature
3. Determine the category:
   - **Game Logic** (rules, mechanics, algorithms)
   - **UI Component** (visual elements, styling, layout)
   - **Feature** (complex multi-part features)
   - **Bug Fix** (fixing existing functionality)
   - **Documentation** (docs, README, guides)
   - **Infrastructure** (deployment, CI/CD, tooling)
   - **Enhancement** (improvements to existing features)

**Example Analysis:**
```
User Input: "Add sound effects when placing X or O"

Category: Feature (audio integration)
Type: Enhancement
Complexity: Medium
Dependencies: May need audio library
```

### Step 2: Determine Workflow
**Agent Actions:**
Based on the category, assign the appropriate workflow:

| Category | Workflow File | Command Trigger |
|----------|---------------|-----------------|
| Game Logic | `game-logic-workflow.md` | `/implement-feature #N` |
| UI Component | `ui-component-workflow.md` | `/implement-feature #N` |
| Feature/Enhancement | `feature-implementation-workflow.md` | `/implement-feature #N` |
| Deployment | `deployment-workflow.md` | `/implement-feature #N` |
| Bug Fix | `feature-implementation-workflow.md` | `/implement-feature #N` |
| Documentation | `feature-implementation-workflow.md` | `/document-code` or `/implement-feature #N` |

### Step 3: Assess Scope and Complexity
**Agent Actions:**
1. Estimate complexity (Low, Medium, High)
2. Identify required components
3. List potential dependencies
4. Consider technical requirements
5. Identify acceptance criteria

---

## Phase 2: EXPAND DESCRIPTION 📝

### Step 1: Write Complete Description
**Agent Actions:**
Transform brief input into comprehensive issue description.

**Template Structure:**
```markdown
## Description
[Expanded description of what needs to be done]

## Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Technical Details
- [Technical detail 1]
- [Technical detail 2]
- [Implementation approach]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Dependencies
- [List any dependencies on other issues or features]

## Workflow
**Use:** `adws/[workflow-name].md`

[Brief explanation of why this workflow is appropriate]

**Command to use:**
```bash
/implement-feature #N
```
```

### Step 2: Add Technical Specifications
**Agent Actions:**
1. **For UI Components:**
   - Specify component name and location
   - List props/state requirements
   - Describe styling approach
   - Mention responsive considerations

2. **For Game Logic:**
   - Describe algorithm or logic
   - List state changes needed
   - Specify validation rules
   - Mention edge cases

3. **For Features:**
   - Break down into sub-tasks
   - Identify files to create/modify
   - Specify integration points
   - List testing requirements

### Step 3: Define Acceptance Criteria
**Agent Actions:**
Create clear, testable acceptance criteria:
- Use checkboxes `- [ ]` for each criterion
- Make criteria specific and measurable
- Include functional requirements
- Add non-functional requirements (performance, accessibility)
- Specify testing requirements

**Example:**
```markdown
## Acceptance Criteria
- [ ] Sound plays when X is placed
- [ ] Sound plays when O is placed
- [ ] Volume is adjustable
- [ ] Sounds can be muted
- [ ] No performance impact on game speed
- [ ] Works on all browsers
- [ ] Accessible (can be disabled for users who need it)
```

---

## Phase 3: DETERMINE WORKFLOW & COMMAND 🔧

### Step 1: Select Appropriate Workflow
**Agent Actions:**
Choose the workflow file that best matches the issue type:

**Game Logic Issues:**
```markdown
## Workflow
**Use:** `adws/game-logic-workflow.md`

This issue involves implementing game mechanics and logic. The Game Logic Workflow provides:
- Algorithm design patterns
- State management for game rules
- Comprehensive testing for all scenarios
- Edge case handling
- Integration with UI components

**Command to use:**
```bash
/implement-feature #N
```
```

**UI Component Issues:**
```markdown
## Workflow
**Use:** `adws/ui-component-workflow.md`

This issue involves creating/modifying UI components. The UI Component Workflow provides:
- Component design patterns
- Props and state management
- Tailwind CSS styling guidance
- Responsive design breakpoints
- Accessibility requirements
- Visual testing procedures

**Command to use:**
```bash
/implement-feature #N
```
```

**Feature/Enhancement Issues:**
```markdown
## Workflow
**Use:** `adws/feature-implementation-workflow.md`

This is a comprehensive feature requiring multiple components. The Feature Implementation Workflow provides:
- Complete plan → build → test approach
- Multi-component integration
- Testing across all aspects
- Documentation requirements

**Command to use:**
```bash
/implement-feature #N
```
```

**Deployment Issues:**
```markdown
## Workflow
**Use:** `adws/deployment-workflow.md`

This issue involves deployment and infrastructure. The Deployment Workflow provides:
- Pre-deployment verification
- Platform setup instructions
- Post-deployment testing
- Performance verification
- Documentation updates

**Command to use:**
```bash
/implement-feature #N
```
```

---

## Phase 4: CREATE GITHUB ISSUE 🚀

### Step 1: Format Issue Content
**Agent Actions:**
1. Combine all sections into final issue body
2. Add title (clear, concise, descriptive)
3. Review for completeness
4. Ensure all required sections present

**Issue Title Format:**
```
[Type]: [Brief description]

Examples:
- Feature: Add sound effects for game moves
- Enhancement: Improve mobile touch responsiveness
- Bug: Fix score not updating after draw
- Docs: Add contribution guidelines
```

### Step 2: Create Issue via GitHub CLI
**Agent Actions:**
```bash
gh issue create \
  --title "[Title]" \
  --body "$(cat <<'EOF'
[Complete issue body with all sections]
EOF
)"
```

### Step 3: Verify Issue Creation
**Agent Actions:**
1. Capture issue number from output
2. Verify issue appears on GitHub
3. Return issue number to user

**Success Output:**
```
✅ Issue created successfully!

Issue #N: [Title]
URL: https://github.com/[owner]/[repo]/issues/N

To implement this issue, run:
/implement-feature #N
```

---

## Phase 5: POST-CREATION SUMMARY 📊

### Step 1: Provide Implementation Guidance
**Agent Actions:**
Give the user clear next steps:

```markdown
## Issue Created: #N

**Title:** [Issue title]
**Type:** [Issue type]
**Workflow:** [Workflow file]
**Complexity:** [Low/Medium/High]

### What's Next?

1. **Review the issue:** https://github.com/[owner]/[repo]/issues/N
2. **Implement the feature:**
   ```bash
   /implement-feature #N
   ```
3. **The agent will:**
   - Load the specified workflow
   - Execute plan → build → test phases
   - Create commits with proper attribution
   - Update and close the issue when complete

### Expected Timeline
- **Planning:** ~5-10 minutes
- **Implementation:** [Estimate based on complexity]
- **Testing:** ~10-15 minutes
- **Total:** [Total estimate]

### Dependencies
[List any dependencies that should be completed first]
```

---

## Example: Complete Issue Creation Flow

### User Input:
```
"Add animations when a player wins"
```

### Agent Analysis:
- **Category:** UI Component + Feature
- **Workflow:** `ui-component-workflow.md`
- **Complexity:** Medium
- **Dependencies:** Requires win detection (#4)

### Generated Issue:

````markdown
**Title:** Feature: Add winning animations

## Description
Implement visual animations that celebrate when a player wins the game. This should provide immediate visual feedback and enhance the user experience with smooth, appealing animations.

## Requirements
- Animate winning cells (highlight or pulse effect)
- Display celebration animation (confetti, stars, or similar)
- Smooth animation transitions
- Configurable animation duration
- No impact on game performance
- Works across all devices

## Technical Details
- Use CSS animations or Framer Motion library
- Animate the winning line (3 cells)
- Add celebration effect above the game board
- Duration: 1-2 seconds
- Respect user's `prefers-reduced-motion` setting
- Integrate with existing GameBoard and GameStatus components

## Implementation Approach
1. Create animation keyframes in CSS or animation component
2. Detect winning line (already implemented in #4)
3. Apply animation classes to winning cells
4. Trigger celebration animation on win
5. Clean up animations on game reset

## Acceptance Criteria
- [ ] Winning cells are visually highlighted with animation
- [ ] Celebration effect displays when game is won
- [ ] Animations are smooth (60fps)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No performance impact on game
- [ ] Works on mobile, tablet, and desktop
- [ ] Animations clean up properly on reset

## Dependencies
- Requires issue #4 (Win Detection) - completed ✓

## Optional Enhancements
- Different animations for X vs O wins
- Sound effects integration
- Customizable animation styles
- Animation speed control

## Workflow
**Use:** `adws/ui-component-workflow.md`

This issue involves enhancing UI components with animations. The UI Component Workflow provides:
- Component design and integration patterns
- CSS/animation implementation guidance
- Performance optimization techniques
- Responsive behavior testing
- Accessibility considerations (prefers-reduced-motion)
- Cross-device testing procedures

**Command to use:**
```bash
/implement-feature #N
```
````

---

## Success Criteria

- ✅ User input successfully analyzed
- ✅ Issue category correctly identified
- ✅ Appropriate workflow assigned
- ✅ Complete issue description generated
- ✅ All required sections included
- ✅ GitHub issue created successfully
- ✅ Issue number returned to user
- ✅ Implementation guidance provided

## Best Practices

1. **Be Specific:** Transform vague descriptions into concrete requirements
2. **Be Complete:** Include all necessary sections (description, requirements, acceptance criteria, workflow)
3. **Be Clear:** Use simple, direct language
4. **Be Actionable:** Make acceptance criteria testable and measurable
5. **Be Helpful:** Provide context and guidance for implementation
6. **Be Consistent:** Follow the project's existing patterns and standards

This workflow ensures every issue created is comprehensive, actionable, and ready for autonomous agent implementation.
