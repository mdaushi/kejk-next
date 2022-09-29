import React from "react";
import Image from "next/future/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AppCard = ({ title, subtitle, image, link }) => {
  return (
    <Link href={link}>
      <a
        className="flex flex-col space-y-2 rounded-xl border border-gray-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900
    "
        href={link}
        rel="noreferrer"
      >
        <div className="flex w-full items-start justify-between pb-2">
          <Image
            className="rounded"
            src={image}
            width={200}
            height={50}
            placeholder="blur"
            blurDataURL={`${image}?auto=format,compress&q=1&blur=500&w=2`}
            alt="Image of the project"
            quality={50}
          />
          <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <header className="mr-2 text-lg font-bold text-gray-700 dark:text-gray-200">
            {title}
          </header>
          <span className="font-mono tracking-tight text-gray-500 dark:text-gray-400">
            {subtitle}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default AppCard;