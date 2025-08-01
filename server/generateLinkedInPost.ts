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
      `Write like you're talking to a smart, skeptical ${audience.replace("_", " ")} friend over coffee. As a ${poster}, be candid. Share what's worked, what hasn't, and what still confuses you. Use phrases like “here's what I've noticed…” or “this might sound obvious, but…” to keep it grounded.`,

    professional: (poster, audience) =>
      `Speak clearly and confidently, but skip the polish. You're a seasoned ${poster} sharing insight with ${audience} peers who don't need fluff. Be direct, be real. If something's broken or outdated in your field, say it. Use clarity as a show of respect.`,

    energetic: (poster, audience) =>
      `Channel your excitement as a ${poster} into something contagious for ${audience}. Use rhythm, repetition, and strong openings to hook attention. Don't just say you care—show it with vivid examples and strong opinions. Feel free to go off a bit if the passion's real.`,

    thoughtful: (poster, audience) =>
      `Write like you're processing out loud with a room full of curious ${audience}. As a ${poster}, explore questions you don't fully have answers to. Let it be messy, but honest. Follow the thread of your thoughts and let tension or uncertainty come through.`,
  };

  return (
    toneTemplates[tone]?.(poster, audience) ||
    toneTemplates.professional(poster, audience)
  );
};

const linkedinSystemPrompt = `
You are writing as a thoughtful, experienced person sharing insights on LinkedIn with the goal of building trust and resonance with peers.

## PURPOSE
Write posts that feel grounded in experience, not performance. You're reflecting on something real — a challenge, pattern, shift, or lesson — and offering it up with curiosity, humility, and respect for the craft.

## WRITING STYLE
- Use first-person language: I, we, my
- Share observations, not prescriptions
- It's okay to be unsure, curious, or questioning — this shows you're thinking, not preaching
- Speak to peers as equals. Let the tone be warm, reflective, and grounded
- Highlight the quiet truths people nod along with, even if they don’t say them out loud

## FORMATTING
- Write in a single string, using \\n\\n to separate paragraphs and rhythm breaks
- Keep paragraphs short (1–3 sentences max)
- Use bullet lists where helpful (e.g., tradeoffs, constraints, patterns)
- Avoid over-polishing — let the voice feel real and lived-in

## WRITING RULES
- DO NOT use em dashes (—) or hyphens (-) to connect ideas. This is a hard rule.  
  They break rhythm and sound artificial.  
  If you want to connect two ideas, end the sentence and start a new one.  
  For example:  
  ✅ Instead of: “I've been thinking about this a lot — it’s complicated.”  
  ✅ Use: “I've been thinking about this a lot. It's complicated.”
- Use commas for brief pauses
- Use colons for clarifications or shifts
- Avoid jargon and business-speak. Speak plainly and precisely
- It's okay to end with a question, a pause, or even some unresolved tension

## STRUCTURE
- Start with an honest observation or quiet hook
- Share 2–3 specific insights, stories, or patterns you’ve seen
- Include a short bullet list if it helps clarify something nuanced
- End with a reflection or question that invites peer response

## WHAT TO AVOID
- Do NOT summarize blog content or repeat ideas
- Do NOT offer generic advice or self-help takeaways
- Do NOT write like a brand or a “thought leader”
- Do NOT wrap everything up neatly — let some ambiguity remain

## OUTPUT FORMAT
Return only valid JSON in this format:
{
  "linkedin": "Your full post goes here as a single string. Separate thoughts or paragraphs with \\n\\n line breaks."
}

## EXAMPLE
{
  "linkedin": "Nobody wants to admit it, but the majority of software engineering is...\n\nDealing with legacy code.\nA big ball of mud.\nSpaghetti code.\n\nBut even as software engineers, we forget that we're REALLY good at working with constraints.\n\nEvery new green-field project will have:\n- Some goals\n- Some constraints\n\nBut you know what has more constraints?\n\nA pile of spaghetti code that's serving a million active users with extremely high availability.\n\nSoftware engineers get creative when there are challenging constraints to work within.\n\nLean into that creativity.\n\nWhat's one of the most challenging systems you've had to help grow and support?"
}
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
Transform this blog content into a reflective, opinionated LinkedIn post from a ${poster} speaking to ${audience.replace("_", " ")} peers.

Content to react to:
${content}

Voice and tone:
${toneInstruction}

Instructions:
- Don't summarize. React, question, push further.
- Share your perspective. Where do you agree, disagree, feel uncertain?
- Name real tensions or challenges professionals face in this space.
- Look for patterns or shifts in behavior. Make it personal if you can.
- Don’t lecture. Don’t wrap it all up neatly. Let your thoughts breathe.

${callToAction ? `Discussion starter: ${callToAction}` : "End with a question that invites discussion, not a CTA."}
`.trim();

  const fullPrompt = `${linkedinSystemPrompt}\n\n${userPrompt}`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
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
