import React from "react";
import TeacherSidebar from "./(components)/TeacherSidebar";
import Header from "../(client-page)/(components)/Header";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <TeacherSidebar />
      <div className="lg:pl-[18%]">{children}</div>
    </div>
  );
};

export default layout;
