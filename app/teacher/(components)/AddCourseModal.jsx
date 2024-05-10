"use client"
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
const AddCourseModal = () => {
  const [courseName, setCourseName] = useState();
  const navigate = useRouter();

  const author = auth.currentUser?.displayName;



  const addCourse = (e) => {
    e.preventDefault();
    try {
      const courseId = courseName.replaceAll(" ", "-").toLowerCase();
      const data = {
        id: courseId,
        courseName,
        author,
        description: "",
        chapters: [],
        tags: [],
        free: false,
        banner: "",
      };

      setDoc(doc(db, "courses", courseId), data).then(() => {
        console.log("doc created");
        toast.success("Course success created");
        navigate.push(`course-details/${courseId}`);
      });
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus size={18} className="mr-2" />
            Add Course
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new course.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addCourse} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <Button className="w-full mt-3" type="submit">
              Create Course
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCourseModal;
