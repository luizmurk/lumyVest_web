import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from "./shared/auth.service";
import { CreateService } from "./shared/create.service";
import { LocalStorageService } from "./shared/local-storage.service";
import { NotificationsService } from "./shared/notifications.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ReadService } from './shared/read.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  //@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  submitted = false;
  title = 'lumyVest';
  selected: String = 'Dashboard';
  view: String = 'login';
  username: String = '';
  email: any = '';
  password: any = '';
  registerForm: any;
  checkPassword: String = '';
  userID: string | undefined = '';
  credID: string | undefined = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(10)]),
  });
  
  

  constructor(public auth: AngularFireAuth, private readService:ReadService, private authService:AuthService, public notify:NotificationsService, private storageService:LocalStorageService, private createService:CreateService, private formBuilder: FormBuilder, private _router: Router) { 
     this.userID = this.storageService.get('userID');
     this.authService.userID = this.storageService.get('userID');
     this.authService.credID = this.storageService.get('credID');
    this._router.navigate(['dashboard'])
  }

  ngOnInit(): void {
    if(this.userID == undefined){
      this.view = 'login';
    }else{
      this.view = 'home';
    }
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
});
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    });
  }

  get f() { return this.registerForm.controls; }
  get l() { return this.loginForm.controls; }

  selectNav(navName: String): void{
    console.log('cliked');
    this.selected = navName;
  }

  loginPage(){
    this.view = 'login';
  }

  signUpPage(){
    this.view = 'register';
  }

  forgotPassword(){
     this.view = 'forgotPassword';
    //this.view = 'third';
  }

  login(): void{
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.notify.loading('Please wait... Logging you in');
    console.log(this.loginForm.get('email')?.value);
    var email = this.loginForm.get('email')?.value;
    var password = this.loginForm.get('password')?.value;
    this.authService
      .signIn(email, password).then(res => {
        this.userID = res.user?.uid;
        this.storageService.set('userID', this.userID);
      this.authService.userID = this.userID;
      this.readService
        .getTest(this.userID)
        .subscribe(res => {
          console.log(res.forEach((ele)=>{
            console.log(ele.payload.doc.id);
            this.storageService.set('credID', ele.payload.doc.id);
            this.authService.credID = ele.payload.doc.id;
            this.notify.Doneloading();
            this.view = 'home';
          }));
        });
      
      }).catch((error) => {
        this.notify.Doneloading();
        window.alert(error.message)
      })
  }

  private getAppRootUrl() : string {
 
		// Since the demo may be running locally or on GitHub; and, using the Hash or
		// Path location strategy; we need to calculate the the ingress using the the
		// name of the demo folder that we know we're in.
		var folder = "/firebase-email-auth-angular7/";
 
		// Find the index of this folder in the browser URL.
		var folderIndex = window.location.href.indexOf( folder );
 
		// Return the URL prefix up-to and including the demo folder. This will be the
		// base off of which we append all internal app-URLs.
		return( window.location.href.slice( 0, ( folderIndex + folder.length ) ) );
 
	}

  register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.notify.loading('Please wait... Registering your Account');
    console.log(this.registerForm.get('email')?.value);
    var username = this.registerForm.get('username')?.value;
    var email = this.registerForm.get('email')?.value;
    var password = this.registerForm.get('password')?.value;
    this.authService
      .signUp(email,   password)
      .then((result) => {
        var user = this.auth.currentUser;
        var actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be in the authorized domains list in the Firebase Console.
          url: 'lumyvest.com',
          // This must be true.
          handleCodeInApp: true,
          // iOS: {
          //   bundleId: 'com.example.ios'
          // },
          // android: {
          //   packageName: 'com.example.android',
          //   installApp: true,
          //   minimumVersion: '12'
          // },
          dynamicLinkDomain: 'com.example.android'
        };
        console.log('about to got sent');
    //     this.auth.sendSignInLinkToEmail('will4odia@gmail.com',{
		// 			url: this.getAppRootUrl(),
		// 			handleCodeInApp: true
		// 		})
        
    // .then(() => {
      console.log('just got sent');
      result.user?.sendEmailVerification();
      this.userID = result.user?.uid;
        var userData = {
          'city': null,
          'email': email,
          'first_name': null,
          'last_name': null,
          'house_address': null,
          'phone_number': null,
          'state': null,
          'userID': result.user?.uid,
          'username': username
        };
        console.log('user Data Here');
        console.log(userData);
        this.setUserData(userData);
   // });
        
      }).catch((error) => {
        this.notify.Doneloading();
        window.alert(error.message)
      })
  };

  setUserData(data: object){
    this.createService.createUser(data).then((res:any) => {
      console.log('your register response');
      console.log(res);
      var userData = {
        'userID': this.userID,
        'username': this.registerForm.get('username')?.value,
        'email': this.registerForm.get('email')?.value,
        'availableBalance': 0.00,
        'investment_status': 'inactive',
        'hasMessage': 'yes',
        'credit_cards': {
          'card1': null,
          'card2': null,
          'card3': null,
        },
        'bitcoin_wallets': {
          'wallet_details1': null,
          'wallet_details2': null,
          'wallet_details3': null,
        },
        'bank_accounts': {
          'account1': null,
          'account2': null,
          'account3': null,
        },
      }
      this.setUserCredentials(userData);
    }, err => console.log(err));
  }

  setUserCredentials(credentials: object){
    this.createService.setUserCredentials(credentials).then(res => {
      console.log('your credentials response');
      console.log(res);
      this.credID = res.id;
      var send = {
        'count': 0,
        'type': 'reply',
        'userID': this.userID,
        'time': "00:00",
        'date': new Date(),
        'text':
            'Hi there, my name is chad. i am here to help ensure you have a seamless investment journey with lumyVest. Thank you'
      };
      this.sendMessage(send);
    }, err => console.log(err));
  }

  sendMessage(chat: object){
    this.createService.sendUserMessage(chat).then(res => {
      console.log('you can do your sqlite jobs now');
      console.log(res);
      this.storageService.set('userID', this.userID);
      this.storageService.set('credID', this.credID);
      this.authService.userID = this.userID;
    this.authService.credID = this.credID;
    this.notify.Doneloading();
      this.view = 'home';
    }, err => console.log(err));
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
