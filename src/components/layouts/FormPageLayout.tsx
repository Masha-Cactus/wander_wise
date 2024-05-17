import { memo, PropsWithChildren } from "react";
import { BackButton } from "../moleculs";

const FormPageLayout:React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="h-full bg-gray10 p-10 flex flex-col 
    gap-8 overflow-scroll">
      <BackButton />
      {children}
    </main>
  );
};

export default memo(FormPageLayout);