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
import { useState } from "react";
import { Button } from "./components/ui/button";

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

function App() {
  const [content, setContent] = useState("");
  const [tone, setTone] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);

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
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <ScrollTextIcon className="mr-1 inline size-4 text-pink-600" />
                  Content Input
                </CardTitle>
                <CardDescription>
                  You give me the content, I'll generate a social media post for
                  you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your content here and we'll generate a social media post
                  for you."
                  className="h-44 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                <RadioGroup
                  defaultValue="professional"
                  className="space-y-2"
                  value={tone}
                  onValueChange={(value) => setTone(value)}
                >
                  {toneOptions.map((option) => (
                    <Label
                      htmlFor={option.value}
                      className="flex w-full cursor-pointer items-center rounded-md p-4 ring-1 ring-neutral-500/50 hover:bg-neutral-900"
                    >
                      <option.icon className={`mr-2 size-6 ${option.color}`} />
                      <div className="flex flex-col">
                        <span className="text-lg">{option.label}</span>
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
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-md p-4 ring-1 ring-neutral-500/50">
                    <Checkbox
                      id="linkedin"
                      checked={platforms.includes("linkedin")}
                      onCheckedChange={(checked) =>
                        setPlatforms(
                          checked
                            ? [...platforms, "linkedin"]
                            : platforms.filter((p) => p !== "linkedin"),
                        )
                      }
                    />
                    <Label htmlFor="linkedin">LinkedIn</Label>
                  </div>
                  <div className="flex items-center gap-3 rounded-md p-4 ring-1 ring-neutral-500/50">
                    <Checkbox
                      id="x"
                      checked={platforms.includes("x")}
                      onCheckedChange={(checked) =>
                        setPlatforms(
                          checked
                            ? [...platforms, "x"]
                            : platforms.filter((p) => p !== "x"),
                        )
                      }
                    />
                    <Label htmlFor="x">X (Formerly Twitter)</Label>
                  </div>
                </div>
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
                <Input placeholder="e.g., Visit our website, Download our guide... " />
              </CardContent>
            </Card>
            <Button className="w-full">
              <Sparkle className="size-4" />
              Generate
            </Button>
          </div>
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
                      content.trim().length > 0
                        ? "bg-pink-600"
                        : "bg-neutral-600"
                    }`}
                  ></span>
                  <span
                    className={`${
                      content.trim().length > 0
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
                      tone ? "bg-pink-600" : "bg-neutral-600"
                    }`}
                  ></span>
                  Tone selected
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-pink-600"></span>
                  Platform(s) chosen
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
