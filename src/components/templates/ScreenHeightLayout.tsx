import { memo } from "react";
import { Divider } from "@/src/components/atoms";

const ScreenHeightLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <section className="h-full w-full overflow-hidden">
      <Divider />
      {children}
    </section>
  );
};

export default memo(ScreenHeightLayout);