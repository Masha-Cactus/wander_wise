import { memo } from "react";
import { ModalSkeleton, SignUpForm } from "@/src/components/organisms";
import { Heading, Heading4, TextBase, Divider } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/moleculs";

interface SignUpModalProps {
  onClose: () => void;
  onOpenSignIn: () => void;
  onOpenConfirmEmail: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> 
= ({ onClose, onOpenSignIn, onOpenConfirmEmail }) => {
  const handleSignInClick = () => {
    onClose();
    onOpenSignIn();
  };

  const handleFormSubmit = () => {
    onClose();
    onOpenConfirmEmail();
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <div className="flex gap-2">
        <Heading text="Welcome to" font="normal" />
        <Heading text="Wander Wise" font="medium" classes="font-maven" />
      </div>

      <Heading4 text="Let’s begin the adventure ✨" font="normal" />

      <Divider classes="w-full h-px" />

      <SignUpForm openConfirmEmailModal={handleFormSubmit} />

      <Divider classes="w-full h-px" />

      <div className="flex gap-2">
        <TextBase text="Already have an account?" font="normal" />
        <UnstyledButton
          text="Log In"
          classes="font-bold"
          onClick={handleSignInClick}
        />
      </div>
    </ModalSkeleton>
  );
};

export default memo(SignUpModal);
