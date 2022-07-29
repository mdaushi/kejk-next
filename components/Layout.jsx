import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  const text = `This site, and all of my work, is dedicated to my hero, my
  inspiration, and the strongest man I've ever known. My father. I love
  you Dad ❤️.`;
  return (
    <div className="mb-24 md:mb-12">
      <Nav />
      <main className="mx-auto h-full w-full max-w-5xl justify-center px-4 md:mt-32">
        {children}
      </main>
      <div className="flex w-full items-center justify-center px-4 pt-16">
        <p className="w-full rounded-xl bg-neutral-100 p-4 text-center text-black dark:bg-neutral-800 dark:text-white md:w-2/3 lg:w-1/3">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Layout;
``;
