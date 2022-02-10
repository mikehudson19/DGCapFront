import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Gender } from '../types/gender';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {
      let people = [
          { id: 1, name: "Michael", surname: "Hudson", dob: "1991-06-09", gender: Gender.Male },
          { id: 2, name: "Jack", surname: "Joahnsson", dob: "1994-02-01", gender: Gender.Male },
          { id: 3, name: "Kirsten", surname: "Webster", dob: "1981-08-29", gender: Gender.Female },
          { id: 4, name: "Christoph", surname: "Jenkeens", dob: "1874-01-09", gender: Gender.Male },
          { id: 5, name: "Gareth", surname: "Lothbrok", dob: "1999-05-09", gender: Gender.Male },
          { id: 6, name: "Joe", surname: "Lorango", dob: "1981-12-09", gender: Gender.Male },
          { id: 7, name: "Andrew", surname: "Lorango", dob: "1984-11-01", gender: Gender.Male },
          { id: 8, name: "Chris", surname: "Gregor", dob: "1975-04-19", gender: Gender.Male },
          { id: 9, name: "Jen", surname: "Tray", dob: "1967-04-21", gender: Gender.Female },
          { id: 10, name: "Sam", surname: "Dancer", dob: "1984-11-29", gender: Gender.Male },
          { id: 11, name: "Jack", surname: "Stiker", dob: "1989-02-18", gender: Gender.Male },
          { id: 12, name: "Khamzat", surname: "Usmari", dob: "1986-12-09", gender: Gender.Male },
          { id: 13, name: "Lacey", surname: "Kacey", dob: "1967-11-09", gender: Gender.Female },
          { id: 14, name: "David", surname: "Lorango", dob: "1954-01-09", gender: Gender.Male },
          { id: 15, name: "Jackson", surname: "Donaff", dob: "1976-01-09", gender: Gender.Female },
          { id: 16, name: "Andy", surname: "Varidees", dob: "1987-05-09", gender: Gender.Female },
          { id: 17, name: "Jim", surname: "Xavier", dob: "1961-09-09", gender: Gender.Male },
          { id: 18, name: "Harley", surname: "Quinn", dob: "1987-12-09", gender: Gender.Female },
          { id: 19, name: "Joel", surname: "Chris", dob: "1984-11-09", gender: Gender.Male },
          { id: 20, name: "Landers", surname: "Kinnamen", dob: "1951-04-09", gender: Gender.Female },
          { id: 21, name: "Carly", surname: "Azkabar", dob: "1966-12-09", gender: Gender.Female },
          { id: 22, name: "Ragnar", surname: "Lothborn", dob: "1945-12-09", gender: Gender.Male },
      ]
      return {people};   
  }
}
