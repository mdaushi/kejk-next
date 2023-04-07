import React from "react";
import classNames from "classnames";

const Tag = ({ children }) => {
  return (
    <div
      className={classNames(
        "flex w-max items-center justify-center rounded-lg border px-3 py-1 font-mono text-xs font-normal uppercase leading-tight",
        "border-zinc-300 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
