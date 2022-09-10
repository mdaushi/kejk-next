import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const FeatureCard = ({ title, type, link }) => {
  return (
    <a
      className="0  group space-y-2 rounded-xl transition-all ease-in-out hover:cursor-pointer
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <header className="mr-2 block text-lg font-bold tracking-wide text-gray-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-gray-200">
          {title}
        </header>
        <ArrowLongRightIcon className="h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400" />
      </div>
      <span className="block leading-6 text-teal-700 dark:text-teal-400">
        {type}
      </span>
    </a>
  );
};

export default FeatureCard;
