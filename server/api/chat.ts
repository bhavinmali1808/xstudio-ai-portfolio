/**
 * Ollama Chat API Server
 * This runs as a separate Express server for the API routes
 * Run with: npm run server
 */

import express from 'express';
import cors from 'cors';
import { SYSTEM_PROMPT } from '../lib/HD GraphicsKnowledge';
import { validateInput, detectPromptInjection } from '../lib/chat/intent';
import { checkRateLimit } from '../lib/chat/rateLimit';
import { generateSimpleResponse } from '../lib/simpleAI';

const app = express();
const PORT = process.env.API_PORT || 3001;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1';
const USE_FREE_API = process.env.USE_FREE_API === 'true' || !process.env.OLLAMA_URL;
const HUGGINGFACE_API = process.env.HUGGINGFACE_API || 'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3.1-8B-Instruct';

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', model: OLLAMA_MODEL });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(req);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        resetAt: rateLimit.resetAt,
      });
    }

    const { message, conversationHistory = [] } = req.body;

    // Validate input
    const validation = validateInput(message);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Check for prompt injection
    if (detectPromptInjection(message)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'I can help with HD Graphics services, process, and getting a quote. What would you like to build?',
      });
    }

    // Build messages array
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    // Set up streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Use simple AI (rule-based) if free API is enabled (default)
    if (USE_FREE_API) {
      try {
        const responseText = generateSimpleResponse(message, conversationHistory);

        // Stream the response in chunks (words) for better reliability
        const words = responseText.split(/(\s+)/);
        let accumulatedText = '';

        for (const word of words) {
          accumulatedText += word;
          res.write(`data: ${JSON.stringify({ content: accumulatedText })}\n\n`);
          await new Promise(resolve => setTimeout(resolve, 30)); // Small delay for streaming effect
        }

        // Ensure final message is sent
        res.write(`data: ${JSON.stringify({ content: responseText })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      } catch (error: any) {
        console.error('Simple AI error:', error);
        // Fallback to helpful message
        const fallbackResponse = "I'm here to help with HD Graphics services! However, I'm experiencing some technical difficulties. Please contact us directly at office@HD Graphics.blog or +91 9998739029 for immediate assistance.";
        res.write(`data: ${JSON.stringify({ content: fallbackResponse })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }
    }

    // Use Ollama (if USE_FREE_API=false)
    const ollamaResponse = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: true,
      }),
    });

    if (!ollamaResponse.ok) {
      if (ollamaResponse.status === 404) {
        return res.status(503).json({
          error: 'Model not found',
          message: `Model "${OLLAMA_MODEL}" not found. Please run: ollama pull ${OLLAMA_MODEL}`,
        });
      }
      throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
    }

    // Stream chunks from Ollama
    const reader = ollamaResponse.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          res.write('data: [DONE]\n\n');
          res.end();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;

          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              res.write(`data: ${JSON.stringify({ content: json.message.content })}\n\n`);
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      res.end();
    }
  } catch (error: any) {
    console.error('Chat API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Failed to process chat request',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Chat API server running on http://localhost:${PORT}`);
  if (USE_FREE_API) {
    console.log(`✨ Using FREE Hugging Face API: ${HUGGINGFACE_API}`);
  } else {
    console.log(`📦 Using Ollama model: ${OLLAMA_MODEL}`);
    console.log(`🔗 Ollama URL: ${OLLAMA_URL}`);
  }
});

