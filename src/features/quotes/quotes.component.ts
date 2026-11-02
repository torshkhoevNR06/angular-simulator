import { Component, inject } from '@angular/core';
import { QuotesStore } from './store/quote.store';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
import { QuoteListType } from './enum/QuoteListType';
@Component({
  selector: 'app-quotes',
  imports: [EmptyStateComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {

  quotesStore: InstanceType<typeof QuotesStore> = inject(QuotesStore);
  QuoteListType: typeof QuoteListType = QuoteListType;

}