import { Heart, ThumbsUp } from "lucide-react";

const EngagementStats = () => {
  return (
    <div className="p-2">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1">
          <div className="flex -space-x-1">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
              <ThumbsUp className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <Heart className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <span>Sarah Chen, Mike Johnson and 47 others</span>
        </div>
        <div className="flex space-x-4">
          <span>12 comments</span>
          <span>3 reposts</span>
        </div>
      </div>
    </div>
  );
};

export default EngagementStats;
