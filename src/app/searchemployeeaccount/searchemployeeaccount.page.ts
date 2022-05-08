import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-searchemployeeaccount',
  templateUrl: './searchemployeeaccount.page.html',
  styleUrls: ['./searchemployeeaccount.page.scss'],
})


export class SearchemployeeaccountPage implements OnInit {

  searchTerm: string;
  employees:any = [];
  public list: Array<Object> = [];
  private searchedItem: any;
  
  qnumber: string;
  name: string;
  email: number;
  role: string;
  
  Filter: string;


  constructor(private httpClient: HttpClient, public authService: AuthService) { 
    this.getEmployees().subscribe(res => {
      console.log(res)
      this.employees = res;
    });
  }

  getEmployees(): Observable<SearchemployeeaccountPage[]> {
    return this.httpClient.get<SearchemployeeaccountPage[]>('https://jsonplaceholder.typicode.com/users/')
      .pipe(
        tap(EmployeeDevice => console.log('Employees list received!')),
        catchError(this.handleError<SearchemployeeaccountPage[]>('Get Employee', []))
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
