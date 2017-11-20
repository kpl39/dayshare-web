import { Injectable } from '@angular/core';

@Injectable()
export class RouterDataService {

  signupData: any;

  constructor() { }

  setSignupData(data) {
    this.signupData = data;
  }

  getSignupData() {
    return this.signupData;
  }

}
