import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GeminiReport } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are a dental education assistant. You help patients understand restorative dental possibilities in plain language. You NEVER diagnose, prescribe treatment, or make medical recommendations. Always end with a disclaimer.`;

function buildPrompt(concernText: string): string {
  return `A patient describes their concern as: "${concernText}".
Based on common prosthodontic presentations matching this description,
respond ONLY with valid JSON:
{
  "complexityTier": "mild|moderate|complex",
  "possiblePathways": ["string", ...],
  "restorationScore": number,
  "educationalNote": "string",
  "disclaimer": "string"
}`;
}

const FALLBACK_REPORT: GeminiReport = {
  complexityTier: "moderate",
  possiblePathways: [
    "Consultation with a prosthodontist for a comprehensive evaluation",
    "Diagnostic imaging and records for treatment planning",
    "Discussion of restorative options tailored to your needs",
  ],
  restorationScore: 5,
  educationalNote:
    "Restorative dental treatments vary widely based on individual oral health conditions. A thorough clinical examination is essential to determine the most appropriate approach for your specific situation.",
  disclaimer:
    "This report is for educational purposes only and does not constitute a medical diagnosis or treatment recommendation. Please consult a licensed prosthodontist for professional advice.",
};

export async function generateReport(concernText: string): Promise<GeminiReport> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I will act as a dental education assistant and never provide diagnoses." }] },
        { role: "user", parts: [{ text: buildPrompt(concernText) }] },
      ],
    });

    const text = result.response.text();
    const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const parsed: GeminiReport = JSON.parse(cleaned);

    return {
      complexityTier: parsed.complexityTier ?? FALLBACK_REPORT.complexityTier,
      possiblePathways: parsed.possiblePathways ?? FALLBACK_REPORT.possiblePathways,
      restorationScore: parsed.restorationScore ?? FALLBACK_REPORT.restorationScore,
      educationalNote: parsed.educationalNote ?? FALLBACK_REPORT.educationalNote,
      disclaimer: parsed.disclaimer ?? FALLBACK_REPORT.disclaimer,
    };
  } catch {
    return FALLBACK_REPORT;
  }
}
