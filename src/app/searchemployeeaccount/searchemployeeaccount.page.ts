import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-searchemployeeaccount',
  templateUrl: './searchemployeeaccount.page.html',
  styleUrls: ['./searchemployeeaccount.page.scss'],
})


export class SearchemployeeaccountPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  searchTerm: string;
  employees:any = [];
  public list: Array<Object> = [];
  private searchedItem: any;
  
  qnumber: string;
  name: string;
  email: number;
  role: string;
  
  Filter: string;

 
}
  // getEmployees(): Observable<SearchemployeeaccountPage[]> {
  //   return this.httpClient.get<SearchemployeeaccountPage[]>('https://jsonplaceholder.typicode.com/users/')
  //     .pipe(
  //       tap(EmployeeDevice => console.log('Employees list received!')),
  //       catchError(this.handleError<SearchemployeeaccountPage[]>('Get Employee', []))
  //     );
  // }
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
