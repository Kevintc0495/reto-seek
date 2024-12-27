import { ISchema } from "@/interface";
import { ISchemaCreateUpdate } from "../interfaces";

export const schemaCreateUpdate = (): Record<ISchemaCreateUpdate, ISchema> => ({
  title: {
    name: 'title',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  description: {
    name: 'description',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  state: {
    name: 'state',
    validations: {
      required: 'Este campo es requerido',
    },
  }
});