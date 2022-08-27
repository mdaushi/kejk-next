import React from "react";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

const StackCard = ({ title, subtitle, image, link, tags }) => {
  return (
    <a
      className="unstyled flex flex-col justify-between space-y-2 rounded-xl border border-neutral-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full items-start justify-between pb-2">
        <Image
          className="rounded"
          width={50}
          height={50}
          src={image}
          placeholder="blur"
          blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
          alt="Image of the software icon"
          quality={50}
        />
        <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      </div>
      <div className="flex w-full items-center gap-2">
        <header className="text-md mr-2 block font-bold text-neutral-700 dark:text-neutral-200">
          {title}
        </header>
      </div>
      <span className="block font-mono text-sm text-neutral-500 dark:text-neutral-400">
        {subtitle}
      </span>
      <div className="flex w-full items-center justify-start space-x-2 pt-4">
        {tags.map((tag, id) => {
          return (
            <div
              key={id}
              className={classNames(
                "flex w-max items-center justify-center rounded-lg border px-3 py-1 font-mono text-xs font-normal uppercase leading-tight",
                "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-900/30 dark:text-teal-200"
              )}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </a>
  );
};

export default StackCard;
