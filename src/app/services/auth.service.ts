import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) {
  }

  authentication(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fireAuth.auth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  logout(): Promise<any> {
    return this.fireAuth.auth.signOut();
  }
}
