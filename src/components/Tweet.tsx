import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Tweet = () => {
  return (
    <div className="mx-auto max-w-xl bg-white">
      <Card className="border-0 shadow-none">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
              />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="mb-2 text-sm font-medium">Alex Johnson</div>

              <p className="text-sm leading-relaxed">
                Just shipped a new feature that our users have been requesting
                for months. Sometimes the simplest solutions are the most
                powerful ones. 🚀
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tweet;
