import React from "react";
import Image from "next/image";

const AppCard = ({ title, subtitle, image, link }) => {
  return (
    <a
      className="space-y-2 rounded-xl border border-neutral-200 p-4 transition-all ease-in-out hover:cursor-pointer hover:border-teal-600 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900
    "
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full pb-2">
        <Image
          className="h-max w-full"
          src={image}
          alt="Image of the plugin icon"
          width={300}
          height={200}
          quality={50}
          objectFit="contain"
          objectPosition="center"
        />
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
