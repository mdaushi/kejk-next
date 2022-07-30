import React from "react";

const PageHeader = ({ children }) => {
  return (
    <h1 className="pb-4 text-4xl font-bold text-gray-700 dark:text-gray-200">
      {children}
    </h1>
  );
};

export default PageHeader;
