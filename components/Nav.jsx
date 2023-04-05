"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import Mori from "next/font/local";
import FraktionMono from "next/font/local";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

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

const mono = FraktionMono({
  src: "../fonts/PPFraktionMono-Regular.woff2",
  variable: "--font-mono",
});

const navItems = [
  {
    label: "Home",
    hasMultiple: false,
    href: "/",
  },
  {
    label: "Writing",
    hasMultiple: false,
    href: "/thoughts",
  },
  {
    label: "Work",
    hasMultiple: true,
    links: [
      {
        href: "/playground",
        label: "Playground",
        description: "A collection of my experiments and side projects.",
      },
      {
        href: "/projects",
        label: "Projects",
        description: "A collection of my client and in-house work.",
      },
    ],
  },
  {
    label: "•••",
    hasMultiple: true,
    links: [
      {
        href: "/bookmarks",
        label: "Bookmarks",
        description: "A collection of my bookmarks from around the web.",
      },
      {
        href: "/features",
        label: "Features",
        description:
          "Places I've talked to, written for, or been showcased by.",
      },
      {
        href: "/uses",
        label: "Stack",
        description: "The tech that I use to build and power this site.",
      },
      {
        href: "/arti",
        label: "Arti",
        description: "Interface directly with the OpenAI beta, natively.",
      },
      {
        href: "/cosmic-go",
        label: "Cosmic Go",
        description: "Powering a personal SwiftUI app with Cosmic.",
      },
      {
        href: "/lazy-pdf",
        label: "Lazy PDF",
        description: "Effortlessly create a PDF from a set of selected images.",
      },
    ],
  },
];

const mobileNavItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/thoughts",
    label: "Writing",
  },
  {
    href: "/playground",
    label: "Playground",
  },
];

const Nav = () => {
  const [key, setKey] = useState("");

  useEffect(() => {
    const userAgent = window.navigator?.userAgent?.toLowerCase();
    const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos|mac)/i;

    if (macosPlatforms.test(userAgent)) {
      setKey("⌘");
    } else {
      setKey("⌃");
    }
  }, [key]);

  return (
    <div className={`${sans.variable}`}>
      {/* Desktop nav */}
      <NavigationMenu.Root className="hidden backdrop-blur-md dark:border-neutral-700 md:fixed md:top-0 md:z-50 md:mx-auto md:flex md:h-16 md:w-full md:items-center md:justify-center md:rounded-none md:border md:border-none md:border-neutral-200 md:bg-white md:px-4 md:py-0 md:shadow-none md:duration-500 dark:md:bg-black/50 dark:md:shadow-none lg:px-0">
        <div className="mx-auto w-full justify-center lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex h-full w-full items-center">
              <Link href="/">
                <Image
                  className="rounded-lg"
                  height={32}
                  width={32}
                  src="/logo.svg"
                  alt="Logo"
                  quality={50}
                />
              </Link>
              <p className="w-max px-2 pb-0 text-sm text-neutral-500 dark:text-neutral-400">
                {"Press"}
              </p>
              <code
                className={`${mono.variable} w-max font-mono text-sm text-teal-700 dark:text-teal-300`}
              >
                {`${key} + K`}
              </code>
              <p className="w-max px-2 pb-0 text-sm text-neutral-500 dark:text-neutral-400">
                {"to find anything"}
              </p>
            </div>
            <NavigationMenu.List
              className={`m-0 flex w-full list-none space-x-2  ${sans.variable}`}
            >
              {navItems.map((item, idx) => (
                <NavigationMenu.Item key={idx}>
                  <NavigationMenu.Trigger>
                    {!item.hasMultiple && (
                      <NavLink href={item.href}>
                        <span className="nav">{item.label}</span>
                      </NavLink>
                    )}
                    {item.hasMultiple && (
                      <>
                        <span className="nav">
                          {item.label}
                          <ChevronDownIcon
                            className="ml-2 h-4 w-4 flex-shrink-0 text-neutral-500 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180 dark:text-neutral-400"
                            aria-hidden
                          />
                        </span>
                      </>
                    )}
                  </NavigationMenu.Trigger>
                  {item.hasMultiple && (
                    <NavigationMenu.Content className="absolute left-0 top-0 w-auto data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                      <ul className="m-0 grid w-[600px] list-none grid-cols-2 gap-2 p-2">
                        {item.links.map((link, idx) => (
                          <ListItem
                            href={link.href}
                            title={link.label}
                            key={idx}
                          >
                            {link.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </div>
        </div>

        <div className="absolute top-full mr-4 flex w-full max-w-7xl justify-end perspective-[2000px]">
          <NavigationMenu.Viewport className="relative mt-4 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_right] overflow-hidden rounded-lg bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn dark:border dark:border-neutral-800 dark:bg-neutral-900 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenu.Root>

      {/* Mobile nav */}
      <div
        as="nav"
        className="fixed bottom-4 left-0 right-0 z-40 mx-auto flex h-max w-max items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 p-1 shadow-lg duration-500 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none md:hidden"
      >
        <div className="flex items-center justify-between">
          {mobileNavItems.map((item, idx) => (
            <NavLink href={item.href} key={idx}>
              <span className="mobileNav">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={classNames(
            "block h-full w-full select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-neutral-200 focus:shadow-[0_0_0_2px] focus:shadow-neutral-300 dark:hover:bg-neutral-800",
            className
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="mb-2 font-sans font-bold leading-[1.2] text-neutral-800 dark:text-neutral-200">
            {title}
          </div>
          <p className="mb-0 pb-0 text-sm leading-[1.4]">{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

export default Nav;
