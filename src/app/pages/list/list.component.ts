import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { PersonApiService } from '../../services/api/person-api.service';
import { IPerson } from '../../types/IPerson';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'name', 'surname', 'age', 'gender', 'edit', 'remove' ];
  dataSource: MatTableDataSource<IPerson>;
  isHandset: boolean = false;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  firstLastButtons = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  searchControl = new FormControl();

  constructor(private dialogRef: MatDialog,
              private personService: PersonApiService,
              private router: Router,
              private snackBar: MatSnackBar,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.searchTable();

    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches))
      .subscribe((isHandset) => {
        if (isHandset) {
          this.displayedColumns = [ 'name', 'edit', 'remove' ];
          this.firstLastButtons = false;
        }

        if (!isHandset) {
          this.displayedColumns = [ 'name', 'surname', 'age', 'gender', 'edit', 'remove' ];
          this.firstLastButtons = true;
        }
      });
  }

  ngAfterViewInit() {
    this.personService.getPersons()
    .pipe(
      map((res: any) => { 
        const data = res.map((x: IPerson) => {
          return {
            id: x.id,
            name: x.name,
            surname: x.surname,
            age: this.convertDob(x.dob),
            gender: x.gender
          }
        })
        return data;
      })
    )
    .subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  convertDob(dob: Date): number {
    var month_diff = Date.now() - new Date(dob).getTime();
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970); 
    return age;
  }

  editPerson(id: number): void {
    const dialog = this.dialogRef.open(EditDialogComponent, {
      data: {
        id
      }
    });

    dialog.afterClosed()
      .subscribe((action) => {
        if (action === "added" || action === "updated") {
          this.router.navigateByUrl("/insights", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/list']);
            let snackBarMsg = action == "added" ? "Person added" : "Person updated";
            this.snackBar.open(snackBarMsg, "Okay", { duration: 2500 });
          }); 
        }
    })
  }

  deletePerson(id: number): void {
    const dialog = this.dialogRef.open(ConfirmDialogComponent, {
      data: {
        id
      }
    });

    dialog.afterClosed()
      .subscribe((deleted: boolean) => {
        if (deleted) {
          this.router.navigateByUrl("/insights", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/list']);
          }); 
          this.snackBar.open('Person deleted!', "Okay", { duration: 2500 });
        }
      })
  }

  searchTable() {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(searchTerm => {
      this.personService.getPersons()
        .pipe(
          map((res: any) => { 
            const data = res.map((x: IPerson) => {
              return {
                id: x.id,
                name: x.name,
                surname: x.surname,
                age: this.convertDob(x.dob),
                gender: x.gender
              }
            })
            return data;
          })
        )
        .subscribe(data => {
          const caseAdjustedSearchTerm = searchTerm.toLocaleLowerCase();
          this.dataSource = new MatTableDataSource(data.filter((word: any) => word.name.toLocaleLowerCase().includes(caseAdjustedSearchTerm) || 
                                                                              word.surname.toLocaleLowerCase().includes(caseAdjustedSearchTerm))); 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
    })
  }
}
