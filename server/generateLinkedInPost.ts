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

const linkedinSystemPrompt = `
You're writing a LinkedIn post for a thoughtful professional.

## GOAL
Reflect on a real experience, tension, or pattern. The post should feel honest, personal, and rooted in actual work, not polished for performance.

## VOICE
- First-person (I, we, my, etc.)
- Natural, like you're talking to peers
- Reflective, not prescriptive
- It's okay to end unresolved
- Avoid content marketing tone or big advice

## STYLE
- Short paragraphs (1–3 sentences)
- Vary rhythm and structure
- Lists are welcome if they feel natural
- Skip intros and conclusions, start with the tension, end with a thought
- Do not use hyphens or dashes to connect ideas, thoughts, or sentences

## EXAMPLE
Here's a post that captures the right feeling and structure:

"I’ve worked with a lot of smart marketers who secretly hate writing.

Not because they’re bad at it — but because every draft feels like a performance.

Writing to please a stakeholder. Writing to sound strategic. Writing like a LinkedIn version of themselves.

The irony is that the best content I’ve seen usually comes from a place of frustration. Or confusion. Or curiosity.

Real voice leaks through the cracks when the performance breaks.

So the next time you write, skip the clever framing. Just say the thing."

## OUTPUT
Return only this:
{
  "linkedin": "Your post text here, using \\n\\n between paragraph breaks"
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

  const userPrompt = `
Write a LinkedIn post based on the following idea. Don’t summarize it, but respond like someone thinking out loud about it:

---
${content}
---

Tone: ${toneInstruction}

The post should sound like it's coming from a ${poster}, speaking to ${audience.replace("_", " ")} peers.

${
  callToAction
    ? `Close with this prompt: ${callToAction}`
    : "You can end with a quiet question or reflection — no need for a CTA."
}
`.trim();

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: linkedinSystemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.8,
    });

    const raw = response.output_text.trim();
    const parsed = z.object({ linkedin: z.string() }).parse(JSON.parse(raw));

    return parsed.linkedin;
  } catch (error) {
    console.error("LinkedIn post generation failed:", error);
    throw new Error("Failed to generate LinkedIn post from AI.");
  }
}
