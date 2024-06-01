import { useEffect, useState } from "react";

export function useCopyUrlToClipboard(pathname: string): 
[boolean, () => Promise<void>] {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    const base = "http://localhost:3000";
    const link = base + pathname;

    navigator.clipboard.writeText(link)
      .then(() => setIsCopied(true));
  };

  useEffect(() => {
    const clipboardTimeout = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 3000);

    return () => clearTimeout(clipboardTimeout);
  }, [isCopied]);

  return [isCopied, copy];
}