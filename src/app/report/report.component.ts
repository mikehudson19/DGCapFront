import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

interface Person {
  name: string;
  surname: string;
  dob: Date;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  // months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  data = {
    january: 3,
    february: 9,
    march: 2,
    april: 2,
    may: 10
  }
  people: Person[] = [];
  months: string[] = [];
  values: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.convertObject();
    this.http.get<Person[]>('../assets/people.json')
      .pipe(
        map(res => { 
          const dates = res.map(x => {
            return new Date(x.dob).getMonth();
          })
          return dates;
        })
      )
      .subscribe((dates) => {
        console.log(dates);  
        // this.people = people;
      })
  }

  convertObject() {
    this.months = Object.keys(this.data);
    console.log(this.months);

    this.values = Object.values(this.data);
  }

}
