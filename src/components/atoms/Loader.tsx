import { twMerge } from "tailwind-merge";

interface LoaderProps {
  classes?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ classes, size }) => {
  return (
    <div 
      role="status" 
      className={twMerge(
        `m-auto w-28 h-28 grid grid-cols-2 grid-rows-2 gap-3 
        animate-loader-spin`,
        size === 'sm' && 'h-8 w-8 gap-0.5',
        size === 'md' && 'h-14 w-14 gap-1.5',
        size === 'lg' && 'h-20 w-20 gap-2',
        classes,
      )}
    >
      {[1, 2, 3, 4].map(item => (
        <div key={item} className="rounded-full bg-gray-80"/>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
