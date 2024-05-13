"use client";
import LoginModal from "@/app/(client-page)/(components)/LoginModal";
import CourseSkeleton from "@/app/(skeletons)/CourseSkeleton";
import { auth, db } from "@/app/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { doc, updateDoc } from "firebase/firestore";
import { BookOpen, CirclePlay, UserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Course = ({ params }) => {
  const courseId = params.id;
  const navigate = useRouter();
  const [user] = useAuthState(auth);
  const userUid = auth?.currentUser?.uid;

  const [course, loading] = useDocumentData(doc(db, "courses", courseId));
  const subscribers = course?.subscribers;

  const subscribeFn = async () => {
    if (subscribers?.includes(userUid)) {
      const newData = subscribers?.filter((subs) => subs !== userUid);
      await updateDoc(doc(db, "courses", courseId), {
        subscribers: newData,
      });
    } else {
      await updateDoc(doc(db, "courses", courseId), {
        subscribers: [...subscribers, userUid],
      });
    }
  };

  if (loading) {
    return <CourseSkeleton />;
  }
  return (
    <div className="p-5 flex gap-5">
      <div className=" w-[60%]">
        <div className="w-full h-[60vh] relative overflow-hidden rounded-md mb-4 relative">
          <Image
            src={course?.banner}
            className="w-full h-full object-cover"
            alt=""
            fill
          />
        </div>
        <Card className="border-[1px] border-[--border ] shadow-none overflow-hidden rounded-lg">
          <CardHeader>
            <div className="flex gap-2">
              <p className="py-1 px-3 bg-[#e6f6fd] text-[12px] rounded-md text-[#075985] font-[600] flex items-center w-[150px]">
                {" "}
                <BookOpen size={15} className="mr-1" />{" "}
                {course?.chapters?.length} chapters
              </p>
              <p className="py-1 px-3 bg-[#e6f6fd] text-[12px] rounded-md text-[#075985] font-[600] flex items-center w-[150px]">
                {" "}
                <UserRound size={15} className="mr-1" />{" "}
                {course?.subscribers?.length} Subscribes
              </p>
            </div>
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
                <div className="flex gap-2">
                  {subscribers?.includes(userUid) ? (
                    <Button
                      onClick={() => navigate.push(`/player/${courseId}`)}
                      variant="outline"
                      className="w-full text-black"
                    >
                      <CirclePlay size={18} className="mr-2" /> Start watching
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Button
                    onClick={() => subscribeFn(courseId)}
                    variant="outline"
                    className={`w-full text-black  ${
                      subscribers?.includes(userUid)
                        ? "bg-red-500 text-white border-none hover:bg-red-700 hover:text-white"
                        : ""
                    }`}
                  >
                    {subscribers?.includes(userUid)
                      ? "Unsubscribe"
                      : "Subscribe"}
                  </Button>
                </div>
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
