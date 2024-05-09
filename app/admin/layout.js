import React from "react";
import AdminHeader from "./(components)/AdminHeader";
import AdminSidebar from "./(components)/AdminSidebar";

const layout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div>{children}</div>
    </div>
  );
};

export default layout;
