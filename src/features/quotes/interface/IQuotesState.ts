import type { ActiveListQuote } from '../enum/ActiveListQuote';
import { IQuote } from './IQuote';

export interface IQuotesState {
  activeList: ActiveListQuote;
  randomQuote: IQuote | null;
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean; 
  error: string | null;
}