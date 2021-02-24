import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  message: string = '';
  showLoading: boolean = false;
  showSuccess: boolean = false;
  showFailure: boolean = false;
  showWarning: boolean = false;
  showInfo: boolean = false;
  constructor() { }

  loading(message: string){
    this.showLoading = true;
    this.message = message;
  }

  Doneloading(){
    this.showLoading = false;
  }

  successAlert(message: string){
    this.showSuccess = true;
    this.message = message;
  }

  DonesuccessAlert(){
    this.showSuccess = false;
  }

  failureAlert(message: string){
    this.showFailure = true;
    this.message = message;
  }

  DonefailureAlert(){
    this.showFailure = false;
  }

  warningAlert(message: string){
    this.showWarning = true;
    this.message = message;
  }

  DonewarningAlert(){
    this.showWarning  = false;
  }

  infoAlert(message: string){
    this.showInfo = true;
    this.message = message;
  }

  DoneinfoAlert(){
    this.showInfo = false;
  }
}
