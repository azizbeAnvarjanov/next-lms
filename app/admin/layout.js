import React from "react";
import AdminSidebar from "./(components)/AdminSidebar";
import Header from "../(client-page)/(components)/Header";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <AdminSidebar />
      <div className="lg:pl-[18%]">{children}</div>
    </div>
  );
};

export default layout;
