# Live Preview Feature - Implementation Documentation

## Overview
This document describes the live preview feature implementation for the Enhanced Widget Customizer in the AI Interview Widget plugin.

## What Was Implemented

### Live Preview Infrastructure
The live preview feature allows users to see changes to Visual Style Settings in real-time before saving. All style changes are reflected instantly in the "Live Widget Preview" container.

### Files Created

1. **admin/js/preview-handler.js**
   - Core preview handler object initialization
   - Provides base functionality for preview updates
   - Manages CSS variable updates and style changes

2. **admin/js/aiw-live-preview.js**
   - Main live preview script
   - Event listeners for all Visual Style Settings controls
   - Real-time update functions for:
     - Container styles (background, borders, padding, radius)
     - Canvas styles (background, shadows, border radius)
     - Play button styles (size, colors, gradients, designs)
     - Visualization bars (width, spacing, color, glow)
     - Text/headline styles (font size, color, font family)
   - Responsive preview toggle (desktop/mobile)

3. **admin/js/customizer-partial-fix.js**
   - DOM initialization helper
   - Ensures preview container is properly initialized

4. **admin/css/aiw-live-preview.css**
   - Styles for preview container and elements
   - Transition effects for smooth updates
   - Responsive preview styles

5. **admin/partials/customizer-preview.php**
   - Preview partial template
   - Displays widget preview with current settings
   - Includes play button, canvas/visualization, and headline

6. **admin/js/aiw-debug-window.js** & **admin/css/aiw-debug-window.css**
   - Placeholder files for optional debug functionality

## How It Works

### Integration
The files integrate with the existing WordPress enqueue system that was already referencing them in `ai_interview_widget.php` (lines 224-314). When the Enhanced Widget Customizer page is accessed, these scripts are automatically loaded.

### Live Preview Flow
1. User changes a Visual Style Setting control (color picker, slider, dropdown, etc.)
2. Event listener detects the change
3. Update function applies the new style to the preview instantly
4. Preview reflects the change without requiring a save
5. When user clicks "Save Styles", settings are persisted to database

### Responsive Preview
The preview includes desktop/mobile toggle buttons that allow users to see how the widget will look on different screen sizes.

## Settings Supported

### Container Settings
- Background Type (Solid/Gradient)
- Background Color
- Gradient Start Color
- Gradient End Color
- Border Radius (0-50px)
- Padding (10-50px)

### Canvas Settings
- Background Color
- Border Radius (0-50px)
- Shadow Color
- Shadow Intensity (0-100px)

### Play Button Settings
- Design Type (Classic/Minimalist/Futuristic)
- Size (50-200px)
- Primary Color
- Gradient Start/End (Classic design)
- Icon Color
- Border Width
- Border Color

### Visualization Bar Settings
- Primary Color
- Bar Width (1-8px)
- Bar Spacing (1-10px)
- Glow Intensity (0-20px)

### Text/Headline Settings
- Headline Text
- Font Size
- Color
- Font Family

## Testing the Feature

### Prerequisites
- WordPress installation with AI Interview Widget plugin activated
- Access to WordPress admin area

### Testing Steps

1. **Access the Customizer**
   - Navigate to WordPress Admin → AI Interview Widget → Enhanced Widget Customizer

2. **Verify Preview Display**
   - Confirm the "Live Widget Preview" container displays a widget preview
   - Check that the preview shows: headline, play button, and visualization bars

3. **Test Container Styles**
   - Change Container Background Type between Solid and Gradient
   - Adjust Border Radius slider and observe real-time updates
   - Modify Padding slider and see instant changes

4. **Test Canvas Styles**
   - Change Canvas Background Color
   - Adjust Canvas Shadow Intensity
   - Change Canvas Shadow Color

5. **Test Play Button Styles**
   - Change Button Size slider (should update button size instantly)
   - Switch Button Design types (Classic/Minimalist/Futuristic)
   - Modify button colors and see immediate updates

6. **Test Visualization Bars**
   - Adjust Bar Width slider
   - Change Bar Spacing slider
   - Modify Primary Color
   - Adjust Glow Intensity

7. **Test Responsive Preview**
   - Click Desktop button (preview should be full width)
   - Click Mobile button (preview should be 375px max-width)

8. **Verify Settings Persistence**
   - Make changes to various settings
   - Click "Save Styles" button
   - Refresh the page
   - Confirm saved settings are preserved

## Benefits

1. **Improved User Experience**: Users can see changes immediately without saving
2. **Design Confidence**: Users know exactly how the widget will look before applying changes
3. **Time Savings**: No need to save and refresh to see results
4. **Reduced Errors**: Visual feedback prevents unwanted style changes
5. **Responsive Design**: Desktop/Mobile preview ensures widget works on all devices

## Technical Details

### WordPress Integration
- Uses WordPress Color Picker (wp-color-picker)
- Follows WordPress coding standards
- Uses WordPress AJAX patterns
- Compatible with WordPress admin UI

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard CSS transitions and transforms
- No experimental features used

### Performance
- Minimal overhead (event listeners only)
- Debounced updates for smooth performance
- CSS transitions for hardware acceleration
- No AJAX calls for preview (client-side only)

## Future Enhancements

Potential areas for expansion:
- Add more visualization themes
- Support for custom CSS injection
- Preview of chat interface styles
- Animation speed preview
- Export/Import style presets with preview

## Troubleshooting

### Preview Not Showing
- Check that `admin/partials/customizer-preview.php` exists
- Verify JavaScript files are loaded (check browser console)
- Ensure no JavaScript errors in console

### Changes Not Updating Live
- Verify event listeners are attached (check console logs)
- Ensure color pickers are initialized
- Check that selectors match preview elements

### Responsive Toggle Not Working
- Verify toggle buttons are present
- Check that max-width CSS is applied
- Ensure JavaScript is not throwing errors

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all admin files are present
3. Ensure WordPress and plugin are up to date
4. Check compatibility with other plugins

## Credits

- Version: 1.0.0
- Since: 1.9.6
- WordPress Plugin: AI Interview Widget
- Author: Eric Rorich
