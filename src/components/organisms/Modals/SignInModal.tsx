import { memo } from "react";
import { ModalSkeleton, SignInForm } from "@/src/components/organisms";
import { Heading, Heading4, TextBase, Divider } from "@/src/components/atoms";
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
      <div className="flex gap-2">
        <Heading text="Welcome back to " font="normal" />
        <Heading text="Wander Wise" font="medium" classes="font-maven" />
      </div>
      <Heading4 text="Let's continue our trip planning 🌍" font="normal" />

      <Divider classes="w-full h-px" />

      <SignInForm closeModal={onClose} />

      <UnstyledButton
        text="Forgot password?"
        classes="font-bold self-start"
        onClick={handleRestorePasswordClick}
      />

      <Divider classes="w-full h-px" />

      <div className="flex gap-2">
        <TextBase
          text="Don’t have an account yet?"
          classes="text-nowrap"
          font="normal"
        />
        <UnstyledButton
          text="Create account"
          classes="text-nowrap font-bold"
          onClick={handleSignUpClick}
        />
      </div>
    </ModalSkeleton>
  );
};

export default memo(SignInModal);
