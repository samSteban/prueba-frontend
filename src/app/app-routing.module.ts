import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginClienteComponent} from './login-cliente/login-cliente.component';
import {LayoutComponent} from './layout/layout.component';
import {CrearClienteComponent} from './crear-cliente/crear-cliente.component';
import {AuthGuard} from './guards/auth.guard';

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
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
