import { Gender } from "./gender";

export interface IPerson {
  id?: number;
  name: string;
  surname: string;
  dob: Date;
  gender: Gender
}

