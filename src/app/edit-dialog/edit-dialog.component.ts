import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private formBuilder: FormBuilder,
              private personService: PersonApiService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    // TODO: Handle the call to the API to update the user/create the user.
    console.log(this.personForm);
    if (this.id === 0) {
      this.personService.createPerson(this.personForm.value)
        .subscribe(res => {
          console.log(res);
        });
    } else {
       this.personService.updatePerson(this.personForm.value, this.id)
        .subscribe(res => {
          console.log(res);
        })
    }

  }

}
