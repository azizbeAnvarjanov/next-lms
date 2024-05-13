import { auth, db } from "@/app/firebaseConfig";
import { collection, doc, updateDoc } from "firebase/firestore";
import { HeartIcon } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import React from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

const SavedBtn = ({ courseId }) => {
  const [course] = useDocumentData(doc(db, "courses", courseId));
  const userUid = auth?.currentUser?.uid;
  const saveds = course?.saveds;


  const saveCourse = async () => {
    if (saveds?.includes(userUid)) {
      const newData = saveds?.filter((saveds) => saveds !== userUid);
      await updateDoc(doc(db, "courses", courseId), {
        saveds: newData,
      });
    } else {
      await updateDoc(doc(db, "courses", courseId), {
        saveds: [...saveds, userUid],
      });
    }
  };

  return (
    <div
      onClick={saveCourse}
      className="w-[30px] h-[30px] bg-white bg-opacity-15 absolute top-2 left-2 rounded-sm flex justify-center items-center z-50 hover:bg-opacity-30 cursor-pointer"
    >
      {saveds?.includes(userUid) ? (
        <>
          <FaHeart color="red" className="text-white" size={18} />
        </>
      ) : (
        <>
          <FaRegHeart className="text-white" size={18} />
        </>
      )}
    </div>
  );
};

export default SavedBtn;
