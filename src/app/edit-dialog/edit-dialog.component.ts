import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonApiService } from '../services/api/person-api.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  personForm: any;
  id: number = 0;
  person: any;

  validationMessage: {
    [key: string]: string;
  } = {};

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name must be at least 5 characters long' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required' },
      { type: 'minlength', message: 'Surname must be at least 5 characters long' },
      { type: 'maxlength', message: 'Surname cannot be more than 25 characters long' }
    ],
    'dob': [
      { type: 'required', message: 'Date of birth is required' }
    ]
    }

  constructor(private formBuilder: FormBuilder,
              private personService: PersonApiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<EditDialogComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this.data.id;
    if (this.id > 0) {
      this.getPerson(this.id);
    }
  }

  initForm() {
    this.personForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      dob: ["", [Validators.required]]
    })
  }

  getPerson(id: number): void {
    this.personService
    .getPerson(id).subscribe((person) => {
      this.person = person;
      this.displayAdvert();
    });
  }

  displayAdvert(): void {
    this.personForm.patchValue({
      name: this.person.name,
      surname: this.person.surname,
      dob: this.person.dob
    });
  }

  onSave() {
    if (!this.personForm.valid) {
      this.personForm.markAllAsTouched();
    }
    
    if (this.personForm.valid) {
      if (this.id === 0) {
        this.personService.createPerson(this.personForm.value)
          .subscribe();
      } else {
         this.personService.updatePerson(this.personForm.value, this.id)
          .subscribe()
      }
      this.dialogRef.close();
    }
  }

}
