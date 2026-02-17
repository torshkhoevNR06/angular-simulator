import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  
  private setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  private getItem<T>(key: string): T | null {
    const keyData: string | null = localStorage.getItem(key);
    return keyData ? JSON.parse(keyData) : null;
  }

  private clear() {
    localStorage.clear();
  }

  private removeItem(key: string) {
    localStorage.removeItem(key);
  }

}