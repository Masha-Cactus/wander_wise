import { memo, PropsWithChildren } from "react";
import { BackButton } from "@/src/components/molecules";
import { Divider } from "@/src/components/atoms";

const FormPageLayout:React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="grow bg-gray-10">
      <Divider />
      <div className="p-10 w-full h-full flex flex-col gap-8">
        <BackButton />
        {children}
      </div>
    </main>
  );
};

export default memo(FormPageLayout);