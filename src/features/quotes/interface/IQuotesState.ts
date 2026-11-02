import type { QuoteListType} from '../enum/QuoteListType';
import { IQuote } from './IQuote';

export interface IQuotesState {
  activeList: QuoteListType;
  randomQuote: IQuote | null;
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean; 
  error: string | null;
}