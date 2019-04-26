import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(public db: AngularFirestore,
              public afDb: AngularFireDatabase) {
  }

  createCliente(cliente: any): Promise<any> {
    return this.db.collection('Clientes').add({
      Nombre: cliente.Nombre,
      Apellido: cliente.Apellido,
      Edad: cliente.Edad,
      fechaNacimiento: cliente.FechaNacimiento
    });
  }

  getClientes(): Observable<any> {
    return this.afDb.list('Clientes').valueChanges();
  }
}
