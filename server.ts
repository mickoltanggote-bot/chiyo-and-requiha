import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client to prevent crash if key is undefined
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in the environment.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Gemini Assistant Generation Endpoint
app.post("/api/gemini/generate", async (req, res) => {
  const { prompt, type, context } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({ 
      error: "Gemini AI service is currently unavailable. Please verify your GEMINI_API_KEY in Settings." 
    });
  }

  try {
    let systemInstruction = "You are a helpful, professional portfolio assistant.";
    
    if (type === "reply") {
      systemInstruction = `You are a professional email composer. Draft a warm, concise, and structured email response on behalf of Aneela (Chiyo) or Requiha. Adhere to the following context:\n${JSON.stringify(context || {})}`;
    } else if (type === "bio") {
      systemInstruction = `You are a talented creative bio writer. Rewrite or polish the biography of a student at MSU (Mindanao State University) Main Campus, maintaining a professional yet charming and unique tone. Keep the output under 100 words.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const generatedText = response.text || "";
    res.json({ text: generatedText.trim() });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: "Failed to generate text using Gemini API", details: error.message });
  }
});

// 2. Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 3. Vite Server Integration Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static build.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
