"use client";

import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import { JetBrains_Mono } from "@next/font/google";
import Telegraf from "@next/font/local";

const sans = Telegraf({
  src: [
    {
      path: "../fonts/PPTelegraf-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPTelegraf-RegularSlanted.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPTelegraf-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PPTelegraf-BoldSlanted.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/PPTelegraf-Ultrabold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/PPTelegraf-UltraboldSlanted.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weights: [400, 700],
  variable: "--font-mono",
});

const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/thoughts",
    label: "Writing",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
  },
  {
    href: "/uses",
    label: "Stack",
  },
];

const mobileNavItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/thoughts",
    label: "Writing",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/uses",
    label: "Stack",
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
      <div
        as="nav"
        className="hidden backdrop-blur-md dark:border-neutral-700 md:fixed md:top-0 md:z-50 md:mx-auto md:flex md:h-16 md:w-full md:items-center md:justify-center md:rounded-none md:border md:border-none md:border-neutral-200 md:bg-white md:py-0 md:shadow-none md:duration-500 dark:md:bg-[#141516]/50 dark:md:shadow-none"
      >
        <div className="mx-auto w-full justify-center lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex h-full w-full items-center">
              <Link href="/" className="pt-1">
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
            <div className="mx-0 flex w-full items-center justify-end">
              <div className="block">
                {/* Desktop nav */}
                <div className="flex items-center space-x-1">
                  {navItems.map((item, idx) => (
                    <NavLink href={item.href} key={idx}>
                      <span className="nav">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        as="nav"
        className="fixed bottom-4 z-50 mx-auto flex h-max w-[95vw] items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 shadow-lg duration-500 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none md:hidden"
      >
        {/* Mobile nav */}
        <div className="flex items-center justify-center">
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

export default Nav;
