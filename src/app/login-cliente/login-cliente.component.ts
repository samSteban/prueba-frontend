import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {

  formLogin: FormGroup;
  formSignup: FormGroup;

  hideLogin = true;
  hideRegister = true;
  tabSelected = 0;

  constructor(private auth: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      })
    });

    this.formSignup = this.fb.group({
      _email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'change'
      }),
      _password: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      })
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/principal/register']);
    }

    /*this.auth.authState().subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/principal/register']);
      } else {
        localStorage.removeItem('user');
      }
    });*/
  }

  loginWithEmailAndPassword() {
    if (this.formLogin.valid) {
      this.auth.emailAuthentication(this.email.value, this.password.value)
        .then((user) => {
          if (user.user && user.user.emailVerified) {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/principal/register']);
          } else {
            this.snackBar.open('Primero debes verificar tu correo.', '', {
              duration: 5000
            });
            this.password.setValue('');
          }
        })
        .catch((err) => {
          this.snackBar.open(err, '', {
            duration: 5000
          });
        });
    }
  }

  async registerWithEmailAndPassword() {
    if (this.formSignup.valid) {
      <any>await this.auth.register(this._email.value, this._password.value);

      this._email.setValue('');
      this._password.setValue('');

      this.snackBar.open('Te enviaremos un correo para verificar tu email.', '', {
        duration: 5000
      });
      this.tabSelected = 0;
      this.sendVerificationEmail();
    }
  }

  private async sendVerificationEmail() {
    <any>await this.auth.sendVerificationEmail();
  }

  loginWithGoogle() {
    this.auth.authentication().then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/principal/list']);
    });
  }

  get email(): any {
    return this.formLogin.get('email');
  }

  get password(): any {
    return this.formLogin.get('password');
  }

  get _email(): any {
    return this.formSignup.get('_email');
  }

  get _password(): any {
    return this.formSignup.get('_password');
  }
}
