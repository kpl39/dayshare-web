import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { PasswordValidation } from '../../services/validators/password-validation.service';

import { AuthService } from '../../services/auth.service';
import { RouterModule, Routes, Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-].{4,20}$/;
const ZIP_REGEX = /^[0-9]{5}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  userAuth: any;
  userSignupForm: any;




  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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


  onSubmit(formValue) {
    console.log('FORM VALUE', formValue);
    const email = formValue.emailAddress;
    const password = formValue.password;
    this.createEmailUser(email, password);
  }


  createEmailUser(email, password) {
    this.authService.createEmailUser(email, password)
      .then((res) => {
        console.log('RES FROM CREATE USER ', res);
        this.router.navigate(['/profile']);
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
              this.router.navigate(['/profile']);
            } else {
              const pkg = {
                email: res.user.email,
                profileurl: res.user.photoURL,
                username: res.user.displayName,
                userid: res.user.uid
              };
              console.log('user not found, adding now', pkg);
              this.authService.addUser(pkg)
                  .then(() => {
                      this.getAuth();
                      this.router.navigate(['/dashboard']);
                  });
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
              this.router.navigate(['/profile']);

            } else {

              const pkg = {
                email: res.user.email,
                profileImageUrl: res.user.photoURL,
                username: res.user.displayName,
                userId: res.user.uid
              };
              console.log('user not found, adding now', pkg);
              this.authService.addUser(pkg)
                .then(() => {
                  this.getAuth();
                  this.router.navigate(['/profile']);
                });
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
