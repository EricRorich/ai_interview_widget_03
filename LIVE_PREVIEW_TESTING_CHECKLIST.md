# Live Preview Feature - Testing Checklist

## Pre-Test Setup
- [ ] WordPress installation is running
- [ ] AI Interview Widget plugin is activated
- [ ] User has admin access
- [ ] Browser developer tools are open (for debugging if needed)

## Access and Initial Display
- [ ] Navigate to WordPress Admin → AI Interview Widget → Enhanced Widget Customizer
- [ ] Verify "Live Widget Preview" container is visible on the right side
- [ ] Confirm preview shows:
  - [ ] Headline text ("Ask Eric" by default)
  - [ ] Play button (circular, with play icon)
  - [ ] Visualization bars (12 animated bars)
  - [ ] Preview info text at bottom

## Container Style Updates

### Background Type
- [ ] Change "Background Type" dropdown to "Solid Color"
  - [ ] Preview container background changes to solid color instantly
  - [ ] Gradient color controls hide
  - [ ] Solid color control appears
- [ ] Change "Background Type" back to "Gradient"
  - [ ] Preview container shows gradient instantly
  - [ ] Solid color control hides
  - [ ] Gradient controls appear

### Background Colors
- [ ] Click "Background Color" color picker (when Solid is selected)
  - [ ] Color picker opens
  - [ ] Change color to red (#ff0000)
  - [ ] Preview background changes to red instantly
- [ ] Switch to Gradient and test "Gradient Start" color picker
  - [ ] Change gradient start color
  - [ ] Preview updates gradient instantly
- [ ] Test "Gradient End" color picker
  - [ ] Change gradient end color
  - [ ] Preview shows new gradient instantly

### Border Radius
- [ ] Move "Border Radius" slider from 15px to 0px
  - [ ] Value display updates: "0px"
  - [ ] Preview container corners become square instantly
- [ ] Move slider to 50px
  - [ ] Value display updates: "50px"
  - [ ] Preview container becomes very rounded instantly
- [ ] Click "Reset" button
  - [ ] Slider returns to 15px
  - [ ] Preview updates to default border radius

### Padding
- [ ] Move "Padding" slider from 30px to 10px
  - [ ] Value display updates: "10px"
  - [ ] Preview container padding reduces instantly
- [ ] Move slider to 50px
  - [ ] Value display updates: "50px"
  - [ ] Preview container padding increases instantly
- [ ] Click "Reset" button
  - [ ] Slider returns to 30px
  - [ ] Preview updates to default padding

## Canvas Style Updates

### Canvas Background
- [ ] Change "Canvas Background Color" using color picker
  - [ ] Canvas (visualization area) background changes instantly
  - [ ] Bars remain visible

### Canvas Border Radius
- [ ] Move "Canvas Border Radius" slider
  - [ ] Value display updates
  - [ ] Canvas corners update instantly

### Canvas Shadow
- [ ] Change "Canvas Shadow Color" to bright blue (#0000ff)
  - [ ] Canvas shadow/glow changes to blue instantly
- [ ] Move "Canvas Shadow Intensity" slider to 0px
  - [ ] Shadow disappears instantly
- [ ] Move slider to 100px
  - [ ] Strong shadow/glow appears instantly
- [ ] Reset intensity to default (30px)
  - [ ] Shadow returns to moderate level

## Play Button Style Updates

### Button Size
- [ ] Move "Button Size" slider from 100px to 50px
  - [ ] Value display updates: "50px"
  - [ ] Play button shrinks instantly
  - [ ] Icon size adjusts proportionally
- [ ] Move slider to 200px
  - [ ] Play button grows to maximum size instantly
  - [ ] Icon scales accordingly
- [ ] Reset to 100px
  - [ ] Button returns to default size

### Button Design
- [ ] Change "Button Design" dropdown to "Minimalist"
  - [ ] Gradient controls hide
  - [ ] Button style changes to solid color
  - [ ] Preview updates instantly
- [ ] Change to "Futuristic"
  - [ ] Neon border controls appear
  - [ ] Button style changes
  - [ ] Preview updates instantly
- [ ] Change back to "Classic"
  - [ ] Gradient controls appear
  - [ ] Button shows gradient style
  - [ ] Preview updates instantly

### Button Colors
- [ ] Test "Primary Color" (with Minimalist or Classic)
  - [ ] Color picker opens
  - [ ] Change color
  - [ ] Button background updates instantly
- [ ] Test "Gradient Start" (with Classic)
  - [ ] Change color
  - [ ] Button gradient updates instantly
- [ ] Test "Gradient End" (with Classic)
  - [ ] Change color
  - [ ] Button gradient updates instantly
- [ ] Test "Icon Color"
  - [ ] Change color
  - [ ] Play icon color updates instantly

### Button Border
- [ ] Test "Border Color" (with Futuristic design)
  - [ ] Change color
  - [ ] Border color updates instantly
- [ ] Move "Border Width" slider (if available)
  - [ ] Border thickness changes instantly

## Visualization Bar Updates

### Bar Colors
- [ ] Change "Primary Color" in Visualizer section
  - [ ] All visualization bars change color instantly
  - [ ] Bar glow color updates (if glow enabled)

### Bar Width
- [ ] Move "Bar Width" slider from 2px to 1px
  - [ ] Bars become thinner instantly
- [ ] Move slider to 8px
  - [ ] Bars become thicker instantly
- [ ] Reset to default
  - [ ] Bars return to normal width

### Bar Spacing
- [ ] Move "Bar Spacing" slider from 3px to 1px
  - [ ] Gap between bars reduces instantly
- [ ] Move slider to 10px
  - [ ] Gap between bars increases instantly
- [ ] Reset to default
  - [ ] Spacing returns to normal

### Glow Intensity
- [ ] Move "Glow Intensity" slider to 0px
  - [ ] Bar glow disappears instantly
- [ ] Move slider to 20px
  - [ ] Strong glow appears around bars
- [ ] Test mid-range values (5px, 10px, 15px)
  - [ ] Glow intensity adjusts smoothly

## Text/Headline Updates

### Headline Font Size
- [ ] Move "Headline Font Size" slider
  - [ ] Value display updates
  - [ ] Headline text size changes instantly

### Headline Color
- [ ] Change "Headline Color" using color picker
  - [ ] Headline text color changes instantly

### Headline Font Family
- [ ] Change "Headline Font Family" dropdown
  - [ ] Headline font changes instantly (if different from inherit)

## Responsive Preview

### Desktop View
- [ ] Click "Desktop" button
  - [ ] Button becomes highlighted/active
  - [ ] Preview shows full-width widget
  - [ ] All elements are visible

### Mobile View
- [ ] Click "Mobile" button
  - [ ] Button becomes highlighted/active
  - [ ] Preview width constrains to 375px
  - [ ] Widget displays in mobile layout
  - [ ] All elements remain visible
- [ ] Switch back to Desktop
  - [ ] Preview returns to full-width

## Settings Persistence

### Save Without Refresh
- [ ] Make several style changes
- [ ] Verify all changes are visible in preview
- [ ] Click "Save Styles" button
- [ ] Success message appears
- [ ] Changes remain in preview

### Reload Test
- [ ] Make several style changes
- [ ] Click "Save Styles"
- [ ] Refresh the browser page
- [ ] Verify all saved changes are still applied in preview
- [ ] Verify all control values match saved settings

### Cancel/Reset Test
- [ ] Make some style changes (don't save)
- [ ] Refresh the page
- [ ] Verify preview shows previously saved settings (changes were not persisted)

## Cross-Browser Testing
- [ ] Chrome/Chromium
  - [ ] All features work
  - [ ] No console errors
- [ ] Firefox
  - [ ] All features work
  - [ ] No console errors
- [ ] Safari (if available)
  - [ ] All features work
  - [ ] No console errors
- [ ] Edge
  - [ ] All features work
  - [ ] No console errors

## Performance Testing
- [ ] Rapidly move multiple sliders
  - [ ] Preview updates smoothly
  - [ ] No lag or freezing
- [ ] Rapidly change multiple colors
  - [ ] Preview updates without delay
  - [ ] Color picker responds quickly
- [ ] Make many changes in quick succession
  - [ ] Browser remains responsive
  - [ ] No memory leaks (check Task Manager)

## Error Handling
- [ ] Check browser console for errors
  - [ ] No JavaScript errors
  - [ ] No CSS errors
  - [ ] No 404 errors for missing files
- [ ] Verify all scripts load correctly
  - [ ] preview-handler.js loads
  - [ ] aiw-live-preview.js loads
  - [ ] customizer-partial-fix.js loads
  - [ ] All CSS files load

## Integration Testing
- [ ] Test with other tabs (Content & Text, Audio Files)
  - [ ] Switching tabs doesn't break preview
  - [ ] Preview persists across tab changes
- [ ] Test with preset system
  - [ ] Load preset
  - [ ] Preview updates to preset styles
- [ ] Test reset buttons
  - [ ] Individual setting reset works
  - [ ] Preview updates when reset

## Final Verification
- [ ] All Visual Style Settings update preview in real-time
- [ ] No settings are saved until user clicks save button
- [ ] Preview works on both desktop and mobile views
- [ ] UI is clear and separated from preview area
- [ ] Changes are smooth and immediate
- [ ] Code follows WordPress best practices

## Notes
_Use this section to record any issues found or observations during testing_

---

**Test Date:** _________________
**Tester Name:** _________________
**Browser/Version:** _________________
**WordPress Version:** _________________
**Plugin Version:** _________________

**Overall Result:** 
- [ ] Pass - All tests successful
- [ ] Pass with Minor Issues - Document below
- [ ] Fail - Critical issues found

**Issues Found:**
