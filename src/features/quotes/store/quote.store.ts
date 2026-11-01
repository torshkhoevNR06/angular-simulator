import { signalStore, withState, withComputed, withMethods, patchState, withHooks, signalStoreFeature } from '@ngrx/signals';
import { IQuotesState } from '../interface/IQuotesState';
import { QuoteApiService } from '../api/quote-api.service';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { IQuotes } from '../interface/IQuotes';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { IQuote } from '../interface/IQuote';
import { ActiveListQuote } from '../enum/ActiveListQuote';

const initialQuotesState: IQuotesState = {
  activeList: ActiveListQuote.ALL,
  randomQuote: null,
  quotes: [],
  favorites: [],
  loading: false,
  error: null
};

export const QuotesStore = signalStore(
  { providedIn: 'root' },

  withState<IQuotesState>(initialQuotesState),

  withComputed((store) => ({
    favoritesCount: computed(() => store.favorites().length),
    authorsCount: computed(() => store.quotes().length),
    filteredQuotes: computed(() => {
      return store.activeList() === ActiveListQuote.FAVORITE
        ? store.favorites() 
        : store.quotes();
    })
  })),

  signalStoreFeature(
    withMethods((store, api = inject(QuoteApiService)) => ({
      loadQuotes: rxMethod<void>(
        pipe(
          tap(() => patchState(store, 
            { 
              loading: true, 
              error: null 
            }
          )),
          switchMap(() => {
            return api.getQuotes()
              .pipe(
                tapResponse({
                  next: (response: IQuotes) => patchState(store, 
                    { 
                      quotes: response.quotes, 
                      loading: false 
                    }),
                  error: () => patchState(store, 
                    { 
                      error: 'Не удалось загрузить цитаты', 
                      loading: false 
                    })
                })
              );
          })
        )
      )
    }))
  ),

  withMethods((store) => ({

    addQuote(currentQuotes: IQuote): void {
      patchState(store, {
        favorites: [...store.favorites(), currentQuotes]
      });
    },

    deleteQuote(currentQuote: IQuote): void {
      const filteredQuotes: IQuote[] = store.favorites().filter(quote => {
        return quote.id !== currentQuote.id;
      });
      patchState(store, { 
        favorites: [...filteredQuotes]
      });
    },

    addFavorites(quoteId: number): boolean {
      let isFavorite: boolean = false;

      store.favorites().some((favorite: IQuote) => {
        return favorite.id === quoteId
          ? isFavorite = true 
          : isFavorite;
      });

      return isFavorite;
    },

    changeListOfQuotes(activeList: ActiveListQuote) {
      patchState(store, {
        activeList: activeList
      });
    },

    selectRandomQuote(): void {
      const randomQuote: number = Math.floor(Math.random() * (store.quotes().length - 1));
      patchState(store, {
        randomQuote: store.quotes()[randomQuote]
      });
    }
  })),

  withHooks({
    onInit(store): void {
      store.loadQuotes();
    }
  })
);