"use client";

// import { Dialog } from "@headlessui/react";
// import React, { useRef } from "react";
// import { useRouter } from 'next/navigation';

// type Props = {
//   children: React.ReactNode;
//   navigate?: boolean;
// };

// export const Modal: React.FC<Props> = ({ children, navigate }) => {
//   const overlayRef = useRef();
//   const router = useRouter();

//   // console.log('hi there from modal');

//   return (
//     <Dialog
//       static
//       open={true}
//       onClose={navigate ? () => router.push('/trips') : () => {}}
//       initialFocus={overlayRef}
//       className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-50"
//     >
//       <Dialog.Overlay
//         ref={overlayRef}
//         className="fixed inset-0"
//       />
//       <div className="relative flex items-center justify-center w-1/2">
//         {children}
//       </div>
//     </Dialog>
//   );
// };

// export default Modal;

import { Dispatch, SetStateAction } from "react";
// import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";

export default function Modal({
  children,
  // className,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  // className?: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {

  return (
    <Dialog.Root open={showModal} onOpenChange={setShowModal}>
      <Dialog.Portal>
        <Dialog.Overlay
          // for detecting when there's an active opened modal
          id="modal-backdrop"
          className="animate-fade-in fixed inset-0 z-40 
          bg-grey-100 backdrop-blur bg-opacity-50 backdrop-blur backdrop-blur"
        />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="animate-scale-in fixed inset-0 z-40 m-auto max-h-fit 
          w-full max-w-md overflow-hidden border border-gray-200 
          bg-white p-0 shadow-xl md:rounded-2xl"
          // className={cn(
          // "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-gray-200 bg-white p-0 shadow-xl md:rounded-2xl",
          // className,
          // )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}