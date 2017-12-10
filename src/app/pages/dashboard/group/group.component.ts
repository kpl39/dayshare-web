import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../../../services/availability.service';
import { RouterDataService } from '../../../services/router-data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  week = [
    {day: 'Monday', preference: 0},
    {day: 'Tuesday', preference: 0},
    {day: 'Wednesday', preference: 0},
    {day: 'Thursday', preference: 0},
    {day: 'Friday', preference: 0}
  ];
  preferences = [
    {display: 'Available', value: 0},
    {display: 'Maybe', value: 1},
    {display: 'Not Available', value: 2},
  ]
  availability: any = {};
  newAvailability: Boolean = true;
  profile: any;

  constructor(
    private availabilityService: AvailabilityService,
    private dataService: RouterDataService
  ) { }

  ngOnInit() {
    if (this.dataService.profile) {
      this.profile = this.dataService.profile;
      if (this.dataService.profile.availability) {
        this.newAvailability = false;
        this.availability = this.dataService.profile.availability;
        this.assignAvailability();
      }
    } else {
      this.dataService.profileDataLoaded.subscribe((profile) => {
        this.profile = profile;
        if (profile.availability) {
          this.newAvailability = false;
          this.availability = profile.availability;
          this.assignAvailability();
        }
      });
    }
    
  }

  assignAvailability() {
    this.week.forEach((x) => {
      let day = x.day.toLowerCase();
      x.preference = this.availability[day];
    })
  }

  setAvailability() {
    this.week.forEach((x) => {
      let day = x.day.toLowerCase();
      this.availability[day] = x.preference;
    })
    this.availability.parentId = this.profile.parentId;

    this.availabilityService.setAvailability(this.availability)
      .then((res) => {
        console.log('Set Availability Res', res);
      })
  }

  updateAvailability() {
    this.week.forEach((x) => {
      let day = x.day.toLowerCase();
      this.availability[day] = x.preference;
    })
    console.log("kjgfdgjsdfh", this.availability);

    this.availabilityService.updateAvailability(this.availability)
      .then((res) => {
        console.log('Set Availability Res', res);
      })
  }

}
