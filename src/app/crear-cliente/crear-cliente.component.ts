import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../services/cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  form: FormGroup;

  constructor(private clientes: ClienteService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombres: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      }),
      apellidos: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      }),
      edad: new FormControl('', {
        validators: [
          Validators.required,
          Validators.min(18)
        ],
        updateOn: 'change'
      }),
      fechaNacimiento: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      })
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const newCliente = {
        Nombre: this.nombres.value,
        Apellido: this.apellidos.value,
        Edad: this.edad.value.toString(),
        FechaNacimiento: this.fechaNacimiento.value.toLocaleDateString()
      };
      this.clientes.createCliente(newCliente)
        .then((res) => {
          if (res) {
            this.snackBar.open('¡Cliente registrado!', '', {
              duration: 5000
            });
            this.goToList();
          }
        })
        .catch((err) => {
          this.snackBar.open(err, '', {
            duration: 5000
          });
        });
    }
  }

  goToList() {
    this.router.navigate(['/principal/list']);
  }

  get nombres(): any {
    return this.form.get('nombres');
  }

  get apellidos(): any {
    return this.form.get('apellidos');
  }

  get edad(): any {
    return this.form.get('edad');
  }

  get fechaNacimiento(): any {
    return this.form.get('fechaNacimiento');
  }
}
