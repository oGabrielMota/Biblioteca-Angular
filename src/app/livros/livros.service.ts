import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LivrosOutput } from '../outputs/livros-output';
import { Observable } from 'rxjs';

const URL = environment.URL_API + 'livros';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  constructor(private http: HttpClient) {}

  buscaLivros(user: LivrosOutput): Observable<LivrosOutput[]> {
    return this.http.get<LivrosOutput[]>(URL);
  }
}
