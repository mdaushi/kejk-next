import React from "react";

const PageHeader = ({ children, paddingTop }) => {
  return (
    <h1
      className={`pt-${paddingTop} pb-4 font-gambarino text-6xl text-neutral-800 dark:text-neutral-200`}
    >
      {children}
    </h1>
  );
};

export default PageHeader;
