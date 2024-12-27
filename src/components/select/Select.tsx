import { forwardRef } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ISelect } from "@/interface";

const SelectComponent = forwardRef(
  (
    {
      data,
      disabled,
      formControlProps,
      handleChange,
      label,
      name,
      selectProps,
      value,
      error,
      helperText,
    }: ISelect,
    ref,
  ) => {
    return (
      <FormControl
        disabled={disabled}
        error={error}
        fullWidth
        size="small"
        {...formControlProps}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={disabled}
          error={error}
          name={name}
          value={value}
          label={label}
          size="small"
          onChange={handleChange}
          ref={ref}
          {...selectProps}
        >
          <MenuItem value="">Seleccione...</MenuItem>
          {data.map((res) => (
            <MenuItem key={res.id} value={res.id}>
              {res.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default SelectComponent;
