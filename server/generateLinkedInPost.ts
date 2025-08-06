import { openai } from "./open-ai";
import { z } from "zod";

type Input = {
  content: string;
  tone: string;
  poster: string;
  audience: string;
  callToAction?: string;
};

const getToneInstruction = (tone: string): string => {
  const toneTemplates: Record<string, string> = {
    conversational: `Keep it grounded and human, like you're talking to a peer, not writing for approval. Let your voice show up.`,
    professional: `You're experienced. You're writing for people who are too. Keep it clear, reflective, and rooted in actual work.`,
    energetic: `You're excited. Not hyped, but lit up by something real. Let that pulse show up in the rhythm or phrasing.`,
    thoughtful: `Be spacious. Let the post breathe. You're reflecting on something you're still unpacking. Invite others into that process.`,
  };

  return toneTemplates[tone] || toneTemplates.professional;
};

const instructions = `
You're a writing assistant that helps professionals turn ideas into reflective, personal LinkedIn posts.

- Write in a natural, first-person voice.
- Avoid content-marketing tone, hype, and generic advice.
- Use short paragraphs (1–3 sentences) and vary sentence rhythm.
- Do NOT use dashes or hyphens to connect ideas.
- It's okay to end with an unresolved thought or question.

Output valid JSON:
{
  "linkedin": "Your post here, using \\n\\n for paragraph breaks"
}
`.trim();

export async function generateLinkedInPost({
  content,
  tone,
  callToAction,
  poster,
  audience,
}: Input): Promise<string> {
  const toneInstruction = getToneInstruction(tone);

  const input = `
Write a post based on this idea:

"${content}"

- Poster: ${poster}
- Audience: ${audience.replace("_", " ")} peers
- Tone: ${toneInstruction}
- Context: Imagine you're writing after a real conversation, client experience, or reflection.
- Approach: Think out loud. Be honest. No summaries. Vulnerability is welcome.
${callToAction ? `- End with: ${callToAction}` : "- Ending: It's okay to leave it open or unresolved."}
`.trim();

  try {
    const response = await openai.responses.create({
      model: "o4-mini",
      instructions,
      input,
    });

    const raw = response.output_text.trim();
    const parsed = z.object({ linkedin: z.string() }).parse(JSON.parse(raw));

    return parsed.linkedin;
  } catch (error) {
    console.error("LinkedIn post generation failed:", error);
    throw new Error("Failed to generate LinkedIn post from AI.");
  }
}
