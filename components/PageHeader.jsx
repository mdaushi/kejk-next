import React from "react";

const PageHeader = ({ children, paddingTop }) => {
  return (
    <h1
      className={`pt-${paddingTop} pb-4 text-4xl font-black text-gray-800 dark:text-gray-200 md:text-5xl font-display`}
    >
      {children}
    </h1>
  );
};

export default PageHeader;
