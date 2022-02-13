import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonApiService } from '../../services/api/person-api.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  personForm: any;
  id: number = 0;
  person: any;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required' }
    ],
    'dob': [
      { type: 'required', message: 'Date of birth is required' },
      { type: 'futureDate', message: 'Date of birth cannot be in the future' }
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
      dob: ["", [Validators.required, this.futureDateValidator()]]
    })
  }

  getPerson(id: number): void {
    this.personService
    .getPerson(id).subscribe((person) => {
      this.person = person;
      this.displayPerson();
    });
  }

  displayPerson(): void {
    this.personForm.patchValue({
      name: this.person.name,
      surname: this.person.surname,
      dob: this.person.dob
    });
  }

  futureDateValidator() {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      if (value > new Date()) {
        return {futureDate:true}
      }

      return null;
    }
  }

  onSave() {
    if (!this.personForm.valid) {
      this.personForm.markAllAsTouched();
    }
    
    if (this.personForm.valid) {
      if (this.id === 0) {
        this.personService.createPerson(this.personForm.value)
          .subscribe(() => {
            this.dialogRef.close("added");
          });
      } else {
         this.personService.updatePerson(this.personForm.value, this.id)
          .subscribe(() => {
            this.dialogRef.close("updated");
          }) 
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
