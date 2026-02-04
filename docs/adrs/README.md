# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Tic-Tac-Toe project.

## What is an ADR?

An **Architecture Decision Record (ADR)** is a document that captures an important architectural decision made along with its context and consequences.

## Why ADRs?

- 📝 Document architectural decisions and their rationale
- 🔍 Provide context for future developers and AI agents
- 🛡️ Prevent repeating past mistakes
- 🎯 Establish best practices and patterns
- 📚 Create searchable knowledge base

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [001](001-testing-strategy.md) | Testing Strategy and Quality Assurance | Accepted | 2026-02-04 |
| [002](002-state-management-patterns.md) | State Management Patterns | Accepted | 2026-02-04 |
| [003](003-development-workflow.md) | Development Workflow and Integration Testing | Accepted | 2026-02-04 |

## How to Use ADRs

### For Developers
1. **Before implementing:** Read relevant ADRs for the feature area
2. **During development:** Follow patterns and practices documented in ADRs
3. **During review:** Verify implementation follows ADR guidelines
4. **When updating:** If a decision changes, create new ADR superseding the old one

### For AI Agents
ADRs are **mandatory references** during workflow execution:

1. **Phase 1 (PLAN):** Consult relevant ADRs before planning
2. **Phase 2 (BUILD):** Follow patterns specified in ADRs
3. **Phase 3 (TEST):** Apply testing strategies from ADR-001
4. **Phase 4 (DOCUMENT):** Reference ADRs in commit messages

See: `adws/feature-implementation-workflow.md` for integration details.

## Creating New ADRs

1. Copy template: `docs/templates/adr-template.md`
2. Name file: `XXX-descriptive-title.md` (e.g., `004-api-error-handling.md`)
3. Fill in all sections
4. Update this README index
5. Commit with message: `docs: Add ADR-XXX [title]`

## ADR Lifecycle

```
Proposed → Accepted → [Active]
                   ↓
                Deprecated
                   ↓
              Superseded by ADR-XXX
```

## Questions?

If you're unsure whether to create an ADR, ask:
- Will this decision affect future development?
- Will someone need to understand why we made this choice?
- Does this establish a pattern we'll follow?

If yes to any → Create an ADR!
