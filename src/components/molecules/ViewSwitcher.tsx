import { Dispatch, SetStateAction, memo } from "react";
import { Icons } from "../atoms";
import IconButton from "./Buttons/IconButton";

type Props = {
  view: 'Gallery' | 'List';
  setView: Dispatch<SetStateAction<'Gallery' | 'List'>>;
};

const ViewSwitcher: React.FC<Props> = ({ view, setView }) => {
  return (
    <div className="p-1 bg-gray-20 rounded-full flex gap-1 h-fit">
      <IconButton 
        icon={<Icons.gallery className="w-4 h-4" />} 
        size="small" 
        classes={`rounded-full h-fit ${view === 'Gallery' ? 'bg-white' : ''}`}
        text="Gallery"
        onClick={() => setView('Gallery')}
      />

      <IconButton 
        icon={<Icons.list className="w-4 h-4" />} 
        size="small" 
        classes={`rounded-full h-fit ${view === 'List' ? 'bg-white' : ''}`}
        text="List"
        onClick={() => setView('List')}
      />
    </div>
  );
};

export default memo(ViewSwitcher);