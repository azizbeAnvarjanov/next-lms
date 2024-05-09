import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

const UserSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  );
};

export default UserSkeleton;
