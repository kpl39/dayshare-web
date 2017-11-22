import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from '../../services/validators/password-validation.service';

import { AuthService } from '../../services/auth.service';
import { RouterDataService } from '../../services/router-data.service';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-].{4,20}$/;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  userAuth: any;
  userSignupForm: any;
  signupForm: any = {};




  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: RouterDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSignupForm = this.fb.group(
      {
        emailAddress: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
        username: ['', Validators.compose([Validators.required, Validators.pattern(USERNAME_REGEX)])],
        password: ['', Validators.compose([Validators.required, Validators.pattern(PASSWORD_REGEX)])],
        confirmPassword: ['', Validators.required]
      }, {validator: PasswordValidation.MatchPassword}
    );
    this.getAuth();
  }


  // onSubmit(formValue) {
  //   console.log('FORM VALUE', formValue);
  //   const email = formValue.emailAddress;
  //   const password = formValue.password;
  //   this.createEmailUser(email, password);
  // }


  createEmailUser() {
    const email = this.signupForm.emailAddress;
    const password = this.signupForm.password;
    this.authService.createEmailUser(email, password)
      .then((res: any) => {
        const pkg = {
          email: res.email,
          username: this.signupForm.username,
          userid: res.uid
        };
        console.log('RES FROM CREATE USER ', res);
        this.dataService.setSignupData(pkg);
        this.router.navigate(['/signupdetails']);
      });
  }

  facebookLogin() {
    this.authService.facebookLogin()
      .then((res: any) => {
        console.log('FACEBOOK LOGIN', res);

        this.authService.checkEmailStatus(res.user.email)
          .then((userExists) => {
            console.log('check email status facebook', status);
            if (userExists) {
              this.getAuth();
              this.router.navigate(['/dashboard']);
            } else {
              const pkg = {
                email: res.user.email,
                username: res.user.displayName,
                userid: res.user.uid,
                facebookId: res.additionalUserInfo.profile.id,
                profileImageUrl:  res.user.photoURL
              };
              this.dataService.setSignupData(pkg);
              this.router.navigate(['/signupdetails']);
              console.log('user not found, getting more details', pkg);
            }
          });
      });
  }

  googleLogin() {
    this.authService.googleLogin()
      .then((res: any) => {
        console.log('GOOGLE LOGIN', res);
        this.authService.checkEmailStatus(res.user.email)
          .then((userExists) => {
            console.log('check email status google', status);
            if (userExists) {
              this.getAuth();
              this.router.navigate(['/dashboard']);
            } else {

              const pkg = {
                email: res.user.email,
                profileImageUrl: res.user.photoURL,
                googleId: res.additionalUserInfo.profile.id,
                username: res.user.displayName,
                userid: res.user.uid
              };
              this.dataService.setSignupData(pkg);
              this.router.navigate(['/signupdetails']);
              console.log('user not found, getting more details', pkg);
            }
          });
      });
  }

  getAuth() {
    this.authService.getAuthState()
      .then((user) => {
        this.userAuth = user;
      });
  }

  logout() {
    this.authService.logout();
    this.getAuth();
  }
}
