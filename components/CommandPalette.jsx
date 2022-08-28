import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const CommandPalette = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-50 px-4 py-2 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900">
                  <Combobox as="div" onChange={() => {}}>
                    <div className="flex items-center">
                      <MagnifyingGlassIcon
                        width={16}
                        height={16}
                        className="text-neutral-600 dark:text-neutral-300"
                      />
                      <Combobox.Input
                        className="w-full rounded-full bg-transparent py-2 pl-12 pr-4 text-neutral-900 focus:outline-none  dark:text-neutral-300 md:rounded-md md:p-2"
                        placeholder={"Search..."}
                        onChange={() => {}}
                      />
                    </div>
                    <Combobox.Options static>
                      {content.map((item, idx) => {
                        return (
                          <Combobox.Option key={idx}>
                            {item.title}
                          </Combobox.Option>
                        );
                      })}
                    </Combobox.Options>
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
