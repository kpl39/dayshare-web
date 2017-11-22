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
        .subscribe((res: any) => {
          this.metadataCategories =  res._embedded.metadataCategories;
          resolve(res._embedded.metadataCategories);
      });
    });
  }

}
