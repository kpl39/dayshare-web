import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SearchService {

  constructor(
    private http: HttpClient
  ) {}

  searchParents(pkg) {
    return new Promise(resolve => {
      this.http.post('http://dayshare-es-env.atxmwjr3te.us-east-2.elasticbeanstalk.com/api/searchParents', pkg)
        .subscribe((res: any) => {
          console.log('res from search', res.data);
          resolve(res.data);
        });
    });
  }

}
