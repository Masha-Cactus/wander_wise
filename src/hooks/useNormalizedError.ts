import { Dispatch, SetStateAction, useState } from "react";
import { normalizeError } from "@/src/lib/helpers";

export const useNormalizedError 
= (): [string, Dispatch<SetStateAction<any>>] => {
  const [error, setError] = useState('');

  const setNormalizedError = (error: any) => {
    setError(normalizeError(error));
  };

  return [error, setNormalizedError];
};