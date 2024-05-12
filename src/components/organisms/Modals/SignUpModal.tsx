import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { Heading, Heading4, TextBase } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/moleculs";
import SignUpForm from "../Forms/SignUpForm";

interface SignUpModalProps {
  onClose: () => void;
  onOpenSignIn: () => void;
}

const SignInModal: React.FC<SignUpModalProps> = ({ onClose, onOpenSignIn }) => {
  const handleSignInClick = () => {
    onClose();
    onOpenSignIn();
  };

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading
        text="Welcome to Wander Wise"
        classes="text-center"
        font="normal"
      />
      <Heading4 text="Let’s begin the adventure ✨" font="medium" />

      <SignUpForm />

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

export default memo(SignInModal);
