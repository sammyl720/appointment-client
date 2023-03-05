import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
