import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPerson } from 'src/app/types/IPerson';
import { PersonsResponse } from 'src/app/types/personsResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService {

  constructor(private http: HttpClient) { }

  route: string = "api/people"

  getPersons(): Observable<PersonsResponse> {
    return this.http.get<PersonsResponse>(`http://localhost:3000/${this.route}`);
  }

  getPerson(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`http://localhost:3000/${this.route}/${id}`);
  }

  updatePerson(person: IPerson, id: number): Observable<IPerson> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    person.id = id;
    return this.http.put<IPerson>(`http://localhost:3000/${this.route}/${id}`, person, { headers });
  }

  createPerson(person: IPerson): Observable<IPerson> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IPerson>(`http://localhost:3000/${this.route}`, person, { headers });
  }

  deletePerson(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.delete<any>(`http://localhost:3000/${this.route}/${id}`, { headers });
  }
}
