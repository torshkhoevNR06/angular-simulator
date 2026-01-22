import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './training';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  companyName: string = 'Румтибет';
  constructor () {
    this.saveLastSeenTime();
    this.saveNumberVisits();
    this.getColor(Color.RED);
  }

  // №02 Вернуть boolean в зависимости от условия с основным цветом
  getColor(color: Color): boolean {
  const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
  return primaryColors.includes(color);
}

  // №03 Сохранять дату последнего захода на страницу
  saveLastSeenTime(): void {
    const date: string = new Date().toString();
    localStorage.setItem("userDate", JSON.stringify(date));
  }

  // №04 Сохранять количество заходов на страницу
  saveNumberVisits(): void {
    const visitsRaw: number = Number(localStorage.getItem("userVisit"));  
    const visits: number = isNaN(visitsRaw) ? 1 : visitsRaw + 1;
    localStorage.setItem("userVisit", ""+visits);
  }
}