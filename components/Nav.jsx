import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/writing",
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

const Nav = () => {
  return (
    <div>
      <div
        as="nav"
        className="border-neautral-300 md:border-t-none fixed bottom-0 z-50 mx-auto flex h-16 w-full items-center border-t bg-neutral-100 duration-500 dark:border-neutral-800 dark:bg-neutral-900 md:top-0 md:border-none md:bg-white md:dark:bg-black"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:w-full lg:px-8">
          <div className="mx-auto flex items-center justify-center md:justify-between">
            <div className="hidden h-16 space-x-2 md:flex md:h-full md:w-full md:items-center">
              <Link href="/">
                <a className="pt-1">
                  <Image
                    className="rounded-lg"
                    height="32px"
                    width="32px"
                    src="/logo.svg"
                    alt="Logo"
                    quality={50}
                  />
                </a>
              </Link>
              <p className="w-max pl-2 pb-0 text-sm text-neutral-500 dark:text-neutral-400">
                {"Press"}
              </p>
              <code className="w-max font-mono text-sm text-teal-700 dark:text-teal-300">
                {"⌘[⌃] + K"}
              </code>
              <p className="w-max pb-0 text-sm text-neutral-500 dark:text-neutral-400">
                {"to find anything"}
              </p>
            </div>
            <div className="mx-auto flex w-full items-center justify-center md:mx-0 md:justify-between">
              <div className="hidden shrink-0 items-center md:flex"></div>
              <div className="block">
                <div className="flex items-center space-x-4">
                  {navItems.map((item, idx) => (
                    <NavLink href={item.href} key={idx}>
                      <a className="nav">{item.label}</a>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
