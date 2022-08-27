import React from "react";

const PageHeader = ({ children }) => {
  return (
    <h1 className="pb-4 font-sans text-4xl font-black italic text-neutral-800 dark:text-neutral-200">
      {children}
    </h1>
  );
};

export default PageHeader;
