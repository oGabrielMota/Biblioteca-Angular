import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  autoresIds: number = -1;
  nomeLivro: string = '';

  livroCadastradoComSucesso: boolean = false;
  livroExcluidaComSucesso: boolean = false;
  livroAlteradoComSucesso: boolean = false;

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
      autores: ['', [Validators.required]],
    });
    this.marcaLivroAlterarForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      anoLancamento: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      autores: ['', [Validators.required]],
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
      .buscaLivros(this.activatedRoute.snapshot.params?.['id'])
      .subscribe((success) => {
        this.livros = success;
        console.log(this.livros);
      });
  }

  cadastraLivro() {
    this.livroCadastradoComSucesso = false;
    this.erroCadastrarLivro = false;
    const user = this.livroForm.getRawValue() as LivrosInput;
    const autores = this.livroForm.get('autores')?.value;
    const lista = autores.split(',');
    user.autores = lista;
    this.livrosService.cadastraLivro(user).subscribe({
      next: (success) => {
        this.livroCadastradoComSucesso = true;
        fechaModal('fechaModalCriacao');
        this.buscaLivros();
      },
      error: (err) => {
        this.erroCadastrarLivro = true;
        console.log(user);
      },
    });
  }

  marcaAlterar(id: number, titulo: string, anoLancamento: number, ids: number) {
    this.livroAlterar = id;
    this.autoresIds = ids;
    this.marcaLivroAlterarForm.get('titulo')?.setValue(titulo);
    this.marcaLivroAlterarForm.get('anoLancamento')?.setValue(anoLancamento);
    this.marcaLivroAlterarForm.get('autores')?.setValue(ids);
  }

  alterar() {
    this.resetaMensagensErro();
    this.resetaMensagensSucesso();
    if (this.marcaLivroAlterarForm) {
      let mudaLivro = this.marcaLivroAlterarForm.getRawValue() as LivrosOutput;

      this.livrosService.alterar(this.livroAlterar, mudaLivro).subscribe({
        next: (data) => {
          this.livroAlteradoComSucesso = true;
          fechaModal('fechaModalAlteracao');
          this.buscaLivros();
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
        this.livroExcluidaComSucesso = true;
        fechaModal('botaoFecharRemoveLivro');
        this.buscaLivros();
      },
      error: (err) => {
        fechaModal('botaoFecharRemoveLivro');
        this.erroExcluirLivro;
      },
    });
  }
}
