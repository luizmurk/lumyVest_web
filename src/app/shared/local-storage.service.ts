import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }
  get(key: any): any {
    if (this.isLocalStorageSupported) {
      return this.localStorage.getItem(key);
    }
    return null;
  }

  set(key: string, value: any){
    //if (this.isLocalStorageSupported) {
      return this.localStorage.setItem(key, JSON.stringify(value));
      
    //}
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
