import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { PersonApiService } from '../../services/api/person-api.service';
import { IPerson } from '../../types/IPerson';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {


  displayedColumns: string[] = [ 'name', 'surname', 'age', 'edit', 'remove'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];
  
    // MatPaginator Output
    pageEvent!: PageEvent;

  constructor(private dialogRef: MatDialog,
              private personService: PersonApiService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.personService.getPersons()
      .pipe(
        map((res: any) => { 
          const data = res.map((x: IPerson) => {
            return {
              id: x.id,
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
          this.router.navigateByUrl("/report", { skipLocationChange: true }).then(() => {
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
          this.router.navigateByUrl("/report", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/list']);
          }); 
          this.snackBar.open('Person deleted!', "Okay", { duration: 2500 });
        }
      })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
