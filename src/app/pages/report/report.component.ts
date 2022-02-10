import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Gender } from 'src/app/types/gender';
import { PersonView } from 'src/app/types/PersonView';
import { PersonApiService } from '../../services/api/person-api.service';
import { IPerson } from '../../types/IPerson';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

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
  insights: any = {};

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {   
    title: {
       text: 'Number of people born per month'
    },
    xAxis:{
       categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
       'Aug','Sep','Oct','Nov','Dec'],
    },     
    yAxis : {
       min: 0,
       title: {
          text: 'No. of people'         
       }      
    }
 };

  constructor(private personService: PersonApiService) { }

  ngOnInit(): void {

    this.personService.getPersons()
      .pipe(
        map((res: any) => { 
          const dates = res.map((x: IPerson) => {
            return new Date(x.dob).getMonth();
          })  
          return dates;
        })
      )
      .subscribe((dates) => {
        this.populateMonths(dates);
        this.setChartData();
        this.loadPage = true;
      })

      this.personService.getPersons()
        .pipe(
          map((res: any) => {
            const data = res.map((x: IPerson) => {
              return {
                name: x.name,
                surname: x.surname,
                age: this.convertDob(x.dob),
                gender: x.gender
              }
            })
            return data;
          })
        )
        .subscribe((data: PersonView[]) => {
          this.generateInsights(data);
        })
  }

  populateMonths(dates: number[]) {
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

  setChartData() {
    this.chartOptions.series = [{
      name: 'People',
      data: Object.values(this.months),
      type: 'column'
    }]  
  }

  generateInsights(data: PersonView[]) {
    data.forEach((element: PersonView) => {
      if (element.age >= 50 && element.age < 100) {
        if (this.insights.halfCentenerians) this.insights.halfCentenerians++;
        if (!this.insights.halfCentenerians) this.insights.halfCentenerians = 1;
      }

      if (element.age >= 100) {
        if (this.insights.centenerians) this.insights.centenerians++;
        if (!this.insights.centenerians)  this.insights.centenerians = 1;
      }

      if (element.gender === Gender.Male) {
        if (this.insights.men) this.insights.men++;
        if (!this.insights.men) this.insights.men = 1;
      }

      if (element.gender === Gender.Female) {
        if (this.insights.women) this.insights.women++;
        if (!this.insights.women) this.insights.women = 1;
      }

      this.insights.total = data.length;
    });
  }

  convertDob(dob: Date): number {
    var month_diff = Date.now() - new Date(dob).getTime();
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970); 
    return age;
  }

}
