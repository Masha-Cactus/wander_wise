import { Dispatch, SetStateAction, memo } from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/src/components/atoms";
import { IconButton } from "@/src/components/molecules";

type Props = {
  view: "Gallery" | "List";
  setView: Dispatch<SetStateAction<"Gallery" | "List">>;
};

const ViewSwitcher: React.FC<Props> = ({ view, setView }) => {
  return (
    <div className="relative h-9 w-[168px] rounded-full bg-gray-20 p-1">
      <div
        className={twMerge(
          `relative ml-0 mr-[69px] h-full w-[90px] rounded-full bg-white transition-[width,margin]`,
          view === "List" && "ml-[94px] mr-0 w-16",
        )}
      />
      <div className="absolute inset-0 flex h-full w-full gap-1 p-1">
        <IconButton
          icon={<Icons.gallery className="h-4 w-4" />}
          size="small"
          classes="rounded-full h-full w-[90px] p-0"
          text="Gallery"
          onClick={() => setView("Gallery")}
        />

        <IconButton
          icon={<Icons.list className="h-4 w-4" />}
          size="small"
          classes="rounded-full w-[65px] h-full p-0"
          text="List"
          onClick={() => setView("List")}
        />
      </div>
    </div>
  );
};

export default memo(ViewSwitcher);
