import React from "react";

const PageHeader = ({ children }) => {
  return (
    <h1 className="pb-4 font-sans text-3xl md:text-5xl font-black italic text-gray-800 dark:text-gray-200">
      {children}
    </h1>
  );
};

export default PageHeader;
