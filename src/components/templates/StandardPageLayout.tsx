import { memo } from "react";
import { Divider } from "@/src/components/atoms";
import { BackButton } from "@/src/components/molecules";

const StandardPageLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <section className="h-full w-full">
      <Divider />
      <div className="flex h-full w-full flex-col gap-8 overflow-auto p-10">
        <BackButton />
        {children}
      </div>
    </section>
  );
};

export default memo(StandardPageLayout);
