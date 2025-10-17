# Testing Guide: TTS Playback Microphone Recording Fix

## Overview
This guide helps verify that the microphone recording does not start while the chatbot is speaking through ElevenLabs or fallback TTS.

## Prerequisites
- WordPress site with AI Interview Widget installed
- ElevenLabs API key configured (for full testing)
- Browser with microphone permissions granted
- Desktop and mobile browsers for comprehensive testing

## Test Scenarios

### Test 1: Basic TTS Blocking (Desktop)
**Expected Behavior**: Voice input button should be disabled while TTS is playing

1. Open the homepage with the AI widget
2. Interact with the chatbot by typing a message
3. Wait for the AI response to start playing (TTS voice output)
4. Observe the voice input button (microphone icon):
   - ✅ Button should show orange/amber color with pulse animation
   - ✅ Button should be disabled (cursor changes to "wait")
   - ✅ Hovering shows tooltip: "Waiting for voice output to finish..."
5. Try clicking the voice input button while TTS is playing:
   - ✅ Should show error message: "Please wait for the voice output to finish..."
   - ✅ Microphone should NOT activate
   - ✅ No recording should start
6. Wait for TTS to finish speaking
7. Observe the voice input button:
   - ✅ Button should return to normal purple color
   - ✅ Button should be enabled again
   - ✅ Cursor returns to "pointer"
8. Click the voice input button now:
   - ✅ Should activate successfully
   - ✅ Microphone recording should start
   - ✅ Should show "Listening... Speak now"

**Result**: ✅ PASS / ❌ FAIL

---

### Test 2: Rapid TTS Button Clicks
**Expected Behavior**: Multiple TTS playbacks should properly manage state

1. Open chat interface
2. Get an AI response with TTS
3. Click the TTS button (🔊) on a previous message
4. Quickly try to activate voice input:
   - ✅ Voice input should be blocked
5. Let TTS finish
6. Immediately try voice input:
   - ✅ Should work normally

**Result**: ✅ PASS / ❌ FAIL

---

### Test 3: TTS Error Handling
**Expected Behavior**: Voice input should re-enable if TTS fails

1. Simulate a TTS error (e.g., disconnect network briefly)
2. Send a message and wait for TTS to fail
3. Observe voice input button:
   - ✅ Should re-enable even if TTS failed
   - ✅ Should not remain stuck in disabled state

**Result**: ✅ PASS / ❌ FAIL

---

### Test 4: Fallback TTS (Browser TTS)
**Expected Behavior**: Blocking should work with browser fallback TTS

1. Test without ElevenLabs API key (or disable it temporarily)
2. Send a message to get AI response
3. Browser TTS should play instead
4. Try to activate voice input while browser TTS is speaking:
   - ✅ Voice input should be blocked
   - ✅ Same orange/amber visual feedback
5. Wait for browser TTS to finish:
   - ✅ Voice input should re-enable

**Result**: ✅ PASS / ❌ FAIL

---

### Test 5: Mobile Testing (iOS Safari)
**Expected Behavior**: Same blocking behavior on mobile

1. Open widget on iPhone/iPad Safari
2. Grant microphone permissions
3. Send message and wait for TTS response
4. Try to activate voice input during TTS:
   - ✅ Should be blocked with visual feedback
   - ✅ Error message should appear
5. After TTS finishes:
   - ✅ Voice input should work

**Result**: ✅ PASS / ❌ FAIL

---

### Test 6: Mobile Testing (Android Chrome)
**Expected Behavior**: Same blocking behavior on mobile

1. Open widget on Android Chrome
2. Grant microphone permissions
3. Send message and wait for TTS response
4. Try to activate voice input during TTS:
   - ✅ Should be blocked with visual feedback
   - ✅ Error message should appear
5. After TTS finishes:
   - ✅ Voice input should work

**Result**: ✅ PASS / ❌ FAIL

---

### Test 7: Auto-play TTS Toggle
**Expected Behavior**: TTS on/off state should affect blocking

1. Disable TTS using the toggle button
2. Send a message:
   - ✅ No TTS should play
   - ✅ Voice input should remain enabled
3. Enable TTS again
4. Send another message:
   - ✅ TTS should play
   - ✅ Voice input should be blocked during playback

**Result**: ✅ PASS / ❌ FAIL

---

### Test 8: Manual TTS Stop
**Expected Behavior**: Stopping TTS should re-enable voice input

1. Get an AI response with TTS playing
2. Click the pause/stop button on the TTS (⏸️ icon)
3. Observe voice input button:
   - ✅ Should immediately re-enable
   - ✅ Should return to normal color
4. Try voice input:
   - ✅ Should work normally

**Result**: ✅ PASS / ❌ FAIL

---

### Test 9: Multiple Consecutive Messages
**Expected Behavior**: State management should be consistent across multiple interactions

1. Send 3-4 messages in sequence
2. For each response:
   - ✅ Voice input disabled during TTS
   - ✅ Voice input enabled after TTS
   - ✅ No stuck states
   - ✅ Consistent behavior

**Result**: ✅ PASS / ❌ FAIL

---

### Test 10: Edge Case - Very Short TTS
**Expected Behavior**: Even brief TTS should trigger blocking

1. Send a message that generates a very short response (e.g., "Yes")
2. TTS will be very brief
3. Try to click voice input rapidly:
   - ✅ Should still block during the brief TTS playback
   - ✅ Should re-enable quickly after

**Result**: ✅ PASS / ❌ FAIL

---

## Critical Success Criteria

All of the following MUST be true for the fix to be considered successful:

- [ ] ✅ Microphone NEVER captures ElevenLabs voice output
- [ ] ✅ Microphone NEVER captures fallback browser TTS output
- [ ] ✅ Voice input button is clearly disabled (visual feedback) during TTS
- [ ] ✅ User sees helpful error message if they try to activate during TTS
- [ ] ✅ Voice input automatically re-enables when TTS finishes
- [ ] ✅ Works on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] ✅ Works on mobile browsers (iOS Safari, Android Chrome)
- [ ] ✅ No stuck states (button always re-enables eventually)
- [ ] ✅ TTS errors don't break the voice input functionality
- [ ] ✅ Manual TTS controls (stop/pause) properly update voice input state

## Browser Compatibility

Test on the following browsers:

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS)
- [ ] Edge (latest)

### Mobile
- [ ] Safari (iOS 14+)
- [ ] Chrome (Android)
- [ ] Samsung Internet (Android)
- [ ] Firefox (Android)

## Debug Information

To access debug information during testing, open browser console and check for:
- `[DEBUG] Voice input disabled - TTS is playing` - Voice input correctly blocked
- `[DEBUG] Voice input enabled - TTS finished` - Voice input correctly re-enabled
- `[DEBUG] TTS playback started` - TTS has begun
- `[DEBUG] TTS playback completed` - TTS has ended

## Known Issues to Watch For

1. **Race Condition**: The implementation includes double-checking in both the button click handler and `startVoiceInput()` to prevent rapid clicks (clicks within 100ms) from bypassing blocking. Expected behavior: All click attempts during TTS should be blocked, regardless of timing. If a click somehow bypasses the first check, the second check in `startVoiceInput()` will catch it.
2. **State Stuck**: Button never re-enables - check TTS error handling
3. **Network Issues**: Slow TTS loading might affect timing - test on slow connection
4. **Browser Differences**: Some browsers handle TTS differently - test comprehensively

## Reporting Results

When reporting test results, include:
1. Browser name and version
2. Device type (desktop/mobile)
3. Which tests passed/failed
4. Any error messages from browser console
5. Screenshots of visual feedback (especially disabled state)
6. Any unexpected behavior

## Automated Testing Note

This fix involves audio playback and microphone permissions, which are difficult to test automatically. Manual testing is essential to verify the user experience and ensure the microphone never captures chatbot audio output.
