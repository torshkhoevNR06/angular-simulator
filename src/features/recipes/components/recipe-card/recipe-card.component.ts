import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { IRecipe } from '../../interface/IRecipe';

@Component({
  selector: 'app-recipe-card',
  imports: [CardModule, FormsModule, RatingModule, TranslatePipe],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})

export class RecipeCardComponent {

  @Input({ required: true }) recipe!: IRecipe;

}