'use client';

import { useState } from "react";

const classes = `border border-gray-200 bg-white
text-black hover:bg-gray-50 flex h-10 w-full items-center
justify-center space-x-3 rounded-md border text-sm shadow-sm
transition-all duration-75 focus:outline-none px-4`;


export const PasswordRemind = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="h-screen h-full
    flex items-center justify-center flex-col">
      <form 
        action="" 
        className="flex flex-col gap-4" 
        onSubmit={(e) => handleSubmit(e)}>

        <input
          type="text"
          placeholder='email'
          className={classes}
          // value={user[key as keyof FormData]}
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <button
          className={`${classes} bg-black text-white hover:bg-green-700`}
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};