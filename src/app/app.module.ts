import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CrearClienteComponent} from './crear-cliente/crear-cliente.component';
import {ListarClienteComponent} from './listar-cliente/listar-cliente.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginClienteComponent} from './login-cliente/login-cliente.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {LayoutComponent} from './layout/layout.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule,
  MatSnackBarModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClienteService} from './services/cliente.service';
import {AngularFirestore, FirestoreSettingsToken} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    CrearClienteComponent,
    ListarClienteComponent,
    LoginClienteComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    FormBuilder,
    ClienteService,
    AngularFirestore,
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
