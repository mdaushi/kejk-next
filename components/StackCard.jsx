import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Tag from "../components/Tag";

const StackCard = ({ title, subtitle, image, link, tags }) => {
  return (
    <a
      className="flex flex-col justify-between space-y-2 rounded-xl border border-zinc-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-lime-500 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-col justify-start">
        <div className="flex w-full items-start justify-between pb-2">
          <Image
            className="rounded"
            src={image}
            width={50}
            height={50}
            placeholder="blur"
            blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
            alt="Image of the software icon"
            quality={50}
          />
          <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
        </div>
        <div className="items-top flex w-full gap-2">
          <header className="mr-2 pb-2 text-lg font-bold text-zinc-700 dark:text-zinc-200">
            {title}
          </header>
        </div>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </span>
      </div>
      <div className="flex w-full items-center justify-start space-x-2 pt-4">
        {tags.map((tag, idx) => {
          return <Tag key={idx}>{tag}</Tag>;
        })}
      </div>
    </a>
  );
};

export default StackCard;
