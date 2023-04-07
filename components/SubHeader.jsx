import React from "react";

const SubHeader = ({ children }) => {
  return (
    <h2
      className={`pb-4 pt-0 font-sans text-lg font-semibold text-zinc-600 dark:text-zinc-400 md:text-xl`}
    >
      {children}
    </h2>
  );
};

export default SubHeader;
