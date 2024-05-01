"use client";

import { z } from "zod";
import { useEffect, useState } from "react";

import { PWD_REGEX } from "@/app/lib/constants";
import { validateForm } from "@/app/lib/validateForm";
import { LoginInput, PrimaryBtn} from "@/app/components/moleculs/";

const formSchema = z
  .object({
    email: z.coerce.string().trim().email(),
    password: z.string().trim().regex(PWD_REGEX, {
      message: `Password must contain at least 8 characters, including at least one letter and one digit`,
    }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [user, setUser] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await validateForm<FormData>(user, formSchema);

    if (result.isValid) {
      // make api call
    } else {
      Object.entries(result.formErrors).forEach(([key, msg]) =>
        setError((c) => ({ ...c, [key]: msg }))
      );
    }
  };

  useEffect(() => {
    setError((curr) => ({ ...curr, email: "" }));
  }, [user.email]);

  useEffect(() => {
    setError((curr) => ({ ...curr, password: "" }));
  }, [user.password]);

  return (
    <div
      className=" w-full h-full
    flex items-center justify-center flex-col
    self-center
    "
    >
      <form
        action=""
        className="flex flex-col gap-4 h-full w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        {Object.keys(user).map((key) => (
          <LoginInput
            key={key}
            name={key}
            user={user}
            value={user[key as keyof FormData]}
            setUser={setUser}
            error={error}
          />
        ))}

        <PrimaryBtn text="Sign In" classes="" onClick={() => {}} />
      </form>
    </div>
  );
};

export default Login;
