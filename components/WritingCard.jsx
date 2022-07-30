import React from "react";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const WritingCard = ({ title, subtitle }) => {
  return (
    <div
      className="0 group space-y-2 rounded-xl transition-all ease-in-out hover:cursor-pointer
    "
    >
      <div className="flex w-full items-start justify-between gap-2">
        <header className="text-md mr-2 block font-bold text-neutral-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-neutral-200">
          {title}
        </header>
        <ArrowSmRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      </div>
      <p className="block text-sm leading-6 text-neutral-500 dark:text-neutral-400">
        {subtitle}
      </p>
    </div>
  );
};

export default WritingCard;
