"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, EllipsisVertical, ListFilter, Plus } from "lucide-react";
import AddCourseModal from "./AddCourseModal";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, deleteField, updateDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { db, storage } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-hot-toast";
import { doc, deleteDoc } from "firebase/firestore";

const AllCoursesTable = () => {
  const [allCourses, loadin, error] = useCollectionData(
    collection(db, "courses")
  );

  const deleteDocF = async (course) => {
    const path = "course_banners/" + course.id + "-banner";
    const desertRef = ref(storage, path);
    deleteObject(desertRef).then(() => {});
    await deleteDoc(doc(db, "courses", course.id));
    toast.success(`Course deleted !`);
  };
 
  const changeStatus = async (course, value) => {
    await updateDoc(doc(db, "courses", course.id), {
      status: value,
    }).then(() => {
      toast.success("Status updated !");
    });
  }

  const naviagte = useRouter();
  const tables = [{}, {}, {}, {}, {}, {}, {}];
  return (
    <div className="p-5">
      <div className="border rounded-lg w-full bg-white">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              className="max-w-xs"
              placeholder="Search courses..."
              type="search"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ListFilter size={18} className="mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[300px]">
                <DropdownMenuLabel>Filter Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>
                  <CircleCheck className="w-4 h-4 mr-2" />
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  <CircleCheck className="w-4 h-4 mr-2" />
                  Archived
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuRadioGroup value="enrolled">
                  <DropdownMenuRadioItem value="enrolled">
                    Enrolled
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="instructor">
                    Instructor
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="status">
                    Status
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <AddCourseModal />
        </div>
        <div className="relative w-full overflow-auto p-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadin ? (
                <>
                  {tables.map((table, i) => (
                    <TableRow key={i} className="w-full">
                      <TableCell className="font-medium">
                        <Skeleton className="h-5 w-[300px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-[70px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-7 w-7" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  {allCourses?.map((course, i) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        {course?.courseName}
                      </TableCell>
                      <TableCell>{course?.author}</TableCell>
                      <TableCell>
                        <Badge
                          variant="success"
                          className={`${
                            course.status === "published"
                              ? "bg-green-500"
                              : "bg-gray-600 text-white"
                          } capitalize`}
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <EllipsisVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                naviagte.push(`/course-details/${course.id}`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(course, "published")} >Publish</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(course, "draft")} >Draft</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => deleteDocF(course)}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesTable;
