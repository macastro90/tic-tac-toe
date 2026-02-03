# Test Feature Command

## Purpose
Guide autonomous agents to thoroughly test implemented features before marking them as complete.

## Instructions for Agent

When testing a feature:

### 1. Functional Testing
- **Core Functionality**: Does the feature work as specified?
- **Happy Path**: Test the main user flow
- **Edge Cases**: Test boundary conditions and unusual inputs
- **Error Handling**: Test error scenarios and validation

### 2. UI/UX Testing
- **Visual Correctness**: Does it look as intended?
- **Interactions**: Do all buttons, clicks, and inputs work?
- **Feedback**: Is there appropriate user feedback for actions?
- **Loading States**: Are loading states displayed when needed?
- **Error Messages**: Are error messages clear and helpful?

### 3. Responsive Design Testing
Test on multiple viewport sizes:
- **Mobile**: 320px - 480px (iPhone SE, etc.)
- **Tablet**: 768px - 1024px (iPad, etc.)
- **Desktop**: 1280px+ (laptop, desktop monitors)

Verify:
- [ ] No horizontal scrolling
- [ ] Text is readable
- [ ] Touch targets are adequate (min 44x44px)
- [ ] Layout doesn't break
- [ ] Images scale properly

### 4. Cross-Browser Testing (if applicable)
- Chrome/Edge (Chromium)
- Firefox
- Safari (especially for iOS)

### 5. Performance Testing
- **Load Time**: Page loads quickly
- **Interactions**: Smooth, no lag
- **Console**: No errors or warnings
- **Memory**: No memory leaks (especially with useEffect cleanup)

### 6. Accessibility Testing
- **Keyboard Navigation**: Can navigate with Tab/Enter
- **Screen Reader**: Semantic HTML used
- **Color Contrast**: Text is readable
- **Focus States**: Clear focus indicators

### 7. Type Safety Testing
- Run `npm run build` to check for TypeScript errors
- Verify no `any` types are used inappropriately
- Check that all props are properly typed

### 8. Integration Testing
- Does this feature work with existing features?
- Are there any conflicts or regressions?
- Does game flow work end-to-end?

## Testing Checklist Template

### Feature: [Feature Name]
Issue: #[number]

#### Functional Tests
- [ ] Core functionality works
- [ ] Happy path tested
- [ ] Edge cases handled
- [ ] Error handling works
- [ ] Validation is correct

#### UI/UX Tests
- [ ] Visual design matches requirements
- [ ] All interactions work
- [ ] User feedback is clear
- [ ] Loading states present
- [ ] Error messages helpful

#### Responsive Tests
- [ ] Mobile (320px-480px) ✓
- [ ] Tablet (768px-1024px) ✓
- [ ] Desktop (1280px+) ✓
- [ ] No layout breaks
- [ ] Touch-friendly

#### Technical Tests
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds (`npm run build`)
- [ ] No performance issues
- [ ] No memory leaks

#### Integration Tests
- [ ] Works with existing features
- [ ] No regressions
- [ ] End-to-end flow works

## Test Execution
1. Start dev server: `npm run dev`
2. Open browser to http://localhost:3000
3. Test each scenario systematically
4. Document any issues found
5. Fix issues and re-test
6. Mark feature as tested only when all checks pass

## Success Criteria
- All checklist items passed ✓
- No critical bugs found
- Feature ready for production
- Can confidently close the issue
