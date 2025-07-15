// import { trpc } from "../utils/trpc";
// import { useQuery } from "@tanstack/react-query";
import {
  AudioLines,
  Briefcase,
  LayoutGrid,
  LightbulbIcon,
  RocketIcon,
  ScrollTextIcon,
  Sparkle,
  Users,
  Zap,
} from "lucide-react";
import { ThemeProvider } from "./components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./components/ui/form";
import { trpc } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";

const toneOptions = [
  {
    label: "Professional",
    description: "Formal, authoritative tone for business content",
    icon: Briefcase,
    value: "professional",
    color: "text-blue-600",
  },
  {
    label: "Conversational",
    description: "Friendly, approachable tone for engagement",
    icon: Users,
    value: "conversational",
    color: "text-green-600",
  },
  {
    label: "Energetic",
    description: "Enthusiastic, motivational tone",
    icon: Zap,
    value: "energetic",
    color: "text-orange-600",
  },
  {
    label: "Thoughtful",
    description: "Reflective, insightful tone for deeper content",
    icon: LightbulbIcon,
    value: "thoughtful",
    color: "text-purple-600",
  },
];

const formSchema = z.object({
  content: z.string().min(1, "Content is required"),
  tone: z.string().min(1, "Please select a tone"),
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  callToAction: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function App() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tone: "",
      platforms: [],
      callToAction: "",
    },
  });

  const mutation = useMutation(trpc.generatePosts.mutationOptions());

  const onSubmit = async (data: FormData) => {
    const result = await mutation.mutateAsync(
      {
        content: data.content,
        tone: data.tone,
        platforms: data.platforms,
        callToAction: data.callToAction || "",
      },
      {
        onSuccess: (data) => {
          console.log("Success:", data);
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      },
    );
    console.log("Result:", result);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-0">
        <h1 className="mt-6 text-xl font-semibold">
          Repurposing Content for Social Media
        </h1>
        <h2 className="mt-2 max-w-md">
          Transform your content into engaging social media posts that build
          authority and position you as a thought leader.
        </h2>
        <div className="my-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="form-cards"
              className="flex flex-col gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    <ScrollTextIcon className="mr-1 inline size-4 text-pink-600" />
                    Content Input
                  </CardTitle>
                  <CardDescription>
                    You give me the content, I'll generate a social media post
                    for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your content here and we'll generate a social media post
                            for you."
                            className="h-44 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <AudioLines className="mr-1 inline size-4 text-pink-600" />
                    Tone & Voice
                  </CardTitle>
                  <CardDescription>
                    Let me know how you want your content to read.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            className="space-y-2"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            {toneOptions.map((option) => (
                              <Label
                                htmlFor={option.value}
                                key={option.value}
                                className="flex w-full cursor-pointer items-center rounded-md p-4 ring-1 ring-neutral-500/50 hover:bg-neutral-900"
                              >
                                <option.icon
                                  className={`mr-2 size-6 ${option.color}`}
                                />
                                <div className="flex flex-col">
                                  <span className="text-lg">
                                    {option.label}
                                  </span>
                                  <span className="text-muted-foreground text-sm">
                                    {option.description}
                                  </span>
                                </div>
                                <RadioGroupItem
                                  value={option.value}
                                  id={option.value}
                                  className="ml-auto text-blue-600"
                                />
                              </Label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <LayoutGrid className="mr-1 inline size-4 text-pink-600" />
                    Platforms
                  </CardTitle>
                  <CardDescription>
                    Select the platforms you want to post to.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="platforms"
                    render={() => (
                      <FormItem>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 rounded-md p-4 ring-1 ring-neutral-500/50">
                            <FormControl>
                              <Checkbox
                                id="linkedin"
                                checked={form
                                  .watch("platforms")
                                  .includes("linkedin")}
                                onCheckedChange={(checked) => {
                                  const currentPlatforms =
                                    form.watch("platforms");
                                  if (checked) {
                                    form.setValue("platforms", [
                                      ...currentPlatforms,
                                      "linkedin",
                                    ]);
                                  } else {
                                    form.setValue(
                                      "platforms",
                                      currentPlatforms.filter(
                                        (p) => p !== "linkedin",
                                      ),
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <Label htmlFor="linkedin">LinkedIn</Label>
                          </div>
                          <div className="flex items-center gap-3 rounded-md p-4 ring-1 ring-neutral-500/50">
                            <FormControl>
                              <Checkbox
                                id="x"
                                checked={form.watch("platforms").includes("x")}
                                onCheckedChange={(checked) => {
                                  const currentPlatforms =
                                    form.watch("platforms");
                                  if (checked) {
                                    form.setValue("platforms", [
                                      ...currentPlatforms,
                                      "x",
                                    ]);
                                  } else {
                                    form.setValue(
                                      "platforms",
                                      currentPlatforms.filter((p) => p !== "x"),
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <Label htmlFor="x">X (Formerly Twitter)</Label>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* CTA */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <RocketIcon className="mr-1 inline size-4 text-pink-600" />
                    Call to Action
                    <Badge variant="outline" className="ml-6">
                      Optional
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Add a call to action to your post.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="callToAction"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="e.g., Visit our website, Download our guide... "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !form.watch("content").trim() ||
                  !form.watch("tone") ||
                  form.watch("platforms").length === 0
                }
              >
                <Sparkle className="size-4" />
                Generate
              </Button>
            </form>
          </Form>
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-pink-600"></span>
                  Preview
                </CardTitle>
                <CardDescription>
                  Here's the criteria we'll use to generate your posts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      form.watch("content").trim().length > 0
                        ? "bg-pink-600"
                        : "bg-neutral-600"
                    }`}
                  ></span>
                  <span
                    className={`${
                      form.watch("content").trim().length > 0
                        ? "text-pink-600"
                        : "text-neutral-600"
                    }`}
                  >
                    Content added
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      form.watch("tone") ? "bg-pink-600" : "bg-neutral-600"
                    }`}
                  ></span>
                  <span
                    className={`${
                      form.watch("tone") ? "text-pink-600" : "text-neutral-600"
                    }`}
                  >
                    Tone selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      form.watch("platforms").length > 0
                        ? "bg-pink-600"
                        : "bg-neutral-600"
                    }`}
                  ></span>
                  <span
                    className={`${
                      form.watch("platforms").length > 0
                        ? "text-pink-600"
                        : "text-neutral-600"
                    }`}
                  >
                    Platform(s) chosen
                  </span>
                </div>

                {form.watch("tone") && (
                  <div className="mt-6 space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
                    <p className="text-neutral-400">Selected Tone</p>
                    <p className="font-semibold">
                      {(() => {
                        const selectedTone = toneOptions.find(
                          (option) => option.value === form.watch("tone"),
                        );

                        if (selectedTone) {
                          const IconComponent = selectedTone.icon;
                          return (
                            <>
                              <IconComponent
                                className={`${selectedTone.color} mr-2 inline size-4`}
                              />
                              {selectedTone.label}
                            </>
                          );
                        }
                        return "No tone selected";
                      })()}
                    </p>
                  </div>
                )}
                {form.watch("platforms").length > 0 && (
                  <div className="mt-6 space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
                    <p className="text-neutral-400">Selected Platform(s)</p>
                    <p className="font-semibold">
                      {form.watch("platforms").map((platform) => (
                        <Badge
                          key={platform}
                          variant="outline"
                          className="mr-2 bg-pink-600 text-white"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Badge>
                      ))}
                    </p>
                  </div>
                )}
                {form.watch("content") && (
                  <div className="mt-6 space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
                    <p className="text-neutral-400">Content Analysis</p>
                    <p className="font-semibold">
                      {form.watch("content").length} characters
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
