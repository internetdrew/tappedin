import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { audienceOptions, posterTypeOptions, toneOptions } from "../constants";
import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "../App";

interface PreviewCardProps {
  form: UseFormReturn<FormData>;
  onGenerate: () => void;
  isGenerating: boolean;
  isFormValid: boolean;
}

const PreviewCard = ({ form }: PreviewCardProps) => {
  const content = form.watch("content");
  const tone = form.watch("tone");
  const posterType = form.watch("posterType");
  const audience = form.watch("audience");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-pink-600"></span>
          Preview
        </CardTitle>
        <CardDescription>
          Here's the criteria we'll use to generate your posts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                content.trim().length > 0 ? "bg-pink-600" : "bg-neutral-600"
              }`}
            ></span>
            <span
              className={`${
                content.trim().length > 0 ? "text-pink-600" : "text-neutral-600"
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
            <span className={`${tone ? "text-pink-600" : "text-neutral-600"}`}>
              Tone selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                posterType ? "bg-pink-600" : "bg-neutral-600"
              }`}
            ></span>
            <span
              className={`${posterType ? "text-pink-600" : "text-neutral-600"}`}
            >
              Poster type selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                audience ? "bg-pink-600" : "bg-neutral-600"
              }`}
            ></span>
            <span
              className={`${audience ? "text-pink-600" : "text-neutral-600"}`}
            >
              Audience selected
            </span>
          </div>
        </div>

        {tone && (
          <div className="space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
            <p className="text-neutral-400">Selected Tone</p>
            <p className="font-semibold">
              {(() => {
                const selectedTone = toneOptions.find(
                  (option) => option.value === tone,
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
        {posterType && (
          <div className="space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
            <p className="text-neutral-400">Selected Poster Type</p>
            <p className="font-semibold">
              {(() => {
                const selectedTone = posterTypeOptions.find(
                  (option) => option.id === posterType,
                );

                if (selectedTone) {
                  const IconComponent = selectedTone.icon;
                  return (
                    <>
                      <IconComponent
                        className={`${selectedTone.color} mr-2 inline size-4`}
                      />
                      {selectedTone.name}
                    </>
                  );
                }
                return "No poster type selected";
              })()}
            </p>
          </div>
        )}
        {audience && (
          <div className="space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
            <p className="text-neutral-400">Audience Selected</p>
            <p className="font-semibold">
              {(() => {
                const selectedAudience = audienceOptions.find(
                  (option) => option.id === audience,
                );

                if (selectedAudience) {
                  const IconComponent = selectedAudience.icon;
                  return (
                    <>
                      <IconComponent
                        className={`${selectedAudience.color} mr-2 inline size-4`}
                      />
                      {selectedAudience.name}
                    </>
                  );
                }
                return "No audience selected";
              })()}
            </p>
          </div>
        )}
        {content && (
          <div className="space-y-2 rounded-md bg-neutral-900 p-4 ring-1 ring-neutral-500/50">
            <p className="text-neutral-400">Content Analysis</p>
            <p className="font-semibold">{content.length} characters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
