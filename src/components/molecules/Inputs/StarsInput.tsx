import { memo } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Icons } from "@/src/components/atoms";
import { InputControllerWrapper, IconButton } from "@/src/components/molecules";

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
        <div className="flex h-8 justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map(item => (
            <IconButton 
              key={item}
              icon={item <= field.value && field.value > 0 
                ? <Icons.filledStar className="h-full w-12 text-yellow"/>
                : <Icons.star className="h-full w-12 text-yellow"/>
              }
              onClick={() => field.onChange(item)}
              classes="p-0" 
            />
          ))}
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(StarsInput) as typeof StarsInput;