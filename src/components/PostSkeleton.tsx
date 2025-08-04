import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

const PostSkeleton = () => {
  return (
    <div className="my-10">
      <Card className="mx-auto max-w-xl p-4">
        <CardContent className="p-0">
          <div className="flex items-start justify-between p-2">
            <div className="flex items-start space-x-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-4" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-4 w-48" />
                <div className="mt-1 flex items-center space-x-2">
                  <Skeleton className="h-3 w-6" />
                  <Skeleton className="h-3 w-1" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                </div>
              </div>
            </div>

            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          <div className="space-y-2 p-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex space-x-4 px-2 pt-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostSkeleton;
