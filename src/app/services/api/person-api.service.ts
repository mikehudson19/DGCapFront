import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPerson } from 'src/app/types/person';
import { PersonsResponse } from 'src/app/types/personsResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService {

  constructor(private http: HttpClient) { }

  route: string = "persons"

  getPersons(): Observable<PersonsResponse> {
    return this.http.get<PersonsResponse>(`${environment.apiUrl}/${this.route}`);
  }

  getPerson(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`${environment.apiUrl}/${this.route}/${id}`);
  }

  updatePerson(person: IPerson, id: number): Observable<IPerson> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IPerson>(`${environment.apiUrl}/${this.route}/${id}`, person, { headers });
  }

  createPerson(person: IPerson): Observable<IPerson> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IPerson>(`${environment.apiUrl}/${this.route}`, person, { headers });
  }

  deletePerson(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.delete<any>(`${environment.apiUrl}/${this.route}/${id}`, { headers });
  }
}
