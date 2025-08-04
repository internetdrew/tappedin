import type { GeneratePostOutput } from "@/App";
import { Card, CardAction, CardContent } from "./ui/card";
import { Copy, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EngagementStats from "./EngagementStats";
import PostBody from "./PostBody";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Results = ({ results }: { results: GeneratePostOutput }) => {
  const [copied, setCopied] = useState(false);

  if (!results) {
    return <div>Yikes! I think something went wrong.</div>;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="my-10">
      <Card className="mx-auto max-w-xl p-4">
        <CardContent className="p-0">
          <div className="flex items-start justify-between p-2">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt="Profile"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <h3 className="text-sm font-semibold">John Doe</h3>
                  <span className="text-blue-600">•</span>
                  <span className="text-sm text-blue-600">3rd+</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Senior Software Engineer at TechCorp
                </p>
                <div className="mt-1 flex items-center space-x-1">
                  <span className="text-muted-foreground text-xs">2h</span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <Globe className="text-muted-foreground h-3 w-3" />
                </div>
              </div>
            </div>

            <CardAction>
              {copied ? (
                <span className="text-sm font-medium">Copied</span>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="transition-all duration-200"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Copy className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </Button>
              )}
            </CardAction>
          </div>
          <PostBody post={results} />
          <EngagementStats />
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
