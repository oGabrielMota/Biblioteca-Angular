import { AutoresInput } from './../inputs/autores-input';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoresOutput } from '../outputs/autores-output';
import { AutoresService } from './autores.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function fechaModal(id: string): any;
declare function openModal(id: string): any;

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit {
  autores!: AutoresOutput[];
  autoresForm!: FormGroup;

  idAutorAlterar: number = -1;

  marcaAutorAlterarForm!: FormGroup;

  @Input() erro: any = '';
  sucesso: boolean = false;
  botaoAtivo: boolean = true;

  autorCadastradoComSucesso: boolean = false;
  autorAlteradoComSucesso: boolean = false;

  erroCadastrarAutor: boolean = false;
  erroAlterarAutor: boolean = false;

  constructor(
    private autoresService: AutoresService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buscaTodos();
    this.autoresForm = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      biografia: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000),
        ],
      ],
    });
    this.marcaAutorAlterarForm = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      biografia: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  buscaTodos(): void {
    this.autoresService
      .buscaTodos(this.activatedRoute.snapshot.params?.['id'])
      .subscribe((success) => {
        this.autores = success;
      });
  }

  marcaAlterar(id: number, nome: string, biografia: string) {
    this.idAutorAlterar = id;
    this.marcaAutorAlterarForm.get('nome')?.setValue(nome);
    this.marcaAutorAlterarForm.get('biografia')?.setValue(biografia);
  }

  alterar() {
    if (this.marcaAutorAlterarForm) {
      let mudaAutor = this.marcaAutorAlterarForm.getRawValue() as AutoresInput;

      this.autoresService.alterar(this.idAutorAlterar, mudaAutor).subscribe({
        next: (data) => {
          this.buscaTodos();
          fechaModal('fechaModalAlteracao');
          this.autorAlteradoComSucesso = true;
        },
        error: (err) => {
          this.erroCadastrarAutor = true;
        },
      });
    }
  }

  cadastraAutor() {
    const user = this.autoresForm.getRawValue() as AutoresInput;
    this.autoresService.cadastraAutor(user).subscribe({
      next: (success) => {
        this.buscaTodos();
        fechaModal('fechaModalCriacao');
        this.autorCadastradoComSucesso = true;
      },
      error: (err) => {
        this.erroCadastrarAutor = true;
      },
    });
  }
}
