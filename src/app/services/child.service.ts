import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChildService {

  metadataCategories: any;

  constructor(
    private http: HttpClient
  ) { }

  getMetadataCategories() {
    return new Promise(resolve => {
       this.http.get('https://server.dayshare.co/metadataCategories')
      //this.http.get('http://localhost:8080/metadataCategories')
        .subscribe((res: any) => {
          this.metadataCategories =  res._embedded.metadataCategories;
          resolve(res._embedded.metadataCategories);
      });
    });
  }

  convertChildDate(date) {
    const currentDate: any  = new Date();
    const d = date.split('-');
    const childDate: any = new Date(d[0], d[1], d[2]);
    const difference =  currentDate - childDate;
    const yearMs = 31536000000;

    const age = difference / yearMs;
    let ageString;

    if (age < 1) {
      ageString = 'Less than 12 Months';
    } else if (age >= 1 && age < 2) {
      ageString = '12 to 24 Months';
    } else {
      ageString = Math.floor(age) + ' Years Old';
    }

    return ageString;
  }

}
