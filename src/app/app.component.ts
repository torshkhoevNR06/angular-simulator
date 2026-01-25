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
  
  constructor() {
    this.saveLastVisit();
    this.saveСountVisits();
    this.getColor(Color.RED);
  }

  getColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }

  saveLastVisit(): void {
    const date: string = new Date().toString();
    localStorage.setItem("userDate", JSON.stringify(date));
  }

  saveСountVisits(): void {
    const key: number = Number(localStorage.getItem("user-visit"));
    const userVisits: number = isNaN(key) ? 1 : key + 1;
    localStorage.setItem("user-visit", JSON.stringify(userVisits));
  }

}