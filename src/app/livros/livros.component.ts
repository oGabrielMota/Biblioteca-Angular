import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LivrosInput } from '../inputs/livros-input';
import { AutoresOutput } from '../outputs/autores-output';
import { LivrosOutput } from '../outputs/livros-output';
import { LivrosService } from './livros.service';

declare function closeModal(id: string): any;

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

  buscaLivros(): void {
    this.livrosService
      .buscaLivros(this.activatedRoute.snapshot.params?.[1])
      .subscribe((success) => {
        this.livros = success;
        console.log(this.livros);
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
    if (this.marcaLivroAlterarForm) {
      let mudaLivro = this.marcaLivroAlterarForm.getRawValue() as LivrosInput;

      this.livrosService.alterar(this.livroAlterar, mudaLivro).subscribe({
        next: (data) => {
          this.buscaLivros();
          closeModal('fechaModalAlteracao');
        },
        error: (erro) => {},
      });
    }
  }
}
