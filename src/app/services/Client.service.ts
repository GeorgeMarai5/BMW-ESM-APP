import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Clients } from "../models/Clients";



@Injectable({

    providedIn: 'root'
})


export class ClientService{



    
    private ClientListRef = this.db.list<Clients>('Client')
    
  
    constructor(private db: AngularFireDatabase){}
  
    getClientList() { 
      return this.ClientListRef;
    }
}