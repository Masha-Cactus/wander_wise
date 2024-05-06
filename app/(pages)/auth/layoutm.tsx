import Link from "next/link";
import ModalSkeleton from "../../components/organisms/Modals/ModalSkeleton";
import Google from "../../components/shared/icons/Google";
import Image from "next/image";
// import { useRouter } from 'next/router';

const AuthLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) => {
  const id = params.id;
  // const router = useRouter();
  // const { pathname } = router;

  // console.log(pathname);

  return (
    <ModalSkeleton path="back">
      <div
        className="w-full overflow-hidden shadow-xl md:max-w-md 
      md:rounded-2xl md:border md:border-gray-200 bg-pink backdrop-blur-none"
      >
        <div
          className="flex flex-col items-center justify-center space-y-3 
        border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            className="h-10 w-10 rounded-md"
            width={20}
            height={20}
          />
          <h3 className="font-display text-2xl font-bold text-gray-900">
            {id === "login" && "Sign In"}
            {id === "signup" && "Sign Up"}
            {id === "remind" && "Forgot Password"}
          </h3>

          {children}
          {/* {form === 'login' ? <Login /> : <SignUp />} */}
          {/* {form === 'login' && <Login />}
          {form === 'signup' && <SignUp />}
          {form === 'remind' && <PasswordRemind />} */}
        </div>

        <div
          className="flex flex-col space-y-4 
            bg-gray-50 px-4 py-8 md:px-16"
        >
          <Google className="h-5 w-5" />
          <p>Sign In with Google</p>

          <Link
            href={id === "signup" ? "/auth/login" : "/auth/signup"}
            className="text-center text-sm text-gray-500"
          >
            {id === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </Link>

          {id === "login" && (
            <Link
              href={"/auth/remind"}
              className="text-center text-sm text-gray-500"
            >
              Forgot your password?
            </Link>
          )}
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default AuthLayout;
