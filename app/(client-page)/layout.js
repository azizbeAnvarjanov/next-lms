import React from "react";
import Header from "./(components)/Header";
import SideBar from "./(components)/SideBar";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="lg:pl-[18%]">{children}</div>
    </div>
  );
};

export default layout;
