import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { recipeActions } from './state/recipes.actions';
import { Store } from '@ngrx/store';
import { selectLoading, selectRecipes } from './state/recipes.selectors';
import { Observable } from 'rxjs';
import { IRecipe } from './interface/IRecipe';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipes',
  imports: [ButtonModule, RecipeCardComponent, EmptyStateComponent, TranslatePipe, AsyncPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})

export class RecipesComponent implements OnInit {

  private store: Store = inject(Store);

  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  isLoading$: Observable<boolean> = this.store.select(selectLoading);

  ngOnInit(): void {
    this.onLoadRecipes();
  }

  onLoadRecipes(): void {
    this.store.dispatch(recipeActions.loadRecipes({ loading: true }));
  }

}