# Geolocation Implementation Testing Checklist

## Pre-Deployment Testing

### ✅ Basic Functionality Tests

#### Test 1: German-Speaking Countries
- [ ] Test from Germany (DE) → Expect German audio
- [ ] Test from Austria (AT) → Expect German audio
- [ ] Test from Switzerland (CH) → Expect German audio
- [ ] Test from Liechtenstein (LI) → Expect German audio
- [ ] Test from Luxembourg (LU) → Expect German audio

**How to test:**
- Use VPN to connect from each country
- Load the widget page
- Verify which audio file loads (check browser console)
- Confirm German greeting plays

#### Test 2: Non-German-Speaking Countries
- [ ] Test from USA (US) → Expect English audio
- [ ] Test from UK (GB) → Expect English audio
- [ ] Test from France (FR) → Expect English audio
- [ ] Test from Spain (ES) → Expect English audio
- [ ] Test from any other country → Expect English audio

**How to test:**
- Use VPN to connect from each country
- Load the widget page
- Verify which audio file loads (check browser console)
- Confirm English greeting plays

### ✅ Fallback Mechanism Tests

#### Test 3: Network Failure
- [ ] Block ip-api.com in browser
- [ ] Verify timezone fallback activates
- [ ] Verify browser language fallback works
- [ ] Verify English default loads if all fail

**How to test:**
```javascript
// In browser console
// Block the API by adding to hosts file or use DevTools Network tab
// Then reload page and check console for fallback messages
```

#### Test 4: Invalid Responses
- [ ] Simulate API returning invalid data
- [ ] Verify graceful handling
- [ ] Verify fallback to next detection method

### ✅ Browser Compatibility Tests

#### Test 5: Desktop Browsers
- [ ] Chrome (latest) - Windows
- [ ] Chrome (latest) - Mac
- [ ] Firefox (latest) - Windows
- [ ] Firefox (latest) - Mac
- [ ] Safari (latest) - Mac
- [ ] Edge (latest) - Windows

**What to verify:**
- IP detection works
- Timezone detection works
- Audio loads correctly
- No console errors

#### Test 6: Mobile Browsers
- [ ] Chrome - Android
- [ ] Safari - iOS
- [ ] Firefox - Android
- [ ] Samsung Internet - Android

**What to verify:**
- Touch-friendly controls
- Audio loads correctly
- Geolocation works
- Responsive design

### ✅ Caching Tests

#### Test 7: Cache Behavior
- [ ] First visit - verify IP detection occurs
- [ ] Second visit - verify cache is used
- [ ] After 24 hours - verify fresh detection
- [ ] Clear cache - verify fresh detection

**How to test:**
```javascript
// In browser console

// Check if country is cached
localStorage.getItem('aiw_geo_country');

// Clear cache
window.AIWGeo.clearCache();

// Force fresh detection
window.AIWGeo.getCountry();
```

### ✅ Privacy & Security Tests

#### Test 8: Privacy Compliance
- [ ] Verify no PII is collected
- [ ] Verify only country code is stored
- [ ] Verify HTTPS is used for API calls
- [ ] Verify cache can be cleared

**How to test:**
- Check browser DevTools → Application → Local Storage
- Check Network tab for API calls (should be HTTPS)
- Verify only 'aiw_geo_country' and 'aiw_geo_timestamp' are stored

#### Test 9: Security
- [ ] Verify input validation on country codes
- [ ] Verify no XSS vulnerabilities
- [ ] Verify error messages don't leak info
- [ ] Verify API calls are authenticated if needed

### ✅ Performance Tests

#### Test 10: Load Time
- [ ] Measure time to detect country (should be < 1s)
- [ ] Measure time with cache hit (should be instant)
- [ ] Verify timeout works (should fail gracefully at 8s)

**How to test:**
```javascript
// In browser console
const start = Date.now();
window.AIWGeo.getCountry().then(country => {
    console.log('Detection time:', Date.now() - start, 'ms');
    console.log('Country:', country);
});
```

#### Test 11: Network Performance
- [ ] Verify API call size is < 1KB
- [ ] Verify no unnecessary API calls
- [ ] Verify cache reduces API calls

### ✅ Error Handling Tests

#### Test 12: Network Errors
- [ ] Test with slow network (throttle to 3G)
- [ ] Test with offline mode
- [ ] Test with intermittent connection
- [ ] Verify graceful degradation

**How to test:**
- Use browser DevTools → Network tab → Throttling
- Test "Offline" mode
- Test "Slow 3G" mode

#### Test 13: Edge Cases
- [ ] Test with ad blockers enabled
- [ ] Test with browser extensions
- [ ] Test in private/incognito mode
- [ ] Test with cookies disabled

## Debug Testing

### Test 14: Debug Mode
- [ ] Enable debug mode
- [ ] Verify detailed console logs
- [ ] Verify detection method is logged
- [ ] Verify language mapping is logged

**How to enable:**
```javascript
// In browser console or widget data
window.aiWidgetData.geolocation_debug_mode = true;

// Or in PHP settings
'ai_interview_widget_geolocation_debug_mode' => true
```

### Test 15: Console Commands
Test these commands in browser console:

```javascript
// Get current country
window.AIWGeo.getCountry();

// Check configuration
window.AIWGeo.getConfig();

// Clear cache
window.AIWGeo.clearCache();

// Check timezone
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('Timezone:', tz);

// Check browser language
console.log('Browser language:', navigator.language);
```

## Production Monitoring

### Post-Deployment Checks

#### Week 1 Monitoring
- [ ] Monitor API success rate (should be > 95%)
- [ ] Monitor fallback usage rate
- [ ] Check error logs for issues
- [ ] Verify correct audio loads per country

#### Ongoing Monitoring
- [ ] Weekly check of error rates
- [ ] Monthly review of detection accuracy
- [ ] Quarterly review of country mappings
- [ ] Annual review of API provider

### Metrics to Track
- IP detection success rate: __%
- Timezone fallback usage: __%
- Cache hit rate: __%
- Average detection time: __ms
- Error rate: __%

## Troubleshooting Guide

### Issue: Wrong audio loads
**Steps:**
1. Open browser console
2. Enable debug mode
3. Check detected country
4. Verify country-to-language mapping
5. Clear cache and retry

### Issue: No country detected
**Steps:**
1. Check if ip-api.com is accessible
2. Check browser console for errors
3. Verify network timeout setting
4. Check timezone fallback logs
5. Verify browser language detection

### Issue: Cache not working
**Steps:**
1. Check if localStorage is enabled
2. Verify cache timeout setting
3. Check browser storage quota
4. Clear all site data and retry

## Sign-Off

### Testing Completed By
- [ ] Developer testing complete
- [ ] QA testing complete
- [ ] UAT testing complete
- [ ] Security review complete
- [ ] Performance testing complete

**Tester Name:** ________________  
**Date:** ________________  
**Signature:** ________________

### Deployment Approval
- [ ] All tests passed
- [ ] Documentation complete
- [ ] Security verified
- [ ] Performance acceptable
- [ ] Ready for production

**Approved By:** ________________  
**Date:** ________________  
**Signature:** ________________

## Notes

### Issues Found During Testing
_Record any issues found during testing here_

### Recommendations
_Record any recommendations for improvement_

### Future Enhancements
_Record ideas for future versions_
