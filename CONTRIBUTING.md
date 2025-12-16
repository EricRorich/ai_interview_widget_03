# Contributing to AI Interview Widget

Thank you for your interest in contributing to the AI Interview Widget plugin!

## Getting Started

### Prerequisites
- PHP 7.4 or higher
- WordPress 5.0 or higher
- Node.js 18.x or higher (for frontend development)
- Composer (for PHP dependencies)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/EricRorich/ai_interview_widget_03.git
   cd ai_interview_widget_03
   ```

2. **Install dependencies**
   ```bash
   # Install WordPress in your local environment
   # Copy plugin to wp-content/plugins/ai-interview-widget
   ```

3. **Configure WordPress**
   - Activate the plugin in WordPress admin
   - Configure API keys in the plugin settings

## Code Standards

### PHP
- Follow WordPress Coding Standards
- Use proper sanitization and validation for all inputs
- Add PHPDoc comments for all public methods
- Keep functions focused and under 50 lines when possible

### JavaScript
- Use modern ES6+ syntax
- Add JSDoc comments for complex functions
- Follow consistent naming conventions
- Test in multiple browsers

### CSS
- Use BEM naming methodology
- Keep selectors specific but not overly nested
- Comment complex styling decisions

## Testing

Before submitting a pull request:

1. **Test manually**
   - Test in a clean WordPress installation
   - Verify all features work as expected
   - Check console for JavaScript errors

2. **Check for errors**
   - Enable WP_DEBUG in wp-config.php
   - Review error logs
   - Test with different PHP versions

## Submitting Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, descriptive commit messages
   - Keep commits focused and atomic
   - Update documentation as needed

3. **Test thoroughly**
   - Verify no existing functionality is broken
   - Test edge cases
   - Check browser compatibility

4. **Submit a pull request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## Reporting Issues

When reporting bugs, please include:
- WordPress version
- PHP version
- Plugin version
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment details
- Any error messages from console or logs

## Security

If you discover a security vulnerability, please email the maintainer directly instead of using the issue tracker.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
