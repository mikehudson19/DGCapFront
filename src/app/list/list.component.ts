import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})

export class ListComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // MatPaginator Output
  // pageEvent: PageEvent;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 7];
  countries: Country[] = [];

  displayedColumns: string[] = [ 'name', 'surname', 'age', 'edit', 'remove'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Country[]>('../assets/people.json')
      .subscribe((data: any) => {
        //Is important
        this.dataSource = new MatTableDataSource(data);
        // this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {

    // this.dataSource.sort = this.sort;
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

}
