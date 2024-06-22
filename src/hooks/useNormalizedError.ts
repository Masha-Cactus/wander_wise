import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { normalizeError } from "@/src/lib/helpers";

export const useNormalizedError 
= (): [string, Dispatch<SetStateAction<any>>] => {
  const [error, setError] = useState('');

  const setNormalizedError = (error: any) => {
    setError(normalizeError(error));
  };

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return [error, setNormalizedError];
};