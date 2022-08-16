import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoresOutput } from '../outputs/autores-output';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutoresInput } from '../inputs/autores-input';

const URL = environment.URL_API + 'autores';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  constructor(private http: HttpClient) {}

  buscaTodos(user: AutoresOutput): Observable<AutoresOutput[]> {
    return this.http.get<AutoresOutput[]>(URL + user);
  }

  cadastraAutor(user: AutoresInput): Observable<AutoresOutput> {
    return this.http.post<AutoresOutput>(URL, user);
  }
}
