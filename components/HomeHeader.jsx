import React from "react";

const PageHeader = ({ children, paddingTop }) => {
  return (
    <h1
      className={`pt-${paddingTop} pb-4 font-serif text-6xl font-bold text-zinc-800 dark:text-zinc-200 md:pb-0`}
    >
      {children}
    </h1>
  );
};

export default PageHeader;
