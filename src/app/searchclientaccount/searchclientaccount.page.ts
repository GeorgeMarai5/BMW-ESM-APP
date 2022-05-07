import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-searchclientaccount',
  templateUrl: './searchclientaccount.page.html',
  styleUrls: ['./searchclientaccount.page.scss'],
})


export class SearchclientaccountPage implements OnInit {
  public searchField: FormControl;

  searchTerm: string;
  clients:any = [];
  public list: Array<Object> = [];
  private searchedItem: any;
  public searchList: any[];
  public loadedsearchList: any[];
  id: string;
  name: string;
  phone: number;
  email: string;
  Filter: string;

  constructor(private readonly firestore: Firestore) { 
    this.searchField = new FormControl('');
}

ngOnInit() {
  
}

  //   this.firestore.collection(`competition`).valueChanges().subscribe(searchList => {
  //     this.searchList = searchList;
  //     this.loadedsearchList = searchList;
  //   });
  // }
  //  initializeItems():void {
  //    this.searchList= this.loadedsearchList;
  //  }

  //  filterList(evt){
  //    this.initializeItems();
  //    const searchTerm = evt.srcElement.value; 
  //    if(!searchTerm){
  //      return; 
  //    }


  //  this.searchList= this.searchList.filter(currentGoal =>{
  // if(currentGoal.location && searchTerm){
  //   if(currentGoal.location.toLowerCase().indexOf(searchTerm.toLowerCase())>-1){
  //     return true; 
  //   }
  //   return false; 
  // }

  //  });
  }

  // getClients(): Observable<SearchclientaccountPage[]> {
  //   return this.httpClient.get<SearchclientaccountPage[]>('https://jsonplaceholder.typicode.com/users/')
  //     .pipe(
  //       tap(ClientDevice => console.log('Clients list received!')),
  //       catchError(this.handleError<SearchclientaccountPage[]>('Get Client', []))
  //     );
  // }

