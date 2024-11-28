import { Dialog, DialogPanel } from "@headlessui/react";
import { IModal } from "@/components/Modal/prop";

export default function Modal({ isOpen, close, children }: IModal) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      onClose={close}
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-xl">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-blue-400 p-6"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
