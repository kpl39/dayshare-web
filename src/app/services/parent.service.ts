import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ParentService {

  constructor(
    private http: HttpClient
  ) { }

  updateParentProfile(pkg) {
    delete pkg.children;
    delete pkg.groups;
    const parentId = pkg.parentId;

    return new Promise(resolve => {
      this.http.put('https://server.dayshare.co/parents/' + parentId, pkg)
        .subscribe((res) => {
          console.log('Res from update parent', res);
          resolve(res);
        })
    })
  } 


}
