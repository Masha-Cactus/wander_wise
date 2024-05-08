'use client';

import classNames from "classnames";
import { useState } from "react";

type FormData = {
  password: string;
  email: string;
} | {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

type Props = {
  name: string;
  value: string;
  user: FormData;
  error: FormData;
  setUser: Dispatch<SetStateAction<FormData>>;
};

const LoginInput: React.FC<Props> = ({ name, value, setUser, error, user}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const defineType = () => {
    switch (name) {
      case 'password':
        if (showPassword) {
          return 'text';
        }

        return 'password';
      case 'confirm':
        if (showConfirm) {
          return 'text';
        }

        return 'password';

      default:
        return 'text';
    }
  };

  const onIconClick = () => {
    switch (name) {
      case 'password':
        setShowPassword(!showPassword);
        break;
      case 'confirm':
        setShowConfirm(!showConfirm);
        break;
    }
  };

  return (
    <div key={name} className="relative flex flex-col w-full">
      <label 
        className="text-black relative block uppercase 
          flex flex-col w-full items-start">
        {name}
        <input
          id={name}
          type={defineType()}
          placeholder={`Enter your ${name}`}
          className={classNames('sign-input', {
            'sign-input-error': error[name as keyof FormData],
          })}
          value={value}
          name={name}
          onChange={(e) => setUser({ ...user, [name]: e.target.value })}
        />
        {(name === 'password' || name === 'confirm') && (
          <button
            type="button"
            className="absolute top-1/2 right-3"
            onClick={onIconClick}
          >
            {name === 'password' ? showPassword ? 'Hide' : 'Show' : ''}
            {name === 'confirm' ? showPassword ? 'Hide' : 'Show' : ''}
          </button>
        )}
      </label>

      {error[name as keyof FormData] && (
        <p className="text-red-500 text-sm text-end">
          {error[name as keyof FormData]}
        </p>
      )}
    </div>
  );
};

export default LoginInput;
