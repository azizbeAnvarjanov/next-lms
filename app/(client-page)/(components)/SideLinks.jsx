"use client";
import React, { useState } from "react";
import { Code, Compass, Layers, Mail, ShieldEllipsis } from "lucide-react";
import Link from "next/link";

const SideLinks = () => {
  const [isActive, setIsActive] = useState(0);
  const userLinks = [
    {
      label: "Browse",
      icon: <Compass size={18} className="mr-2" />,
      path: "/",
    },
    {
      label: "Workshops",
      icon: <Layers size={18} className="mr-2" />,
      path: "/",
    },
    {
      label: "Problems",
      icon: <Code size={18} className="mr-2" />,
      path: "/",
    },
    {
      label: "Leaderboard",
      icon: <ShieldEllipsis size={18} className="mr-2" />,
      path: "/",
    },
    {
      label: "Newsletter",
      icon: <Mail size={18} className="mr-2" />,
      path: "/",
    },
  ];
  return (
    <div>
      <div className="w-full">
        {userLinks.map((link, i) => (
          <Link
            key={i}
            href="#"
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
