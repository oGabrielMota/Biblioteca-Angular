import { AutoresOutput } from '../outputs/autores-output';

export interface LivrosInput {
  id: string;
  titulo: string;
  anoLancamento: string;
  autoresIds: AutoresOutput[];
}
