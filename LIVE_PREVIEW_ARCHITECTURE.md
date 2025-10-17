# Live Preview Feature - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Enhanced Widget Customizer Page                       │
│                     (ai_interview_widget.php)                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        ┌───────────────────────┐       ┌──────────────────────┐
        │   Controls Panel      │       │  Live Preview Panel  │
        │   (Left Side)         │       │   (Right Side)       │
        └───────────────────────┘       └──────────────────────┘
                    │                               │
                    │                               │
        ┌───────────┴──────────┐       ┌───────────┴──────────┐
        │                      │       │                      │
        ▼                      ▼       ▼                      ▼
┌─────────────┐    ┌──────────────┐   ┌──────────┐   ┌──────────────┐
│   Visual    │    │   Content    │   │ Preview  │   │   Preview    │
│   Style     │    │   & Text     │   │ Handler  │   │   Partial    │
│   Settings  │    │   Settings   │   │  (JS)    │   │   (PHP)      │
└─────────────┘    └──────────────┘   └──────────┘   └──────────────┘
        │                                    │                │
        │                                    │                │
        └────────────────┬───────────────────┘                │
                         │                                    │
                         ▼                                    ▼
            ┌─────────────────────────┐         ┌──────────────────────┐
            │  Event Listeners        │         │  Widget Preview HTML │
            │  (aiw-live-preview.js)  │         │  - Headline          │
            └─────────────────────────┘         │  - Play Button       │
                         │                      │  - Visualization     │
                         │                      └──────────────────────┘
                         ▼
            ┌─────────────────────────┐
            │  Update Functions       │
            │  - updatePreview()      │
            │  - updateContainer()    │
            │  - updateCanvas()       │
            │  - updateButton()       │
            │  - updateVisualization()│
            └─────────────────────────┘
                         │
                         ▼
            ┌─────────────────────────┐
            │  DOM Manipulation       │
            │  - CSS Updates          │
            │  - Style Changes        │
            │  - Real-time Rendering  │
            └─────────────────────────┘
```

## File Structure

```
ai_interview_widget_03/
│
├── ai_interview_widget.php          # Main plugin file (enqueues scripts)
│
├── admin/                            # Admin functionality
│   ├── js/
│   │   ├── preview-handler.js       # Preview object initialization
│   │   ├── aiw-live-preview.js      # Main live preview logic
│   │   ├── customizer-partial-fix.js # DOM fixes
│   │   └── aiw-debug-window.js      # Debug utilities
│   │
│   ├── css/
│   │   ├── aiw-live-preview.css     # Preview styles
│   │   └── aiw-debug-window.css     # Debug styles
│   │
│   └── partials/
│       └── customizer-preview.php   # Preview template
│
├── LIVE_PREVIEW_IMPLEMENTATION.md   # Implementation docs
└── LIVE_PREVIEW_TESTING_CHECKLIST.md # Testing guide
```

## Data Flow

### Initialization Flow
```
1. User accesses Enhanced Widget Customizer
   ↓
2. WordPress enqueues preview scripts (ai_interview_widget.php:224-314)
   ↓
3. preview-handler.js loads and initializes preview object
   ↓
4. customizer-preview.php renders with current settings
   ↓
5. aiw-live-preview.js attaches event listeners to controls
   ↓
6. Responsive toggle buttons are added
   ↓
7. System ready for real-time updates
```

### User Interaction Flow
```
1. User changes a Visual Style Setting (e.g., moves slider)
   ↓
2. Event listener detects change (aiw-live-preview.js)
   ↓
3. Update function called (e.g., updateContainerStyles())
   ↓
4. Function reads new value from control
   ↓
5. Function updates preview DOM element styles
   ↓
6. Preview displays change instantly (CSS transition applies)
   ↓
7. User sees real-time feedback
   ↓
8. [Optional] User clicks "Save Styles" to persist changes
```

## Component Responsibilities

### preview-handler.js
**Purpose:** Core preview infrastructure
- Initialize preview object
- Provide helper methods for CSS variable updates
- Manage preview state
- Handle refresh events

### aiw-live-preview.js
**Purpose:** Real-time update logic
- Attach event listeners to all controls
- Implement update functions for each setting category
- Handle color picker changes
- Manage slider updates
- Coordinate responsive preview toggle

### customizer-partial-fix.js
**Purpose:** DOM initialization
- Ensure preview container exists
- Remove error messages
- Verify WordPress components loaded

### customizer-preview.php
**Purpose:** Preview template
- Render widget preview HTML
- Display current settings from database
- Show headline, button, and visualization
- Provide targets for JavaScript updates

### aiw-live-preview.css
**Purpose:** Preview styling
- Style preview container
- Add smooth transitions
- Handle responsive states
- Loading/error states

## Event Listeners

### Control Types Handled
```javascript
// Color Pickers (wp-color-picker)
$('.color-picker').on('change', updatePreview);
$(document).on('change', '.wp-color-picker', updatePreview);

// Range Sliders
$('input[type="range"]').on('input', updatePreview);

// Dropdowns
$('#container_bg_type').on('change', updateContainerStyles);
$('#play_button_design').on('change', updateButtonStyles);

// Text Inputs
$('#headline_font_family').on('change', updatePreview);
$('#canvas_bg_image').on('change', updateCanvasImage);

// Responsive Toggle
$('.responsive-btn').on('click', toggleResponsiveView);
```

## Update Functions

### updateContainerStyles()
- Background type (solid/gradient)
- Background colors
- Border radius
- Padding

### updateCanvasStyles()
- Background color
- Border radius
- Shadow color
- Shadow intensity

### updateButtonStyles()
- Size
- Design type
- Colors/gradients
- Icon color
- Border

### updateTextStyles()
- Font size
- Color
- Font family

### updateVisualizationBars()
- Bar width
- Bar spacing
- Primary color
- Glow intensity

## CSS Selectors Used

```css
/* Container */
.aiw-preview-container

/* Preview Widget */
.aiw-preview-widget

/* Elements */
.aiw-preview-headline
.aiw-preview-button, .preview-play-button
.aiw-preview-canvas, #previewSoundbar
.preview-viz-bar

/* Responsive */
#responsive-toggle
.responsive-btn
```

## WordPress Integration Points

### Script Enqueue (ai_interview_widget.php)
```php
// Line 224-314
if ($hook === 'ai-interview-widget_page_ai-interview-widget-customizer') {
    wp_enqueue_script('aiw-preview-handler-js', ...);
    wp_enqueue_script('aiw-live-preview-js', ...);
    wp_enqueue_script('customizer-partial-fix-js', ...);
    wp_enqueue_style('aiw-live-preview-css', ...);
    // ... localization with defaults
}
```

### Preview Container (ai_interview_widget.php)
```php
// Line 4614-4640
<div id="widget_preview_container">
    <?php 
    $partial_path = plugin_dir_path(__FILE__) . 'admin/partials/customizer-preview.php';
    if (file_exists($partial_path)) {
        include $partial_path;
    }
    ?>
</div>
```

## Performance Optimization

### Client-Side Only
- No AJAX calls for preview updates
- All updates happen in browser
- Fast response time

### CSS Transitions
- Hardware-accelerated transforms
- Smooth animations
- 0.3s transition time

### Debouncing
- Range sliders use 'input' event (fires while dragging)
- Updates apply immediately but smoothly
- No lag or stuttering

## Browser Compatibility

### Supported Browsers
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features Used
- Standard CSS3 (transitions, transforms)
- jQuery (included with WordPress)
- WordPress Color Picker (iris)
- Flexbox layout
- CSS custom properties (for future use)

## Security Considerations

### No Server-Side Changes
- Preview is read-only until save
- No settings modified without user action
- CSRF protection via WordPress nonces (for save)

### Input Sanitization
- PHP template uses esc_attr() for all outputs
- Color values validated by WordPress color picker
- Slider values constrained by min/max

### File Permissions
- All files in admin/ directory
- Protected by WordPress admin authentication
- No direct access outside WordPress

## Future Enhancements

### Possible Additions
1. Animation speed preview
2. Real-time chat interface preview
3. Voice button preview
4. Custom CSS injection preview
5. Export/import style configurations
6. Comparison view (before/after)
7. History/undo functionality
8. Preset preview before loading

## Troubleshooting Guide

### Issue: Preview Not Showing
**Check:**
- Browser console for errors
- Network tab for 404s
- WordPress admin page hook name
- File permissions on admin/ directory

### Issue: Updates Not Real-Time
**Check:**
- Event listeners attached (console.log)
- Color picker initialized
- Control IDs match JavaScript selectors
- No JavaScript errors blocking execution

### Issue: Responsive Toggle Broken
**Check:**
- Buttons added to DOM
- Click event listener attached
- CSS max-width applied
- jQuery available

## Summary

The live preview feature provides instant visual feedback for all Visual Style Settings in the Enhanced Widget Customizer. It uses client-side JavaScript to update preview DOM elements in real-time, with no server communication needed until the user saves. The implementation follows WordPress best practices and integrates seamlessly with the existing plugin architecture.
