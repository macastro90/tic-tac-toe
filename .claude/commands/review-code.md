# Review Code Command

## Purpose
Guide autonomous agents to perform thorough code reviews ensuring quality, consistency, and best practices.

## Instructions for Agent

When reviewing code:

### 1. Code Quality Check
- **Readability**: Is the code easy to understand?
- **Naming**: Are variables, functions, and components well-named?
- **Complexity**: Is the code unnecessarily complex?
- **DRY Principle**: Is there code duplication that should be refactored?

### 2. TypeScript Verification
- Are all types properly defined?
- No use of `any` type unless absolutely necessary
- Interfaces defined for objects and props
- Proper typing for function parameters and returns
- No TypeScript errors or warnings

### 3. React Best Practices
- Components follow functional component patterns
- Proper use of hooks (useState, useEffect, etc.)
- No unnecessary re-renders
- Props are properly typed
- Event handlers are correctly implemented

### 4. Next.js Conventions
- Proper use of App Router structure
- Client/Server components used appropriately
- File naming follows Next.js conventions
- Metadata and SEO considerations

### 5. Styling Review
- Tailwind CSS classes used consistently
- Responsive design implemented (mobile-first)
- No inline styles (use Tailwind)
- Color scheme is consistent
- Accessibility considerations (contrast, touch targets)

### 6. Performance Considerations
- No unnecessary API calls or computations
- Proper use of React memoization if needed
- Images optimized (use Next.js Image component)
- No memory leaks (cleanup in useEffect)

### 7. Security Check
- No hardcoded sensitive data
- Proper input validation
- No XSS vulnerabilities
- Safe handling of user input

### 8. Testing Verification
- Feature has been manually tested
- Edge cases considered
- Error states handled gracefully
- Loading states implemented where needed

## Review Checklist
- [ ] Code is readable and maintainable
- [ ] TypeScript types are properly defined
- [ ] React best practices followed
- [ ] Next.js conventions respected
- [ ] Tailwind CSS used consistently
- [ ] Responsive design implemented
- [ ] No console errors or warnings
- [ ] Performance is acceptable
- [ ] Security considerations addressed
- [ ] Feature thoroughly tested

## Output Format
Provide feedback in this structure:
1. **Strengths**: What was done well
2. **Issues Found**: Critical problems that must be fixed
3. **Suggestions**: Optional improvements
4. **Approval Status**: ✅ Approved / ⚠️ Needs Changes / ❌ Rejected
