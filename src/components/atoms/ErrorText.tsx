import { memo } from "react";

const FormErrorText = ({ errorText }: { errorText: string }) => {
  return <p className="text-red-500">{errorText}</p>;
};

export default memo(FormErrorText);