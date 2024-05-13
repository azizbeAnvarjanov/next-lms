import React from "react";
import Image from "next/image";

const NotDataBlock = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full h-[90vh]">
      <Image width={300} height={300} src="/not-data-2.png" alt="" />
      <div className="text-center">
        <h2 className="text-xl font-semibold">Courses not found</h2>
        <p className="text-sm text-gray-500">
          You haven't signed up for any course yet
        </p>
      </div>
    </div>
  );
};

export default NotDataBlock;
