import { Injectable } from '@angular/core';
// import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class AuthService {
  userAuth: any;
  profile: any;
  authenticated: Boolean;
  device: string;
  vendorInfo: any;
  userType: String;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) {}


  checkEmailStatus(email) {
    return new Promise(resolve => {
      this.http.get('https://server.dayshare.co/parents/search/findByEmail?email=' + email)
      // this.http.get('http://localhost:8080/parents/search/findByEmail?email=' + email)
        .subscribe((res: any) => {
          this.profile = res._embedded.parents[0];
          console.log('USER AFTER EMAIL STATUS', this.userAuth);
          if (res.page.totalElements < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
    });
  }


  createEmailUser(email, password) {
    return new Promise(resolve => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('RES ADD USER', res);
          resolve(res);
        })
        .catch((err) => {
          console.log('ERROR', err);
          resolve(err);
        });
    });
  }

  loginEmailUser(email, password) {
    return new Promise(resolve => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('RES LOGIN USER', res);
          this.getAuthState();
          resolve(res);
        })
        .catch((err) => {
          console.log('ERROR', err);
          resolve(err);
        });
    });

  }

  getAuthState() {
    return new Promise(resolve => {
      this.afAuth.authState.
      subscribe( (res) => {
        console.log('RES FROM GET AUTH STATE', res);
        if (res) {
          this.userAuth = res;
          this.authenticated = true;
          // this.checkEmailStatus(res.email);
        } else {
          this.authenticated = false;
        }
        resolve(res);
      });
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authenticated = false;
    this.userType = null;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  facebookLogin() {
    return new Promise(resolve => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
          this.getAuthState();
          resolve(res);
        });
    });
  }

  googleLogin() {
    return new Promise(resolve => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          this.getAuthState();
          resolve(res);
        });
    });
  }

  // googleLogin() {
  //     return new Promise(resolve => {
  //         this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  //             .then((res) => {
  //                 console.log("RES FROM GOOGLE LOGIN", res);
  //                 this.getAuthState();
  //                 resolve(res)
  //             })
  //     })
  // }

  addParent(pkg) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8080/api/parents/addparent', pkg)
        .subscribe((res: any) => {
          console.log('RES FROM ADD USER', res);
          resolve(res);
        });
    });
  }

  getParentInfo(email) {
    return new Promise(resolve => {
      this.http.get('https://server.dayshare.co/parents/search/findByEmail?email=' + email + '&projection=parentFullProjection')

      // this.http.get('http://localhost:8080/parents/search/findByEmail?email=' + email)
        .subscribe((res: any) => {
          this.profile = res._embedded.parents[0];
          resolve(this.profile);
        });
    });
  }

  getParentProfileByUsername(username) {
    return new Promise(resolve => {
      this.http.get('https://server.dayshare.co/parents/search/findByUserName?username=' + username + '&projection=parentFullProjection')
        .subscribe((res: any) => {
          this.profile = res._embedded.parents[0];
          resolve(this.profile);
        });
    });
  }


}
