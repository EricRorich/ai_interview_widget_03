# Changelog

All notable changes to the AI Interview Widget project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `.gitignore` file for better repository management
- `SECURITY.md` with comprehensive security policy
- `CONTRIBUTING.md` with contribution guidelines
- `QUICKSTART.md` for easier onboarding
- `CHANGELOG.md` for version tracking
- Security helper class (`class-aiw-security-helper.php`) with:
  - Enhanced API key validation
  - Rate limiting helpers
  - Input sanitization utilities
  - File upload validation

### Changed
- Improved repository structure
- Enhanced documentation organization

### Removed
- Backup files (`ai_interview_widget.php.backup`)
- Unnecessary archive files (`admin.zip`)

### Security
- Added comprehensive API key format validation
- Improved input sanitization patterns
- Added malicious pattern detection
- Enhanced nonce verification with logging

## [1.9.5] - 2025-01-27

### Changed
- Removed deprecated customizer controls for voice buttons
- Removed deprecated play button design controls
- Removed canvas shadow intensity control from UI
- Maintained backward compatibility for existing configurations

### Fixed
- Canvas shadow color setting unification
- Legacy setting migration support

## [1.9.4] - Previous Release

### Added
- Canvas shadow color setting unification
- Backward compatibility for legacy settings

### Fixed
- Deprecation notices in debug mode

## [1.9.3] - Previous Release

### Added
- Translation Debug Panel
- Enhanced debugging system
- Debug console with export functionality

### Improved
- Error logging and diagnostics
- Translation debugging capabilities

## [1.9.0 - 1.9.2] - Previous Releases

### Added
- WordPress Customizer integration
- Live preview functionality
- Enhanced visual customization
- Real-time preview system
- Individual and section reset buttons

### Improved
- User experience
- Admin interface
- Settings management

## [1.8.8 - 1.8.9] - Previous Releases

### Added
- Enhanced preview with full widget display
- Better error handling

### Improved
- User experience
- Performance optimizations

## [1.8.6 - 1.8.7] - Previous Releases

### Added
- Complete visual customizer
- Real-time preview system
- Audio file upload capability
- Content management features

## [1.8.1 - 1.8.5] - Foundation & Core Features

### Added
- Basic OpenAI chat integration
- Initial voice capabilities
- Simple customization options
- Admin interface setup

---

## Version History Summary

### Current Features (v1.9.5)

#### Core Functionality
- AI chat integration with GPT-4o-mini
- Multi-provider support (OpenAI, Anthropic, Gemini, Azure)
- Voice input (speech-to-text)
- Voice output (text-to-speech with ElevenLabs)
- Geolocation-based language detection
- Bilingual support (English/German)

#### Customization
- Complete visual customization via WordPress Customizer
- Play button design controls
- Color and gradient customization
- Animation settings
- Custom audio greeting uploads

#### Developer Features
- Comprehensive debugging system
- Translation debug panel
- Error logging and diagnostics
- AJAX-based administration
- WordPress Customizer integration

#### Security
- Nonce verification on all AJAX requests
- User capability checks
- Input sanitization
- API key validation

---

## Migration Guide

### From 1.9.4 to 1.9.5
No breaking changes. Deprecated controls removed from UI but existing settings preserved.

### From 1.8.x to 1.9.x
Major feature additions. Review new customizer options and test thoroughly.

---

## Planned Features

### Version 1.9.6+ (Future)
- [ ] Enhanced rate limiting
- [ ] Improved code modularity
- [ ] Additional language support
- [ ] Performance optimizations
- [ ] Unit test coverage

### Version 2.0.0 (Future Major Release)
- [ ] Complete architecture refactoring
- [ ] Modern build pipeline
- [ ] Composer dependencies
- [ ] PSR-4 autoloading
- [ ] REST API endpoints
- [ ] Advanced analytics

---

## Deprecation Notices

### Deprecated in 1.9.5
- Voice button customization controls (UI removed, functionality intact)
- Play button design controls (UI removed, functionality intact)
- Canvas shadow intensity control (UI removed, functionality intact)

These features will be completely removed in version 2.0.0.

---

## Support

- **Issues:** [GitHub Issues](https://github.com/EricRorich/ai_interview_widget_03/issues)
- **Documentation:** See README.md and related documentation files
- **Security:** See SECURITY.md for security policy

---

[Unreleased]: https://github.com/EricRorich/ai_interview_widget_03/compare/v1.9.5...HEAD
[1.9.5]: https://github.com/EricRorich/ai_interview_widget_03/releases/tag/v1.9.5
