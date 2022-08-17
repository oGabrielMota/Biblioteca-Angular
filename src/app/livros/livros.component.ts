import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AutoresOutput } from '../outputs/autores-output';
import { LivrosOutput } from '../outputs/livros-output';
import { LivrosService } from './livros.service';

const URL = environment.URL_API + 'livros';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css'],
})
export class LivrosComponent implements OnInit {
  livros!: LivrosOutput[];

  livroForm!: FormGroup;
  autorForm!: FormGroup;

  constructor(
    private livrosService: LivrosService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buscaLivros();
    this.livroForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      anoLancamento: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      autoresIds: ['', [Validators.required]],
    });
  }

  buscaLivros(): void {
    this.livrosService
      .buscaLivros(this.activatedRoute.snapshot.params?.[1])
      .subscribe((success) => {
        this.livros = success;
        console.log(this.livros);
      });
  }
}
