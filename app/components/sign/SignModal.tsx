import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
// import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import Modal from "../shared/Modal";
import { Login } from "./Login";
import Google from "../shared/icons/Google";
import { SignUp } from "./SignUp";
import LoadingDots from "../shared/icons/LoadingDots";
import { PasswordRemind } from "./PasswordRemind";
// import { useSignUpModal } from "./SignUpModal";

const SignModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  // const { setShowSignUpModal } = useSignUpModal();
  const [form, setForm] = useState('login');
  // const { setShowSignInModal } = useSignInModal();

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md 
      md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 
        border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="h-10 w-10 rounded-md"
            width={20}
            height={20}
          />
          <h3 className="font-display text-2xl font-bold text-gray-900">
            {form === 'login' && 'Sign In'}
            {form === 'signup' && 'Sign Up'}
            {form === 'remind' && 'Forgot Password'}
          </h3>
          {/* {form === 'login' ? <Login /> : <SignUp />} */}
          {form === 'login' && <Login />}
          {form === 'signup' && <SignUp />}
          {form === 'remind' && <PasswordRemind />}
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <>
                <LoadingDots color="#808080" />
                {/* <p>Signingnnnnnn...</p> */}
              </>
            ) : (
              <>
                <Google className="h-5 w-5" />
                <p>Sign In with Google</p>
              </>
            )}
          </button>

          <button
            className="text-center text-sm text-gray-500"
            onClick={form === 'login'
              ? () => setForm('signup')
              : () => setForm('login')}
          >
            {form === 'signup'
              ? 'Already have an account?'
              : "Don't have an account?"}
          </button>

          {form === 'login' && (
            <button
              className="text-center text-sm text-gray-500" 
              onClick={() => setForm('remind')}
            >
              Forgot your password?
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export function useSignModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}