/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  TextFieldProps,
  InputProps,
  SlotProps,
  FilledInputProps,
  BaseTextFieldProps,
} from "@mui/material";
import { ISchema } from "@/interface";

interface slotProps {
  input?:
    | SlotProps<
        React.ElementType<FilledInputProps, keyof React.JSX.IntrinsicElements>,
        {},
        BaseTextFieldProps
      >
    | undefined;
  htmlInput?: InputHTMLAttributes<HTMLInputElement>;
}

interface FormControllerProps {
  label?: string;
  defaultValue?: string;
  schema: ISchema;
  shouldUnregister?: boolean;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  // htmlInput?: InputHTMLAttributes<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  textFieldProps?: TextFieldProps;
  InputProps?: InputProps;
  slotProps?: slotProps;
}

const FormController = ({
  InputProps,
  // htmlInput,
  label = "",
  defaultValue = "",
  schema,
  shouldUnregister = false,
  handleChange,
  disabled,
  type = "text",
  textFieldProps,
  slotProps,
}: FormControllerProps) => {
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
        const { ref, value, name: fieldName, onChange, onBlur } = field;

        return (
          <TextField
            {...textFieldProps}
            ref={ref}
            id={fieldName}
            label={label}
            value={value}
            onChange={(e: any) => {
              onChange(e);
              bugTracking();
              if (handleChange) handleChange(e);
            }}
            onBlur={onBlur}
            type={schema.type || type}
            size="small"
            error={error || !!errors[schema.name]}
            helperText={errors[schema.name]?.message as ReactNode}
            disabled={disabled}
            // slotProps={{ htmlInput }}
            slotProps={slotProps}
            // slotProps={{
            //   input: {
            //     startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            //   },
            // }}
            InputProps={InputProps}
            fullWidth
          />
        );
      }}
    />
  );
};

export default FormController;
