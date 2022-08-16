import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { CriaAutoresComponent } from './cria-autores/cria-autores.component';
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
  },
  {
    path: 'livros',
    component: LivrosComponent,
    canActivate: [],
  },
  {
    path: 'autores',
    component: AutoresComponent,
    canActivate: [],
  },
  {
    path: 'cria-autores',
    component: CriaAutoresComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
