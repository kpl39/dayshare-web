import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageService {

  constructor(
    private http: HttpClient
  ) {}

  updateProfileImage(pkg) {
    return new Promise(resolve => {
      // this.http.put('http://localhost:8080/api/parents/updateprofileimage', pkg)
      this.http.put('https://server.dayshare.co/api/parents/updateprofileimage', pkg)
        .subscribe((res: any) => {
          console.log('res from update profile', res);
          resolve(res);
        });
    });
  }

}
