import { memo } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Icons } from "@/src/components/atoms";
import { InputControllerWrapper } from "@/src/components/molecules";

interface StarsInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

const StarsInput = <T extends FieldValues>({
  name, control
}: StarsInputProps<T>) => {
  return (
    <InputControllerWrapper
      name={name}
      control={control}
      isLabelVisible={false}
    >
      {(field) => (
        <div className="flex gap-0.5 justify-center h-8">
          {[1, 2, 3, 4, 5].map(item => (
            <button 
              key={item} 
              type="button" 
              onClick={() => field.onChange(item)}
            >
              {item <= field.value && field.value > 0 ? (
                <Icons.filledStar className="w-12 h-full text-yellow"/>
              ) : (
                <Icons.star className="w-12 h-full text-yellow"/>
              )}
            </button>
          ))}
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(StarsInput) as typeof StarsInput;