import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../../services/router-data.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.scss']
})
export class SignupDetailsComponent implements OnInit {

  signupData: any;
  parentForm: any;
  childrenForm = [];

  constructor(
    private dataService: RouterDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.dataService.getSignupData() ) {
      this.signupData = this.dataService.getSignupData();
    }
    this.parentForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required]
      }
    );
    this.addChildForm();

  }

  addChildForm() {
    const childForm = this.fb.group(
      {
        firstName: ['New Child', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required]
      }
    );
    this.childrenForm.push(childForm);
  }

}
