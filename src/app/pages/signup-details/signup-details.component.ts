import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../../services/router-data.service';
import { AuthService } from '../../services/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

const stockProfile = 'https://s3.us-east-2.amazonaws.com/dayshare/images/dayShareStockProfile.png';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.scss']
})
export class SignupDetailsComponent implements OnInit {

  signupData: any;
  parentForm: any;
  childrenForm = [];
  states: any;
  loading: Boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: RouterDataService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.dataService.getSignupData() ) {
      this.signupData = this.dataService.getSignupData();
    }
    this.states = this.dataService.getStates();
    this.parentForm = this.fb.group(
      {
        email: ['', Validators.required],
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required]
      }
    );

    this.parentForm.controls.email.value = this.signupData.email;
    this.parentForm.controls.username.value = this.signupData.username;
    this.addChildForm();

  }

  addChildForm() {
    const childForm = this.fb.group(
      {
        firstName: ['New Child', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required],
        gender: ['', Validators.required]
      }
    );
    this.childrenForm.push(childForm);
  }

  submitForm() {
    const profileImage = this.signupData.profileImageUrl ? this.signupData.profileImageUrl : stockProfile;
    const pkg = {
      email: this.parentForm.controls.email.value,
      username: this.parentForm.controls.username.value,
      firstName: this.parentForm.controls.firstName.value,
      lastName: this.parentForm.controls.lastName.value,
      address1: this.parentForm.controls.address1.value,
      address2: this.parentForm.controls.address2.value,
      city: this.parentForm.controls.city.value,
      state: this.parentForm.controls.state.value,
      zipcode: this.parentForm.controls.zipcode.value,
      userId: this.signupData.userid,
      profileImageUrl: profileImage,
      facebookId: this.signupData.facebookId ? this.signupData.facebookId : null,
      twitterId: null,
      latitude: 0.0,
      longitude: 0.0,
      children: []
    };
    this.childrenForm.forEach((child) => {
      const form = {
        firstName: child.controls.firstName.value,
        lastName: child.controls.lastName.value,
        birthDate: child.controls.birthDate.value.toISOString().substring(0, 10),
        gender: child.controls.gender.value
      };
      pkg.children.push(form);
    });
    console.log('Submission Package', pkg);
    this.loading = true;
    this.authService.addParent(pkg)
      .then((res) => {
        this.loading = false;
        this.dataService.setProfile(res);
        this.router.navigate(['/dashboard']);
        console.log('res from add parent', res);
      });
  }

  skipSetup() {
    console.log('Skipping Setup');
    this.router.navigate(['/dashboard']);
  }

}
