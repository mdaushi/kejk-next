import React from "react";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

const FeatureCard = ({ title, type, link }) => {
  return (
    <a
      className="0 group space-y-2 rounded-xl transition-all ease-in-out hover:cursor-pointer
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <header className="text-md mr-2 block font-bold text-neutral-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-neutral-200">
          {title}
        </header>
        <ArrowSmRightIcon className="h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      </div>
      <span className="block text-sm leading-6 text-teal-500 dark:text-teal-400">
        {type}
      </span>
    </a>
  );
};

export default FeatureCard;
