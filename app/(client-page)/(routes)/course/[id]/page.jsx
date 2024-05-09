"use client"
import LoginModal from "@/app/(client-page)/(components)/LoginModal";
import CourseSkeleton from "@/app/(skeletons)/CourseSkeleton";
import { auth, db } from "@/app/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { doc } from "firebase/firestore";
import { BookOpen, CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Course = ({ params }) => {
  const courseId = params.id;
  const navigate = useRouter();
  const [user] = useAuthState(auth);

  const [course, loading] = useDocumentData(doc(db, "courses", courseId));

  if (loading) {
    return <CourseSkeleton />;
  }
  return (
    <div className="p-5 flex gap-5">
      <div className=" w-[60%]">
        <div className="w-full h-[60vh] relative overflow-hidden rounded-md mb-4">
          <img
            src={course?.banner}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <Card className="border-[1px] border-[--border ] shadow-none overflow-hidden rounded-lg">
          <CardHeader>
            <p className="py-1 px-3 bg-[#e6f6fd] text-[12px] rounded-md text-[#075985] font-[600] flex items-center w-[150px]">
              {" "}
              <BookOpen size={15} className="mr-1" /> {course?.chapters?.length}{" "}
              chapters
            </p>
            <div>
              <h1 className="text-2xl font-[600] my-2">{course?.courseName}</h1>
              <p className="text-sm text-gray-600 my-3">
                {course?.description}
              </p>
              <div className="flex gap-2">
                {course?.tags?.map((tag) => (
                  <p
                    key={tag.id}
                    className="py-1 px-3 border-[1px] border-[--border ] text-[12px] rounded-md  font-[600] flex items-center "
                  >
                    {tag.tagName}
                  </p>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="w-[40%]">
        <Card className="border-[1px] border-[--border ] shadow-none overflow-hidden rounded-lg bg-gray-800 text-white">
          <CardHeader>
            <div>
              <h1 className="text-2xl font-[600] my-2">
                Ready to start building?
              </h1>
              <p className="text-sm my-3">
                Track your progress, watch with subtitles, change quality &
                speed, and more.
              </p>
              {user ? (
                <Button
                  onClick={() => navigate(`/player/${courseId.id}`)}
                  variant="outline"
                  className="w-full text-black"
                >
                  <CirclePlay size={18} className="mr-2" /> Start watching
                </Button>
              ) : (
                <LoginModal />
              )}
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Course;
