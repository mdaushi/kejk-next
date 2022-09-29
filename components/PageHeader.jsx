import React from "react";

const PageHeader = ({ children, paddingTop }) => {
  return (
    <h1
      className={`pt-${paddingTop} pb-4 font-sans text-3xl font-black italic text-gray-800 dark:text-gray-200 md:text-5xl`}
    >
      {children}
    </h1>
  );
};

export default PageHeader;
