import React from "react";
import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/outline"

const AppCard = ({ title, subtitle, image, link }) => {
  return (
    <a
      className="space-y-2 rounded-xl border border-neutral-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900
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
          alt="Image of the plugin icon"
          quality={50}
          objectFit="cover"
          objectPosition="center"
        />
        <ExternalLinkIcon className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      </div>
      <div className="flex w-full items-center gap-2">
        <headline className="text-md mr-2 block font-bold text-neutral-700 dark:text-neutral-200">
          {title}
        </headline>
      </div>
      <p className="block font-mono text-sm text-neutral-500 dark:text-neutral-400">
        {subtitle}
      </p>
    </a>
  );
};

export default AppCard;
