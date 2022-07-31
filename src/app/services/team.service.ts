import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  apiUrl = 'https://localhost:7005/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  GetTeam(GetTeam: Team){
    return this.httpClient.post(`${this.apiUrl}GetTeam`,GetTeam, this.httpOptions)
  }

  DeleteTeam(DeleteTeam: Team){
    return this.httpClient.delete<Team>(`${this.apiUrl}TeamController/DeleteTeam`)
  }

  AddTeam(CreateTeam: Team){

    return this.httpClient.post<Team>(`${this.apiUrl}Team/AddTeam`,CreateTeam, this.httpOptions)
  }

  
  UpdateTeam(UpdateTeam: Team){

    return this.httpClient.post<Team>(`${this.apiUrl}CreateTeam`,UpdateTeam, this.httpOptions)
  }

}