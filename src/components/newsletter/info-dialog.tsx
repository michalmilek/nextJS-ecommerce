"use client";

import { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import { Dialog, Transition } from "@headlessui/react";

import Button from "../ui/button";

function InfoDialog() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={openModal}
        className="inline-flex gap-3 items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700">
        Learn more
        <AiOutlineArrowRight />
      </button>

      <Transition
        appear
        show={isOpen}
        as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Modal
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 border-t pt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse reprehenderit tempora exercitationem quo minus earum,
                    quisquam ad inventore cum, nam impedit, delectus magnam
                    voluptatum suscipit eos odit. Consequatur, beatae.
                    Consectetur?
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    type="button"
                    onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default InfoDialog;
