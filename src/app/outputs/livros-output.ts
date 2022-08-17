import { AutoresOutput } from './autores-output';

export interface LivrosOutput {
  id: string;
  titulo: string;
  anoLancamento: string;
  idAutor: AutoresOutput[];
}
