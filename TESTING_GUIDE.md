# Settings Form Testing Guide

## Overview
This guide provides step-by-step instructions to test the Settings form save functionality for the AI Interview Widget WordPress plugin.

## Prerequisites
- WordPress installation with admin access
- AI Interview Widget plugin installed and activated

## Test Scenarios

### Test 1: Basic Form Save
**Objective:** Verify that the Save Configuration button saves settings successfully.

**Steps:**
1. Log in to WordPress admin dashboard
2. Navigate to **AI Interview Widget** → **Settings**
3. Make a visible change to any setting:
   - Change **AI Provider** from current value to a different provider
   - OR enter/modify an API key field
4. Click the **"💾 Save Configuration"** button
5. Observe the page reload

**Expected Results:**
- ✅ Page redirects back to the settings page
- ✅ Green success message appears at the top: **"Settings saved."**
- ✅ The change you made is still visible in the form
- ✅ No error messages displayed

**If Test Fails:**
- Check browser console for JavaScript errors
- Check WordPress debug log for PHP errors
- Verify all 27 settings are registered in the `register_settings()` function in `ai_interview_widget.php`

---

### Test 2: Settings Persistence
**Objective:** Verify that saved settings persist after page refresh.

**Steps:**
1. From Test 1, with settings already saved
2. Note the current value of **OpenAI API Key** (or any other field)
3. Refresh the browser page (F5 or Ctrl+R)
4. Check the **OpenAI API Key** field again

**Expected Results:**
- ✅ The API key value is still present and matches what you saved
- ✅ All other settings remain as you set them
- ✅ No data loss occurred

**If Test Fails:**
- Check if form is posting to `options.php`
- Verify `settings_fields()` is called with correct option group
- Check database to see if option was actually saved: 
  ```sql
  SELECT * FROM wp_options WHERE option_name LIKE 'ai_interview_widget_%';
  ```

---

### Test 3: Customizer Settings Preservation
**Objective:** Verify that settings from the Enhanced Visual Customizer page are not overwritten.

**Steps:**
1. Navigate to **AI Interview Widget** → **Enhanced Visual Customizer**
2. Make changes to visual settings (colors, fonts, etc.)
3. Save the customizer settings
4. Navigate back to **AI Interview Widget** → **Settings**
5. Change any setting on the main Settings page
6. Click **"💾 Save Configuration"**
7. Navigate back to **Enhanced Visual Customizer**

**Expected Results:**
- ✅ Visual customizer settings are still intact
- ✅ Your customizer changes were not lost
- ✅ Both pages' settings coexist without conflicts

**If Test Fails:**
- Verify hidden fields are present in the form (View Page Source)
- Check that `ai_interview_widget_style_settings` is in hidden fields
- Review the hidden fields code in the `admin_page()` function in `ai_interview_widget.php` (look for the "Preserve settings" comment)

---

### Test 4: Multiple Settings Save
**Objective:** Verify that multiple settings can be saved at once.

**Steps:**
1. Navigate to **AI Interview Widget** → **Settings**
2. Make changes to multiple fields:
   - Change **AI Provider**
   - Enter/modify **OpenAI API Key**
   - Change **Default Language**
   - Toggle **Enable Voice Features**
3. Click **"💾 Save Configuration"**
4. Verify all changes are saved

**Expected Results:**
- ✅ Success message displays
- ✅ All 4 changes are visible after save
- ✅ Refresh page - all 4 changes persist

**If Test Fails:**
- Check if any settings are missing from POST data
- Verify sanitization callbacks are not rejecting values
- Check WordPress debug log for sanitization errors

---

### Test 5: Form Validation and Sanitization
**Objective:** Verify that invalid input is properly sanitized or rejected.

**Steps:**
1. Navigate to **AI Interview Widget** → **Settings**
2. Enter invalid data:
   - Enter spaces or special characters in **OpenAI API Key** field
   - Enter a very long string (1000+ characters)
3. Click **"💾 Save Configuration"**
4. Check the saved value

**Expected Results:**
- ✅ Form saves without errors
- ✅ Invalid characters are sanitized/removed (if sanitization callback is configured)
- ✅ Or error message displays if validation fails
- ✅ No PHP errors or warnings

**If Test Fails:**
- Review sanitization callbacks in `register_settings()` function
- Check if `sanitize_api_key()` method is working correctly
- Verify WordPress `sanitize_text_field()` is being used where appropriate

---

### Test 6: Browser Compatibility
**Objective:** Verify form works across different browsers.

**Steps:**
1. Test the save functionality in:
   - Chrome/Edge
   - Firefox
   - Safari (if available)
2. For each browser:
   - Navigate to Settings page
   - Change a setting
   - Save
   - Verify success message

**Expected Results:**
- ✅ Form works in all tested browsers
- ✅ Success message displays consistently
- ✅ No JavaScript errors in any browser

---

## Debugging Tips

### Check Form Structure
1. Navigate to Settings page
2. Right-click → **View Page Source**
3. Search for `action="options.php"`
4. Verify you see:
   - `<form method="post" action="options.php">`
   - Hidden fields for nonce and option_group
   - 9 hidden fields for preserved settings
   - 18 visible input fields
   - Submit button

### Check Hidden Fields
Search the page source for these hidden fields:
```html
<input type="hidden" name="ai_interview_widget_style_settings" value="..." />
<input type="hidden" name="ai_interview_widget_content_settings" value="..." />
<input type="hidden" name="ai_interview_widget_custom_audio_en" value="..." />
<input type="hidden" name="ai_interview_widget_custom_audio_de" value="..." />
<input type="hidden" name="ai_interview_widget_design_presets" value="..." />
<input type="hidden" name="ai_interview_widget_enable_geolocation" value="..." />
<input type="hidden" name="ai_interview_widget_geolocation_cache_timeout" value="..." />
<input type="hidden" name="ai_interview_widget_geolocation_require_consent" value="..." />
<input type="hidden" name="ai_interview_widget_geolocation_debug_mode" value="..." />
```

### Enable WordPress Debug Mode
Add to `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check debug log at: `wp-content/debug.log`

### Check POST Data
1. Open browser Developer Tools (F12)
2. Go to **Network** tab
3. Submit the form
4. Find the POST request to `options.php`
5. Check **Form Data** to verify all 27 settings are present

---

## Success Criteria

The Settings form save functionality is considered working if:

1. ✅ Save button displays success message
2. ✅ All visible settings are saved and persist
3. ✅ Hidden settings (customizer, geolocation) are preserved
4. ✅ No PHP or JavaScript errors occur
5. ✅ Form works in all major browsers
6. ✅ Multiple settings can be saved simultaneously
7. ✅ Settings persist across page refreshes
8. ✅ Settings from other pages are not overwritten

---

## Known Limitations

1. **Geolocation Settings**: These settings are registered but not yet implemented in the Settings UI. They are preserved via hidden fields.

2. **Customizer Settings**: Managed on the Enhanced Visual Customizer page, preserved via hidden fields.

---

## Support

If you encounter issues:
1. Check the `SETTINGS_FORM_FIX.md` for technical details
2. Review `IMPLEMENTATION_VERIFICATION.md` for code verification
3. Enable WordPress debug mode to see detailed error messages
4. Check browser console for JavaScript errors

---

## Technical Reference

- **Form Location**: `ai_interview_widget.php` in the `admin_page()` function
- **Hidden Fields**: Look for the "Preserve settings that are not displayed in this form" comment in `admin_page()` function
- **Settings Registration**: `register_settings()` function in `ai_interview_widget.php`
- **Settings Errors Display**: Look for `settings_errors()` call in the `admin_page()` function
- **Submit Button**: Look for `submit_button()` call in the `admin_page()` function
