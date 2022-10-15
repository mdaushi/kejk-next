import React from "react";
import classNames from "classnames";

const AllCapsHeader = ({ children, marginTop, justify }) => {
  return (
    <p
      className={classNames(
        `mt-${marginTop} flex w-full items-center ${justify} font-mono uppercase text-gray-500 dark:text-gray-400 md:mb-1`
      )}
    >
      {children}
    </p>
  );
};

export default AllCapsHeader;
