# Quick Start Guide - AI Interview Widget

Get your AI Interview Widget up and running in 5 minutes!

## Installation

### Step 1: Upload Plugin

1. Download the plugin files
2. Navigate to WordPress Admin → Plugins → Add New
3. Click "Upload Plugin"
4. Choose the plugin ZIP file
5. Click "Install Now"
6. Click "Activate"

### Step 2: Configure API Keys

1. Go to **AI Interview Widget** in the WordPress admin menu
2. Enter your API keys:
   - **OpenAI API Key** (Required for AI chat)
     - Get yours at: https://platform.openai.com/api-keys
     - Format: `sk-...` (starts with "sk-")
   - **ElevenLabs API Key** (Optional for voice synthesis)
     - Get yours at: https://elevenlabs.io/
     - Format: Alphanumeric string

3. Click **Save Changes**

### Step 3: Add Widget to Your Site

Add the shortcode to any page or post:

```
[ai_interview_widget]
```

That's it! Your AI interview widget is now live.

## Basic Configuration

### Choose Your AI Model

1. Go to **AI Interview Widget** settings
2. Select your preferred AI provider:
   - OpenAI GPT-4o-mini (Default, best quality)
   - OpenAI GPT-3.5-turbo (Faster, lower cost)
   - Anthropic Claude (Alternative provider)
   - Google Gemini (Alternative provider)

### Customize System Prompts

The system prompt defines how the AI responds:

1. Navigate to **Content Settings** tab
2. Edit the system prompt for each language:
   - English (en)
   - German (de)
3. Define the AI's personality, expertise, and response style
4. Click **Save**

**Example System Prompt:**
```
You are Eric Rorich, a seasoned software engineer and technical architect. 
You're knowledgeable about web development, cloud architecture, and AI integration.
Keep responses concise, professional, and helpful.
```

### Customize Appearance

Use the **WordPress Customizer** to style your widget:

1. Go to **Appearance → Customize**
2. Look for **AI Interview Widget** section
3. Customize:
   - Colors and gradients
   - Button styles
   - Text colors
   - Background effects
   - Animation settings

## Advanced Features

### Voice Features

Enable voice input and output:

1. Ensure ElevenLabs API key is configured (for premium voice)
2. Browser speech recognition works without API key
3. Users can:
   - Click microphone icon to speak
   - Enable/disable text-to-speech with speaker icon
   - Widget responds with natural voice

### Geolocation-Based Language

Auto-detect user language:

1. Navigate to **Geolocation Settings**
2. Enable "Geolocation-based Language Detection"
3. Widget automatically displays in user's language
4. Supported: English, German (extensible)

### Custom Audio Greetings

Replace default greeting audio:

1. Go to **Audio Settings** tab
2. Upload custom MP3 files (max 5MB)
   - English greeting
   - German greeting
3. Preview audio before saving

## Testing Your Setup

### Test AI Chat

1. Visit your page with the widget
2. Click the play button (or skip audio)
3. Type a message: "Hello, who are you?"
4. Verify AI responds appropriately

### Test Voice Features

1. Click the microphone icon
2. Say: "What is your experience?"
3. Verify:
   - Your speech is transcribed
   - AI responds to your question
   - Text-to-speech plays the response

### Check Browser Console

Open browser developer tools (F12):
- Look for any JavaScript errors
- Check network tab for failed requests
- Verify API calls succeed

## Troubleshooting

### Widget Not Appearing

- **Check shortcode:** Ensure `[ai_interview_widget]` is on your page
- **Clear cache:** Clear browser and WordPress cache
- **Check plugin status:** Verify plugin is activated

### API Errors

- **Verify API keys:** Check format and validity
- **Check API credits:** Ensure your API account has credits
- **Review error logs:** Check WordPress debug.log

### No Voice Output

- **Check browser:** Ensure HTTPS (required for microphone)
- **Check permissions:** Allow microphone access when prompted
- **Check API key:** Verify ElevenLabs key if using premium voice

### Styling Issues

- **Clear cache:** Clear all caches (browser, WordPress, CDN)
- **Check CSS:** Verify no theme conflicts
- **Try defaults:** Reset customizer to default values

## Best Practices

### Security

- [ ] Use HTTPS (SSL certificate)
- [ ] Keep API keys private
- [ ] Disable debug mode in production
- [ ] Regularly update the plugin

### Performance

- [ ] Use CDN for audio files
- [ ] Enable WordPress caching
- [ ] Monitor API usage
- [ ] Set reasonable rate limits

### User Experience

- [ ] Write clear, helpful system prompts
- [ ] Test on multiple devices
- [ ] Provide fallback content
- [ ] Monitor user feedback

## Need Help?

### Documentation

- **Full README:** See README.md for complete documentation
- **Technical Docs:** Check individual .md files in repository
- **Security:** Review SECURITY.md for security best practices

### Support

- **Issues:** Create a GitHub issue
- **Questions:** Check existing issues first
- **Updates:** Watch the repository for updates

## Next Steps

After basic setup:

1. **Customize system prompts** to match your personality
2. **Style the widget** to match your site theme
3. **Add to multiple pages** using the shortcode
4. **Monitor usage** and adjust as needed
5. **Gather feedback** from visitors

---

**Need advanced configuration?** See README.md for complete documentation.

**Having issues?** Check the Troubleshooting section or create a GitHub issue.

**Ready to launch?** Review the Security checklist in SECURITY.md.
