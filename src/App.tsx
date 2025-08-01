import * as z from "zod";
import { Sparkle } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";
import PreviewCard from "./components/PreviewCard";
import { Button } from "./components/ui/button";
import SiteHeader from "./components/SiteHeader";
import UserInput from "./components/UserInput";
import { useState } from "react";
import Results from "./components/Results";
import type { AppRouter } from "server";
import type { inferProcedureOutput } from "@trpc/server";

const formSchema = z.object({
  content: z.string().min(1, "Content is required"),
  tone: z.string().min(1, "Please select a tone"),
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  posterType: z.string().min(1, "Please select a poster type"),
  audience: z.string().min(1, "Please select an audience"),
  callToAction: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
export type GeneratePostsOutput = inferProcedureOutput<
  AppRouter["generatePosts"]
>;

function App() {
  const [results, setResults] = useState<GeneratePostsOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tone: "",
      platforms: [],
      posterType: "",
      audience: "",
      callToAction: "",
    },
  });

  const mutation = useMutation(trpc.generatePosts.mutationOptions());

  const onSubmit = async (data: FormData) => {
    await mutation.mutateAsync(
      {
        content: data.content,
        tone: data.tone,
        platforms: data.platforms,
        poster: data.posterType,
        audience: data.audience,
        callToAction: data.callToAction || "",
      },
      {
        onSuccess: (data) => {
          console.log("Success:", data);
          setResults(data);
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      },
    );
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-0">
        <SiteHeader />
        {results ? (
          <Results results={results} />
        ) : (
          <div className="my-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <UserInput form={form} onSubmit={onSubmit} />
            <div className="sticky top-6 self-start">
              <PreviewCard
                form={form}
                onGenerate={form.handleSubmit(onSubmit)}
                isGenerating={mutation.isPending}
                isFormValid={
                  !!form.watch("content").trim() &&
                  !!form.watch("tone") &&
                  !!form.watch("posterType") &&
                  !!form.watch("audience") &&
                  form.watch("platforms").length > 0
                }
              />
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={
                  !form.watch("content").trim() ||
                  !form.watch("tone") ||
                  !form.watch("posterType") ||
                  !form.watch("audience") ||
                  form.watch("platforms").length === 0
                }
                className="mt-4 w-full"
              >
                <Sparkle className="size-4" />
                {mutation.isPending ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
