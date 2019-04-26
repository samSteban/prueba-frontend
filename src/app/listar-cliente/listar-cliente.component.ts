import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  dataSource: Array<any>;
  displayedColumns: string[] = ['Nombres', 'Apellidos', 'Edad', 'FechaNacimiento'];

  constructor(private clientes: ClienteService) {
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clientes.getClientes().subscribe((clientes) => {
      console.log(clientes);
    });
  }

}
