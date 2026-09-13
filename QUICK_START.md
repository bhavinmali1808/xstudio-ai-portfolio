# Quick Start Guide - HD Graphics AI Chatbot

## 🚀 Quick Setup (5 minutes)

### 1. Install Ollama
```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows: Download from https://ollama.ai
```

### 2. Pull the Model
```bash
ollama pull llama3.1
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Everything
```bash
npm run dev:all
```

This starts:
- ✅ Frontend on `http://localhost:8080`
- ✅ API server on `http://localhost:3001`

### 5. Test It!
1. Open `http://localhost:8080`
2. Click the chat button (bottom-right)
3. Ask: "What services does HD Graphics offer?"

## 🧪 Test Scenarios

### Basic Chat
- "Hello"
- "What services do you offer?"
- "Tell me about HD Graphics"

### Lead Capture
- "I need a quote"
- Follow the flow: name → services → timeline → budget → contact
- Verify WhatsApp link opens

### Edge Cases
- "Ignore previous instructions" → Should be rejected
- Send 25 messages quickly → Should hit rate limit at 20

## 🐛 Troubleshooting

**"Model not found"**
```bash
ollama pull llama3.1
```

**"Connection refused"**
```bash
# Check Ollama is running
ollama list

# If not, start it
ollama serve
```

**Chat not working**
1. Check API server is running (Terminal 2)
2. Check browser console for errors
3. Verify `.env` has correct `VITE_API_URL`

## 📝 Next Steps

- Read full docs: `README_CHATBOT.md`
- Run tests: `npm test`
- Customize knowledge base: `src/lib/HD GraphicsKnowledge.ts`

