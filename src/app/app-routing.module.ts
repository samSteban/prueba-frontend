import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginClienteComponent} from './login-cliente/login-cliente.component';
import {LayoutComponent} from './layout/layout.component';
import {CrearClienteComponent} from './crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginClienteComponent
  },
  {
    path: 'principal',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: CrearClienteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
