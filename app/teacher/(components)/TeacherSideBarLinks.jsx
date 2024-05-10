"use client"
import {
  BarChart3,
  Code,
  Compass,
  Layers,
  Mail,
  Presentation,
  ShieldEllipsis,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const TeacherSideBarLinks = () => {
  const [isActive, setIsActive] = useState(0);

  const teacherLinks = [
    {
      label: "All courses",
      icon: <Presentation size={18} className="mr-2" />,
      path: "/teacher",
    },
    {
      label: "Analytics",
      icon: <BarChart3 size={18} className="mr-2" />,
      path: "/teacher/analytics",
    },
  ];
  return (
    <div>
      <div className="w-full">
        {teacherLinks.map((link, i) => (
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

export default TeacherSideBarLinks;
