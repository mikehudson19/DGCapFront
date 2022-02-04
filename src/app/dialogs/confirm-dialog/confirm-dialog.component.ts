import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonApiService } from 'src/app/services/api/person-api.service';
import { IPerson } from 'src/app/types/IPerson';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  id: number;
  person: IPerson;

  constructor(private personService: PersonApiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
    this.id = this.data.id;

    this.personService.getPerson(this.id)
      .subscribe(data => {
        this.person = data;
      })
  }

  confirmDeletion() {
    this.personService.deletePerson(this.id)
      .subscribe(() => {
        this.dialogRef.close(true)
      }); 
  }
}
