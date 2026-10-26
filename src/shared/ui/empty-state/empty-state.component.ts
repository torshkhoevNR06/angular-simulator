import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {

  message = 'Рецепты подгружаются...';
  icon = 'pi pi-inbox';

}