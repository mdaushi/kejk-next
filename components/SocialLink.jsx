import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import Button from "./Button";
import Mori from "next/font/local";

const sans = Mori({
  src: [
    {
      path: "../fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-ExtraBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const SocialLink = ({ title, icon, handle, snippet, href }) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <a className="inline-link" href={href} target="_blank" rel="noreferrer">
          {title}
        </a>
      </HoverCard.Trigger>
      {icon && (
        <HoverCard.Portal>
          <HoverCard.Content
            className={`data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-16px] data-[state=open]:transition-all dark:border dark:border-neutral-800 dark:bg-neutral-900 ${sans.variable}`}
            sideOffset={4}
          >
            <div className="flex flex-col gap-[8px]">
              <Image
                className="rounded-full border-2 border-neutral-200 bg-white dark:border-neutral-800"
                src={icon}
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL={`${icon}?auto=format,compress&q=1&blur=500&w=2`}
                alt="Image of the social icon"
                quality={100}
              />
              <div className="flex flex-col gap-[16px] font-sans">
                <div>
                  <div className="font-bold leading-[1.5] text-neutral-800 dark:text-neutral-100">
                    {title}
                  </div>
                  <div className="leading-[1.5] text-neutral-600 dark:text-neutral-400">
                    {handle}
                  </div>
                </div>
                <div className="m-0">
                  <p className="leading-[1.5] text-neutral-800 dark:text-neutral-100">
                    {snippet}
                  </p>
                </div>
                <div className="m-0">
                  <Button
                    textColor={"text-neutral-800 dark:text-neutral-200"}
                    bgColor={"bg-neutral-200 dark:bg-neutral-800"}
                    href={href}
                  >
                    Go
                  </Button>
                </div>
              </div>
            </div>
            <HoverCard.Arrow className="fill-white dark:fill-neutral-800" />
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  );
};

export default SocialLink;
