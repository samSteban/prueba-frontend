import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    const _user = JSON.parse(localStorage.getItem('user'));
    this.user = _user.additionalUserInfo;
  }

  logout() {
    this.auth.logout().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
