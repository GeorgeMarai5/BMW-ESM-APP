import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Firestore, collectionData, query, collection } from '@angular/fire/firestore';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'app-searchclientaccount',
  templateUrl: './searchclientaccount.page.html',
  styleUrls: ['./searchclientaccount.page.scss'],
})


export class SearchclientaccountPage implements OnInit {

  searchTerm: string;
  clients:any = [];
  public list: Array<Object> = [];
  private searchedItem: any;
  public searchField: FormControl;
  public clientList$: Observable<any[]>;
  id: string;
  name: string;
  phone: number;
  email: string;
  
  Filter: string;


  constructor(private readonly firestore: Firestore) { 
    this.searchField = new FormControl('');
  }
  
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
   async ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value),
    );
  const clientList$ = collectionData(query(collection(this.firestore, 'clientList')));
  this.clientList$ = combineLatest([clientList$, searchTerm$]).pipe(
    map(([clientList, searchTerm]) =>
      clientList.filter(
        (clientItem) =>
          searchTerm === '' ||
          clientItem.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );
  
}
}
interface ClientItem {
  name: string;
  
}
