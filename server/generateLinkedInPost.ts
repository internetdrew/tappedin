import { openai } from "./open-ai";
import { z } from "zod";

type Input = {
  content: string;
  tone: string;
  poster: string;
  audience: string;
  callToAction?: string;
};

const getToneInstruction = (
  tone: string,
  poster: string,
  audience: string,
): string => {
  const toneTemplates: Record<
    string,
    (poster: string, audience: string) => string
  > = {
    conversational: (poster, audience) =>
      `Write like you're having coffee with a fellow ${audience.replace("_", " ")} professional. As a ${poster}, share what you've learned, not what you think they should know. Use 'I've found that...' and personal anecdotes that resonate with ${audience}.`,

    professional: (poster, audience) =>
      `Write with quiet confidence as a ${poster} speaking to ${audience}. You've been there, done that in your field. Share insights without being preachy. Think about how respected ${poster}s communicate with ${audience} - authoritative but approachable.`,

    energetic: (poster, audience) =>
      `Write with conviction about what excites you as a ${poster}. Show your passion for the problem space that ${audience} cares about. Use energy to pull ${audience} into your thinking, not just hype. Connect your ${poster} perspective to their world.`,

    thoughtful: (poster, audience) =>
      `Take a step back and share the deeper patterns you're seeing as a ${poster}. Ask questions that make ${audience} think differently about their challenges. Write like you're processing ideas in real-time, connecting your ${poster} experience to their ${audience} reality.`,
  };

  return (
    toneTemplates[tone]?.(poster, audience) ||
    toneTemplates.professional(poster, audience)
  );
};

const linkedinSystemPrompt = `
You are writing as a thoughtful, helpful person sharing insights on LinkedIn.

CRITICAL WRITING RULES:
- NEVER EVER use em dashes (—)
- NEVER EVER use en dashes (–)
- NEVER EVER use double hyphens (--)
- When you want to connect ideas, use periods and start new sentences
- Use commas for brief pauses
- Use colons for explanations
- Break up long thoughts into shorter, punchier sentences

FORMATTING:
- Use actual line breaks (\\n\\n) between distinct thoughts or paragraphs
- Don't create walls of text
- Each paragraph should focus on one main idea

Your voice:
- Share practical insights and lessons learned
- Connect ideas to real challenges in your field
- Lead with helpfulness and authenticity
- Avoid summarizing - instead reflect and build on ideas

Structure:
- Start with a hook that's a personal observation or contrarian take
- Share 2-3 specific insights or examples
- End with a question or gentle CTA that invites discussion

Rules:
- NO summarizing the blog content
- NO generic business advice
- NO listicles or obvious takeaways
- Use personal pronouns (I, we, my)
- Write like you're talking to peers, not lecturing
- Return VALID JSON ONLY: {"linkedin": "string"}
`.trim();

export async function generateLinkedInPost({
  content,
  tone,
  callToAction,
  poster,
  audience,
}: Input): Promise<string> {
  const toneInstruction = getToneInstruction(tone, poster, audience);

  const userPrompt = `
Transform this blog content into a founder's LinkedIn reflection:

Content: ${content}

Writing Style: ${toneInstruction}

Instructions:
- Don't summarize the content
- Share your perspective on these ideas
- Connect them to real challenges professionals face
- What patterns do you see? What questions does this raise?
- Write like you're building on the ideas, not just sharing them

${callToAction ? `Discussion starter: ${callToAction}` : "End with a question that invites peer discussion"}
`.trim();

  const fullPrompt = `${linkedinSystemPrompt}\n\n${userPrompt}`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: fullPrompt,
      temperature: 0.7,
    });

    const raw = response.output_text.trim();
    const parsed = z.object({ linkedin: z.string() }).parse(JSON.parse(raw));

    return parsed.linkedin;
  } catch (error) {
    console.error("LinkedIn post generation failed:", error);
    throw new Error("Failed to generate LinkedIn post from AI.");
  }
}
