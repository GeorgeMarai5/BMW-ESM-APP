import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Address } from '../models/Address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl = 'https://localhost:7292'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   

  }

  get(){
    return this.httpClient.get<Address[]>("https://localhost:7292/address")
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
    
  }





  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }




  AddAddress(address: Address){
    return this.httpClient.post(`${this.apiUrl}/Create`, address, this.httpOptions)


  }





////////////////////////////////////////real


Add_Address(data:any){

  return this.httpClient.post(this.apiUrl + "/Create", data);
}



getAddresList(): Observable<any[]>{


return this.httpClient.get<any>(this.apiUrl + "/GetAllAddresses" );

}

updateAddress(id:number|string,data:any){


return this.httpClient.put(this.apiUrl + "/UpdateAddress/${id}",data)

}

DeleteAddress(id:number|string){

return this.httpClient.delete(this.apiUrl + '/DeleteAddress/${id}');

}


















/////////////////////////////////////////////////////real



  getAddressID(id): Observable<Address[]> {
    return this.httpClient.get<Address[]>('https://localhost:7292/api/AddressByid' + id)
      .pipe(
        tap(_ => console.log(`Address fetched: ${id}`)),
        catchError(this.handleError)
      );
  }





  GetAddress(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/GetAllAddresses`)
    .pipe(map(result => result))
  }





}



