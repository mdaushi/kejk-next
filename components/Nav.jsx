import Image from "next/image";
import NavLink from "./NavLink";

const Nav = () => {
  return (
    <div className="fixed min-h-full w-full md:top-0">
      <div as="nav" className="bg-neutral-100 dark:bg-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Image
              className="rounded-lg"
              height="32px"
              width="32px"
              src="/logo.svg"
              alt="Logo"
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="block">
                <div className="flex items-baseline space-x-4">
                  <NavLink href="/">
                    <a className="nav">Home</a>
                  </NavLink>
                  <NavLink href="/writing">
                    <a className="nav">Writing</a>
                  </NavLink>
                  <NavLink href="/projects">
                    <a className="nav">Projects</a>
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
