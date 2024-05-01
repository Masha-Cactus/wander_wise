"use client";

import { useState } from "react";
import { PrimaryBtn } from "@/app/components/moleculs/";

const PasswordRemind = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="email"
          className="sign-input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PrimaryBtn text="Continue" classes="" onClick={() => {}} />
      </form>
    </div>
  );
};

export default PasswordRemind;
