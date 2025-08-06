import * as z from "zod";
import { Sparkle } from "lucide-react";
import { ThemeProvider } from "./components/theme-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";
import PreviewCard from "./components/PreviewCard";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import UserInput from "./components/UserInput";
import { useState } from "react";
import Results from "./components/Results";
import type { AppRouter } from "server";
import type { inferProcedureOutput } from "@trpc/server";
import { Card, CardTitle, CardHeader, CardContent } from "./components/ui/card";
import { TRPCClientError } from "@trpc/client";
import FeedbackForm from "./components/FeedbackForm";

const formSchema = z.object({
  content: z
    .string()
    .min(500, "Your blog post must be at least 500 characters")
    .max(10000, "Your blog post must be less than 10,000 characters"),
  tone: z.string().min(1, "Please select a tone"),
  posterType: z.string().min(1, "Please select a poster type"),
  audience: z.string().min(1, "Please select an audience"),
  callToAction: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
export type GeneratePostOutput = inferProcedureOutput<
  AppRouter["generatePost"]
>;

function App() {
  const [results, setResults] = useState<GeneratePostOutput | null>(null);
  const [renderRateLimitMessage, setRenderRateLimitMessage] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tone: "",
      posterType: "",
      audience: "",
      callToAction: "",
    },
  });

  const mutation = useMutation(trpc.generatePost.mutationOptions());

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync(
        {
          content: data.content,
          tone: data.tone,
          poster: data.posterType,
          audience: data.audience,
          callToAction: data.callToAction || "",
        },
        {
          onSuccess: (data) => {
            setResults(data);
          },
        },
      );
    } catch (error) {
      if (error instanceof TRPCClientError && error.data?.httpStatus === 429) {
        setRenderRateLimitMessage(true);
      }
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar
        renderStartOver={!!results}
        onStartOver={() => {
          setRenderRateLimitMessage(false);
          setResults(null);
          form.reset();
        }}
      />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-0">
        {renderRateLimitMessage ? (
          <Card className="mx-auto my-10 max-w-lg">
            <CardHeader>
              <CardTitle>You've hit your generation limit!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Thank you for trying out the app! It looks like you've hit the
                generation limit for today. Please try again in 24 hours.
              </p>
              <p>Got feedback? I'd love to hear it.</p>
              <p>
                Whether you're using this as an individual or at an agency, I'm
                curious how it might fit into your workflow or how it could work
                better for you.
              </p>
              <FeedbackForm />
            </CardContent>
          </Card>
        ) : (
          <>
            {mutation.isPending || results ? (
              <Results results={results} isGenerating={mutation.isPending} />
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
                      !!form.watch("audience")
                    }
                  />
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={mutation.isPending}
                    className="mt-4 w-full"
                  >
                    <Sparkle className="size-4" />
                    {mutation.isPending ? "Generating..." : "Generate"}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
