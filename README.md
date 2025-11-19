# DTAI Engineering Demo

> AI-Powered CNC Manufacturing Assistant for Client Presentations

![DTAI Logo](public/assets/DTAI_Icon_Col.svg)

## 🎯 Project Overview

Professional demonstration platform showcasing AI-powered CNC manufacturing intelligence. Features a single interface with a Live AI chat powered by the DTAI Engineering Model 4.2b, which can be customized via a new Settings menu.

**Target**: Client presentations (David Kerr - 3M GBP opportunity)  
**Status**: Production-ready  
**Deployment**: Static Netlify hosting  

## ✨ Features

### Settings Menu
- Define custom AI personas (Teacher, Engineer, Student) with unique system prompts.
- Manage machine contexts, including adding new machines.
- Upload reference documents (manuals, specs) for context-aware AI responses.

### Live AI Chat
- Real-time AI responses via Manus Forge API.
- Dynamic AI persona selection (Teacher, Engineer, Student) from the sidebar.
- Machine context selection, now enhanced with custom reference documents.
- Security hardening against prompt injection and topic restrictions (CNC/engineering only).

### Security & Branding
- Password-protected access
- Professional DTAI branding throughout
- AI never reveals underlying technology (Claude/Manus)
- Prompt injection prevention
- Off-topic question deflection

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x
- npm or pnpm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd cognitive-twin-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Output will be in dist/ directory
```

## 📦 Deployment

### Netlify (Recommended)

**Method 1: Drag & Drop**
1. Build the project: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the entire `dist` folder
4. Done! No configuration needed.

**Method 2: CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Method 3: Git Integration**
1. Push to GitHub
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔑 Access

**Passwords**: `demo` or `cognitive2026`

## 📁 Project Structure

```
cognitive-twin-demo/
	├── src/
	│   ├── components/
	│   │   ├── Login.jsx/css       # Password-protected login
	│   │   ├── Settings.jsx/css    # AI Persona and Machine Context Management
	│   │   └── LiveAI.jsx/css      # Real AI chat
	│   ├── data/
	│   │   └── initialData.js      # Default AI Persona and Machine data
│   ├── App.jsx/css             # Main app
│   └── main.jsx                # Entry point
├── public/
│   └── assets/                 # DTAI logos
├── dist/                       # Production build
└── docs/                       # Documentation
```

## 📚 Documentation

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Comprehensive technical documentation
- **[DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md)** - Development process and decisions
- **[todo.md](todo.md)** - Task tracking and status

## 🔧 Configuration

### API Configuration
The project uses hardcoded Manus Forge API credentials for static deployment:

```javascript
// src/components/LiveAI.jsx
const apiKey = 'AQTd9QkHCSHHLieEZVCLJ6'
const apiUrl = 'https://forge.manus.ai'
const model = 'claude-3-5-sonnet-20241022'
```

**Note**: API usage is billed to the Manus account. Monitor usage at https://manus.im/usage

### Customization

**Update Branding**:
- Logo: Replace files in `public/assets/`
- Colors: Modify CSS variables in component files
- Company name: Search and replace "Simply Technologies"

**Manage AI Personas and Contexts**:
- Use the new **Settings** menu (⚙️ button in the sidebar) to:
  - Define the system prompt for the Teacher, Engineer, and Student personas.
  - Add new machines and upload reference documents (manuals, specs) as text for context-aware responses.

## 🛡️ Security

- **Password Protection**: Demo requires password to access
- **Prompt Injection Prevention**: Multi-layer security in system prompt
- **Topic Restrictions**: AI only answers CNC/engineering questions
- **Identity Concealment**: Never reveals underlying AI technology

**Limitations**: API key is visible in browser dev tools. Mitigations:
- Keep password-protected
- Share only with trusted clients
- Monitor API usage regularly
- Consider domain restrictions in Manus settings

## 💰 Cost Considerations

- Each Live AI question: ~$0.01-0.05
- Usage billed to Manus account
- Monitor at: https://manus.im/usage

**Recommendations**:
- Keep password-protected
- Limit sharing to trusted clients
- Consider adding rate limiting for public demos

## 🐛 Known Issues

1. **API Key Security**: Hardcoded in JavaScript (acceptable for password-protected demos)
2. **No Conversation History**: Sessions are independent (future enhancement)
3. **Static Deployment Limitation**: Cannot use runtime environment variables

## 🔮 Future Enhancements

- [ ] Conversation export (PDF with DTAI branding)
- [ ] Rate limiting per session
- [ ] Usage analytics dashboard
- [ ] Enhanced demo content
- [ ] Multi-language support

## 📊 Tech Stack

- **Frontend**: React 18.3.1, Vite 5.4.21
- **Styling**: Custom CSS with CSS Grid
- **API**: Manus Forge API (Claude 3.5 Sonnet)
- **Deployment**: Static hosting (Netlify)

## 🤝 Contributing

This is a prototype project for client demonstrations. For modifications:

1. Create feature branch
2. Update documentation
3. Test thoroughly
4. Create pull request with detailed description

## 📞 Support

- **Manus API**: https://help.manus.im
- **Netlify**: https://docs.netlify.com
- **Project Issues**: GitHub Issues

## 📜 License

Proprietary - Simply Technologies

## 🏆 Version History

- **v1.3** (Nov 2024) - DTAI branding and security hardening
- **v1.2** (Nov 2024) - Manus Forge API integration
- **v1.1** (Nov 2024) - Fixed sidebar layout with CSS Grid
- **v1.0** (Nov 2024) - Initial release

---

**Maintained by**: Simply Technologies Development Team  
**Purpose**: Client demonstration platform  
**Status**: Production-ready for deployment

For detailed development history and technical decisions, see [DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md).
