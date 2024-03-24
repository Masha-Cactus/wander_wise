'use client';

import { validateForm } from "@/app/lib/validateForm";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { z } from 'zod';

const classes = `border border-gray-200 bg-white
text-black hover:bg-gray-50 flex h-10 w-full items-center
justify-center space-x-3 rounded-md border text-sm shadow-sm
transition-all duration-75 focus:outline-none px-4`;
const errorClasses = `border border-red-200 bg-red-50`;

// eslint-disable-next-line max-len
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){7,24}/;

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export const SignUp = () => {
  const [user, setUser] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  console.log('error', error);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setError(curr => ({ ...curr, name: '' }));
  }, [user.name]);

  useEffect(() => {
    setError(curr => ({ ...curr, email: '' }));
  }, [user.email]);

  useEffect(() => {
    setError(curr => ({ ...curr, password: '' }));
  }, [user.password]);

  useEffect(() => {
    setError(curr => ({ ...curr, confirm: '' }));
  }, [user.confirm]);

  console.log(error);

  const formSchema = z
    .object({
      name: z.string().trim().min(1),
      email: z.coerce.string().trim().email(),
      password: z
        .string()
        .trim()
        .regex(PWD_REGEX, {
          message: `Password must contain at least 8 characters, including at least one letter and one digit`,
        }),
      confirm: z.string().trim().refine((value) => value === user.password, {
        message: "Confirmation must be equal to 'password'",
        path: ["confirm"],
      }),
    })
    .required();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await validateForm<FormData>(user, formSchema);

    if (result.isValid) {
      console.log(user);
    } else {
      Object.entries(result.formErrors).forEach(([key, msg]) =>
        setError(c => ({ ...c, [key]: msg })),
      );
    }
  };

  return (
    <div className="h-screen h-full
    flex items-center justify-center flex-col">
      <form 
        action="" 
        className="flex flex-col gap-4" 
        onSubmit={(e) => handleSubmit(e)}
      >
        {Object.keys(user).map(key => (
          <div key={key} className="relative">
            {(key === 'password' || key === 'confirm') && (
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={key}
                  className={classNames(classes, {
                    [errorClasses]: error[key as keyof FormData],
                  })}
                  name={key}
                  onChange={(e) => setUser({ ...user, [key]: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3
                    -translate-y-1/2 text-pink-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            )}
            {(key !== 'password' && key !== 'confirm') && (
              <input
                type="text"
                placeholder={key}
                className={classNames(classes, {
                  [errorClasses]: error[key as keyof FormData],
                })}
                value={user[key as keyof FormData]}
                name={key}
                onChange={(e) => setUser({ ...user, [key]: e.target.value })}
              />
            )}

            {error[key as keyof FormData] && (
              <p className="text-red-500 text-sm text-end">
                {error[key as keyof FormData]}
              </p>
            )}
          </div>
        ))}

        <button
          className={`${classes} bg-black text-white hover:bg-green-700`}
          // type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};