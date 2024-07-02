'use client';

import { memo, useState } from "react";
import { ModalTemplate, RestorePasswordForm } from "@/src/components/organisms";
import { UnstyledButton } from "@/src/components/molecules";
import { Divider } from "@/src/components/atoms";

interface RestorePasswordModalProps {
  onClose: () => void;
  onOpenSignIn?: () => void;
}

const RestorePasswordModal: React.FC<RestorePasswordModalProps> = ({
  onClose,
  onOpenSignIn,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignInClick = () => {
    onClose();
    onOpenSignIn && onOpenSignIn();
  };

  return (
    <ModalTemplate 
      onClose={onClose}
      title="Password assistance"
      subtitle={isSubmitted 
        ? "Your new password will be sent to your email 😉" 
        : "Enter the email address associated with your WanderWise account 🤔"
      }
    >
      {isSubmitted ? (
        <>
          <Divider />
          {onOpenSignIn && (
            <UnstyledButton
              text="Sign in to your account"
              classes="font-bold"
              onClick={handleSignInClick}
            />
          )}
        </>
      ) : (
        <RestorePasswordForm setIsSubmitted={setIsSubmitted} />
      )}

    </ModalTemplate>
  );
};

export default memo(RestorePasswordModal);
