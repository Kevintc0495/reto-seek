export interface Itask {
  id: number;
  title: string;
  description: string;
  state: string;
} 

export type ItaskFilter = Omit<Itask, 'id' | 'description'>

export interface ItaskListResponse {
  data: Itask[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'title' | 'state';