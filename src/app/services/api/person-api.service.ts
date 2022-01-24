import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonApiService {

  constructor(private http: HttpClient) { }

  getPersons(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/persons`);
  }

  getPerson(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/persons/${id}`);
  }

  updatePerson(person: any, id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${environment.apiUrl}/persons/${id}`, person, { headers });
  }

  createPerson(person: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiUrl}/persons`, person, { headers });
  }

  deletePerson(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.delete<any>(`${environment.apiUrl}/persons/${id}`, { headers });
  }
}
