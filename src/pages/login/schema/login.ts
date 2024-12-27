import { ISchema } from "@/interface";
import { patterns } from "@/patterns";
import { ISchemaLogin } from "../interfaces";

export const schemaLogin = (): Record<ISchemaLogin, ISchema> => ({
  email: {
    name: 'email',
    type: 'email',
    validations: {
      pattern: {
        value: patterns.email,
        message: 'Correo no valido',
      },
      required: 'Este campo es requerido',
    }
  },
  password: {
    name: 'password',
    disabledCopy: true,
    disabledPaste: true,
    validations: {
      required: 'Este campo es requerido',
    },
  }
});