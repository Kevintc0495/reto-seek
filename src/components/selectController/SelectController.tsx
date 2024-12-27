import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ICombo, IComboSate, ISchema } from "@/interface";
import { Select } from "@/components";

interface SelectControllerProps {
  label: string;
  defaultValue?: string;
  schema: ISchema;
  shouldUnregister?: boolean;
  disabled?: boolean;
  data: IComboSate[] | ICombo[];
}

const SelectController = ({
  label = "",
  defaultValue = "",
  schema,
  shouldUnregister = false,
  data,
  disabled,
}: SelectControllerProps) => {
  const [error, setError] = useState(false);
  const formContext = useFormContext();
  const { control, formState, trigger } = formContext;
  const { errors } = formState;

  const bugTracking = async () => {
    const result = await trigger(schema.name, { shouldFocus: true });
    setError(!result);
  };

  return (
    <Controller
      control={control}
      name={schema.name}
      defaultValue={defaultValue}
      rules={schema.validations}
      shouldUnregister={shouldUnregister}
      render={({ field }) => {
        const { ref, value, onChange } = field;

        return (
          <Select
            ref={ref}
            data={data}
            error={error || !!errors[schema.name]}
            handleChange={(e: unknown) => {
              onChange(e);
              bugTracking();
            }}
            helperText={errors[schema.name]?.message as string}
            label={label}
            value={value}
            disabled={disabled}
          />
        );
      }}
    />
  );
};

export default SelectController;
