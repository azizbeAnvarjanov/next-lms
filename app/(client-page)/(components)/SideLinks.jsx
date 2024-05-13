"use client";
import React, { useState } from "react";
import {
  Airplay,
  Bookmark,
  Code,
  Compass,
  ContactRound,
  GalleryVerticalEnd,
  Layers,
  Mail,
  ShieldEllipsis,
} from "lucide-react";
import Link from "next/link";

const SideLinks = () => {
  const [isActive, setIsActive] = useState(0);
  const userLinks = [
    {
      label: "All courses",
      icon: <GalleryVerticalEnd size={18} className="mr-2" />,
      path: "/",
    },
    {
      label: "My Courses",
      icon: <Airplay size={18} className="mr-2" />,
      path: "/my-courses",
    },
    {
      label: "Saved",
      icon: <Bookmark size={18} className="mr-2" />,
      path: "/",
    },
    {
      label: "Authors",
      icon: <ContactRound size={18} className="mr-2" />,
      path: "/",
    },
  ];
  return (
    <div>
      <div className="w-full">
        {userLinks.map((link, i) => (
          <Link
            key={i}
            href={link.path}
            onClick={() => setIsActive(i)}
            variant="outline"
            className={`w-full flex items-center justify-start px-4 py-3 border-none shadow-none hover:bg-[#f1f5f9] rounded-md transition-all ${
              isActive === i ? "bg-[--activeLink] text-black" : ""
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideLinks;
