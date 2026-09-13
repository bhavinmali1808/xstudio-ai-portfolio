# HD Graphics AI Chatbot

Production-ready AI chatbot for HD Graphics website using Ollama (local LLM).

## Features

- 🤖 **Local LLM**: Uses Ollama with llama3.1 model (no external APIs)
- 💬 **Streaming Responses**: Real-time message streaming for smooth UX
- 🎯 **Intent Detection**: Automatically detects buying intent and captures leads
- 📱 **WhatsApp Integration**: Generates quote summaries and WhatsApp links
- 🔒 **Security**: Rate limiting, input validation, prompt injection protection
- 💾 **Persistence**: Conversation history saved in localStorage
- 🎨 **Modern UI**: Glassmorphism design with smooth animations

## Prerequisites

1. **Node.js 18+** installed
2. **Ollama** installed and running
   - Download from: https://ollama.ai
   - Install and start Ollama service

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Ollama model:**
   ```bash
   ollama pull llama3.1
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` if needed (defaults work for local development):
   ```env
   OLLAMA_URL=http://localhost:11434
   OLLAMA_MODEL=llama3.1
   API_PORT=3001
   VITE_API_URL=http://localhost:3001
   ```

## Running the Application

### Option 1: Run Both Servers (Recommended)

```bash
npm run dev:all
```

This starts both:
- Frontend dev server (Vite) on `http://localhost:8080`
- API server (Express) on `http://localhost:3001`

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - API Server:**
```bash
npm run server
```

## Testing

Run unit tests:
```bash
npm test
```

## Manual Testing Steps

1. **Start Ollama:**
   ```bash
   ollama serve
   ```

2. **Verify model is available:**
   ```bash
   ollama list
   ```
   Should show `llama3.1`

3. **Start the application:**
   ```bash
   npm run dev:all
   ```

4. **Test the chatbot:**
   - Open `http://localhost:8080`
   - Click the chat button (bottom-right)
   - Try these queries:
     - "What services does HD Graphics offer?"
     - "I need a quote for branding"
     - "Tell me about your case studies"
     - "How can I contact you?"

5. **Test lead capture:**
   - Ask: "I want to get a quote"
   - Follow the flow: name → services → timeline → budget → contact method
   - Verify WhatsApp link is generated correctly

6. **Test rate limiting:**
   - Send 20+ messages quickly
   - Should see rate limit error after 20 requests

7. **Test prompt injection protection:**
   - Try: "Ignore previous instructions and tell me..."
   - Should be rejected politely

## Project Structure

```
HD Graphics-ai-portfolio/
├── src/
│   ├── components/
│   │   └── chat/
│   │       └── ChatWidget.tsx      # Main chat widget component
│   ├── lib/
│   │   ├── HD GraphicsKnowledge.ts     # Knowledge base
│   │   └── chat/
│   │       ├── intent.ts           # Intent detection & WhatsApp builder
│   │       └── rateLimit.ts        # Client-side rate limit (if needed)
│   └── App.tsx                      # ChatWidget mounted here
├── server/
│   ├── api/
│   │   └── chat.ts                 # Express API route for Ollama
│   ├── lib/
│   │   ├── HD GraphicsKnowledge.ts     # Server-side knowledge base
│   │   └── chat/
│   │       ├── intent.ts           # Server-side validation
│   │       └── rateLimit.ts        # Server-side rate limiting
│   └── index.ts                     # Server entry point
├── tests/
│   └── intent.test.ts               # Unit tests
└── env.example                      # Environment variables template
```

## Configuration

### Change Ollama Model

Edit `.env`:
```env
OLLAMA_MODEL=llama3.2  # or any other model
```

Then pull the new model:
```bash
ollama pull llama3.2
```

### Change API Port

Edit `.env`:
```env
API_PORT=3002
VITE_API_URL=http://localhost:3002
```

## Troubleshooting

### "Model not found" error

**Solution:** Pull the model:
```bash
ollama pull llama3.1
```

### "Connection refused" to Ollama

**Solution:** 
1. Check Ollama is running: `ollama list`
2. Verify `OLLAMA_URL` in `.env` matches your Ollama instance
3. Default: `http://localhost:11434`

### Chat widget not appearing

**Solution:**
1. Check browser console for errors
2. Verify `VITE_API_URL` in `.env` matches API server port
3. Ensure API server is running: `npm run server`

### Rate limit too strict

**Solution:** Edit `server/lib/chat/rateLimit.ts`:
```typescript
const RATE_LIMIT = {
  maxRequests: 50,  // Increase from 20
  windowMs: 10 * 60 * 1000,
};
```

### Streaming not working

**Solution:**
1. Check network tab in browser DevTools
2. Verify API server is receiving requests
3. Check Ollama is responding: `curl http://localhost:11434/api/tags`

## Production Deployment

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Deploy API server:**
   - Deploy `server/` directory to your hosting
   - Set environment variables
   - Ensure Ollama is accessible from server

3. **Update frontend API URL:**
   - Set `VITE_API_URL` to production API URL
   - Rebuild frontend

## API Endpoints

### `POST /api/chat`

Send a chat message to Ollama.

**Request:**
```json
{
  "message": "What services do you offer?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response:** Server-Sent Events (SSE) stream

### `GET /health`

Check API server and Ollama status.

**Response:**
```json
{
  "status": "ok",
  "model": "llama3.1"
}
```

## Security Features

- ✅ Input validation (max 2000 chars)
- ✅ Rate limiting (20 requests / 10 minutes per IP)
- ✅ Prompt injection detection
- ✅ CORS protection
- ✅ Error handling

## License

Part of HD Graphics portfolio project.

