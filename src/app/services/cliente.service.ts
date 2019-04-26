import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
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
      FechaNacimiento: cliente.FechaNacimiento
    });
  }

  getClientes(): Observable<any> {
    return this.db.collection('Clientes').snapshotChanges();
  }
}
