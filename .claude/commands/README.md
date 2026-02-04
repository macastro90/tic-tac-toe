# Claude Commands for Tic-Tac-Toe Development

This directory contains **trigger commands** that invoke structured workflows for autonomous development.

---

## Architecture: Commands → Workflows

```
User executes command (.claude/commands/)
         ↓
Command acts as TRIGGER
         ↓
Loads detailed workflow (adws/)
         ↓
Agent executes workflow phases
         ↓
Documents progress in GitHub issue
```

---

## Available Commands

### `/implement-feature` - Feature Implementation Trigger
**Purpose**: Implement new features using structured workflows

**Workflow Mapping**:
- Game logic features → `adws/game-logic-workflow.md`
- UI components → `adws/ui-component-workflow.md`
- General features → `adws/feature-implementation-workflow.md`

**Usage**:
```bash
/implement-feature #4
```

**What it does**:
1. Reads GitHub issue
2. Identifies appropriate workflow
3. Executes all workflow phases (PLAN → BUILD → TEST → DOCUMENT → CLOSE)
4. Documents progress in issue comments
5. Commits with agent attribution

---

### `/test-feature` - Testing Phase Trigger
**Purpose**: Execute Phase 3 (TEST) from workflows

**Workflow Mapping**:
- Uses Phase 3 from the appropriate workflow based on feature type

**Usage**:
```bash
/test-feature #4
```

**What it does**:
1. Identifies feature type
2. Loads Phase 3 from appropriate workflow
3. Runs all test cases
4. Verifies with `npm run build` and `npm run lint`
5. Documents test results in issue

---

### `/document-code` - Documentation Phase Trigger
**Purpose**: Execute Phase 4 (DOCUMENT & COMMIT) from workflows

**Workflow Mapping**:
- Uses Phase 4 from `adws/feature-implementation-workflow.md`

**Usage**:
```bash
/document-code #4
```

**What it does**:
1. Adds JSDoc comments to complex functions
2. Updates README.md with new features
3. Documents workflow in `adws/`
4. Comments on issue with documentation summary

---

### `/review-code` - Code Review (Standalone)
**Purpose**: Perform comprehensive code review

**Usage**:
```bash
/review-code hooks/useGameLogic.ts
/review-code #4
```

**What it does**:
1. Reviews code quality, TypeScript, React, Next.js conventions
2. Checks performance, security, accessibility
3. Generates structured review report
4. Posts review to issue (if issue number provided)

---

## Workflow Files (adws/)

All detailed implementation steps are in `adws/` directory:

| Workflow | Purpose | Phases |
|----------|---------|--------|
| `feature-implementation-workflow.md` | General feature development | 5 phases: PLAN → BUILD → TEST → DOCUMENT → CLOSE |
| `game-logic-workflow.md` | Game mechanics (turns, wins, draws) | Specialized for game algorithms |
| `ui-component-workflow.md` | Visual components (boards, buttons) | Specialized for React/Tailwind UI |

---

## Integration with GitHub Issues

Each command execution creates a traceable development history:

1. **Issue Reference**: Commands always reference GitHub issue number
2. **Phase Documentation**: Progress documented at each workflow phase
3. **Agent Attribution**: Commits include `Co-Authored-By: Claude Sonnet 4.5`
4. **Final Summary**: Complete implementation summary posted to issue

**Example issue comment flow**:
```
Issue #4: Implement win detection logic
├── Phase 1: PLAN - Analysis and design complete
├── Phase 2: BUILD - Implementation complete
├── Phase 3: TEST - All tests passing
├── Phase 4: DOCUMENT - Documentation added
└── Phase 5: CLOSE - Implementation complete ✅
```

---

## Evidence of Autonomous Development

The architecture demonstrates AI-driven development through:

✅ **Structured Workflows**: Detailed, reproducible development processes
✅ **Trigger Commands**: Clear separation of command vs. execution
✅ **Phase Documentation**: Transparent progress tracking
✅ **Agent Attribution**: All commits show AI authorship
✅ **GitHub Integration**: Full traceability through issues
✅ **Quality Standards**: Enforced through workflow checklists

---

## How to Use

1. **Start with an issue**: Create GitHub issue for the feature
2. **Execute command**: Run `/implement-feature #[number]`
3. **Agent executes**: Agent loads workflow and follows all phases
4. **Track progress**: Check issue comments for phase updates
5. **Review commits**: See commit history with agent attribution

This demonstrates that features are implemented by autonomous AI agents following professional development workflows.
