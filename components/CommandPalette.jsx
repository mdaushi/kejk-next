import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import {
  ArrowLongRightIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
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

export const CommandPalette = ({
  writings,
  apps,
  utilities,
  contacts,
  stacks,
  features,
  albums,
  works,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKeydown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  const filteredWritingItems = query
    ? writings.filter(
        (writing) =>
          writing.title.toLowerCase().includes(query.toLowerCase()) ||
          writing.metadata.snippet
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          writing.metadata.tag.toLowerCase().includes(query.toLowerCase())
      )
    : writings.slice(0, 4);

  const filteredAppItems = query
    ? apps.filter((app) =>
        app.title.toLowerCase().includes(query.toLowerCase())
      )
    : apps.slice(0, 4);

  const filteredUtilityItems = query
    ? utilities.filter((utility) =>
        utility.title.toLowerCase().includes(query.toLowerCase())
      )
    : utilities.slice(0, 4);

  const filteredContactItems = query
    ? contacts.filter((contact) =>
        contact.title.toLowerCase().includes(query.toLowerCase())
      )
    : contacts.slice(0, 4);

  const filteredStackItems = query
    ? stacks.filter((stack) =>
        stack.title.toLowerCase().includes(query.toLowerCase())
      )
    : stacks.slice(0, 4);

  const filteredFeatureItems = query
    ? features.filter((feature) =>
        feature.title.toLowerCase().includes(query.toLowerCase())
      )
    : features.slice(0, 4);

  const filteredAlbumItems = query
    ? albums.filter((album) =>
        album.title.toLowerCase().includes(query.toLowerCase())
      )
    : albums.slice(0, 4);

  const filteredWorkItems = query
    ? works.filter((work) =>
        work.title.toLowerCase().includes(query.toLowerCase())
      )
    : works.slice(0, 4);

  const filteredItemsArray = [
    ...filteredWritingItems,
    ...filteredAppItems,
    ...filteredUtilityItems,
    ...filteredStackItems,
    ...filteredFeatureItems,
    ...filteredAlbumItems,
    ...filteredContactItems,
    ...filteredWorkItems,
  ];

  const typeArray = ["apps", "utilities", "stacks", "features", "albums"];

  const internalLinksArray = [
    "apps",
    "utilities",
    "stacks",
    "features",
    "albums",
    "works",
    "contact",
  ];

  const singular = ["writings", "stacks", "works"];

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto pt-[25vh]">
            <div className="flex items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <Combobox
                    as="div"
                    onChange={(item) => {
                      setIsOpen(false);
                      item.type === "writings"
                        ? router.push(`/thoughts/${item.slug}`)
                        : item.type === "works"
                        ? router.push(`/work/${item.slug}`)
                        : typeArray.includes(item.type)
                        ? (window.location.href = `${item.metadata.url}`)
                        : (window.location.href = `${item.url}`);
                    }}
                    className={`w-[90vw] transform divide-y divide-neutral-100 overflow-hidden rounded-2xl bg-neutral-50 p-2 text-left align-middle font-sans shadow-xl transition-all dark:divide-neutral-800 dark:border dark:border-neutral-700 dark:bg-neutral-900 md:w-[40vw] ${sans.variable}`}
                  >
                    <div className="flex items-center font-sans">
                      <MagnifyingGlassIcon
                        width={16}
                        height={16}
                        className="text-neutral-600 dark:text-neutral-300"
                      />
                      <Combobox.Input
                        className={`w-full rounded-full bg-transparent p-2 font-sans text-neutral-900 placeholder:font-sans  focus:outline-none dark:text-neutral-300 md:rounded-md ${sans.variable}`}
                        placeholder={"Search..."}
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                      />
                    </div>
                    {filteredItemsArray?.length > 0 &&
                    filteredItemsArray !== null ? (
                      <Combobox.Options
                        static
                        className="ml-0 mb-0 max-h-64 list-none overflow-y-auto pt-2"
                      >
                        {filteredItemsArray.map((item, idx) => (
                          <Combobox.Option key={idx} value={item}>
                            {({ active }) => (
                              <div
                                className={`${
                                  sans.variable
                                } flex w-full cursor-pointer items-center justify-between rounded p-3 text-sm text-black transition-all duration-75 ease-in hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800 ${
                                  active
                                    ? "bg-neutral-200 dark:bg-neutral-700"
                                    : "bg-transparent"
                                }`}
                              >
                                <div className="flex w-full items-center justify-start space-x-1">
                                  <span
                                    className={`${sans.variable} font-sans`}
                                  >
                                    {item.title}
                                  </span>
                                  <span
                                    className={`font-sans text-neutral-500 hover:text-teal-800 dark:text-neutral-400 hover:dark:text-teal-200 ${
                                      sans.variable
                                    } ${
                                      active &&
                                      "text-teal-800 dark:text-teal-200"
                                    }`}
                                  >
                                    {"in "}
                                    {singular.includes(item.type)
                                      ? item.type.charAt(0).toUpperCase() +
                                        item.type.slice(1).replace("s", "")
                                      : item.type.charAt(0).toUpperCase() +
                                        item.type.slice(1)}
                                  </span>
                                </div>
                                {internalLinksArray.includes(
                                  item.type.toLowerCase()
                                ) ? (
                                  <ArrowTopRightOnSquareIcon
                                    width={16}
                                    height={16}
                                  />
                                ) : (
                                  <ArrowLongRightIcon width={16} height={16} />
                                )}
                              </div>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    ) : (
                      <div className="flex items-center justify-center p-4">
                        <p
                          className={`text-sm text-neutral-500 dark:text-neutral-400 ${sans.variable}`}
                        >
                          No results found
                        </p>
                      </div>
                    )}
                  </Combobox>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
