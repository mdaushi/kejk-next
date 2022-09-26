import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Tag from "../components/Tag";

const WritingCard = ({ title, subtitle, tag }) => {
  return (
    <div
      className=" group space-y-2 rounded-xl transition-all ease-in-out hover:cursor-pointer
    "
    >
      <div className="flex w-full items-start justify-between gap-2">
        <header className="mr-2 block text-lg font-bold text-gray-700 group-hover:underline group-hover:decoration-teal-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-gray-200">
          {title}
        </header>
        <ArrowLongRightIcon className="h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400" />
      </div>
      <span className="block pb-2 text-gray-500 dark:text-gray-400">
        {subtitle}
      </span>
      {tag !== undefined && (
      <Tag>{tag}</Tag>
      )}
    </div>
  );
};

export default WritingCard;
