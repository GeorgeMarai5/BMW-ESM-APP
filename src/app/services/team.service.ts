import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  apiUrl = 'https://localhost:44381/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  GetQuote(GetTeam: Team){
    return this.httpClient.post(`${this.apiUrl}TeamController/GetTeam`,GetTeam, this.httpOptions)
  }

  DeleteQuote(DeleteTeam: Team){
    return this.httpClient.delete<Team>(`${this.apiUrl}TeamController/DeleteTeam`)
  }

  CreateQuote(CreateTeam: Team){

    return this.httpClient.post<Team>(`${this.apiUrl}TeamController/CreateTeam`,CreateTeam, this.httpOptions)
  }

  
  UpdateQuote(UpdateTeam: Team){

    return this.httpClient.post<Team>(`${this.apiUrl}TeamController/CreateTeam`,UpdateTeam, this.httpOptions)
  }

}