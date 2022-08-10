import React from "react";
import classNames from "classnames";

const AllCapsHeader = ({ children, marginTop }) => {
  return (
    <p
      className={classNames(
        `mt-${marginTop} flex items-center md:mb-1 font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400`
      )}
    >
      {children}
    </p>
  );
};

export default AllCapsHeader;
