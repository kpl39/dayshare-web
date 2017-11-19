import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: any;
  profile: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('username', params.username);
      this.username = params.username;
      this.getProfile();
    });
  }

  getProfile() {
    console.log('get profile username', this.username);
    this.authService.getParentProfileByUsername(this.username)
      .then((profile) => {
        console.log('got profile', profile);
        this.profile = profile;
      });
  }

}
