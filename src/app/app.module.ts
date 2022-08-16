import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LivrosComponent } from './livros/livros.component';
import { AutoresComponent } from './autores/autores.component';
import { CriaAutoresComponent } from './cria-autores/cria-autores.component';
import { CriaLivrosComponent } from './cria-livros/cria-livros.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LivrosComponent,
    AutoresComponent,
    CriaAutoresComponent,
    CriaLivrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
