import { memo } from "react";
import { ModalTemplate, SignInForm } from "@/src/components/organisms";
import { Heading, Heading4, TextBase, Divider } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/molecules";

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
    <ModalTemplate onClose={onClose}>
      <div className="flex gap-2">
        <Heading text="Welcome back to " font="normal" />
        <Heading text="Wander Wise" font="medium" classes="font-maven" />
      </div>
      <Heading4 
        text="Let's continue our trip planning 🌍" 
        font="normal" 
        classes="text-gray-80"
      />

      <Divider classes="mb-2" />

      <SignInForm 
        closeModal={onClose} 
        openRestorePasswordModal={handleRestorePasswordClick} 
      />

      <Divider classes="mb-2" />

      <div className="flex justify-center gap-2">
        <TextBase
          text="Don’t have an account yet?"
          font="normal"
        />
        <UnstyledButton
          text="Create account"
          onClick={handleSignUpClick}
        />
      </div>
    </ModalTemplate>
  );
};

export default memo(SignInModal);
