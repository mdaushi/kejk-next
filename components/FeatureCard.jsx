import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Tag from "./Tag";

const FeatureCard = ({ title, type, link }) => {
  return (
    <a
      className="group space-y-2 rounded-xl transition-all ease-in-out hover:cursor-pointer
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <header className="mr-2 block text-lg font-bold text-zinc-700 group-hover:underline group-hover:decoration-lime-500 group-hover:decoration-2 group-hover:underline-offset-4 dark:text-zinc-200">
          {title}
        </header>
        <ArrowUpRightIcon className="h-4 w-4 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
      </div>
      <Tag>{type}</Tag>
    </a>
  );
};

export default FeatureCard;
