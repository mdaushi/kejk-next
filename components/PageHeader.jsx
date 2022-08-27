import React from "react";

const PageHeader = ({ children }) => {
  return (
    <h1 className="pb-4 text-4xl italic font-black text-neutral-800 dark:text-neutral-200 font-sans">
      {children}
    </h1>
  );
};

export default PageHeader;
