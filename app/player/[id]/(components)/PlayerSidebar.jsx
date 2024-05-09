import PlauerSodebarSkeleton from "@/app/(skeletons)/PlauerSodebarSkeleton";
import { Button } from "@/components/ui/button";
import { CirclePause, CirclePlay } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const PlayerSidebar = ({
  chapters,
  loading,
  setChapterIndex,
  chapterIndex,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handel = (i) => {
    setChapterIndex(i);
    setIsActive(i);
  };

  return (
    <div className="fixed left-0 bg-white border-r-[1px] border-r-[--border ] w-[23%] h-full">
      <div className="h-[10vh] flex justify-center items-center space-y-2 w-full border-b-[1px] border-b-[--border ]">
        <Link href="/">
          <img src="/logo.svg" width={150} alt="" />
        </Link>
      </div>
      <div>
        <div className="overflow-y-scroll h-[80vh] flex flex-col">
          {loading ? (
            <PlauerSodebarSkeleton />
          ) : (
            <>
              {chapters.map((chapter, i) => (
                <Button
                  key={i}
                  onClick={() => handel(i)}
                  variant="outline"
                  className={`rounded-none w-full flex items-center justify-start py-7 border-[1px] border-t-0 border-x-0 text-[--text] font-[400] gap-2 items-center ${
                    isActive === i ? "bg-green-200 text-green-500" : ""
                  }`}
                >
                  {chapterIndex === i ? (
                    <CirclePause size={18} />
                  ) : (
                    <CirclePlay size={18} />
                  )}
                  {}
                  {chapter.chapterName}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSidebar;
