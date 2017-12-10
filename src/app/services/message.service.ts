import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  sendPrivateMessage(pkg) {
    return new Promise(resolve => {
      this.http.post('https://server.dayshare.co/messages', pkg)
      //this.http.post('http://localhost:8080/messages', pkg)
        .subscribe((res) => {
          console.log("Res from send PM", res);
          resolve(res);
        })
    })
  }

  getConversation(pkg) {
    let primary = 1;
    let secondary = 2;
    return new Promise(resolve => {
      this.http.get('https://server.dayshare.co/messages/search/getConversation?primary=' + primary + '&secondary=' + secondary)
      //this.http.get('http://localhost:8080/messages/search/getConversation?primary=' + primary + '&secondary=' + secondary)
        .subscribe((res: any) => {
          console.log("Res from get conversation", res);
          resolve(res._embedded.messages);
        })
    })
  }
  


}
