import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="mb-24 md:mb-12">
      <Nav />
      <main className="mx-auto h-full w-full max-w-5xl justify-center px-4 md:mt-32">
        {children}
      </main>
    </div>
  );
};

export default Layout;
``;
