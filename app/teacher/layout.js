import React from "react";
import TeacherHeader from "./(components)/TeacherHeader";
import TeacherSidebar from "./(components)/TeacherSidebar";

const layout = ({ children }) => {
  return (
    <div>
      <TeacherHeader />
      <TeacherSidebar />
      <div>{children}</div>
    </div>
  );
};

export default layout;
