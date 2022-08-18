import { AutoresOutput } from '../outputs/autores-output';

export interface LivrosInput {
  id: number;
  titulo: string;
  anoLancamento: number;
  autores: Array<AutoresOutput>;
}
