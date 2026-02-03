# Implement Feature Command

## Purpose
This command guides autonomous agents to implement new features following best practices and the project's architecture.

## Instructions for Agent

When implementing a feature:

### 1. Analysis Phase
- Read and understand the GitHub issue requirements thoroughly
- Review existing code structure and patterns
- Identify all files that need to be created or modified
- Check for dependencies on other features

### 2. Planning Phase
- Break down the feature into smaller, manageable tasks
- Identify the components/functions needed
- Plan the state management approach
- Consider edge cases and error handling

### 3. Implementation Phase
- Write clean, type-safe TypeScript code
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with consistent design patterns
- Implement proper React hooks (useState, useEffect, etc.)
- Add TypeScript interfaces/types for all data structures
- Write self-documenting code with clear variable names

### 4. Code Quality Standards
- Use functional components with hooks
- Keep components small and focused (Single Responsibility)
- Avoid premature optimization
- Follow existing code patterns in the project
- Use descriptive variable and function names
- Add comments only for complex logic

### 5. Testing Checklist
- Manually test the feature thoroughly
- Test edge cases
- Verify responsive design
- Check for console errors
- Ensure type safety (no TypeScript errors)

### 6. Commit Guidelines
- Write clear, descriptive commit messages
- Use conventional commit format: `feat: description`
- Include "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
- Reference the issue number in commits

## Example Usage
```
User: "Implement the game board UI from issue #2"
Agent: [Reads issue] → [Plans implementation] → [Creates GameBoard component] → [Tests] → [Commits]
```

## Success Criteria
- Feature works as specified in the issue
- Code follows project conventions
- No TypeScript or console errors
- Responsive on all screen sizes
- Properly committed with agent attribution
