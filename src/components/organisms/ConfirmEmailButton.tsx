"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ErrorText } from "@/src/components/atoms";
import { ConfirmEmailModal } from "@/src/components/organisms";

const ConfirmEmailButton = () => {
  const emailConfirmationType = localStorage.getItem('emailConfirmationType');
  const [isConfirmEmailModal, setIsConfirmEmailModal] = useState(false);

  if (!emailConfirmationType) {
    return null;
  }

  return (
    <>
      <button 
        type="button" 
        onClick={() => setIsConfirmEmailModal(true)}
        className="self-start"
      >
        <ErrorText 
          errorText={emailConfirmationType === 'initial'
            ? "Confirm your email to open full functionality"
            : "Confirm your new email to update it"
          }
        />
      </button>

      <AnimatePresence>
        {isConfirmEmailModal && (
          <ConfirmEmailModal
            key="confirmEmailModal"
            onClose={() => setIsConfirmEmailModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ConfirmEmailButton;
