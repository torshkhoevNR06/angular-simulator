import { Component } from '@angular/core';
import { Colors } from '../enums/Color';
import './training';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  nameCompany: string = 'Румтибет';
  
  constructor () {
    this.saveLastSeenTime();
    this.saveNumberVisits();
  }
  
  // №02 Вернуть boolean в зависимости от условия с основным цветом
  getColor(color: Colors): boolean | string {
    const primaryColor: Colors = Colors.WHITE;

    switch (primaryColor) {
      case color:
        return `Успешный результат: ${color} = ${true}`;
      default:
        return `Провальный результат: ${color} = ${false}`;
    }
  }

  // №03 Сохранять дату последнего захода на страницу
  async saveLastSeenTime(): Promise<void> {
    const dateUser: string = new Date().toString();
    localStorage.setItem("userDate", JSON.stringify(dateUser));
  }

  // №04 Сохранять количество заходов на страницу
  async saveNumberVisits(): Promise<void> {
    const key: string | null = localStorage.getItem("userVisit");
    let counter: number = 0;

    if (!key) {
      const numIncreased: number = counter + 1;
      localStorage.setItem("userVisit", JSON.stringify(numIncreased));
    } else {
      const parseKey: number = JSON.parse(key);
      const numIncreased: number = parseKey + 1;
      localStorage.setItem("userVisit", JSON.stringify(numIncreased));
    }
  }
}

const appComponent: AppComponent = new AppComponent();
console.log(appComponent.getColor(Colors.WHITE));