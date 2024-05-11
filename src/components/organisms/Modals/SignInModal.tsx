import { memo } from "react";
import { ModalSkeleton, SignInForm } from "@/src/components/organisms";
import { Heading, Text } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/moleculs";

interface SignInModalProps {
  onClose: () => void;
  onOpenSignUp: () => void;
  onOpenRestorePassword: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  onClose,
  onOpenSignUp,
  onOpenRestorePassword,
}) => {
  const handleSignUpClick = () => {
    onClose();
    onOpenSignUp();
  };

  const handleRestorePasswordClick = () => {
    onClose();
    onOpenRestorePassword();
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Welcome back to Wander Wise" />
      <Text text="Let's continue our trip planning 🌍" />

      <SignInForm />

      <div className="flex gap-2">
        <Text text="Don’t have an account yet?" classes="text-nowrap"/>
        <UnstyledButton
          text="Create account"
          classes="text-nowrap font-bold"
          onClick={handleSignUpClick}
        />
      </div>
      <UnstyledButton
        text="Forgot password?"
        classes="font-bold"
        onClick={handleRestorePasswordClick}
      />
    </ModalSkeleton>
  );
};

export default memo(SignInModal);
