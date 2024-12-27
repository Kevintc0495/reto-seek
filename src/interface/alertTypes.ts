export type AlertTypes = 'success' | 'warning' | 'info' | 'error';

export interface IAlert {
  status: number;
  message: string;
}