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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-hot-toast";

import { updateProfile } from "firebase/auth";
import { auth, storage } from "@/app/firebaseConfig";

const ChangeImgModal = () => {
  const [profileImg, setProfileImg] = useState();

  const upload = async (file) => {
    const path = "profileImgs/" + file.name + "-profileImg";
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    await getDownloadURL(ref(storage, path)).then((url) => {
      toast.success("Img profile uploaded !");
      setProfileImg(url);
      updateProfile(auth.currentUser, {
        photoURL: url,
      }).then(() => window.location.reload());
    });
  };

  console.log(profileImg);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload size={18} className="mr-2" />
            Change profile photo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <div className="grid w-full max-w-sm items-center gap-4 mt-4">
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
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : undefined;
                  upload(file);
                }}
              />
            </div>
          </div>
          {/* <Button onClick={upload}>Upload</Button> */}
          {/* <Button d>uploading...</Button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeImgModal;
