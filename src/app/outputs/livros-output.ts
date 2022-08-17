import { AutoresOutput } from './autores-output';

export interface LivrosOutput {
  id: number;
  titulo: string;
  anoLancamento: string;
  autoresIds: AutoresOutput[];
}
