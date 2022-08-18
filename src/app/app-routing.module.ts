import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { HomeComponent } from './home/home.component';
import { LivrosComponent } from './livros/livros.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [],
    title: 'Bem vindo a Biblioteca',
  },
  {
    path: 'livros',
    component: LivrosComponent,
    canActivate: [],
    title: 'Livros',
  },
  {
    path: 'autores',
    component: AutoresComponent,
    canActivate: [],
    title: 'Autores',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
