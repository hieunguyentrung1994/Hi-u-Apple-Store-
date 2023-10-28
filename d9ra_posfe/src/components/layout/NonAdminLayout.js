import React from "react";
import Navbar from "./NavbarPage";
import Footer from "./Footer";

const NonAdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default NonAdminLayout;
