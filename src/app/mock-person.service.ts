import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPerson } from './types/IPerson';


@Injectable({
  providedIn: 'root'
})
export class MockPersonService {
  apiUrl: string = "api/people/";

  constructor(private http: HttpClient) { }

  public getPersons() {
    return this.http.get(this.apiUrl);
  }

  public createPerson() {
    const person = {
      id: 7,
      name: "Uhtred",
      surname: "Ragnarsson",
      dob: "1873-09-01"
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<IPerson>(this.apiUrl, person, { headers });
  }

  public updatePerson() {

    const person = { id: 1, name: "Mark", surname: "Hudson", dob: "1991-06-09" }

    return this.http.put(this.apiUrl + person.id, person);
  }
}
