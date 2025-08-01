import { z } from "zod";
import { generateLinkedInPost } from "./generateLinkedInPost";
import { generateTwitterThread } from "./generateTwitterThread";

export const GeneratedPostsSchema = z.object({
  linkedin: z.string().optional(),
  twitter: z.array(z.string()).optional(),
});

export type GeneratedPosts = z.infer<typeof GeneratedPostsSchema>;

type Input = {
  content: string;
  tone: string;
  platforms: string[];
  poster: string;
  audience: string;
  callToAction?: string;
};

export async function generatePosts({
  content,
  tone,
  platforms,
  poster,
  audience,
  callToAction,
}: Input): Promise<GeneratedPosts> {
  const result: GeneratedPosts = {};
  console.log("Generating posts for:", platforms);

  // Generate content for each requested platform
  if (platforms.includes("linkedin")) {
    result.linkedin = await generateLinkedInPost({
      poster,
      audience,
      content,
      tone,
      callToAction,
    });
  }

  if (platforms.includes("x")) {
    result.twitter = await generateTwitterThread({
      content,
      tone,
      callToAction,
    });
  }

  return result;
}
