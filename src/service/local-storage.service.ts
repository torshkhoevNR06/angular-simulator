import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  setItem<T>(key: string, value: T): void {
    const val: string = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, val);
  }
  
  getItem<T>(key: string): T | null {
    const keyData: string | null = localStorage.getItem(key);
    if (!keyData) {
      return null;
    }
    
    try {
      return JSON.parse(keyData);
    } catch {
      return keyData as T;
    }
  }
  
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}