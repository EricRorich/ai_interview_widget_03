# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| < 1.9   | :x:                |

## Security Features

### Current Security Implementations

1. **Input Sanitization**
   - All user inputs are sanitized before processing
   - API keys are validated for correct format
   - HTML/CSS inputs are escaped before output

2. **Authentication & Authorization**
   - WordPress nonce verification on all AJAX requests
   - User capability checks (`manage_options`) for admin functions
   - Session validation for sensitive operations

3. **API Key Protection**
   - API keys are validated on input
   - Keys are stored using WordPress options API
   - Keys are never exposed in frontend JavaScript

4. **AJAX Security**
   - All AJAX endpoints use nonce verification
   - User permissions checked before processing
   - Rate limiting recommended for production

### Security Best Practices

#### For Users

1. **API Key Management**
   - Never share your API keys publicly
   - Rotate API keys regularly
   - Use environment-specific keys
   - Monitor API usage for anomalies

2. **WordPress Security**
   - Keep WordPress core updated
   - Use strong admin passwords
   - Enable two-factor authentication
   - Regularly backup your site

3. **Plugin Configuration**
   - Only enable features you need
   - Review plugin settings regularly
   - Monitor debug logs for suspicious activity
   - Disable debug mode in production

#### For Developers

1. **Code Review**
   - Review all user input handling
   - Verify nonce checks on AJAX handlers
   - Ensure proper escaping of output
   - Test for XSS vulnerabilities

2. **API Integration**
   - Use HTTPS for all API calls
   - Implement proper error handling
   - Don't log sensitive data
   - Use secure authentication methods

3. **Database Operations**
   - Use prepared statements
   - Sanitize inputs before queries
   - Validate data types
   - Implement transaction safety

## Reporting a Vulnerability

### How to Report

If you discover a security vulnerability, please report it by:

1. **Email**: Send details to the repository owner via GitHub
2. **GitHub Security Advisory**: Use the "Security" tab in the repository to report privately
3. **Do NOT** create a public GitHub issue
4. **Do NOT** disclose publicly until patch is released

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Suggested fix (if available)
- Your contact information

### Response Timeline

- **24-48 hours**: Initial response acknowledging receipt
- **1 week**: Assessment and severity classification
- **2-4 weeks**: Patch development and testing
- **Coordinated disclosure**: After patch is released

### Disclosure Policy

- We follow responsible disclosure practices
- Security researchers will be credited (if desired)
- Fixes will be released as soon as safely possible
- Users will be notified of critical vulnerabilities

## Security Checklist for Production

- [ ] Debug mode disabled (`WP_DEBUG = false`)
- [ ] Strong, unique API keys configured
- [ ] WordPress core and plugins updated
- [ ] SSL/TLS enabled (HTTPS)
- [ ] Admin access restricted to trusted IPs (optional)
- [ ] Regular backups configured
- [ ] Error logging monitored
- [ ] File permissions properly set
- [ ] Database credentials secured
- [ ] Security headers configured

## Security Headers Recommendation

Add these headers to your WordPress installation:

```apache
# .htaccess or Apache configuration
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Content-Security-Policy "default-src 'self'"
```

```nginx
# Nginx configuration
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

## Known Security Considerations

### API Rate Limiting

The plugin does not implement rate limiting by default. For production:
- Implement server-level rate limiting
- Monitor API usage patterns
- Set up alerts for unusual activity

### Client-Side Storage

Some data is cached in browser localStorage:
- No sensitive data is stored
- Cache expires after 24 hours
- Can be manually cleared by user

### Third-Party Services

The plugin integrates with:
- OpenAI API
- ElevenLabs API
- Anthropic API
- Google Gemini API
- Azure OpenAI

Review their security policies and terms of service.

## Updates and Patching

- Security updates are released as soon as available
- Users are notified through WordPress admin
- Critical updates should be applied immediately
- Test updates in staging before production

## Contact

- **Security concerns**: Use GitHub Security Advisory or contact repository owner
- **General support**: Create a GitHub issue
- **Documentation**: See README.md and related files

---

Last updated: 2025-01-27
Version: 1.9.5
