import React from "react";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const WritingCard = ({ title, subtitle, link }) => {
  return (
    <a
      className="rounded-xlp-4 0 group space-y-2 transition-all ease-in-out hover:cursor-pointer
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <headline className="text-md mr-2 block font-bold text-neutral-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-neutral-200">
          {title}
        </headline>
        <ArrowSmRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      </div>
      <p className="block text-sm leading-6 text-neutral-500 dark:text-neutral-400">
        {subtitle}
      </p>
    </a>
  );
};

export default WritingCard;
