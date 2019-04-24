import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: any;

  constructor() {
  }

  ngOnInit() {
    const _user = JSON.parse(localStorage.getItem('user'));
    this.user = _user.additionalUserInfo;
  }

}
