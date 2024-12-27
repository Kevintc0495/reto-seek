import { Itask } from "./list";

export type ISchemaCreateUpdate = 'title' | 'description' | 'state';

export type ItaskCreateUpdate = Omit<Itask, 'id'>

