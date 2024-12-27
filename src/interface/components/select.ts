import { ChangeEvent } from "react";
import { FormControlProps, SelectChangeEvent, SelectProps } from "@mui/material";
import { StateEnum } from "@/enum";
import { ICombo } from '../combo';

export interface IComboSate {
  id: StateEnum;
  label: string;
}

export interface ISelect {
  data: IComboSate[] | ICombo[];
  disabled?: boolean;
  formControlProps?: FormControlProps;
  handleChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>) => void;
  label?: string;
  name?: string;
  selectProps?: SelectProps;
  value: string;
  error?: boolean;
  helperText?: string;
}