import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceHistoryService {


  apiUrl = 'https://localhost:7292'

  constructor(private httpClient: HttpClient) { }

  

  getHistoryList(): Observable<any[]>{


    return this.httpClient.get<any>(this.apiUrl + "/GetAllAddresses" );
    

    }


    updateHistory(id:number|string,data:any){


      return this.httpClient.put(this.apiUrl + "/UpdateAddress/${id}",data)
      
      }
      
      DeleteHistory(id:number|string){
      
      return this.httpClient.delete(this.apiUrl + '/DeleteAddress/${id}');
      
      }


      Add_History(data:any){

  return this.httpClient.post(this.apiUrl + "/Create", data);
}





}
