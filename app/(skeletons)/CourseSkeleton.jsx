import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CourseSkeleton = () => {
  return (
    <div className="p-5 flex gap-5">
      <div className=" w-[60%]">
        <div className="w-full h-[60vh] relative overflow-hidden rounded-md mb-4">
          <Skeleton className="h-[100%] w-[100%] rounded-xl" />
        </div>
        <Card className="border-[1px] border-[--border] shadow-none overflow-hidden rounded-lg">
          <CardHeader>
            <>
              <Skeleton className="h-[15px] w-[150px] rounded-xl" />
              <Skeleton className="h-[15px] w-[250px] rounded-xl" />
              <Skeleton className="h-[150px] w-[100%] rounded-xl" />
              <div className="flex gap-3">
                <Skeleton className="h-[30px] w-[100px] rounded-md" />
                <Skeleton className="h-[30px] w-[100px] rounded-md" />
                <Skeleton className="h-[30px] w-[100px] rounded-md" />
              </div>
            </>
          </CardHeader>
        </Card>
      </div>
      <div className="w-[40%]">
        <Card className="border-[1px] border-[--border] shadow-none overflow-hidden rounded-lg bg-gray-800 text-white">
          <CardHeader>
            <>
              <Skeleton className="h-[20px] w-[70%] bg-white rounded-md" />
              <Skeleton className="h-[20px] w-[95%] bg-white rounded-md" />
              <Skeleton className="h-[30px] w-[100%] bg-white rounded-md" />
            </>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default CourseSkeleton;
