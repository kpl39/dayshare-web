import { Component, OnInit } from '@angular/core';
import { RouterDataService } from '../../services/router-data.service';
import { AuthService } from '../../services/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile: any;
  states: any;
  parentForm: any;
  userAuth: any;

  constructor(
    private dataService: RouterDataService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.getAuthState()
      .then((user: any) => {
        if (this.authService.authenticated) {
          if (!this.dataService.getProfile()) {
            this.authService.getParentProfileByUserId(user.uid)
              .then((profile) => {
                this.dataService.setProfile(profile);
              });
          }
        } else {
          this.router.navigate(['/login']);
        }
        this.userAuth = user;
      });
  }

}
