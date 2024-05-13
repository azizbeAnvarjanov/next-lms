"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChevronLeft, CircleX, PlusIcon, UploadCloud } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db, storage } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

const CourseDetails = ({ params }) => {
  const courseId = params.id;
  const navigate = useRouter();

  const [courseDetails] = useDocumentData(doc(db, "courses", courseId));
  const courseNameData = courseDetails?.courseName;
  const courseDescription = courseDetails?.description;
  const courseChapters = courseDetails?.chapters;
  const courseTags = courseDetails?.tags;
  const courseBanner = courseDetails?.banner;
  const courseStatus = courseDetails?.status;
  console.log(courseChapters);

  const [chapters, setChapters] = useState([]);
  const [tags, setTags] = useState([]);

  const [tagName, setTagName] = useState();
  const [chapterName, setChapterName] = useState();
  const [chapterVideo, setChapterVideo] = useState();

  const changeCourseFields = async (name, value) => {
    await updateDoc(doc(db, "courses", courseId), {
      [name]: value,
    });
  };

  const uploadBanner = async (file) => {
    const path = "course_banners/" + courseId + "-banner";
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    await getDownloadURL(ref(storage, path)).then((url) => {
      toast.success("Img banner success uploaded !");
      updateDoc(doc(db, "courses", courseId), {
        banner: url,
      }).then(() => toast.success("banner updated !"));
    });
  };
  const addTags = async (e) => {
    e.preventDefault();
    const id = tagName.replaceAll(" ", "-").toLowerCase();
    setTags([...tags, { id, tagName }]);
    setTagName("");
    await updateDoc(doc(db, "courses", courseId), {
      tags: [
        ...tags,
        {
          id,
          tagName,
        },
      ],
    }).then(() => {
      toast.success("chapter updated !");
    });
  };

  const deleteTag = async (id) => {
    const newTags = tags.filter((el) => el.id !== id);
    setTags(newTags);
    await updateDoc(doc(db, "courses", courseId), {
      tags: newTags,
    }).then(() => {
      toast.success("chapter updated !");
    });
  };

  const addChapter = async () => {
    setChapters([
      ...chapters,
      {
        id: chapterName.replaceAll(" ", "-").toLowerCase(),
        chapterName,
        chapterVideo,
        isComplited: false,
      },
    ]);
    await updateDoc(doc(db, "courses", courseId), {
      chapters: [
        ...chapters,
        {
          id: chapterName.replaceAll(" ", "-").toLowerCase(),
          chapterName,
          chapterVideo,
          isComplited: false,
        },
      ],
    }).then(() => {
      toast.success("chapter updated !");
    });
  };

  const changeStatus = async (value) => {
    await updateDoc(doc(db, "courses", courseId), {
      status: value,
    }).then(() => {
      toast.success("Status updated !");
    });
  };

  return (
    <div className="p-5">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate.push("/")}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {courseNameData}
            </h1>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="border-none">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="courseName"
                        className="w-full"
                        placeholder="Gamer Gear Pro Controller"
                        defaultValue={courseNameData}
                        onChange={(e) =>
                          changeCourseFields(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                        className="min-h-32"
                        name="description"
                        defaultValue={courseDescription}
                        onChange={(e) =>
                          changeCourseFields(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className="border-none">
                <CardHeader>
                  <CardTitle>Course chapters</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 py-4">
                    <Input
                      type="text"
                      placeholder="Chapter Name"
                      onChange={(e) => setChapterName(e.target.value)}
                      value={chapterName}
                    />
                    <Input
                      type="text"
                      placeholder="Chapter Video Link"
                      onChange={(e) => setChapterVideo(e.target.value)}
                      value={chapterVideo}
                    />
                    <Button onClick={addChapter}>
                      <PlusIcon size={18} />
                    </Button>
                  </div>
                  <>
                    <div>
                      {courseChapters?.map((chapter, i) => (
                        <div
                          key={i}
                          className="border-[--border ] border-[1px] rounded-md pl-4 flex items-center py-4 justify-between mb-3"
                        >
                          Chapter {i + 1}: {chapter.chapterName}
                        </div>
                      ))}
                    </div>
                  </>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Course status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={courseStatus}
                    onValueChange={(e) => changeStatus(e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        className="capitalize"
                        placeholder={courseStatus}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="published">Publish</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Course tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid items-center gap-4">
                    <form onSubmit={addTags}>
                      <Input
                        placeholder="write tags"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                      />
                    </form>
                  </div>
                  <div className="flex flex-wrap py-2 gap-2">
                    {courseTags?.map((tag) => (
                      <div key={tag.id}>
                        <Badge>
                          {tag.tagName}
                          <CircleX
                            onClick={() => deleteTag(tag.id)}
                            size={15}
                            className="ml-2"
                          />
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Course Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    {courseBanner && (
                      <div className="w-full h-[20vh] relative overflow-hidden mb-2">
                        <div className="w-full h-[20vh] relative overflow-hidden mb-2">
                          <img
                            alt="Course image"
                            className="object-cover"
                            src={courseBanner}
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid w-full max-w-sm items-center gap-4">
                      <div className="group relative flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-6 py-10 text-center transition-colors hover:border-gray-400 dark:border-gray-600 dark:bg-gray-950">
                        <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                          <UploadCloud className="mx-auto h-8 w-8" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-gray-50">
                              Drag and drop
                            </span>
                            {" \n                  "}or
                            <span className="font-medium text-gray-900 dark:text-gray-50">
                              click to upload
                            </span>
                          </div>
                          <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <Input
                          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                          id="file-upload"
                          type="file"
                          onChange={(e) => uploadBanner(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Course</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
