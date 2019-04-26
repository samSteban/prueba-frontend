import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../services/cliente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  dataSource: Array<any>;
  displayedColumns: string[] = ['Nombres', 'Apellidos', 'Edad', 'FechaNacimiento'];

  constructor(private clientes: ClienteService,
              private router: Router) {
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clientes.getClientes().subscribe((res) => {
      this.dataSource = res.map((item) => item.payload.doc.data());
      console.log(this.dataSource);
    });
  }

  redirectToRegister() {
    this.router.navigate(['/principal/register']);
  }
}
