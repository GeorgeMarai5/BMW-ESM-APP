import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';

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
  
  id: string;
  name: string;
  phone: number;
  email: string;
  
  Filter: string;


  constructor(private httpClient: HttpClient) { 
    this.getClients().subscribe(res => {
      console.log(res)
      this.clients = res;
    });
  }

  getClients(): Observable<SearchclientaccountPage[]> {
    return this.httpClient.get<SearchclientaccountPage[]>('https://jsonplaceholder.typicode.com/users/')
      .pipe(
        tap(ClientDevice => console.log('Clients list received!')),
        catchError(this.handleError<SearchclientaccountPage[]>('Get Client', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 
  ngOnInit() {
  }

}
