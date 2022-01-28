import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PersonApiService } from '../services/api/person-api.service';
import { IPerson } from '../types/person';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {


  displayedColumns: string[] = [ 'name', 'surname', 'age', 'edit', 'remove'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  constructor(private dialogRef: MatDialog,
              private personService: PersonApiService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.personService.getPersons()
      .pipe(
        map(res => { 
          const data = res.rows.map((x: IPerson) => {
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

  openDialog(id: number): void {
    const dialog = this.dialogRef.open(EditDialogComponent, {
      data: {
        id
      }
    });

    dialog.afterClosed().subscribe((id) => {
      this.router.navigateByUrl("/report", { skipLocationChange: true }).then(() => {
        this.router.navigate(['/list']);
        console.log(id);
        let snackBarMsg = id == 0 ? "Person added" : "Person updated";
        this.snackBar.open(snackBarMsg, "Okay", { duration: 2000 });
    }); 
    })
    
  }

  deletePerson(id: number): void {
    this.personService.deletePerson(id)
      .subscribe(() => {
        this.router.navigateByUrl("/report", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/list']);
          this.snackBar.open('Person deleted!', "Okay", { duration: 2000 });
        }); 
      })
  }
}
