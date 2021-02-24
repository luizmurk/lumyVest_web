import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private db: AngularFirestore) { }


  createUser(data:object) {
    return this.db
            .collection("users")
            .add(data)
}

  setUserCredentials(data:object) {
    return this.db
            .collection("userCredentials")
            .add(data)
}

  sendUserMessage(data:object) {
    return this.db
            .collection("messages")
            .add(data)
}
}
