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
      ]
      return {people};   
  }
}
