import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Employee } from '../models/Employee';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/Model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

 apiUrl = 'https://localhost:7163';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
    }
   
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError('Something bad happened; please try again later.');
    }
  
  createEmployee(createEmployee: Employee){
    return this.httpClient.post(this.apiUrl + '/api/Employees/CreateEmployee' , Employee, this.httpOptions)
  }

  getEmployeeList(): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiUrl + '/api/Employees/GetEmployeeList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getEmployee(id): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiUrl + '/api/Employees/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateEmployee(item): Observable<Employee> {
    return this.httpClient
      .put<Employee>(this.apiUrl + '/api/Employees/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteEmployee(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Employees/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}



// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { AngularFirestore } from "@angular/fire/compat/firestore";
// import { Employee } from "../models/Employee";



// @Injectable({

//     providedIn: 'root'
// })


// export class EmployeeService{

//     collectionName = 'Employee';


//     constructor(
//         private firestore: AngularFirestore
//       ) { }

//       read_Employee() {
//         return this.firestore.collection(this.collectionName).snapshotChanges();
//       }


/*

      update_student(Title, FirstName, LastName, PhoneNumber, Email, address) {
        this.firestore.doc(this.collectionName + '/' + recordID).update(record);
      }




      delete_student(record_id) {
        this.firestore.doc(this.collectionName + '/' + record_id).delete();
      }
    */
    
