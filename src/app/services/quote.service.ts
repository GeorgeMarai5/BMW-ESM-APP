import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { map, Observable } from 'rxjs';
import { Quote } from '../models/Quote';



@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  apiUrl = 'https://localhost:44381/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  GetQuote(GetQuote: Quote){
    return this.httpClient.post(`${this.apiUrl}QuoteController/GetQuote`,GetQuote, this.httpOptions)
  }

  DeleteQuote(DeleteQuote: Quote){
    return this.httpClient.delete<Quote>(`${this.apiUrl}QuoteController/DeleteQuote`)
  }

  


}
