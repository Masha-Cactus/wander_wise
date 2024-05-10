interface EmptyStateTextProps {
  text: string;
}

const EmptyStateText: React.FC<EmptyStateTextProps> = ({
  text,
}) => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-black">
        {text}
      </p>
    </div>
  );
};

export default EmptyStateText;
