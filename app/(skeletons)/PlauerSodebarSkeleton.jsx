import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PlauerSodebarSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col py-3 space-y-2">
        <Skeleton className="h-[50px] w-[95%] mx-auto rounded-md" />
        <Skeleton className="h-[50px] w-[95%] mx-auto rounded-md" />
        <Skeleton className="h-[50px] w-[95%] mx-auto rounded-md" />
        <Skeleton className="h-[50px] w-[95%] mx-auto rounded-md" />
      </div>
    </div>
  );
};

export default PlauerSodebarSkeleton;
