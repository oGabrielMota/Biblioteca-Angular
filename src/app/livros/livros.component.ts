import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LivrosInput } from '../inputs/livros-input';
import { AutoresOutput } from '../outputs/autores-output';
import { LivrosOutput } from '../outputs/livros-output';
import { LivrosService } from './livros.service';

declare function fechaModal(id: string): any;
declare function abreModal(id: string): any;

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css'],
})
export class LivrosComponent implements OnInit {
  livros!: LivrosOutput[];

  livroForm!: FormGroup;
  autorForm!: FormGroup;
  marcaLivroAlterarForm!: FormGroup;

  livroAlterar: number = -1;
  autoresId: number = -1;
  nomeLivro: string = '';

  livroCadastradoComSucesso: boolean = false;
  livroExcluidaComSucesso: boolean = false;
  livroAlteradoComSucesso: boolean = false;

  nenhumLivro: boolean = false;

  erroCadastrarLivro: boolean = false;
  erroExcluirLivro: boolean = false;
  erroAlterarLivro: boolean = false;

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
    this.marcaLivroAlterarForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      anoLancamento: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      autoresIds: ['', [Validators.required]],
    });
  }

  resetaMensagensSucesso() {
    this.livroAlteradoComSucesso = false;
    this.livroAlteradoComSucesso = false;
  }

  resetaMensagensErro() {
    this.erroAlterarLivro = false;
    this.erroExcluirLivro = false;
  }

  buscaLivros(): void {
    this.livrosService
      .buscaLivros(this.activatedRoute.snapshot.params?.[1])
      .subscribe((success) => {
        this.livros = success;
        console.log(this.livros);
      });
  }

  cadastraLivro() {
    this.livroCadastradoComSucesso = false;
    this.erroCadastrarLivro = false;
    const user = this.livroForm.getRawValue() as LivrosInput;
    this.livrosService.cadastraLivro(user).subscribe({
      next: (success) => {
        this.livroCadastradoComSucesso = true;
      },
      error: (err) => {
        this.erroCadastrarLivro = true;
      },
    });
  }

  marcaAlterar(
    id: number,
    titulo: string,
    anoLancamento: string,
    autoresIds: number
  ) {
    this.livroAlterar = id;
    this.marcaLivroAlterarForm.get('titulo')?.setValue(titulo);
    this.marcaLivroAlterarForm.get('anoLancamento')?.setValue(anoLancamento);
    this.marcaLivroAlterarForm.get('autoresIds')?.setValue(autoresIds);
  }

  alterar() {
    this.resetaMensagensErro();
    this.resetaMensagensSucesso();
    if (this.marcaLivroAlterarForm) {
      let mudaLivro = this.marcaLivroAlterarForm.getRawValue() as LivrosInput;

      this.livrosService.alterar(this.livroAlterar, mudaLivro).subscribe({
        next: (data) => {
          this.livroAlteradoComSucesso = true;
          this.buscaLivros();
          fechaModal('fechaModalAlteracao');
        },
        error: (err) => {
          this.erroAlterarLivro = true;
        },
      });
    }
  }

  modalRemoveLivro(id: number, nome: string) {
    this.resetaMensagensErro();
    this.resetaMensagensSucesso();
    this.nomeLivro = nome;
    document
      .getElementById('botaoRemoverLivro')
      ?.setAttribute('data-id', id.toString());
    abreModal('removerLivro');
  }

  excluir() {
    this.resetaMensagensErro();
    this.resetaMensagensSucesso();
    const id = document
      .getElementById('botaoRemoverLivro')
      ?.getAttribute('data-id');
    this.livrosService.excluir(id).subscribe({
      next: (data) => {
        this.buscaLivros();
        this.livroExcluidaComSucesso = true;
        fechaModal('botaoFecharRemoveLivro');
      },
      error: (err) => {
        fechaModal('botaoFecharRemoveLivro');
        this.erroExcluirLivro;
      },
    });
  }
}
