# Testing the Geolocation Multi-Provider System

## Quick Test Guide

This guide helps you verify that the geolocation multi-provider system is working correctly.

## Prerequisites

- A WordPress site with the AI Interview Widget installed
- Access to browser developer tools (F12)
- Internet connection

## Test 1: Basic Functionality Test

### Steps:
1. Open your website with the AI Interview Widget
2. Open browser console (F12 → Console tab)
3. Enable debug mode:
   ```javascript
   window.AIWGeo.updateConfig({ debugMode: true });
   ```
4. Clear cache for fresh test:
   ```javascript
   window.AIWGeo.clearCache();
   ```
5. Test detection:
   ```javascript
   window.AIWGeo.getCountry().then(country => {
       console.log('✅ Detected country:', country);
   });
   ```

### Expected Result:
- Console should show provider attempts (ipapi.co → geojs.io → ip-api.com)
- Should detect your country code (e.g., "US", "DE", "GB")
- Should show which provider succeeded
- No 403 or CORS errors

## Test 2: Provider Fallback Test

### Steps:
1. Open Developer Tools → Network tab
2. Add a network request blocking rule:
   - Right-click on a request to `ipapi.co`
   - Select "Block request URL" or "Block request domain"
3. Clear cache:
   ```javascript
   window.AIWGeo.clearCache();
   ```
4. Test again:
   ```javascript
   window.AIWGeo.getCountry().then(country => {
       console.log('Country with fallback:', country);
   });
   ```

### Expected Result:
- First provider (ipapi.co) should fail
- System should automatically try geojs.io
- Should still detect country successfully
- Console should show "Falling back to next provider..."

## Test 3: German-Speaking Country Detection

### Test Cases:

| Your Country | Expected Language | Expected Audio |
|--------------|------------------|----------------|
| Germany (DE) | German (de) | greeting_de.mp3 |
| Austria (AT) | German (de) | greeting_de.mp3 |
| Switzerland (CH) | German (de) | greeting_de.mp3 |
| Liechtenstein (LI) | German (de) | greeting_de.mp3 |
| Luxembourg (LU) | German (de) | greeting_de.mp3 |
| USA (US) | English (en) | greeting_en.mp3 |
| UK (GB) | English (en) | greeting_en.mp3 |
| Any other | English (en) | greeting_en.mp3 |

### Using VPN to Test:
1. Connect to VPN in Germany
2. Clear browser cache and cookies
3. Reload the page
4. Widget should play German greeting (greeting_de.mp3)

## Test 4: Timezone Fallback Test

### Steps:
1. Block all geolocation providers:
   - Block `ipapi.co`
   - Block `geojs.io`
   - Block `ip-api.com`
2. Clear cache:
   ```javascript
   window.AIWGeo.clearCache();
   ```
3. Test detection:
   ```javascript
   window.AIWGeo.getCountry().then(country => {
       console.log('Country via timezone fallback:', country);
   });
   ```

### Expected Result:
- All network providers should fail
- System should use timezone-based detection
- Console should show "Attempting timezone-based country detection..."
- Should still detect a country (based on your timezone)

## Test 5: Cache Test

### Steps:
1. First visit:
   ```javascript
   window.AIWGeo.clearCache();
   window.AIWGeo.updateConfig({ debugMode: true });
   window.AIWGeo.getCountry().then(country => {
       console.log('First detection:', country);
   });
   ```
2. Second visit (refresh or call again):
   ```javascript
   window.AIWGeo.getCountry().then(country => {
       console.log('Cached detection:', country);
   });
   ```

### Expected Result:
- First call should make network request
- Second call should use cached value
- Console should show "Using cached country: XX"
- No network request on second call

## Test 6: Manual Provider Testing

Test each provider directly:

```javascript
// Test ipapi.co
fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(d => console.log('✅ ipapi.co:', d.country_code))
    .catch(e => console.log('❌ ipapi.co failed:', e.message));

// Test geojs.io  
fetch('https://get.geojs.io/v1/ip/country.json')
    .then(r => r.json())
    .then(d => console.log('✅ geojs.io:', d.country))
    .catch(e => console.log('❌ geojs.io failed:', e.message));

// Test ip-api.com
fetch('https://ip-api.com/json/?fields=status,countryCode')
    .then(r => r.json())
    .then(d => console.log('✅ ip-api.com:', d.countryCode))
    .catch(e => console.log('❌ ip-api.com failed:', e.message));
```

### Expected Result:
- At least one provider should succeed
- Should return your country code
- No 403 or CORS errors

## Troubleshooting

### Issue: All providers fail

**Possible Causes:**
- Firewall blocking geolocation services
- Network connectivity issues
- Ad blocker blocking requests

**Solution:**
1. Disable ad blocker temporarily
2. Check firewall settings
3. Try from different network
4. Verify timezone fallback works:
   ```javascript
   const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
   console.log('Timezone:', tz);
   ```

### Issue: Wrong country detected

**Possible Causes:**
- VPN or proxy active
- Cached stale data
- Provider returning incorrect data

**Solution:**
1. Clear cache: `window.AIWGeo.clearCache()`
2. Disable VPN/proxy
3. Check each provider individually (Test 6)
4. Verify timezone matches location

### Issue: 403 errors still appearing

**Possible Causes:**
- Primary providers failing, falling back to ip-api.com
- Rate limit exceeded on ip-api.com

**Solution:**
1. Check which provider is failing
2. Verify ipapi.co and geojs.io are accessible
3. Wait a minute for rate limit to reset
4. Should automatically use working providers

## Success Indicators

✅ **Working Correctly:**
- No 403 or CORS errors in console
- Country detected successfully
- Correct greeting audio plays (German for DE/AT/CH/LI/LU, English for others)
- Fallback works when providers blocked
- Cache reduces network requests
- Debug logs show provider attempts

❌ **Issues:**
- 403 errors appearing frequently
- No country detected
- Wrong greeting audio
- Multiple failed provider attempts
- Cache not working

## Performance Benchmarks

Expected timings:
- **Cached detection**: < 1ms
- **Network detection (success)**: 200-800ms
- **Network detection (with fallback)**: 1-3 seconds
- **Timezone fallback**: < 10ms

## Additional Debug Commands

```javascript
// Get current config
console.log(window.AIWGeo.getConfig());

// Check cache status
console.log('Cached country:', localStorage.getItem('aiw_geo_country'));
console.log('Cache timestamp:', localStorage.getItem('aiw_geo_timestamp'));

// Check timezone
console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);

// Force specific language (for testing)
localStorage.setItem('aiWidget_forceLang', 'de'); // Force German
location.reload();

// Clear forced language
localStorage.removeItem('aiWidget_forceLang');
location.reload();
```

## Reporting Issues

If you encounter issues, provide:
1. Browser console logs (with debugMode enabled)
2. Network tab screenshot showing requests
3. Your country/timezone
4. Expected vs actual behavior
5. Provider test results (Test 6)

## Automated Test Results

Run the validation script:
```bash
node /path/to/validate-geo-implementation.js
```

Expected output:
```
✅ All validation checks passed! (17/17)
The multi-provider geolocation system is correctly implemented.
```

---

**Last Updated:** 2025-01-27
**Version:** 1.9.6
