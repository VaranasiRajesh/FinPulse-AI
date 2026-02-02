import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FinancialHealthAnalysis, Language } from "../types";

// Helper to get client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    healthScore: { type: Type.NUMBER, description: "A score from 0 to 100 indicating financial health." },
    summary: { type: Type.STRING, description: "Executive summary of the financial status." },
    metrics: {
      type: Type.OBJECT,
      properties: {
        grossMargin: { type: Type.STRING },
        netProfitMargin: { type: Type.STRING },
        currentRatio: { type: Type.STRING },
        debtToEquity: { type: Type.STRING },
      },
      required: ["grossMargin", "netProfitMargin", "currentRatio", "debtToEquity"],
    },
    risks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          severity: { type: Type.STRING, enum: ["low", "medium", "high"] },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["severity", "title", "description"],
      },
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, enum: ["cost", "revenue", "banking"] },
          title: { type: Type.STRING },
          action: { type: Type.STRING },
        },
        required: ["category", "title", "action"],
      },
    },
    trendData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.STRING },
          revenue: { type: Type.NUMBER },
          expenses: { type: Type.NUMBER },
          profit: { type: Type.NUMBER },
        },
        required: ["month", "revenue", "expenses", "profit"],
      },
    },
    forecastData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.STRING },
          revenue: { type: Type.NUMBER },
          expenses: { type: Type.NUMBER },
          profit: { type: Type.NUMBER },
        },
        required: ["month", "revenue", "expenses", "profit"],
      },
    },
  },
  required: ["healthScore", "summary", "metrics", "risks", "recommendations", "trendData", "forecastData"],
};

export const analyzeFinancials = async (
  textData: string,
  industry: string,
  language: Language
): Promise<FinancialHealthAnalysis> => {
  const ai = getClient();
  const langPrompt = language === Language.HINDI ? "Respond in Hindi where appropriate, but keep keys in English." : "Respond in English.";

  const prompt = `
    Analyze the following financial data for a(n) ${industry} business.
    ${langPrompt}
    Provide a detailed assessment including:
    1. A health score (0-100).
    2. Key financial metrics (Gross Margin, Net Profit, etc).
    3. Identified risks with severity.
    4. Actionable recommendations for cost optimization and growth.
    5. Extract historical trend data (monthly) from the text if available, otherwise estimate/interpolate plausible monthly data based on totals.
    6. Generate a 6-month forecast based on the trends.

    Financial Data:
    ${textData}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as FinancialHealthAnalysis;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Analysis failed", error);
    throw error;
  }
};

export const chatWithAdvisor = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string,
  contextData: string
): Promise<string> => {
  const ai = getClient();
  const systemInstruction = `You are a helpful and expert financial advisor for Small and Medium Enterprises (SMEs).
  You have access to the user's financial data context provided below.
  Answer questions concisely and provide actionable advice.
  Context: ${contextData}`;

  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction,
    },
    history: history,
  });

  const result = await chat.sendMessage({ message });
  return result.text || "I apologize, I could not generate a response.";
};
