import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard.component';
// import { FundComponent } from './fund.component';
// import { WithdrawComponent } from './withdraw.component';
// import { TransactionsComponent } from './transactions.component';
// import { InvestmentsComponent } from './investments.component';
// import { ProfileComponent } from './profile.component';
// import { FaqComponent } from './faq.component';
import { PublicService } from "./shared/public.service";
import { FormsModule } from '@angular/forms';


// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

var config = {
  apiKey: "AIzaSyDGx0iJPZuhMh_qa9Su_OleZ0UHfCKWFpI",
  authDomain: "greylux-mobile.firebaseapp.com",
  databaseURL: "https://greylux-mobile.firebaseio.com",
  projectId: "greylux-mobile",
  storageBucket: "greylux-mobile.appspot.com",
  messagingSenderId: "916390108907",
  appId: "1:916390108907:web:fd6e45a53ec42a22e5a8ae",
  measurementId: "G-GSEET07791"
};

@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    HeroesListComponent,
    DashboardComponent,
     LoginComponent, RegisterComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    ReactiveFormsModule, 
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, 
    RouterModule.forRoot([
      {path: 'crisis-list', component: CrisisListComponent},
      {path: 'heroes-list', component: HeroesListComponent},
      {path: 'dashboard', component: DashboardComponent},
    ]),
    BrowserAnimationsModule,
  
  ],
  providers: [PublicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
