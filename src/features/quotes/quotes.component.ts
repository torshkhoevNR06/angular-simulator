import { Component, inject } from '@angular/core';
import { QuotesStore } from './store/quote.store';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
import { ActiveListQuote } from './enum/ActiveListQuote';

@Component({
  selector: 'app-quotes',
  imports: [EmptyStateComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {

  quotesStore = inject(QuotesStore);
  activeListQuote: typeof ActiveListQuote = ActiveListQuote;

}