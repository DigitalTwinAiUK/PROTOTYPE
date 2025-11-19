# DTAI Engineering Demo - Project Documentation

## Project Overview

**Project Name**: DTAI Engineering Demo (Cognitive Twin)  
**Purpose**: AI-powered CNC manufacturing assistant demo for client presentations  
**Target Client**: David Kerr (3M GBP business opportunity)  
**Deployment**: Static Netlify deployment with Manus Forge API integration  
**Created**: November 2024  

## Project Structure

```
cognitive-twin-demo/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Password-protected login (demo/cognitive2026)
│   │   ├── Login.css
│   │   ├── Demo.jsx            # Pre-programmed Q&A demo tab
│   │   ├── Demo.css
│   │   ├── LiveAI.jsx          # Real AI chat with Manus Forge API
│   │   └── LiveAI.css
│   ├── data/
│   │   └── demoQA.js           # 75+ pre-programmed Q&A scenarios
│   ├── App.jsx                 # Main app with tab switching
│   ├── App.css
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── public/
│   └── assets/
│       ├── DTAI_Icon_Col.svg  # DTAI logo (SVG)
│       └── DTAI_Icon_Col.png  # DTAI logo (PNG)
├── dist/                       # Production build output
├── package.json
├── vite.config.js
└── index.html
```

## Key Features

### 1. Dual-Mode Interface

**Demo Tab**:
- Pre-programmed Q&A with 75+ scenarios
- Instant responses (no API calls)
- Covers CNC machining, Simply Technologies machines, G-code, education
- Perfect for controlled demonstrations

**Live AI Tab**:
- Real-time AI responses via Manus Forge API
- Custom DTAI Engineering Model 4.2b persona
- Security hardening against prompt injection
- Topic restrictions (CNC/engineering only)
- Machine context selection (SIMPLY 4, DISCOVERY 8, etc.)

### 2. DTAI Branding

- Custom DTAI logo throughout interface
- Professional color scheme (green gradient)
- Simply Technologies branding
- "DTAI Engineering Model 4.2b" AI identity

### 3. Security Features

- Password protection (demo/cognitive2026)
- Prompt injection prevention
- Topic restriction enforcement
- System prompt concealment
- Never reveals underlying AI (Claude/Manus)

## Development History

### Phase 1: Initial Development
- Created React + Vite project structure
- Built Login, Demo, and LiveAI components
- Implemented 75+ pre-programmed Q&A scenarios
- Added tab switching interface

### Phase 2: Layout Fixes
**Problem**: Live AI sidebar was being pushed off-screen when messages were added  
**Solution**: Changed from Flexbox to CSS Grid layout  
**Result**: Sidebar stays fixed in place, messages scroll within chat area

### Phase 3: API Integration
**Challenge**: Multiple attempts to configure Manus API key  
**Solution**: Used BUILT_IN_FORGE_API_KEY from project environment  
**Implementation**: Hardcoded credentials for static Netlify deployment

### Phase 4: Professional Branding
- Replaced robot icons with DTAI logo
- Updated all branding from "Digital Twin AI Ltd" to "Simply Technologies"
- Changed AI identity to "DTAI Engineering Model 4.2b"
- Professional color scheme and typography

### Phase 5: Security Hardening
- Added comprehensive system prompt with security rules
- Implemented topic restrictions (CNC/engineering only)
- Prevented prompt injection attacks
- Concealed system instructions from users

## Technical Stack

**Frontend**:
- React 18.3.1
- Vite 5.4.21 (build tool)
- CSS Grid for layout
- No external UI libraries (custom CSS)

**API**:
- Manus Forge API (https://forge.manus.ai)
- Model: Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)
- Hardcoded API key for static deployment

**Deployment**:
- Static files (HTML/CSS/JS)
- Netlify (drag-and-drop deployment)
- No backend server required

## API Configuration

### Current Setup

```javascript
const apiKey = 'AQTd9QkHCSHHLieEZVCLJ6'  // BUILT_IN_FORGE_API_KEY
const apiUrl = 'https://forge.manus.ai'
const model = 'claude-3-5-sonnet-20241022'
```

### System Prompt (Security Hardened)

The AI persona includes:
- Identity as "DTAI Engineering Model 4.2b"
- Topic restrictions (CNC/engineering only)
- Prompt injection prevention
- System instruction concealment
- Professional, technical response style

**Security Rules**:
- Never mentions Claude, Anthropic, OpenAI, GPT, or Manus
- Refuses off-topic questions politely
- Ignores jailbreak attempts
- Cannot be tricked into revealing instructions

## Deployment Instructions

### Method 1: Netlify Drag-and-Drop (Easiest)

1. Extract `cognitive-twin-DTAI.zip`
2. Go to https://app.netlify.com/drop
3. Drag ALL extracted files (including assets folder)
4. Wait 20 seconds
5. Done! No configuration needed.

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd cognitive-twin-demo
netlify deploy --prod --dir=dist
```

### Method 3: Git Integration

1. Push to GitHub repository
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

## Usage & Access

**Demo URL**: (Netlify will provide after deployment)  
**Passwords**: `demo` or `cognitive2026`  

**Demo Tab**: Click suggested questions or type custom ones  
**Live AI Tab**: Toggle switch to activate real AI, select machine context

## Cost Considerations

**API Usage**:
- Each Live AI question costs ~$0.01-0.05
- Usage billed to Manus account
- Monitor at: https://manus.im/usage

**Recommendations**:
- Keep password-protected
- Share only with trusted clients
- Monitor usage regularly
- Consider adding rate limiting for public demos

## Known Issues & Limitations

1. **API Key Security**: Hardcoded in JavaScript (visible in browser dev tools)
   - Mitigation: Password protection + domain restrictions
   
2. **No Conversation History**: Each session is independent
   - Future: Add export/download feature

3. **Static Deployment**: Cannot use environment variables
   - Current: Hardcoded credentials work for trusted demos

## Future Enhancements

### Recommended Next Steps

1. **Conversation Export**
   - Add "Download Chat" button
   - Export as PDF with DTAI branding
   - Include timestamp and session info

2. **Rate Limiting**
   - Limit questions per session (e.g., 10 max)
   - Prevent API abuse
   - Add usage counter display

3. **Analytics**
   - Track which questions are asked most
   - Monitor demo usage
   - Identify popular topics

4. **Enhanced Demo Content**
   - Add more pre-programmed scenarios
   - Include machine-specific deep dives
   - Add troubleshooting guides

5. **Custom Branding Options**
   - Make logo/colors configurable
   - Support multiple client versions
   - White-label capability

## Development Notes

### Critical Decisions

**Why CSS Grid over Flexbox?**
- Flexbox allowed chat content to push sidebar up
- Grid locks columns in place
- Sidebar stays visible at all times

**Why Hardcoded API Key?**
- Static Netlify deployment can't use environment variables at runtime
- Vite env vars only work during build time
- Acceptable for password-protected client demos

**Why Claude 3.5 Sonnet?**
- Best quality responses for client presentations
- Professional, technical tone
- Handles complex CNC questions well

**Why Topic Restrictions?**
- Maintains professional demo focus
- Prevents embarrassing off-topic responses
- Reinforces DTAI as specialized system

### Lessons Learned

1. **Layout Issues**: Always test with dynamic content (long messages, multiple items)
2. **API Integration**: Environment variables need careful handling in static deployments
3. **Security**: System prompts alone aren't foolproof, but multiple layers help
4. **Branding**: Consistent logo/color usage throughout makes huge difference

## Support & Maintenance

**Manus Support**: https://help.manus.im  
**Netlify Docs**: https://docs.netlify.com  
**Project Repository**: (GitHub link to be added)

## Version History

- **v1.0** (Nov 2024): Initial release with Demo + Live AI
- **v1.1** (Nov 2024): Fixed sidebar layout with CSS Grid
- **v1.2** (Nov 2024): Integrated Manus Forge API
- **v1.3** (Nov 2024): DTAI branding and security hardening

## Contact

**Project Owner**: Simply Technologies  
**Purpose**: Client demonstration for David Kerr presentation  
**Status**: Production-ready for deployment

---

*This documentation is maintained in the GitHub repository for continuity across development sessions.*
