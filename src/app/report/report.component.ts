import { HttpClient } from '@angular/common/http';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
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

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  data = {};
  people: Person[] = [];
  loadPage: boolean = false;
  monthsObj = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

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
        // const monthsObj: any = {};

        for (let i = 0; i < dates.length; i++) {
          // TODO: Need to find a way to get this to work, dispaying the months with 0 people.
          let num = dates[i];
          let month: any = this.months[num];
          // this.monthsObj[month]++
          // monthsObj[this.months[num]] ? monthsObj[this.months[num]] = 1 : monthsObj[this.months[num]]++;
        }
        console.log(this.monthsObj);
        // this.data = monthsObj;
        this.loadPage = true;
      })

  }

}
