# Code Organization Improvement Plan

This document outlines recommendations for improving the code organization of the AI Interview Widget plugin.

## Current State

The plugin is currently organized as a single monolithic PHP file (`ai_interview_widget.php`) with:
- **11,000+ lines of code** in a single file
- Multiple responsibilities (UI, AJAX, settings, rendering)
- Helper classes in `includes/` directory
- Admin assets in `admin/` directory

## Recommended Structure

### Phase 1: Modular PHP Architecture

Reorganize the main PHP file into logical components:

```
ai-interview-widget/
├── ai-interview-widget.php          # Main plugin file (bootstrapper only)
├── includes/
│   ├── class-aiw-plugin.php         # Core plugin class
│   ├── class-aiw-activator.php      # Activation hooks
│   ├── class-aiw-deactivator.php    # Deactivation hooks
│   ├── class-aiw-security-helper.php # Security utilities (✓ Added)
│   ├── class-aiw-settings.php       # Settings management
│   ├── class-aiw-ajax-handler.php   # AJAX endpoint handlers
│   ├── class-aiw-customizer.php     # WordPress Customizer integration
│   ├── class-aiw-shortcode.php      # Shortcode rendering
│   ├── class-aiw-assets.php         # Asset enqueuing
│   ├── class-aiw-admin.php          # Admin interface
│   └── providers/
│       ├── class-aiw-openai-provider.php    # OpenAI API integration
│       ├── class-aiw-anthropic-provider.php # Anthropic API integration
│       ├── class-aiw-elevenlabs-provider.php # ElevenLabs API integration
│       └── class-aiw-provider-interface.php  # Provider interface
├── admin/
│   ├── css/                         # Admin stylesheets
│   ├── js/                          # Admin scripts
│   └── partials/                    # Admin view templates
├── public/
│   ├── css/                         # Frontend stylesheets
│   ├── js/                          # Frontend scripts
│   └── audio/                       # Audio files
└── templates/
    └── widget/                      # Widget templates
```

### Benefits of Modular Architecture

1. **Maintainability**: Easier to find and modify specific functionality
2. **Testability**: Individual classes can be unit tested
3. **Readability**: Smaller, focused files are easier to understand
4. **Collaboration**: Multiple developers can work simultaneously
5. **Reusability**: Components can be reused across the plugin

## Implementation Steps

### Step 1: Extract Settings Management

Create `includes/class-aiw-settings.php`:

```php
<?php
class AIW_Settings {
    public function register_settings() {
        // Move register_settings() method here
    }
    
    public function sanitize_settings($input) {
        // Move sanitization logic here
    }
    
    public function get_option($key, $default = '') {
        // Centralized option retrieval
    }
}
```

### Step 2: Extract AJAX Handlers

Create `includes/class-aiw-ajax-handler.php`:

```php
<?php
class AIW_Ajax_Handler {
    public function __construct() {
        $this->register_ajax_hooks();
    }
    
    private function register_ajax_hooks() {
        add_action('wp_ajax_ai_interview_chat', array($this, 'handle_chat'));
        add_action('wp_ajax_nopriv_ai_interview_chat', array($this, 'handle_chat'));
        // ... other AJAX hooks
    }
    
    public function handle_chat() {
        // Move handle_ai_chat() method here
    }
}
```

### Step 3: Extract API Providers

Create provider interface and implementations:

```php
<?php
interface AIW_Provider_Interface {
    public function send_message($message, $context);
    public function validate_api_key($api_key);
    public function get_models();
}

class AIW_OpenAI_Provider implements AIW_Provider_Interface {
    public function send_message($message, $context) {
        // OpenAI-specific implementation
    }
}
```

### Step 4: Refactor Main Plugin File

Reduce `ai-interview-widget.php` to:

```php
<?php
/**
 * Plugin Name: AI Interview Widget
 * Version: 1.9.6
 */

// Require dependencies
require_once plugin_dir_path(__FILE__) . 'includes/class-aiw-plugin.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-aiw-activator.php';
// ... other includes

// Initialize plugin
function run_aiw_plugin() {
    $plugin = new AIW_Plugin();
    $plugin->run();
}
run_aiw_plugin();

// Activation/deactivation hooks
register_activation_hook(__FILE__, array('AIW_Activator', 'activate'));
register_deactivation_hook(__FILE__, array('AIW_Deactivator', 'deactivate'));
```

## JavaScript Organization

### Current State
- Monolithic `ai-interview-widget.js` (3,400+ lines)
- Helper scripts scattered across admin folder

### Recommended Structure

```
assets/
├── src/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── audio-player.js      # Audio playback logic
│   │   │   ├── voice-handler.js     # Voice recognition/synthesis
│   │   │   ├── chat-interface.js    # Chat UI logic
│   │   │   ├── visualizer.js        # Audio visualization
│   │   │   └── geolocation.js       # Geolocation detection
│   │   └── main.js                  # Entry point, imports modules
│   └── css/
│       ├── components/
│       │   ├── chat.css             # Chat interface styles
│       │   ├── audio-player.css     # Audio player styles
│       │   └── visualizer.css       # Visualizer styles
│       └── main.css                 # Main stylesheet
└── dist/                            # Built/minified assets
```

### Build Process Suggestion

Use a modern build tool (Webpack, Rollup, or Vite):

```json
{
  "scripts": {
    "dev": "webpack --mode development --watch",
    "build": "webpack --mode production",
    "lint": "eslint assets/src/js"
  }
}
```

## CSS Organization

### Apply BEM Methodology

```css
/* Block */
.aiw-widget { }

/* Element */
.aiw-widget__chat { }
.aiw-widget__input { }
.aiw-widget__button { }

/* Modifier */
.aiw-widget--dark-mode { }
.aiw-widget__button--primary { }
```

### Use CSS Variables

```css
:root {
    --aiw-primary-color: #00cfff;
    --aiw-secondary-color: #ff00cf;
    --aiw-text-color: #ffffff;
    --aiw-bg-color: rgba(0, 0, 0, 0.8);
}
```

## Testing Strategy

### Unit Tests (PHP)

```php
<?php
class AIW_Settings_Test extends WP_UnitTestCase {
    public function test_sanitize_api_key() {
        $settings = new AIW_Settings();
        $result = $settings->sanitize_api_key('sk-test123');
        $this->assertEquals('sk-test123', $result);
    }
}
```

### Unit Tests (JavaScript)

```javascript
import { AudioPlayer } from './modules/audio-player';

describe('AudioPlayer', () => {
    it('should load audio source', () => {
        const player = new AudioPlayer();
        expect(player.loadSource('test.mp3')).toBe(true);
    });
});
```

## Performance Optimizations

### 1. Lazy Loading

```php
// Load components only when needed
if (is_admin()) {
    require_once 'includes/class-aiw-admin.php';
} else {
    require_once 'includes/class-aiw-shortcode.php';
}
```

### 2. Asset Minification

- Minify CSS and JavaScript for production
- Use asset versioning for cache busting
- Combine files where appropriate

### 3. Database Query Optimization

```php
// Use transients for cached data
public function get_api_settings() {
    $transient_key = 'aiw_api_settings';
    $settings = get_transient($transient_key);
    
    if (false === $settings) {
        $settings = $this->fetch_api_settings();
        set_transient($transient_key, $settings, HOUR_IN_SECONDS);
    }
    
    return $settings;
}
```

## Implementation Timeline

### Week 1-2: Planning & Setup
- [ ] Review current codebase
- [ ] Create detailed migration plan
- [ ] Set up testing environment
- [ ] Create backup branches

### Week 3-4: Phase 1 - Core Classes
- [ ] Extract settings management
- [ ] Extract AJAX handlers
- [ ] Create plugin core class
- [ ] Update main plugin file

### Week 5-6: Phase 2 - API Providers
- [ ] Create provider interface
- [ ] Extract OpenAI integration
- [ ] Extract other API providers
- [ ] Add provider switching logic

### Week 7-8: Phase 3 - Assets
- [ ] Restructure JavaScript modules
- [ ] Organize CSS files
- [ ] Set up build process
- [ ] Implement minification

### Week 9-10: Phase 4 - Testing & Documentation
- [ ] Write unit tests
- [ ] Update documentation
- [ ] Performance testing
- [ ] Code review

## Migration Checklist

- [ ] Create new directory structure
- [ ] Extract classes one by one
- [ ] Update require statements
- [ ] Test each component
- [ ] Update tests
- [ ] Update documentation
- [ ] Performance benchmarking
- [ ] User acceptance testing

## Backward Compatibility

Ensure backward compatibility during refactoring:

```php
// Provide deprecated function wrappers
function aiw_legacy_function() {
    _deprecated_function(__FUNCTION__, '2.0.0', 'AIW_Plugin::new_method()');
    return AIW_Plugin::get_instance()->new_method();
}
```

## Resources

- [WordPress Plugin Boilerplate](https://github.com/DevinVinson/WordPress-Plugin-Boilerplate)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [PHP-FIG PSR Standards](https://www.php-fig.org/psr/)
- [JavaScript Module Pattern](https://www.patterns.dev/posts/module-pattern/)

## Benefits Summary

### Immediate Benefits
- Easier to navigate codebase
- Faster development cycles
- Reduced merge conflicts
- Better code isolation

### Long-term Benefits
- Scalable architecture
- Easier to add features
- Better performance
- Higher code quality
- Easier onboarding for new developers

---

**Note:** This is a recommended roadmap. Implementation can be done incrementally without breaking existing functionality.
