import { HTMLInputTypeAttribute } from "react";

export interface ISchema {
  name: string;
  type?: HTMLInputTypeAttribute;
  disabledCopy?: boolean;
  disabledPaste?: boolean;
  validations?: Record<string, unknown>;
}