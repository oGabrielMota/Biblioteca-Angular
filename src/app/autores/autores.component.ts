import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoresOutput } from '../outputs/autores-output';
import { AutoresService } from './autores.service';
import { environment } from 'src/environments/environment';

const URL = environment.URL_API + 'autores';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit {
  autores!: AutoresOutput[];

  constructor(
    private autoresService: AutoresService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscaTodos();
  }

  buscaTodos(): void {
    this.autoresService
      .buscaTodos(this.activatedRoute.snapshot.params?.['id'])
      .subscribe((success) => {
        this.autores = success;
      });
  }
}
