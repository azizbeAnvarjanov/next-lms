"use client";
import AllCoursesSkeleton from "@/app/(skeletons)/AllCoursesSkeleton";
import { db } from "@/app/firebaseConfig";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { collection } from "firebase/firestore";
import { BookOpen, Heart, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const AllCourses = () => {
  const [courses, loadin, error] = useCollectionData(collection(db, "courses"));
  const activeCourses = courses?.filter(
    (course) => course.status === "published"
  );
  if (loadin) {
    return <AllCoursesSkeleton />;
  }

  

  return (
    <div className="grid grid-cols-4 gap-4 scroll-ms p-5">
      {activeCourses?.map((course, i) => (
        <div key={course.id} className="min-h-[40vh]">
          <Card className="border-[1px] border-[--border ] shadow-none overflow-hidden rounded-lg h-full">
            <div className="w-full h-[22vh] relative">
              <Link href={`/course/${course.id}`}>
                <Image
                  className="object-cover w-full h-full"
                  src={course.banner}
                  alt="5"
                  fill
                />
              </Link>
              <div className="w-[30px] h-[30px] bg-white bg-opacity-15 absolute top-2 left-2 rounded-sm flex justify-center items-center z-50 hover:bg-opacity-30 cursor-pointer">
                <HeartIcon className="text-white" size={18} />
              </div>
            </div>
            <CardContent className="p-4">
              <CardTitle className="font-[600] text-[1.2em]">
                <Link href={`/course/${course.id}`} className="capitalize">
                  {course.courseName}
                </Link>
                <p className="text-sm mt-2 text-black font-medium">
                  <strong>Author:</strong> {course.author}
                </p>
              </CardTitle>
            </CardContent>
            <CardFooter className="px-4 flex flex-col justify-start items-start space-y-2">
              <p className="py-1 px-3 bg-[#e6f6fd] text-[12px] rounded-md text-[#075985] font-[600] flex items-center">
                {" "}
                <BookOpen size={15} className="mr-1" /> {course.chapters.length}{" "}
                chapters
              </p>
              <div className="flex flex-wrap gap-2">
                {course?.tags?.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="border-[1px] border-[--border ]"
                  >
                    {tag.tagName}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AllCourses;
