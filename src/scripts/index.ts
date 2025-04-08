/**
 * AI Integration Script
 * This file configures and initializes the Google Generative AI (Gemini) integration
 * for generating interview questions and providing feedback
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize Gemini AI with API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the AI model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

/**
 * Generation Configuration
 * Controls how the AI model generates responses
 */
const generationConfig = {
  temperature: 1, // Controls randomness in responses (0-1)
  topP: 0.95, // Nucleus sampling parameter
  topK: 40, // Top-k sampling parameter
  maxOutputTokens: 8192, // Maximum length of generated response
  responseMimeType: "text/plain", // Response format
};

/**
 * Safety Settings
 * Configures content filtering and safety thresholds
 */
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Initialize chat session with configured settings
export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
});
