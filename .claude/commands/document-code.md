# Document Code Command

## Purpose
**TRIGGER COMMAND** - Executes Phase 4 (DOCUMENT & COMMIT) from workflows or standalone documentation tasks.

---

## Workflow Reference
This command executes **Phase 4** from:
- `adws/feature-implementation-workflow.md` (Phase 4: DOCUMENT & COMMIT)
- Can also run standalone for documentation updates

---

## Instructions for Agent

### STEP 1: Identify Documentation Scope
**Agent Actions:**
1. Get issue number or file reference from arguments
2. Determine what needs documentation:
   - **New Feature** → Document implementation in issue comment
   - **Code Changes** → Add/update JSDoc comments
   - **README Update** → Add feature to features list
   - **Workflow Update** → Document in `adws/`

### STEP 2: Execute Documentation Tasks

#### Task 1: Code Comments (if needed)
**Agent Actions:**
Only add comments for:
- ✅ **Complex algorithms** not immediately obvious
- ✅ **Business rules** (game rules, domain logic)
- ✅ **Why, not what** (explain reasoning)
- ❌ **NOT** obvious code that's self-explanatory

**Example:**
```typescript
/**
 * Check if there's a winner on the board
 *
 * Checks all 8 possible winning combinations:
 * - 3 rows, 3 columns, 2 diagonals
 *
 * @param boardToCheck - The board to check for a winner
 * @returns Object with winner and winning line, or null if no winner
 */
const checkWinner = (boardToCheck: Board) => {
  // Implementation
};
```

#### Task 2: Component Documentation
**Agent Actions:**
Add JSDoc to components:

```typescript
/**
 * GameBoard Component
 *
 * Renders the 3x3 Tic-Tac-Toe game board with clickable cells.
 * Handles cell clicks and displays X/O symbols with visual feedback.
 *
 * @param board - Current state of the game board (array of 9 cells)
 * @param onCellClick - Callback when a cell is clicked
 * @param disabled - Whether the board is disabled (game over)
 * @param winningLine - Array of indices representing winning cells (optional)
 */
```

#### Task 3: README Update
**Agent Actions:**
If new feature added, update `README.md`:

1. **READ** current README
2. **ADD** feature to Features section
3. **UPDATE** Tech Stack if new dependencies
4. **ADD** Usage instructions if needed

#### Task 4: Workflow Documentation
**Agent Actions:**
Document in `adws/` if significant feature:

```markdown
## Issue #[N]: [Feature Name]

### Approach Taken
[What strategy was used]

### Key Decisions
- Decision 1: [Reasoning]
- Decision 2: [Reasoning]

### Challenges
- Challenge 1: [How it was solved]

### Lessons Learned
- Lesson 1
```

#### Task 5: GitHub Issue Documentation
**Agent Actions:**
Comment on issue with documentation summary:

```bash
gh issue comment [number] --body "## Documentation Complete 📝

### Code Documentation
- ✅ Added JSDoc comments to complex functions
- ✅ Component interfaces documented

### README Updates
- ✅ Added feature to Features section
- ✅ Updated usage instructions

### Workflow Documentation
- ✅ Documented in adws/[workflow-name].md

**Status**: All documentation complete ✓"
```

### STEP 3: Verify Documentation Quality
**Agent Actions:**

Checklist:
- [ ] Complex logic has explanatory comments
- [ ] Components have JSDoc (if appropriate)
- [ ] README.md updated with new features
- [ ] Workflow documented in adws/ (if applicable)
- [ ] Commit messages are descriptive
- [ ] No outdated comments

---

## Documentation Best Practices

### DO ✅
- Explain **why**, not **what**
- Document complex algorithms
- Keep comments up-to-date
- Use examples when helpful
- Write for future developers

### DON'T ❌
- Over-document obvious code
- Comment every line
- Leave outdated comments
- Restate what code does
- Use emoji in code comments (unless project standard)

---

## Example Execution

```
User: /document-code #4
↓
Agent reads issue #4 details
↓
Agent identifies: Win detection feature
↓
Agent executes documentation:
  ✓ Added JSDoc to checkWinner function
  ✓ Documented WINNING_COMBINATIONS constant
  ✓ Updated README with win detection feature
  ✓ Documented approach in adws/
  ✓ Commented on issue with summary
```

---

## Success Criteria
- ✅ Appropriate code comments added
- ✅ Components documented with JSDoc
- ✅ README updated (if applicable)
- ✅ Workflow documented in adws/ (if significant feature)
- ✅ GitHub issue documented
- ✅ Documentation is clear and helpful
- ✅ No over-documentation of obvious code
