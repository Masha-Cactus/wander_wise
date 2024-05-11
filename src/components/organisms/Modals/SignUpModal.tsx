import { memo } from "react";
import { ModalSkeleton, SignInForm } from "@/src/components/organisms";
import { Heading, Text } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/moleculs";

interface SignUpModalProps {
  onClose: () => void;
  onOpenSignIn: () => void;
}

const SignInModal: React.FC<SignUpModalProps> = ({ onClose, onOpenSignIn }) => {
  const handleSignInClick = () => {
    onClose();
    onOpenSignIn();
  };

  // todo
  // change form to SignUpForm

  return (
    <ModalSkeleton onClose={onClose}>
      <Heading text="Welcome to Wander Wise" classes="text-center"/>
      <Text text="Let’s begin the adventure ✨" />

      <SignInForm />

      <div className="flex gap-2">
        <Text text="Already have an account?" classes=""/>
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
