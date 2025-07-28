import { openai } from "./open-ai";
import { z } from "zod";

type Input = {
  content: string;
  tone: string;
  callToAction?: string;
};

const toneInstructions: Record<string, string> = {
  conversational:
    "Use a casual, natural tone like a smart friend. Avoid overthinking. Use contractions.",
  professional:
    "Use a clear, confident tone. Write like a B2B marketer with good taste. No buzzwords.",
  energetic:
    "Short, punchy sentences. Drive excitement and urgency. Make the reader feel momentum.",
  thoughtful:
    "Slow down. Write with warmth and insight. Ask questions. Avoid over-promising.",
};

const twitterSystemPrompt = `
You are a sharp, human-sounding Twitter writer.

Your job:
- Take blog content and turn it into a Twitter thread
- Use the described tone
- Each tweet < 280 characters
- Include CTA if given
- NO em dashes. Use commas or periods instead.
- NO markdown, backticks, or code formatting
- NO robotic tone or generic AI-sounding phrases
- Return VALID JSON ONLY in this format:
{
  "twitter": ["string", "string"]
}
`.trim();

export async function generateTwitterThread({
  content,
  tone,
  callToAction,
}: Input): Promise<string[]> {
  const toneInstruction = toneInstructions[tone.toLowerCase()] || "";

  const userPrompt = `
Blog Content:
${content}

Tone:
${toneInstruction}

${callToAction ? `Call to Action:\n${callToAction}` : ""}
`.trim();

  const fullPrompt = `${twitterSystemPrompt}\n\n${userPrompt}`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: fullPrompt,
      temperature: 0.5,
    });

    const raw = response.output_text.trim();
    const parsed = z
      .object({ twitter: z.array(z.string()) })
      .parse(JSON.parse(raw));
    return parsed.twitter;
  } catch (error) {
    console.error("Twitter thread generation failed:", error);
    throw new Error("Failed to generate Twitter thread from AI.");
  }
}
