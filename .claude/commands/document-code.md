# Document Code Command

## Purpose
Guide autonomous agents to create clear, comprehensive documentation for code and features.

## Instructions for Agent

When documenting code:

### 1. Code Comments
Only add comments for:
- **Complex Logic**: Algorithms that aren't immediately obvious
- **Business Rules**: Game rules or domain-specific logic
- **Why, Not What**: Explain reasoning, not what code does
- **TODOs**: Future improvements or known limitations

**Avoid**:
- Obvious comments that just restate the code
- Commenting every line
- Outdated comments

### 2. Component Documentation
For each component, consider:
```typescript
/**
 * GameBoard Component
 *
 * Renders the 3x3 Tic-Tac-Toe game board with clickable cells.
 * Handles cell clicks and displays X/O symbols.
 *
 * @param board - Current state of the game board
 * @param onCellClick - Callback when a cell is clicked
 */
```

### 3. Function Documentation
For complex functions:
```typescript
/**
 * Checks if there's a winner on the board
 *
 * @param board - The current game board state
 * @returns 'X', 'O', or null if no winner
 */
function checkWinner(board: Cell[]): 'X' | 'O' | null {
  // Check all winning combinations
}
```

### 4. README Updates
When implementing features, update README.md with:
- **Features Section**: List new features added
- **Tech Stack**: Add new dependencies
- **Setup Instructions**: Update if needed
- **Usage**: How to use new features
- **Screenshots**: Add if UI changed significantly

### 5. Workflow Documentation (adws/)
After completing a feature, document in `adws/`:
- What approach was taken
- Key decisions made
- Challenges encountered
- How they were solved
- Lessons learned

### 6. Specification Updates (specs/)
Update relevant spec files:
- Mark completed features
- Add implementation details
- Document API contracts
- Update technical requirements

### 7. Commit Messages as Documentation
Write clear commit messages:
```
feat: implement win detection logic

- Add checkWinner function with all 8 winning combinations
- Update game state when winner is found
- Display winner message in UI
- Prevent further moves after game ends

Resolves #4

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### 8. Pull Request Documentation
When creating PRs, include:
- **Summary**: What was implemented
- **Changes**: Key changes made
- **Testing**: How it was tested
- **Screenshots**: Visual changes (if applicable)
- **Notes**: Anything reviewers should know

## Documentation Checklist
- [ ] Complex logic has explanatory comments
- [ ] Components have JSDoc if needed
- [ ] README.md updated with new features
- [ ] Workflow documented in adws/ (if applicable)
- [ ] Specifications updated
- [ ] Commit messages are clear and descriptive
- [ ] PR description is comprehensive

## Best Practices
1. **Keep it Current**: Update docs when code changes
2. **Be Concise**: Don't over-document obvious code
3. **Use Examples**: Show usage examples when helpful
4. **Format Consistently**: Follow existing documentation style
5. **Think of Users**: Write for people who'll read it later

## Success Criteria
- Documentation is clear and helpful
- New developers can understand the code
- Features are well-explained in README
- Commit history tells the development story
- No confusion about how things work
