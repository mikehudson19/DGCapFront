import { HttpClient } from '@angular/common/http';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PersonApiService } from '../services/api/person-api.service';

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

  data = {};
  people: Person[] = [];
  loadPage: boolean = false;
  months = {
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
  };

  constructor(private personService: PersonApiService) { }

  ngOnInit(): void {

    this.personService.getPersons()
      .pipe(
        map(res => { 
          const dates = res.rows.map((x: any) => {
            return new Date(x.dob).getMonth();
          })  
          return dates;
        })
      )
      .subscribe((dates) => {
        this.populateMonths(dates);
        this.loadPage = true;
      })

  }

  populateMonths(dates: any) {
    for (let i = 0; i < dates.length; i++) {
      let num = dates[i];

      switch (num) {
        case 0:
        this.months["January"]++  
          break;
        case 1:
        this.months["February"]++  
          break;
          case 2:
        this.months["March"]++  
          break;
          case 3:
        this.months["April"]++  
          break;
          case 4:
        this.months["May"]++  
          break;
          case 5:
        this.months["June"]++  
          break;
          case 6:
        this.months["July"]++  
          break;
          case 7:
        this.months["August"]++  
          break;
          case 8:
        this.months["September"]++  
          break;
          case 9:
        this.months["October"]++  
          break;
          case 10:
        this.months["November"]++  
          break;
          case 11:
        this.months["December"]++  
          break;

        default:
          break;
      }
    }
  }

}
