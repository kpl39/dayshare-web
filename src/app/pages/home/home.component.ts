import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { SearchService } from '../../services/search.service';
import { ChildService } from '../../services/child.service';
import { ContactModalComponent } from '../modals/contact-modal/contact-modal.component';
import { AuthService } from '../../services/auth.service';
import { RouterDataService } from '../../services/router-data.service';
import 'hammerjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public selectedAge: number;
  public ages: Array<any> = [{value: 0, label: 'Less than 1 year'}, {value: 1, label: '12 to 24 months'}, {value: 2, label: '2 years old'}, {value: 3, label: '3 years old'}, {value: 4, label: '4 years old'}, {value: 5, label: 'Older than 5'}];
  public distance: number;
  public distances: Array<any> = [{value: 1, label: 'Less than 1 Mile'}, {value: 2, label: 'Less than 2 Miles'}, {value: 3, label: 'Less than 3 Miles'}, {value: 4, label: 'Less than 4 Miles'}, {value: 5, label: 'Less than 5 Miles'}, {value: 6, label: 'Less than 6 Miles'}, {value: 7, label: 'Less than 7 Miles'}, {value: 8, label: 'Less than 8 Miles'}, {value: 9, label: 'Less than 9 Miles'}, {value: 10, label: 'More than 10 Miles'}];
  public advOpsToggle: Boolean = false;
  public results: any;
  public ageRange: number;
  public ageRanges: Array<any> = [{value: 1, label: 'Within 1 Year'}, {value: 2, label: 'Within 2 Years'}, {value: 3, label: '3 or More Years'}];
  private userAuth: any;
  private authenticated: Boolean;


  @ViewChild('search')
  public searchElementRef: ElementRef;
  private profile: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private searchService: SearchService,
    private childService: ChildService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private dataService: RouterDataService
  ) { }

  ngOnInit() {
    this.searchControl = new FormControl();



    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log('LAT: ', this.latitude);
          console.log('LNG: ', this.longitude);
        });
      });
    });


    this.getAuth();
  }

  toggleAdvOpts() {
    this.advOpsToggle = !this.advOpsToggle;
  }

  submitSearch() {

    const date = new Date();
    date.setFullYear(date.getFullYear() - this.selectedAge);

    const birthdate = date.toISOString().slice(0, 10);

    console.log('search service called');
    const pkg = {
      latitude: this.latitude,
      longitude: this.longitude,
      distance: this.distance,
      unit: 'miles',
      birthdate: birthdate,
      ageRange: this.ageRange,
      tags: ''
    };

    this.searchService.searchParents(pkg)
      .then((res: any) => {
        this.results = res.hits.hits;
        console.log('Results', this.results);
      });
  }

  convertChildDate(date) {
    return this.childService.convertChildDate(date);
  }

  openContact(parent) {
    console.log("Open contact", parent);

    let pkg = {senderId: this.profile.parentId, recipientId: parent._source.parent_id, username: parent._source.username};
    let dialog = this.matDialog.open(ContactModalComponent, 
      {data: pkg, width: '500px'});

    dialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  getAuth() {
    this.authService.getAuthState()
      .then((user: any) => {
        if (this.authService.authenticated) {
          this.authenticated = true;
          if (!this.dataService.getProfile()) {
            this.authService.getParentProfileByUserId(user.uid)
              .then((profile) => {
                this.profile = profile;
                this.dataService.setProfile(profile);
              });
          } else {
            this.profile = this.dataService.getProfile();
          }
        } else {
          this.authenticated = false;
        }
        this.userAuth = user;
      });
  }



  // updateSearch() {
  //   if (this.autocomplete.query == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }
  //   let me = this;
  //   this.service.getPlacePredictions({ input: this.autocomplete.query, types: ['establishment'] }, function (predictions, status) {
  //     me.autocompleteItems = [];
  //     me.zone.run(function () {
  //       predictions.forEach(function (prediction) {
  //         me.autocompleteItems.push(prediction);
  //       });
  //     });
  //   });
  // }

}
