import { IPerson } from './IPerson';

export interface PersonsResponse {
  count: number;
  rows: IPerson[]
}