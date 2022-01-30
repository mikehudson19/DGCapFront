import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MockPersonService {
  apiUrl: string = "api/people";

  constructor(private httpClient: HttpClient) { }

  public getPersons() {
    return this.httpClient.get(this.apiUrl);
  }
}
