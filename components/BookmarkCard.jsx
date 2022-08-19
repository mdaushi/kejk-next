import React from "react";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const BookmarkCard = ({ title, subtitle, url, date }) => {
  return (
    <div
      className="group flex min-h-full flex-col space-y-2 rounded-xl  transition-all ease-in-out hover:cursor-pointer unstyled
    "
    >
      <div className="flex h-max w-full items-start justify-between gap-2 ">
        <header className="text-md mr-2 block font-bold text-neutral-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-neutral-200">
          {title}
        </header>
        <ArrowSmRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      </div>
      <div className="flex min-h-full w-full flex-1 flex-col justify-between ">
        <span className="flex text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </span>
        <div className="flex text-sm leading-6 text-neutral-500 dark:text-neutral-400 pt-4">
          <span className="flex w-full justify-start font-mono text-xs font-light uppercase leading-6 text-neutral-500 dark:text-neutral-400">
            {date}
          </span>
          <span className="flex w-full justify-end font-mono text-xs font-light uppercase leading-6 text-teal-700 dark:text-teal-400">
            {url}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
