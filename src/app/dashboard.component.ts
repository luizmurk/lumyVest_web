import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { LocalStorageService } from './shared/local-storage.service';
import { NotificationsService } from './shared/notifications.service';
import { ReadService } from "./shared/read.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  payouts: any;
  credID: any;
  userID: any;
  credentials: any;

  constructor(public notify:NotificationsService, private readService:ReadService,private authService:AuthService, private storageService:LocalStorageService,) {
    this.credID = this.authService.credID;
    this.userID = this.authService.userID;
  }

  ngOnInit(): void {
    console.log('i got to dashboard');
    console.log(this.userID );
    console.log(this.credID);
    this.getCreds();
  }

  getCreds(): void {
    this.notify.loading('Please wait... Getting Your Details');
    
    this.readService
      .getCreds(this.credID)
      .subscribe(res => {
        this.credentials = res;
        if(res.type == 'removed'){
          console.log('not found');
          this.notify.Doneloading();
        }else{
          console.log('your cred results');
          console.log(res.payload.data());
          this.credentials = res.payload.data();
          this.notify.Doneloading();
        }
       
      });
  };
}
