import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private db: AngularFirestore) { 

  }

  valueChanges(){
    const database = this.db.collection('investments').valueChanges();
      database.subscribe(console.log);
  }

  getTest(id:any) { 
    return this.db.collection('userCredentials', ref => ref.where('userID', '==', id.replace(/['"]+/g, ''))).snapshotChanges();
  }

  getPayouts() { 
    return this.db.collection("payouts").snapshotChanges();
  }

  getCreds(id: String) {
    console.log('your doc id here'); 
    console.log(id); 
    console.log('userCredentials/'+id.replace(/['"]+/g, '')); 
    return this.db.doc('userCredentials/'+id.replace(/['"]+/g, '')) .snapshotChanges();
  }

  
}
