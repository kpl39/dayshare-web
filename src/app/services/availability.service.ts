import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AvailabilityService {

  constructor(
    private http: HttpClient
  ) {}

  setAvailability(pkg) {
    return new Promise(resolve => {
      this.http.post('https://server.dayshare.co/parentAvailabilities', pkg)
      //this.http.post('http://localhost:8080/parentAvailabilities', pkg)
        .subscribe((res) => {
          console.log("Res from set availability", res);
          resolve(res);
        })
    })
  }


  updateAvailability(pkg) {
    return new Promise(resolve => {
      this.http.put('https://server.dayshare.co/parentAvailabilities/' + pkg.availabilityId, pkg)
      //this.http.put('http://localhost:8080/parentAvailabilities/' + pkg.availabilityId, pkg)
        .subscribe((res) => {
          console.log("Res from update availability", res);
          resolve(res);
        })
    })
  }

}
