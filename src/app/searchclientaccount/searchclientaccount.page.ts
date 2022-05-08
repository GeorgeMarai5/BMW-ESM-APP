import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Firestore, collectionData, query, collection } from '@angular/fire/firestore';
import { first, startWith, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-searchclientaccount',
  templateUrl: './searchclientaccount.page.html',
  styleUrls: ['./searchclientaccount.page.scss'],
})


export class SearchclientaccountPage implements OnInit {

//   searchTerm: string;
//   clients:any = [];
//   public list: Array<Object> = [];
//   private searchedItem: any;
//   public searchField: FormControl;
//  // public clientList$: Observable<any[]>;
//   id: string;
//   name: string;
//   phone: number;
//   email: string;
  
 // Filter: string;
public clientList: any;

constructor(private firestore: AngularFirestore){

}
  // constructor(private readonly firestore: Firestore) { 
  //   this.searchField = new FormControl('');
  // }
  
  // getClients(): Observable<SearchclientaccountPage[]> {
  //   return this.httpClient.get<SearchclientaccountPage[]>('https://jsonplaceholder.typicode.com/users/')
  //     .pipe(
  //       tap(ClientDevice => console.log('Clients list received!')),
  //       catchError(this.handleError<SearchclientaccountPage[]>('Get Client', []))
  //     );
  // }
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // } 
//    async ngOnInit() {
//     const searchTerm$ = this.searchField.valueChanges.pipe(
//       startWith(this.searchField.value),
//     );
//   const clientList$ = collectionData(query(collection(this.firestore, 'clientList')));
//   this.clientList$ = combineLatest([clientList$, searchTerm$]).pipe(
//     map(([clientList, searchTerm]) =>
//       clientList.filter(
//         (clientItem) =>
//           searchTerm === '' ||
//           clientItem.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     )
//   );
  
// }
// }
// interface ClientItem {
//   name: string;
  

async ngOnInit(){
    this.clientList = await this.initializeItems();
}

async initializeItems(): Promise<any>{
const clientList = await this.firestore.collection('clientList').valueChanges().pipe(first());
}

async filterList(evt){
  this.clientList = await this.initializeItems();
  const searchTerm = evt.srcElement.value;

  if(!searchTerm){
    return;
  }

  this.clientList = this.clientList.filter(currentClient => {
    if (currentClient.name && searchTerm){
      return (currentClient.name.toLowerCase().indexOf(searchTerm.toLowerCase())> -1 || currentClient.clientId.toLowerCase().indexOf(searchTerm.toLowerCase()))
    }
  })
}
}