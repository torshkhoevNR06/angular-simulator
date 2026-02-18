import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getItem<T>(key: string): T | null {
    const keyData: string | null = localStorage.getItem(key);
    return keyData ? JSON.parse(keyData) : null;
  }

  clear() {
    localStorage.clear();
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

}