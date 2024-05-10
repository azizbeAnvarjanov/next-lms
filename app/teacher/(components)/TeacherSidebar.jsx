import React from "react";
import Link from "next/link";
import TeacherSideBarLinks from "./TeacherSideBarLinks";
import SideBottomDropdown from "./SideBottomDropdown";
import Image from "next/image";
const TeacherSidebar = () => {
  return (
    <div>
      <div className="hidden lg:flex flex-col w-[18%] bg-white p-3 border-r-[1px] border-[--border ] h-screen fixed left-0 top-0 text-[--text]">
        <div className="w-full h-[10vh] flex items-center px-2">
          <Link href="/">
            <Image width={150} height={100} src="/logo.svg" alt="" />
          </Link>
        </div>
        <TeacherSideBarLinks />
        <div className="sidebar-bottoom absolute bottom-0 h-[10vh] border-t-[1px] border-t-[--border ] w-full left-0 py-3 px-5 flex items-center justify-between">
          <p className="text-sm">© 2024 ENRA d.o.o.</p>
          <SideBottomDropdown />
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
