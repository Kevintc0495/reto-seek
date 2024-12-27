import { ISchema } from "@/interface";
import { ISchemaList } from "../interfaces";

export const schemaList = (): Record<ISchemaList, ISchema> => ({
  name: {
    name: 'name',
  },
  state: {
    name: 'state',
  }
});