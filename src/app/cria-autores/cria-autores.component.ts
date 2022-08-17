import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoresService } from '../autores/autores.service';
import { AutoresInput } from '../inputs/autores-input';
import { AutoresOutput } from '../outputs/autores-output';
import { environment } from 'src/environments/environment';

declare function fechaModal(id: string): any;

const URL = environment.URL_API + 'livros';

@Component({
  selector: 'app-cria-autores',
  templateUrl: './cria-autores.component.html',
  styleUrls: ['./cria-autores.component.css'],
})
export class CriaAutoresComponent implements OnInit {
  autoresForm!: FormGroup;
  autor!: AutoresOutput[];

  @Input() erro: any = '';
  sucesso: boolean = false;
  botaoAtivo: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private autoresService: AutoresService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
  }

  buscaTodos() {
    this.autoresService
      .buscaTodos(this.activatedRoute.snapshot.params?.['id'])
      .subscribe((success) => {
        this.autor = success;
      });
  }

  cadastraAutor() {
    const user = this.autoresForm.getRawValue() as AutoresInput;
    this.autoresService.cadastraAutor(user).subscribe({
      next: (success) => {
        console.log('Deu baum');
        this.sucesso = true;
        this.botaoAtivo = true;
      },
      error: (err) => {
        this.erro = err;
        this.botaoAtivo = true;
      },
    });
  }
}
