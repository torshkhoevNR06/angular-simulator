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
    this.saveVisitsСount();
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

  saveVisitsСount(): void {
    const visitsRaw: number = Number(localStorage.getItem("user-visit"));
    const visits: number = isNaN(visitsRaw) ? 1 : visitsRaw + 1;
    localStorage.setItem("user-visit", JSON.stringify(visits));
  }

}