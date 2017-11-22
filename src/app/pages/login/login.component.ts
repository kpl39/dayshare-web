import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterDataService } from '../../services/router-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  loginData: any = {};
  userAuth: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dataService: RouterDataService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: [''],
        password: ['']
      }
    );
  }

  loginWithEmail() {
    this.authService.loginEmailUser(this.loginData.email, this.loginData.password)
      .then((res) => {
        this.dataService.setLoginData(res);
        this.router.navigate(['/dashboard']);
      });
  }

  loginWithFacebook() {
    this.authService.facebookLogin()
      .then((res: any) => {
        console.log('FACEBOOK LOGIN', res);

        this.authService.checkEmailStatus(res.user.email)
          .then((userExists) => {
            console.log('check email status facebook', status);
            if (userExists) {
              this.dataService.setLoginData(res.user);
              // this.getAuth();
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

  loginWithGoogle() {
    this.authService.googleLogin()
      .then((res: any) => {
        console.log('GOOGLE LOGIN', res);
        this.authService.checkEmailStatus(res.user.email)
          .then((userExists) => {
            console.log('check email status google', status);
            if (userExists) {
              this.dataService.setLoginData(res.user);
              // this.getAuth();
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

  formValid() {
    if (this.loginData.email && this.loginData.password) {
      return true;
    } else {
      return false;
    }
  }
}
