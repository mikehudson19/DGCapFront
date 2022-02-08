import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {
      let people = [
          { id: 1, name: "Michael", surname: "Hudson", dob: "1991-06-09" },
          { id: 2, name: "Jack", surname: "Joahnsson", dob: "1994-02-01" },
          { id: 3, name: "Kirsten", surname: "Webster", dob: "1981-08-29" },
          { id: 4, name: "Christoph", surname: "Jenkeens", dob: "1874-01-09" },
          { id: 5, name: "Gareth", surname: "Lothbrok", dob: "1999-05-09" },
          { id: 6, name: "Joe", surname: "Lorango", dob: "1981-12-09" },
          { id: 7, name: "Andrew", surname: "Lorango", dob: "1984-11-01" },
          { id: 8, name: "Chris", surname: "Gregor", dob: "1975-04-19" },
          { id: 9, name: "Jen", surname: "Tray", dob: "1967-04-21" },
          { id: 10, name: "Sam", surname: "Dancer", dob: "1984-11-29" },
          { id: 11, name: "Jack", surname: "Stiker", dob: "1989-02-18" },
          { id: 12, name: "Khamzat", surname: "Usmari", dob: "1986-12-09" },
          { id: 13, name: "Lacey", surname: "Kacey", dob: "1967-11-09" },
          { id: 14, name: "David", surname: "Lorango", dob: "1954-01-09" },
          { id: 15, name: "Jackson", surname: "Donaff", dob: "1976-01-09" },
          { id: 16, name: "Andy", surname: "Varidees", dob: "1987-05-09" },
          { id: 17, name: "Jim", surname: "Xavier", dob: "1961-09-09" },
          { id: 18, name: "Harley", surname: "Quinn", dob: "1987-12-09" },
          { id: 19, name: "Joel", surname: "Chris", dob: "1984-11-09" },
          { id: 20, name: "Landers", surname: "Kinnamen", dob: "1951-04-09" },
          { id: 21, name: "Carly", surname: "Azkabar", dob: "1966-12-09" },
          { id: 22, name: "Ragnar", surname: "Lothborn", dob: "1945-12-09" },
      ]
      return {people};   
  }
}
