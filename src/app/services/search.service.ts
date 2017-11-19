import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SearchService {

  constructor(
    private http: HttpClient
  ) {}

  searchParents(pkg) {
    return new Promise(resolve => {
      this.http.post('https://search.dayshare.co/api/searchParents', pkg)
        .subscribe((res: any) => {
          console.log('res from search', res.data);
          resolve(res.data);
        });
    });
  }

}
