'use client';

import { memo, useState } from "react";
import { ModalSkeleton, RestorePasswordForm } from "@/src/components/organisms";
import { UnstyledButton } from "@/src/components/molecules";

interface RestorePasswordModalProps {
  onClose: () => void;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
}

const RestorePasswordModal: React.FC<RestorePasswordModalProps> = ({
  onClose,
  onOpenSignIn,
  onOpenSignUp,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSignUpClick = () => {
    onClose();
    onOpenSignUp && onOpenSignUp();
  };

  const handleSignInClick = () => {
    onClose();
    onOpenSignIn && onOpenSignIn();
  };

  return (
    <ModalSkeleton 
      onClose={onClose}
      title="Password assistance"
      subtitle={isSubmitted 
        ? "Your new password will be sent to your email" 
        : "Enter the email address associated with your WanderWise account 🤔"
      }
    >
      {!isSubmitted && (
        <RestorePasswordForm setIsSubmitted={setIsSubmitted} />
      )}

      {!!(onOpenSignIn && onOpenSignUp) && (
        <div className="flex flex-col gap-2">
          <UnstyledButton
            text="Sign in to your account"
            classes="font-bold"
            onClick={handleSignInClick}
          />
          <UnstyledButton
            text="Create new account"
            classes="font-bold"
            onClick={handleSignUpClick}
          />
        </div>
      )}

    </ModalSkeleton>
  );
};

export default memo(RestorePasswordModal);
