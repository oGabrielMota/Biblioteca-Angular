import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LivrosInput } from '../inputs/livros-input';
import { LivrosService } from '../livros/livros.service';
import { AutoresOutput } from '../outputs/autores-output';
import { LivrosOutput } from '../outputs/livros-output';

@Component({
  selector: 'app-cria-livros',
  templateUrl: './cria-livros.component.html',
  styleUrls: ['./cria-livros.component.css'],
})
export class CriaLivrosComponent implements OnInit {
  livro!: LivrosOutput[];
  autor!: AutoresOutput[];

  livrosForm!: FormGroup;
  idAutoresForm!: FormGroup;

  livroCadastradoComSucesso: boolean = false;

  erroCadastrarLivro: boolean = false;

  constructor(
    private livroService: LivrosService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscaLivros();
    this.livrosForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      anoLancamento: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      autoresIds: ['', [Validators.required]],
    });
  }

  buscaLivros(): void {
    this.livroService
      .buscaLivros(this.activatedRoute.snapshot.params?.['id'])
      .subscribe((success) => {
        this.livro = success;
      });
  }

  cadastraLivro() {
    this.livroCadastradoComSucesso = false;
    this.erroCadastrarLivro = false;
    const user = this.livrosForm.getRawValue() as LivrosInput;
    this.livroService.cadastraLivro(user).subscribe({
      next: (success) => {
        this.livroCadastradoComSucesso = true;
      },
      error: (err) => {
        this.erroCadastrarLivro = true;
      },
    });
  }
}
