import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) {
  }

  authState(): Observable<any> {
    return this.fireAuth.authState;
  }

  emailAuthentication(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationEmail(): Promise<void> {
    return this.fireAuth.auth.currentUser.sendEmailVerification();
  }

  authentication(): Promise<any> {
    return new Promise<any>((resolve) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fireAuth.auth.signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  logout(): Promise<any> {
    return this.fireAuth.auth.signOut();
  }
}
