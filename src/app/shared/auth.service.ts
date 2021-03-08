import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userID: string | undefined = '';
  credID: string | undefined = '';
  constructor(public auth: AngularFireAuth) { }


  signUp(email: any, password: any) { 
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  sendEmail(email: any, password: any) { 
   // return this.auth.currentUser.sendEmailVerification();
  }

  signIn(email: any, password: any) { 
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
