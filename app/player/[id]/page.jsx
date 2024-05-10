"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/(client-page)/(components)/Header";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

import PlayerVideo from "./(components)/PlayerVideo";
import PlayerSidebar from "./(components)/PlayerSidebar";

const CoursePlayer = ({ params }) => {
  const courseId = params.id;
  const [course, loading] = useDocumentData(doc(db, "courses", courseId));
  const chapters = course?.chapters;
  const [chapterIndex, setChapterIndex] = useState(0);
  const watchVideo = course?.chapters[chapterIndex];

  return (
    <div>
      <PlayerSidebar
        chapters={chapters}
        chapterIndex={chapterIndex}
        loading={loading}
        setChapterIndex={setChapterIndex}
      />
      <div className="pl-[23%]">
        <PlayerVideo watchVideo={watchVideo} />
      </div>
    </div>
  );
};

export default CoursePlayer;
