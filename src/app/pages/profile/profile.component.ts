import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChildService } from '../../services/child.service';
import { } from 'googlemaps';
import { GoogleMapsAPIWrapper, AgmCoreModule } from '@agm/core';
declare var google;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: any;
  profile: any;
  map: any;
  zoom = 13;
  radius = 1000;
  fillColor = '#5508a5';
  fillOpacity = 0.2;
  strokeColor = '#5508a5';
  strokeOpacity = 0.8;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private childService: ChildService
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
        // this.addMap();
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

}
