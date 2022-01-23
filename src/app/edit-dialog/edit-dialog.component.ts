import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  personForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.personForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      dob: ["", [Validators.required]]
    })
  }

  onSave() {
    // TODO: Handle the call to the API to update the user/create the user.
    console.log(this.personForm);
  }

}
