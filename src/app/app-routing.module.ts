import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { CriaAutoresComponent } from './cria-autores/cria-autores.component';
import { CriaLivrosComponent } from './cria-livros/cria-livros.component';
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
  {
    path: 'cria-autores',
    component: CriaAutoresComponent,
    canActivate: [],
    title: 'Adicionar Autores',
  },
  {
    path: 'cria-livros',
    component: CriaLivrosComponent,
    canActivate: [],
    title: 'Adicionar Livros',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
