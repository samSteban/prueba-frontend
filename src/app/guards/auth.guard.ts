import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.user && user.user.emailVerified) {
        return true;
      }
      this.snackBar.open('Primero debes verificar tu correo.', '', {
        duration: 5000
      });
      this.auth.logout();
    }
    return false;
  }
}
