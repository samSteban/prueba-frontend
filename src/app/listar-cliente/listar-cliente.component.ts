import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../services/cliente.service';
import {Router} from '@angular/router';

import * as _moment from 'moment';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  dataSource: Array<any>;
  displayedColumns: string[] = ['Nombres', 'Apellidos', 'Edad', 'FechaNacimiento', 'FechaDeceso'];

  avg: number;
  standardDeviation: number;

  constructor(private clientes: ClienteService,
              private router: Router) {
  }

  ngOnInit() {
    this.avg = 0;
    this.standardDeviation = 0;
    this.getClientes();
  }

  getClientes() {
    this.clientes.getClientes().subscribe((res) => {
      this.dataSource = res.map((item) => {
        return {
          Nombre: item.payload.doc.data().Nombre,
          Apellido: item.payload.doc.data().Apellido,
          Edad: item.payload.doc.data().Edad,
          FechaNacimiento: item.payload.doc.data().FechaNacimiento,
          Deceso: _moment(item.payload.doc.data().FechaNacimiento, 'D/M/YYYY')
            .add(80, 'years').format('D/M/YYYY')
        };
      });
      if (this.dataSource && this.dataSource.length) {
        this.avg = this.getAverage(this.dataSource.map((cliente) => cliente.Edad));
        this.getStandarDeviation();
        console.log(this.avg);
        console.log(this.standardDeviation);
      }
    });
  }

  private getAverage(data: Array<any>): number {
    const sum = data.reduce((value, init) => {
      return Number(init) + Number(value);
    });
    return sum / this.dataSource.length;
  }

  private getStandarDeviation() {
    const squareDiffs = this.dataSource.map((cliente) => {
      const diff = cliente.Edad - this.avg;
      return diff * diff;
    });

    const avgSquareDiff = this.getAverage(squareDiffs);
    this.standardDeviation = Number(Math.sqrt(avgSquareDiff).toFixed(3));
  }

  redirectToRegister() {
    this.router.navigate(['/principal/register']);
  }
}
