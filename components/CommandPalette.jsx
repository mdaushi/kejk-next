import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

export const CommandPalette = ({
  writings,
  apps,
  utilities,
  contacts,
  stacks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKeydown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  const filteredWritingItems = query
    ? writings.filter((writing) =>
        writing.title.toLowerCase().includes(query.toLowerCase())
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

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        : item.type === "apps" ||
                          item.type === "utilities" ||
                          item.type === "software-stacks"
                        ? (window.location.href = `${item.metadata.url}`)
                        : (window.location.href = `${item.url}`);
                    }}
                    className="w-[90vw] transform divide-y divide-neutral-100 overflow-hidden rounded-2xl bg-neutral-50 p-2 text-left align-middle shadow-xl transition-all dark:divide-neutral-800 dark:border dark:border-neutral-700 dark:bg-neutral-900 md:w-[40vw]"
                  >
                    <div className="flex items-center">
                      <MagnifyingGlassIcon
                        width={16}
                        height={16}
                        className="text-neutral-600 dark:text-neutral-300"
                      />
                      <Combobox.Input
                        className="w-full rounded-full bg-transparent p-2 text-neutral-900 focus:outline-none  dark:text-neutral-300 md:rounded-md "
                        placeholder={"Search..."}
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                      />
                    </div>
                    {
                      <Combobox.Options
                        static
                        className="ml-0 mb-0 max-h-64 list-none space-y-2 overflow-y-auto pt-2"
                      >
                        {[
                          ...filteredWritingItems,
                          ...filteredAppItems,
                          ...filteredUtilityItems,
                          ...filteredContactItems,
                          ...filteredStackItems,
                        ].map((item) => (
                          <Combobox.Option key={item.id} value={item}>
                            {({ active }) => (
                              <div
                                className={`cursor-pointer rounded p-2 text-sm hover:bg-teal-100 dark:hover:bg-teal-900 ${
                                  active
                                    ? "bg-teal-100 dark:bg-teal-900"
                                    : "bg-transparent"
                                }`}
                              >
                                {item.title}
                              </div>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    }
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
