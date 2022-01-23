import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

interface Person {
  name: string;
  surname: string;
  dob: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // MatPaginator Output
  // pageEvent: PageEvent;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 7];
  // countries: Person[] = [];
  // countries: Person[] = [];

  displayedColumns: string[] = [ 'name', 'surname', 'age', 'edit', 'remove'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.http.get<Person[]>('../assets/people.json')
      .pipe(
        map(res => { 
          const data = res.map(x => {
            return {
              name: x.name,
              surname: x.surname,
              age: this.convertDob(x.dob)
            }
          })
          return data;
        })
      )
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {

    // this.dataSource.sort = this.sort;
  }

  convertDob(x: any) {

    var month_diff = Date.now() - new Date(x).getTime();
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970); 
    return age;
  }

  filterCountries(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onMatSortChange() {
    // this.dataSource.sort = this.sort;
  }

  openDialog(){
    this.dialogRef.open(EditDialogComponent);
  }


}
