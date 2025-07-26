import { openai } from "./open-ai";
import { z } from "zod";

export const GeneratedPostsSchema = z.object({
  linkedin: z.string().optional(),
  twitter: z.array(z.string()).optional(),
});

export type GeneratedPosts = z.infer<typeof GeneratedPostsSchema>;

type Input = {
  content: string;
  tone: string;
  platforms: string[];
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

const systemPrompt = `
You are a sharp, human-sounding social media writer.

Your job:
- Take blog content and turn it into social posts
- Use the described tone
- Format for LinkedIn (long post) and Twitter (thread)
- Each tweet < 280 characters
- Include CTA if given
- NO em dashes. Use commas or periods instead.
- NO markdown, backticks, or code formatting
- NO robotic tone or generic AI-sounding phrases
- Return VALID JSON ONLY in this format:
{
  "linkedin": "string",
  "twitter": ["string", "string"]
}
`.trim();

export async function generatePosts({
  content,
  tone,
  platforms,
  callToAction,
}: Input): Promise<GeneratedPosts> {
  const toneInstruction = toneInstructions[tone.toLowerCase()] || "";

  const userPrompt = `
Blog Content:
${content}

Tone:
${toneInstruction}

Platforms:
${platforms.join(", ")}

${callToAction ? `Call to Action:\n${callToAction}` : ""}
`.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      // Optional: enable native JSON mode for stricter output
      // response_format: "json",
    });

    const raw = response.choices[0].message.content?.trim() || "";
    const parsed = GeneratedPostsSchema.parse(JSON.parse(raw));
    return parsed;
  } catch (error) {
    console.error("gpt-4o-mini generation failed:", error);
    throw new Error("Failed to generate posts from AI.");
  }
}
