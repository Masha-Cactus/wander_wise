/* eslint-disable max-len */
import { memo } from "react";
import { ModalSkeleton, RestorePasswordForm } from "@/src/components/organisms";
import { Heading, Text } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/moleculs";

interface RestorePasswordModalProps {
  onClose: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
}

const RestorePasswordModal: React.FC<RestorePasswordModalProps> = ({
  onClose,
  onOpenSignIn,
  onOpenSignUp,
}) => {

  const handleSignUpClick = () => {
    onClose();
    onOpenSignUp();
  };

  const handleSignInClick = () => {
    onClose();
    onOpenSignIn();
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Password assistance" />
      <Text text="Enter the email address associated with your WanderWise account 🤔" />

      <RestorePasswordForm />

      <div className="flex flex-col gap-2">
        <UnstyledButton
          text="Sign In"
          classes="font-bold"
          onClick={handleSignInClick}
        />
        <UnstyledButton
          text="Sign Up"
          classes="font-bold"
          onClick={handleSignUpClick}
        />
      </div>

    </ModalSkeleton>
  );
};

export default memo(RestorePasswordModal);
