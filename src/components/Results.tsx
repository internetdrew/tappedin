import type { GeneratePostsOutput } from "@/App";
import { Card, CardContent } from "./ui/card";
import { Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EngagementStats from "./EngagementStats";
import PostBody from "./PostBody";

const Results = ({ results }: { results: GeneratePostsOutput }) => {
  const linkedInPost = results.linkedin;
  const twitterPosts = results.twitter;

  if (!linkedInPost && !twitterPosts) {
    return <div>Yikes! I think something went wrong.</div>;
  }

  return (
    <div className="my-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
      {linkedInPost && (
        <Card className="p-4">
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
            </div>
            <PostBody linkedInPost={linkedInPost} />
            <EngagementStats />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Results;
