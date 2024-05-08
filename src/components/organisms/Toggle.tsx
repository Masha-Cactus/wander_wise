type Props = {};

const Toggle: React.FC<Props> = ({}) => {
  return (
    <div className='w-6 h-6'>
      <input
        type="checkbox"
        className="w-6 h-6"
      />
    </div>
  );
};

export default Toggle;
