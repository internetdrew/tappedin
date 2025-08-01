import { type UseFormReturn } from "react-hook-form";
import { type FormData } from "../App";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { audienceOptions, posterTypeOptions, toneOptions } from "@/constants";
import {
  AudioLines,
  LayoutGrid,
  RocketIcon,
  ScrollTextIcon,
  Users,
  UserCheck,
} from "lucide-react";

interface UserInputProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
}

const UserInput = ({ form, onSubmit }: UserInputProps) => {
  return (
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
              You give me the content, I'll generate a social media post for
              you.
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        {/* Poster Type */}
        <Card>
          <CardHeader>
            <CardTitle>
              <UserCheck className="mr-1 inline size-4 text-pink-600" />
              Poster Type
            </CardTitle>
            <CardDescription>
              Select a role to personalize the content style.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="posterType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {posterTypeOptions.map((option) => (
                        <Label
                          htmlFor={option.id}
                          key={option.id}
                          className="flex w-full cursor-pointer items-center rounded-md p-4 ring-1 ring-neutral-500/50 hover:bg-neutral-900"
                        >
                          <option.icon
                            className={`mr-2 size-6 ${option.color}`}
                          />
                          <div className="flex flex-col">
                            <span className="text-lg">{option.name}</span>
                            <span className="text-muted-foreground text-sm">
                              {option.description}
                            </span>
                          </div>
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
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
        {/* Audience */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Users className="mr-1 inline size-4 text-pink-600" />
              Audience
            </CardTitle>
            <CardDescription>
              Choose who you want to reach with your content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {audienceOptions.map((option) => (
                        <Label
                          htmlFor={option.id}
                          key={option.id}
                          className="flex w-full cursor-pointer items-center rounded-md p-4 ring-1 ring-neutral-500/50 hover:bg-neutral-900"
                        >
                          <option.icon
                            className={`mr-2 size-6 ${option.color}`}
                          />
                          <div className="flex flex-col">
                            <span className="text-lg">{option.name}</span>
                            <span className="text-muted-foreground text-sm">
                              {option.description}
                            </span>
                          </div>
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
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
        {/* Platforms */}
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
                          checked={form.watch("platforms").includes("linkedin")}
                          onCheckedChange={(checked) => {
                            const currentPlatforms = form.watch("platforms");
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
                            const currentPlatforms = form.watch("platforms");
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
      </form>
    </Form>
  );
};

export default UserInput;
