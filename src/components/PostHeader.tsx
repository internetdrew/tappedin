import { Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const PostHeader = () => {
  return (
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
  );
};

export default PostHeader;
