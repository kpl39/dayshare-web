import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChildService } from '../../services/child.service';
import { RouterDataService } from '../../services/router-data.service';
import { ContactModalComponent } from '../modals/contact-modal/contact-modal.component';
import { } from 'googlemaps';
import { GoogleMapsAPIWrapper, AgmCoreModule } from '@agm/core';
import { MatDialog } from '@angular/material';
declare var google;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userAuth: any;
  userProfile: any; 
  authenticated: Boolean;
  username: any;
  profile: any;
  map: any;
  zoom = 13;
  radius = 1000;
  fillColor = '#5508a5';
  fillOpacity = 0.2;
  strokeColor = '#5508a5';
  strokeOpacity = 0.8;
  week = [
    {day: 'Monday'},
    {day: 'Tuesday'},
    {day: 'Wednesday'},
    {day: 'Thursday'},
    {day: 'Friday'}
  ];
  availability: any;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private childService: ChildService,
    private dataService: RouterDataService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('username', params.username);
      this.username = params.username;
      this.getProfile();
    });
    this.getAuth();
  }

  getProfile() {
    console.log('get profile username', this.username);
    this.authService.getParentProfileByUsername(this.username)
      .then((profile: any) => {
        console.log('got profile', profile);
        this.profile = profile;
        if (profile.availability) {
          this.availability = profile.availability;
          this.week.forEach((d:any) => {
            let day = d.day.toLowerCase();
            let a = this.availability;
            if (a[day] == 0) {
              d.preference = "Available";
            } else if (a[day] == 1) {
              d.preference = "Maybe"
            } else if (a[day] == 2) {
              d.preference = "Not Available"
            }
          })
        }
      });
  }

  addMap() {
    this.map = new google.maps.Map(document.getElementById('profile-map'), {
      center: {lat: this.profile.latitude, lng: this.profile.longitude},
      zoom: 15,
      mapTypeId: 'roadmap'
    });
  }

  convertChildDate(date) {
    return this.childService.convertChildDate(date);
  }

  gender(g) {
    if (g === 'M') {
      return 'Boy';
    } else {
      return 'Girl';
    }
  }

  getAuth() {
    this.authService.getAuthState()
      .then((user: any) => {
        if (this.authService.authenticated) {
          this.authenticated = true;
          if (!this.dataService.getProfile()) {
            this.authService.getParentProfileByUserId(user.uid)
              .then((profile) => {
                this.userProfile = profile;
                this.dataService.setProfile(profile);
              });
          } else {
            this.userProfile = this.dataService.getProfile();
          }
        } else {
          this.authenticated = false;
        }
        this.userAuth = user;
      });
  }

  openContact() {

    let pkg = {senderId: this.userProfile.parentId, recipientId: this.profile.parentId, username: this.profile.username};
    let dialog = this.matDialog.open(ContactModalComponent, 
      {data: pkg, width: '500px'});

    dialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  

}
