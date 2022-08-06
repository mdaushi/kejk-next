import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Nav = () => {
  return (
    <div>
      <div
        as="nav"
        className="border-neautral-300 md:border-t-none fixed bottom-0 z-50 mx-auto h-16 w-full flex-none border-t bg-neutral-100 duration-500 dark:border-neutral-800 dark:bg-neutral-900 md:top-0 md:border-none md:bg-white md:dark:bg-black"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-center mx-auto md:justify-between">
          <div className="hidden md:block">
            <Link href="/">
              <a>
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
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex shrink-0 items-center"></div>
              <div className="block">
                <div className="flex items-center space-x-4">
                  <NavLink href="/">
                    <a className="nav">Home</a>
                  </NavLink>
                  <NavLink href="/writing">
                    <a className="nav">Writing</a>
                  </NavLink>
                  <NavLink href="/projects">
                    <a className="nav">Projects</a>
                  </NavLink>
                  <NavLink href="/bookmarks">
                    <a className="nav">Bookmarks</a>
                  </NavLink>
                  <NavLink href="/uses">
                    <a className="nav">Stack</a>
                  </NavLink>
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
