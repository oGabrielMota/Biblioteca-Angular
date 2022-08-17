import { AutoresOutput } from '../outputs/autores-output';

export interface LivrosInput {
  id: number;
  titulo: string;
  anoLancamento: string;
  autoresIds: AutoresOutput[];
}
