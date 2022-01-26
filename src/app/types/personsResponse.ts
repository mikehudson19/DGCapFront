import { IPerson } from './person';

export interface PersonsResponse {
  count: number;
  rows: IPerson[]
}